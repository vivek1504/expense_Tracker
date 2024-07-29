import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { authMiddleware } from "../middlerwares/authmiddlerware";

export const expenseRouter = Router(); 
const prisma = new PrismaClient();

expenseRouter.post("/addExpenses/equal",authMiddleware, async (req, res) => {
    const { groupid, amount, name, userId }: { groupid: number, amount: number, name: string, userId: number } = req.body;
  
    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      userId: z.number(),
    }).safeParse({ groupid, amount, name, userId });
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    try {
      const group = await prisma.group.findUnique({
        where: { id: groupid },
        include: { users: true },
      });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      const totalUsers = group.users.length;
      const amountPerUser = amount / totalUsers;
  
      const expense = await prisma.expenses.create({
        data: {
          name,
          amount,
          splitType: 'EQUAL',
          group: {
            connect: { id: groupid },
          },
        },
      });
  
      const dueUsers = group.users.filter(user => user.id !== userId);
  
      const expenseCreation = dueUsers.map(user => {
        return prisma.balance.create({
          data: {
            userId: user.id,
            amount: amountPerUser,
            expenseId: expense.id,
          },
        });
      });
  
      const balances = await Promise.all(expenseCreation);
  
      res.status(201).json({ message: 'Expense created successfully', expense, balances });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating expense' });
    }
  });
  
  
  expenseRouter.post("/addExpenses/percentage",authMiddleware, async (req, res) => {
    const { groupid, amount, name}: { groupid: number, amount: number, name: string } = req.body;
    const users = req.body.users;
    const userId = req.body.userId;
  
    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      users: z.array(z.object({
        userId: z.number(),
        percent: z.number(),
      }))
    }).safeParse({ groupid, amount, name, users });
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    let percents = 0;
    users.forEach((user: any) => {
      percents += user.percent;
    });
  
    if(percents !== 100) {
      return res.status(400).json({ message: 'Invalid percentages' });
    }
  
    try{
      const group = await prisma.group.findUnique({
        where: { id: groupid },
        include: { users: true },
      });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      const expense = await prisma.expenses.create({
        data: {
          name,
          amount,
          splitType: 'PERCENTAGE',
          group: {
            connect: { id: groupid },
          },
        },
      });
  
      const dueUsers = users.filter((user: any) => user.userId !== userId);
  
      const expenseCreation = dueUsers.map((user: any) => {
        return prisma.balance.create({
          data: {
            userId: user.userId,
            amount: (amount * user.percent / 100),
            expenseId: expense.id,
          },
        });
      });
  
      const balances = await Promise.all(expenseCreation);
  
      res.status(201).json({ message: 'Expense created successfully', expense, balances });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error creating expense' });
    }
  })
  
  expenseRouter.post("/addExpenses/exact",authMiddleware, async (req,res)=>{
    const {groupid, amount, name}: { groupid: number, amount: number, name: string } = req.body;
    const users = req.body.users;
    const userId = req.body.userId;
  
    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      users: z.array(z.object({
        userId: z.number(),
        amount: z.number(),
      }))
    }).safeParse({ groupid, amount, name, users });
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
  
    let totalAmount = 0;
    users.forEach((user: any) => {
      totalAmount += user.amount;
    });
  
    if(totalAmount !== amount) {
      return res.status(400).json({ message: 'Invalid amounts' });
    }
  
    try{
      const group = await prisma.group.findUnique({
        where: { id: groupid },
        include: { users: true },
      });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
  
      const expense = await prisma.expenses.create({
        data: {
          name,
          amount,
          splitType: 'EXACT',
          group: {
            connect: { id: groupid },
          },
        },
      });
    
      const expenseCreation = users.map((user: any) => {
        return prisma.balance.create({
          data: {
            userId: user.userId,
            amount: user.amount,
            expenseId: expense.id,
          },
        });
      });
  
      const balances = await Promise.all(expenseCreation);
  
      res.status(201).json({ message: 'Expense created successfully', expense, balances });
    }
    catch(error){
      console.error(error);
      res.status(500).json({ message: 'Error creating expense' });
    }
  })

expenseRouter.get("/getExpenses",authMiddleware, async(req,res)=>{
    const userId = req.body.userId;

    try {
        const expenses = await prisma.expenses.findMany({
            include : {
                dues : true
            },
            where : {
                dues : {
                    some : {
                        userId
                    }
                }
            }
        })

        res.status(200).json({expenses})
    }
    catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
})

expenseRouter.get("/overallExpenses",authMiddleware, async(req,res)=>{
    const groupId = req.body.groupId;

    try {
        const expenses = await prisma.group.findUnique({
            where : { id : groupId },
            include : {
                expenses : true
            }
        })

        res.status(200).json({expenses})
    }
    catch(error){ 
        console.error(error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
})
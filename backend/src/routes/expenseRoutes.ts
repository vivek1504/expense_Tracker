import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import { authMiddleware } from "../middlerwares/authmiddlerware";

export const expenseRouter = Router(); 
const prisma = new PrismaClient();

const expenseDate = ()=> {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, '0');
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

expenseRouter.post("/addExpenses/equal",authMiddleware, async (req, res) => {
    const { groupid, amount, name, description }: { groupid: number, amount: number, name: string , description : string} = req.body;    

    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      description: z.string()
    }).safeParse({ groupid, amount, name ,description});
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid Inputs' });
    }
  
    try {
      const group = await prisma.group.findUnique({
        where: { id: groupid },
        include: { users: true },
      });
  
      if (!group) {
        return res.status(404).json({ message: 'Group not found' });
      }
      
      const users = group.users
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
          expenseDate: expenseDate(),
          description
        },
      });
  
  
      const expenseCreation = users.map(user => {
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
    const { groupid, amount, name , description}: { groupid: number, amount: number, name: string , description : string } = req.body;
    const users = req.body.users;
    const userId = req.body.userId;
  
    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      description: z.string(),
      users: z.array(z.object({
        userId: z.number(),
        percent: z.number(),
      }))
    }).safeParse({ groupid, amount, name, users ,description });
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid Inputs' });
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
          expenseDate : expenseDate(),
          description 
        },
      });
  
      const expenseCreation = users.map((user: any) => {
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
    const {groupid, amount, name,description}: { groupid: number, amount: number, name: string, description : string } = req.body;
    const users = req.body.users;
  
    const result = z.object({
      groupid: z.number(),
      amount: z.number(),
      name: z.string(),
      description: z.string(),
      users: z.array(z.object({
        userId: z.number(),
        amount: z.number(),
      }))
    }).safeParse({ groupid, amount, name, users, description });
  
    if (!result.success) {
      return res.status(400).json({ message: 'Invalid Inputs' });
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
          expenseDate: expenseDate(),
          description
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

expenseRouter.get("/getExpenses",authMiddleware, async (req, res) => {
  const groupId = parseInt(req.body.groupId);

  if(!groupId){
    return res.status(400).json({ message: 'Invalid inputs' });
  }

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: { expenses: true },
    });

    if (!group) {
      return res.status(404).json({ message: 'Group not found' });
    }

    res.status(200).json({ message: 'Expenses fetched successfully', group });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching expenses' });
  }
});
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middlerwares/authmiddlerware";
import pdfkit from "pdfkit";
import fs from "fs";
dotenv.config();

export const userRouter = Router();
const prisma = new PrismaClient();
const {JWT_SECRET} = process.env;

const userSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    number: z.string(),
});

const loginUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

userRouter.post("/signup",async(req,res)=>{
    const { name,number, password, email } = req.body;
    const result = userSignupSchema.safeParse({number,name,password,email})
    
    if (!result.success) {
      return res.status(400).json({ message: 'invalid credentials' });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
  
    try {

      const existingUser = await prisma.user.findUnique({
            where: { email },
        });
      
      if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

      const user = await prisma.user.create({
        data: {
          name,
          number,
          email,
          password: hashedPassword,

        },
      });

      const token = sign({userId : user.id}, JWT_SECRET || "");

      res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email, password } = req.body;

  const result = loginUserSchema.safeParse({email,password})
  if (!result.success) {
    return res.status(400).json({ message: 'Missing username or password' });
  }

  try {
    const existingUser = await prisma.user.findUnique({
        where: { email },
        });

    if (!existingUser) {
        return res.status(401).json({ message: 'user does not exist' });
        }

    const passwordMatch = await bcrypt.compare(password, existingUser.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const user = await prisma.user.findUnique({
      where: { email },
    });

    const token =sign({userId : user?.id}, JWT_SECRET || "");
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error during login' });
  } 

})

userRouter.post("/CreateGroup",authMiddleware, async (req, res) => {
  const { groupname }: { groupname: string } = req.body;
  const userId = req.body.userId.userId;

  const result = z.object({
    userId: z.number(),
    groupname: z.string(),
  }).safeParse({ userId, groupname });

  if (!result.success) {
    return res.status(400).json({ message: 'invalid credentials' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name: groupname,
        users : {
          connect : {
            id : userId
          }
        }  
      },
    });

    res.status(201).json({ message: 'Group created successfully', group });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating group' });
  }

});

userRouter.post("/addUserToGroup",authMiddleware, async (req, res) => {
  const { users}: { users: string[] } = req.body;
  const groupid = parseInt(req.body.groupId);

  const result = z.object({
    groupid: z.number(),
    users: z.array(z.string().email()),
  }).safeParse({ groupid, users });

  if(!result.success){
    return res.status(400).json({ message: 'Invalid inputs' });
  }

  try {
    const usersInfo = await prisma.user.findMany({
      where: {
        email:{
          in : users
        }
      }
    })

    const group = await prisma.group.update({
        where : {
          id : groupid
        },
        data: {
          users: {
            connect: usersInfo.map((user) => {
              return { id: user.id };
            }),
          },
        },
    });

    res.status(201).json({ message: 'User added to group successfully', group });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding user to group' });
  }
})

userRouter.get("/download",authMiddleware, async (req, res) => {
  const userId = req.body.userId;
  try {
  const groups = await prisma.group.findMany({
    where: {
      users: {
        some: {
          id: userId,
        },
      },
    },
    include: { users: true, expenses: {
      include : {
        balances : true
      }
    } },
  });

  const doc = new pdfkit();
  doc.pipe(fs.createWriteStream('balances.pdf'));
  doc.text('Balances\n\n');
  doc.text(groups.map((group) => {
    return `Group: ${group.name}\n` + group.users.map((user) => {
      return `${user.name}\n`;
    }).join('') + '\n';
  }).join('\n'));
  doc.end();
  res.json({ message: 'Downloaded successfully',groups });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error downloading balances' });
  }
})

userRouter.get("/getInfo",authMiddleware, async (req, res) => {
  const groupId = parseInt(req.body.groupId);

  if(!groupId){
    return res.status(400).json({ message: 'Invalid inputs' });
  }

  try {
    const group = await prisma.group.findUnique({
      where: {
        id: groupId,
      },
      include: { users: true },
    });

    res.json({ message: 'Group info fetched successfully', group });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching group info' });
  }
});
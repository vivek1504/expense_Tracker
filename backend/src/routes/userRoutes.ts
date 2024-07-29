import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { z } from "zod";
import bcrypt from "bcryptjs"
import { sign } from "jsonwebtoken";
import dotenv from "dotenv";
import { authMiddleware } from "../middlerwares/authmiddlerware";
dotenv.config();

export const userRouter = Router();
const prisma = new PrismaClient();
const {JWT_SECRET} = process.env;

const userSignupSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    number: z.number(),
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
  const { email, groupname, groupMembers }: { email: string, groupname: string, groupMembers: string[] } = req.body;

  const result = z.object({
    email: z.string().email(),
    groupname: z.string(),
    groupMembers: z.array(z.string())
  }).safeParse({ email, groupname, groupMembers });

  if (!result.success) {
    return res.status(400).json({ message: 'invalid credentials' });
  }

  try {
    const group = await prisma.group.create({
      data: {
        name: groupname,
        users: {
          connect: groupMembers.map((email) => ({ email })),
        },
      },
    });

    res.status(201).json({ message: 'Group created successfully', group });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating group' });
  }

});
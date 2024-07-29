import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const {JWT_SECRET} = process.env;

export function authMiddleware(req : Request,res : Response,next : NextFunction){
    const token = req.headers.authorization;
    if(!token){
        return res.status(401).json({message : "Unauthorized"})
    }
    try {
        const decoded = verify(token,JWT_SECRET || "");
        req.body.userId = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({message : "Unauthorized"})
    }
}
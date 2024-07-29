"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const { JWT_SECRET } = process.env;
console.log(JWT_SECRET);
const userSignupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    number: zod_1.z.number(),
});
const loginUserSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
});
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, number, password, email } = req.body;
    const result = userSignupSchema.safeParse({ number, name, password, email });
    if (!result.success) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        const user = yield prisma.user.create({
            data: {
                name,
                number,
                email,
                password: hashedPassword,
            },
        });
        const token = (0, jsonwebtoken_1.sign)({ email }, JWT_SECRET || "");
        res.status(201).json({ message: 'User created successfully', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const result = loginUserSchema.safeParse({ email, password });
    if (!result.success) {
        return res.status(400).json({ message: 'Missing username or password' });
    }
    try {
        const existingUser = yield prisma.user.findUnique({
            where: { email },
        });
        if (!existingUser) {
            return res.status(401).json({ message: 'user does not exist' });
        }
        const passwordMatch = yield bcryptjs_1.default.compare(password, existingUser.password);
        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        const token = (0, jsonwebtoken_1.sign)({ email }, JWT_SECRET || "");
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
}));
exports.userRouter.post("/CreateGroup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, groupname, groupMembers } = req.body;
    const result = zod_1.z.object({
        email: zod_1.z.string().email(),
        groupname: zod_1.z.string(),
        groupMembers: zod_1.z.array(zod_1.z.string())
    }).safeParse({ email, groupname, groupMembers });
    if (!result.success) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    try {
        const group = yield prisma.group.create({
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
}));
exports.userRouter.post("/addExpenes/equal", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupname, amount } = req.body;
    const result = zod_1.z.object({
        groupname: zod_1.z.string(),
        amount: zod_1.z.number(),
    }).safeParse({ groupname, amount });
    if (!result.success) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    try {
        const users = yield prisma.group.findMany({
            where: {
                name: groupname
            },
            include: {
                users: true
            }
        });
        const totalUsers = users[0].users.length;
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating group' });
    }
}));
exports.userRouter.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield prisma.user.findMany();
    res.json({ users, count: users.length });
}));

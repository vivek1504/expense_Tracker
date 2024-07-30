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
const authmiddlerware_1 = require("../middlerwares/authmiddlerware");
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
exports.userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
const { JWT_SECRET } = process.env;
const userSignupSchema = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string(),
    number: zod_1.z.string(),
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
        const token = (0, jsonwebtoken_1.sign)({ userId: user.id }, JWT_SECRET || "");
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
        const user = yield prisma.user.findUnique({
            where: { email },
        });
        const token = (0, jsonwebtoken_1.sign)({ userId: user === null || user === void 0 ? void 0 : user.id }, JWT_SECRET || "");
        res.status(200).json({ message: 'Login successful', token });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error during login' });
    }
}));
exports.userRouter.post("/CreateGroup", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupname } = req.body;
    const userId = req.body.userId.userId;
    const result = zod_1.z.object({
        userId: zod_1.z.number(),
        groupname: zod_1.z.string(),
    }).safeParse({ userId, groupname });
    if (!result.success) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    try {
        const group = yield prisma.group.create({
            data: {
                name: groupname,
                users: {
                    connect: {
                        id: userId
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
}));
exports.userRouter.post("/addUserToGroup", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users } = req.body;
    const groupid = parseInt(req.body.groupId);
    const result = zod_1.z.object({
        groupid: zod_1.z.number(),
        users: zod_1.z.array(zod_1.z.string().email()),
    }).safeParse({ groupid, users });
    if (!result.success) {
        return res.status(400).json({ message: 'Invalid inputs' });
    }
    try {
        const usersInfo = yield prisma.user.findMany({
            where: {
                email: {
                    in: users
                }
            }
        });
        const group = yield prisma.group.update({
            where: {
                id: groupid
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
}));
exports.userRouter.get("/download", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    try {
        const groups = yield prisma.group.findMany({
            where: {
                users: {
                    some: {
                        id: userId,
                    },
                },
            },
            include: { users: true, expenses: {
                    include: {
                        balances: true
                    }
                } },
        });
        const doc = new pdfkit_1.default();
        doc.pipe(fs_1.default.createWriteStream('balances.pdf'));
        doc.text('Balances\n\n');
        doc.text(groups.map((group) => {
            return `Group: ${group.name}\n` + group.users.map((user) => {
                return `${user.name}\n`;
            }).join('') + '\n';
        }).join('\n'));
        doc.end();
        res.json({ message: 'Downloaded successfully', groups });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error downloading balances' });
    }
}));
exports.userRouter.post("/addExpense", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, amount, groupId, splitType, users } = req.body;
    const userId = req.body.userId.userId;
    const result = zod_1.z.object({
        userId: zod_1.z.number(),
        name: zod_1.z.string(),
        amount: zod_1.z.number(),
        groupId: zod_1.z.number(),
        splitType: zod_1.z.string(),
        users: zod_1.z.array(zod_1.z.object({
            email: zod_1.z.string().email(),
            amount: zod_1.z.number()
        }))
    }).safeParse({ userId, name, amount, groupId, splitType, users });
    if (!result.success) {
        return res.status(400).json({ message: 'invalid credentials' });
    }
    if (splitType !== 'PERCENTAGE' || 'EXACT' || 'EQUAL') {
        return res.status(400).json({ message: 'Invalid split type' });
    }
    try {
        const expense = yield prisma.expenses.create({
            data: {
                name,
                amount,
                splitType,
                group: {
                    connect: {
                        id: groupId
                    }
                },
            }
        });
        return res.status(201).json({ message: 'Expense created successfully', expense });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating expense' });
    }
}));
exports.userRouter.get("/getInfo", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = parseInt(req.body.groupId);
    if (!groupId) {
        return res.status(400).json({ message: 'Invalid inputs' });
    }
    try {
        const group = yield prisma.group.findUnique({
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
}));

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
Object.defineProperty(exports, "__esModule", { value: true });
exports.expenseRouter = void 0;
const client_1 = require("@prisma/client");
const express_1 = require("express");
const zod_1 = require("zod");
const authmiddlerware_1 = require("../middlerwares/authmiddlerware");
exports.expenseRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
exports.expenseRouter.post("/addExpenses/equal", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupid, amount, name } = req.body;
    const result = zod_1.z.object({
        groupid: zod_1.z.number(),
        amount: zod_1.z.number(),
        name: zod_1.z.string(),
    }).safeParse({ groupid, amount, name });
    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Inputs' });
    }
    try {
        const group = yield prisma.group.findUnique({
            where: { id: groupid },
            include: { users: true },
        });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const users = group.users;
        const totalUsers = group.users.length;
        const amountPerUser = amount / totalUsers;
        const expense = yield prisma.expenses.create({
            data: {
                name,
                amount,
                splitType: 'EQUAL',
                group: {
                    connect: { id: groupid },
                },
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
        const balances = yield Promise.all(expenseCreation);
        res.status(201).json({ message: 'Expense created successfully', expense, balances });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating expense' });
    }
}));
exports.expenseRouter.post("/addExpenses/percentage", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupid, amount, name } = req.body;
    const users = req.body.users;
    const userId = req.body.userId;
    const result = zod_1.z.object({
        groupid: zod_1.z.number(),
        amount: zod_1.z.number(),
        name: zod_1.z.string(),
        users: zod_1.z.array(zod_1.z.object({
            userId: zod_1.z.number(),
            percent: zod_1.z.number(),
        }))
    }).safeParse({ groupid, amount, name, users });
    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Inputs' });
    }
    let percents = 0;
    users.forEach((user) => {
        percents += user.percent;
    });
    if (percents !== 100) {
        return res.status(400).json({ message: 'Invalid percentages' });
    }
    try {
        const group = yield prisma.group.findUnique({
            where: { id: groupid },
            include: { users: true },
        });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const expense = yield prisma.expenses.create({
            data: {
                name,
                amount,
                splitType: 'PERCENTAGE',
                group: {
                    connect: { id: groupid },
                },
            },
        });
        const expenseCreation = users.map((user) => {
            return prisma.balance.create({
                data: {
                    userId: user.userId,
                    amount: (amount * user.percent / 100),
                    expenseId: expense.id,
                },
            });
        });
        const balances = yield Promise.all(expenseCreation);
        res.status(201).json({ message: 'Expense created successfully', expense, balances });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating expense' });
    }
}));
exports.expenseRouter.post("/addExpenses/exact", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { groupid, amount, name } = req.body;
    const users = req.body.users;
    const result = zod_1.z.object({
        groupid: zod_1.z.number(),
        amount: zod_1.z.number(),
        name: zod_1.z.string(),
        users: zod_1.z.array(zod_1.z.object({
            userId: zod_1.z.number(),
            amount: zod_1.z.number(),
        }))
    }).safeParse({ groupid, amount, name, users });
    if (!result.success) {
        return res.status(400).json({ message: 'Invalid Inputs' });
    }
    let totalAmount = 0;
    users.forEach((user) => {
        totalAmount += user.amount;
    });
    if (totalAmount !== amount) {
        return res.status(400).json({ message: 'Invalid amounts' });
    }
    try {
        const group = yield prisma.group.findUnique({
            where: { id: groupid },
            include: { users: true },
        });
        if (!group) {
            return res.status(404).json({ message: 'Group not found' });
        }
        const expense = yield prisma.expenses.create({
            data: {
                name,
                amount,
                splitType: 'EXACT',
                group: {
                    connect: { id: groupid },
                },
            },
        });
        const expenseCreation = users.map((user) => {
            return prisma.balance.create({
                data: {
                    userId: user.userId,
                    amount: user.amount,
                    expenseId: expense.id,
                },
            });
        });
        const balances = yield Promise.all(expenseCreation);
        res.status(201).json({ message: 'Expense created successfully', expense, balances });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating expense' });
    }
}));
exports.expenseRouter.get("/getExpenses", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.body.userId;
    try {
        const expenses = yield prisma.expenses.findMany({
            include: {
                balances: true
            },
            where: {
                balances: {
                    some: {
                        userId
                    }
                }
            }
        });
        res.status(200).json({ expenses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
}));
exports.expenseRouter.get("/overallExpenses", authmiddlerware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const groupId = req.body.groupId;
    try {
        const expenses = yield prisma.group.findUnique({
            where: { id: groupId },
            include: {
                expenses: true
            }
        });
        res.status(200).json({ expenses });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching expenses' });
    }
}));

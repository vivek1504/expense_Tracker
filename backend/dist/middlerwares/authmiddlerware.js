"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { JWT_SECRET } = process.env;
function authMiddleware(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    try {
        const decoded = (0, jsonwebtoken_1.verify)(token, JWT_SECRET || "");
        req.body.userId = decoded;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}
exports.authMiddleware = authMiddleware;

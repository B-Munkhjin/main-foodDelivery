"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const prisma_1 = require("../../lib/prisma");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res) => {
    const { email, password } = req.body;
    const secret = process.env.SECRET;
    try {
        if (!secret)
            return;
        const userByEmail = await prisma_1.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!userByEmail) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        if (!userByEmail.password) {
            res.status(404).json({ message: "Password is incorrect." });
            return;
        }
        const match = await bcrypt_1.default.compare(password, userByEmail.password); ///enni daraalal chuhal!!!
        if (match === true) {
            const token = jsonwebtoken_1.default.sign({
                data: {
                    userId: userByEmail.id,
                    email: userByEmail.email,
                    role: userByEmail.role,
                },
            }, secret, { expiresIn: "1h" });
            res.status(200).send({ token });
        }
    }
    catch (error) {
        res.status(500).json({ message: "buruu" });
        console.error(error);
    }
};
exports.login = login;

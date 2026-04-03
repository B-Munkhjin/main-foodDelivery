"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = void 0;
const prisma_1 = require("../../lib/prisma");
const me = async (req, res) => {
    const user = await prisma_1.prisma.user.findUnique({
        where: {
            id: req.user?.userId,
        },
        select: {
            email: true,
            password: true,
        },
    });
    if (!user)
        return res.status(400).json({ message: "user not found" });
    return res.status(200).json(user);
};
exports.me = me;

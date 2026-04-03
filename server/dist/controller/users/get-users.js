"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsers = void 0;
const prisma_1 = require("../../lib/prisma");
const getUsers = async (req, res) => {
    const users = await prisma_1.prisma.user.findMany();
    res.json({ users });
    console.log(users);
    // console.log(error);
};
exports.getUsers = getUsers;

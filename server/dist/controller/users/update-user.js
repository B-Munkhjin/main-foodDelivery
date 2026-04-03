"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUser = void 0;
const prisma_1 = require("../../lib/prisma");
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phoneNumber } = req.body;
        await prisma_1.prisma.user.update({
            where: { id: Number(id) },
            data: {
                name,
                email,
                phoneNumber,
            },
        });
        res.status(200).send();
    }
    catch (error) {
        res.status(400).json({ error: "update hiigdehgu bn???" });
    }
};
exports.updateUser = updateUser;

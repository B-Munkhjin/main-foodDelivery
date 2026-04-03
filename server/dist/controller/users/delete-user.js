"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.user.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: "ustgajij ustgana" });
        console.error(error);
    }
};
exports.deleteUser = deleteUser;

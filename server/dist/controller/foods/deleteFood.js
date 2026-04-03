"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFood = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.food.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: "ustgajij ustgana" });
    }
};
exports.deleteFood = deleteFood;

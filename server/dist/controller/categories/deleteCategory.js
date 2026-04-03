"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.foodCategory.delete({ where: { id: Number(id) } });
        res.status(204).send();
    }
    catch (error) {
        res.status(400).json({ error: "ustgajij ustgana" });
    }
};
exports.deleteCategory = deleteCategory;

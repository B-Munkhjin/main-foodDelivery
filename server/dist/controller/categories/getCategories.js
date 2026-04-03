"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = void 0;
const prisma_1 = require("../../lib/prisma");
const getCategories = async (req, res) => {
    const categories = await prisma_1.prisma.foodCategory.findMany({
        include: { foods: true },
    });
    res.status(200).json({ categories });
};
exports.getCategories = getCategories;

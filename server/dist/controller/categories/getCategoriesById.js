"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategoriesById = void 0;
const prisma_1 = require("../../lib/prisma");
const getCategoriesById = async (req, res) => {
    const { id } = req.params;
    const category = await prisma_1.prisma.foodCategory.findFirst({
        where: {
            id: Number(id),
        },
    });
    res.json({ category });
};
exports.getCategoriesById = getCategoriesById;

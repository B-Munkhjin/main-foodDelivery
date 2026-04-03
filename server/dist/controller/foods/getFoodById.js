"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoodById = void 0;
const prisma_1 = require("../../lib/prisma");
const getFoodById = async (req, res) => {
    const { id } = req.params;
    const food = await prisma_1.prisma.food.findFirst({
        where: {
            id: Number(id),
        },
    });
    res.json({ food });
};
exports.getFoodById = getFoodById;

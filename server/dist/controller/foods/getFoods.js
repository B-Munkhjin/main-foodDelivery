"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFoods = void 0;
const prisma_1 = require("../../lib/prisma");
const getFoods = async (req, res) => {
    const foods = await prisma_1.prisma.food.findMany();
    res.json({ foods });
};
exports.getFoods = getFoods;

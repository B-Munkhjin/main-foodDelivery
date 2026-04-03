"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrder = void 0;
const prisma_1 = require("../../lib/prisma");
const getOrder = async (req, res) => {
    const orders = await prisma_1.prisma.foodOrder.findMany();
    res.json({ orders });
};
exports.getOrder = getOrder;

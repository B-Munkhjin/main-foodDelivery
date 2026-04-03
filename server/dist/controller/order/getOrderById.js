"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderById = void 0;
const prisma_1 = require("../../lib/prisma");
const getOrderById = async (req, res) => {
    const { id } = req.params;
    const order = await prisma_1.prisma.foodOrder.findFirst({
        where: {
            id: Number(id),
        },
    });
    res.json({ order });
};
exports.getOrderById = getOrderById;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateOrder = void 0;
const prisma_1 = require("../../lib/prisma");
const updateOrder = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const updatedOrder = await prisma_1.prisma.foodOrder.update({
            where: { id: Number(id) },
            data: { status },
        });
        res.status(200).send(updatedOrder);
    }
    catch (error) {
        res.status(400).json({ error });
    }
};
exports.updateOrder = updateOrder;

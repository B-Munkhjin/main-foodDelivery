"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrder = void 0;
const prisma_1 = require("../../lib/prisma");
const deleteOrder = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.prisma.$transaction([
            prisma_1.prisma.foodOrderItem.deleteMany({
                where: { foodOrderId: Number(id) },
            }),
            prisma_1.prisma.foodOrder.delete({ where: { id: Number(id) } }),
        ]);
        // console.log(deleteWholeItem);
        res.status(204).send("ok");
    }
    catch (error) {
        console.error(error);
        res.status(400).json({ error: "ustgajij ustgana" });
    }
};
exports.deleteOrder = deleteOrder;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateFood = void 0;
const prisma_1 = require("../../lib/prisma");
const updateFood = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, foodCategoryId } = req.body;
        await prisma_1.prisma.food.update({
            where: { id: Number(id) },
            data: { name, price, foodCategoryId },
        });
        res.status(200).send();
    }
    catch (error) {
        res.status(400).json({ error: "update hiigdehgu bn???" });
    }
};
exports.updateFood = updateFood;

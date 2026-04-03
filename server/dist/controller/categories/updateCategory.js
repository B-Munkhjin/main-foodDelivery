"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCategory = void 0;
const prisma_1 = require("../../lib/prisma");
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        await prisma_1.prisma.foodCategory.update({
            where: { id: Number(id) },
            data: { name },
        });
        res.status(200).send();
    }
    catch (error) {
        res.status(400).json({ error: "update hiigdehgu bn???" });
    }
};
exports.updateCategory = updateCategory;

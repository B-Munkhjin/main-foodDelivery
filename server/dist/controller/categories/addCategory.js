"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategory = void 0;
const prisma_1 = require("../../lib/prisma");
const addCategory = async (req, res) => {
    const { name } = req.body;
    try {
        const category = await prisma_1.prisma.foodCategory.create({
            data: {
                name,
            },
        });
        res.json({ category });
    }
    catch (error) {
        res.send(error);
    }
};
exports.addCategory = addCategory;

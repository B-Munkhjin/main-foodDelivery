"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFoods = void 0;
const prisma_1 = require("../../lib/prisma");
const addFoods = async (req, res) => {
    const { name, foodCategoryId, price, image, ingredients } = req.body;
    try {
        const foods = await prisma_1.prisma.food.create({
            data: {
                name,
                foodCategoryId,
                price,
                image,
                ingredients,
            },
        });
        res.json({ foods });
    }
    catch (error) {
        console.log(error);
        res.send(error);
    }
};
exports.addFoods = addFoods;

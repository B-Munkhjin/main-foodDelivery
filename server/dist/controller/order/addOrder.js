"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addOrder = void 0;
const prisma_1 = require("../../lib/prisma");
const addOrder = async (req, res) => {
    // const userId = req.user?.userId!;
    const { foods, userId } = req.body;
    try {
        const ids = foods.map((food) => food.foodId); /// hooloo id-gaar avah.... ali hool ve gedgee medne
        const getFoodIdArray = await prisma_1.prisma.food.findMany({
            where: {
                id: {
                    in: ids,
                },
            },
        });
        const totalPrice = foods.reduce((acc, curr) => {
            const food = getFoodIdArray.find((f) => f.id === curr.foodId);
            if (!food)
                return acc;
            return acc + food.price * curr.quantity; ///total price nemj bn
        }, 0);
        const order = await prisma_1.prisma.foodOrder.create({
            data: {
                userId: userId,
                totalPrice,
                foodOrderItems: {
                    create: foods,
                },
            },
        });
        const foodsWithOrderId = foods.map((food) => ({
            foodId: food.foodId,
            quantity: food.quantity,
            foodOrderId: order.id, //// itemnii order id-g ogj bn
        }));
        const orderItems = await prisma_1.prisma.foodOrderItem.createMany({
            data: foodsWithOrderId,
        });
        res.json({ order, orderItems });
    }
    catch (error) {
        res.send(error);
        console.log(error);
    }
};
exports.addOrder = addOrder;

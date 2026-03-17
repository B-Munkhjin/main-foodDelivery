import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

type FoodOrder = { foodId: number; quantity: number };

type BodyType = {
  foods: FoodOrder[];
};

export const addOrder = async (req: Request, res: Response) => {
  const { foods }: BodyType = req.body;

  try {
    const ids = foods.map((food) => food.foodId); /// hooloo id-gaar avah
    const getFoodIdArray = await prisma.food.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const totalPrice = foods.reduce((acc, item) => {
      const food = getFoodIdArray.find((f) => f.id === item.foodId);
      if (!food) return acc;
      return acc + food.price * item.quantity; ///total price nemj bn
    }, 0);

    const order = await prisma.foodOrder.create({
      data: {
        totalPrice,
        status: "pending",
      },
    });

    const foodsWithOrderId = foods.map((food) => ({
      foodId: food.foodId,
      quantity: food.quantity,
      foodOrderId: order.id, //// itemnii order id-g ogj bn
    }));
    const orderItems = await prisma.foodOrderItem.createMany({
      data: foodsWithOrderId,
    });

    res.json({ order, orderItems });
  } catch (error) {
    res.send(error);
  }
};

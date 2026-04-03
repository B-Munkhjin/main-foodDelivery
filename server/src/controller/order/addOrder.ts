import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

type FoodOrder = { foodId: number; quantity: number };

type BodyType = {
  foods: FoodOrder[];
  userId: number;
};

export const addOrder = async (req: Request, res: Response) => {
  // const userId = req.user?.userId!;

  const { foods, userId }: BodyType = req.body;

  try {
    const ids = foods.map((food) => food.foodId); /// hooloo id-gaar avah.... ali hool ve gedgee medne
    const getFoodIdArray = await prisma.food.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    const totalPrice = foods.reduce((acc, curr) => {
      const food = getFoodIdArray.find((f: any) => f.id === curr.foodId);
      if (!food) return acc;
      return acc + food.price * curr.quantity;
    }, 0);

    const order = await prisma.foodOrder.create({
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
    const orderItems = await prisma.foodOrderItem.createMany({
      data: foodsWithOrderId,
    });

    res.json({ order, orderItems });
  } catch (error) {
    res.send(error);
    console.log(error);
  }
};

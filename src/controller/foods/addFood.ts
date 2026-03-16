import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFoods = async (req: Request, res: Response) => {
  const { name, foodCategoryId, price } = req.body;
  try {
    const foods = await prisma.food.create({
      data: {
        name,
        foodCategoryId,
        price,
      },
    });
    res.json({ foods });
  } catch (error) {
    res.send(error);
  }
};

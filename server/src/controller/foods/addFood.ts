import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addFoods = async (req: Request, res: Response) => {
  const { name, foodCategoryId, price, image, ingredients } = req.body;
  try {
    const foods = await prisma.food.create({
      data: {
        name,
        foodCategoryId,
        price,
        image,
        ingredients,
      },
    });
    res.json({ foods });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

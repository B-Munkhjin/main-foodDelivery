import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateFood = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, price, foodCategoryId } = req.body;
    await prisma.food.update({
      where: { id: Number(id) },
      data: { name, price, foodCategoryId },
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: "update hiigdehgu bn???" });
  }
};

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getFoodById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const food = await prisma.food.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ food });
};

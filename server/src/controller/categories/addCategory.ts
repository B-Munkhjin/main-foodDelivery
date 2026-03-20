import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  try {
    const category = await prisma.foodCategory.create({
      data: {
        name,
      },
    });

    res.json({ category });
  } catch (error) {
    res.send(error);
  }
};

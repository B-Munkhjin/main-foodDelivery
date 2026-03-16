import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    await prisma.foodCategory.update({
      where: { id: Number(id) },
      data: { name },
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: "update hiigdehgu bn???" });
  }
};

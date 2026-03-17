import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { totalPrice, status, foodOrderItems } = req.body;
    await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { totalPrice, foodOrderItems, status },
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: "update hiigdehgu bn???" });
  }
};

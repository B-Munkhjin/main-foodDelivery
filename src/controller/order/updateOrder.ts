import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updatedOrder = await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { status },
    });
    res.status(200).send(updatedOrder);
  } catch (error) {
    res.status(400).json({ error });
  }
};

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getOrder = async (req: Request, res: Response) => {
  const orders = await prisma.foodOrder.findMany();
  res.json({ orders });
};

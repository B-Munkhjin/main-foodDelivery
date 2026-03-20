import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.$transaction([
      prisma.foodOrderItem.deleteMany({
        where: { foodOrderId: Number(id) },
      }),

      prisma.foodOrder.delete({ where: { id: Number(id) } }),
    ]);

    // console.log(deleteWholeItem);

    res.status(204).send("ok");
  } catch (error) {
    console.error(error);

    res.status(400).json({ error: "ustgajij ustgana" });
  }
};

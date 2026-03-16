import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "ustgajij ustgana" });
  }
};

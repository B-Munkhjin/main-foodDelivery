import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const getUserById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await prisma.user.findFirst({
    where: {
      id: Number(id),
    },
  });

  res.json({ user });
};

import { prisma } from "../../lib/prisma";
import { Request, Response } from "express";

export const me = async (req: Request, res: Response) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user?.userId,
    },
    select: {
      email: true,
      password: true,
    },
  });

  if (!user) return res.status(400).json({ message: "user not found" });

  return res.status(200).json(user);
};

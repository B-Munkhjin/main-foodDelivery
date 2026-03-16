import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const addUser = async (req: Request, res: Response) => {
  const { email, name, phoneNumber } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phoneNumber,
      },
    });

    res.json({ user });
  } catch (error) {
    res.send(error);
  }
};

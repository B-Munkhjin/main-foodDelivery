import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { email, phoneNumber } = req.body;
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        email,
        phoneNumber,
      },
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: "update hiigdehgu bn???" });
  }
};

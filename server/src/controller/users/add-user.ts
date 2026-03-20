import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";

export const addUser = async (req: Request, res: Response) => {
  const { email, name, phoneNumber, password, address } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        phoneNumber,
        password: String(hashedPassword),
        address,
      },
    });

    res.json({ user });
  } catch (error) {
    res.send(error);
  }
};

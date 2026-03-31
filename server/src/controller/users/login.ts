import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;

  try {
    if (!secret) return;

    const userByEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!userByEmail) {
      res.status(404).json({ message: "user not found." });
      return;
    }
    const match = await bcrypt.compare(password, userByEmail.password); ///enni daraalal chuhal!!!

    if (match === true) {
      const token = jwt.sign(
        {
          data: {
            userId: userByEmail.id,
            email: userByEmail.email,
            role: userByEmail.role,
          },
        },
        secret,
        { expiresIn: "1h" },
      );
      res.status(200).send({ token });
    }
  } catch (error) {
    res.status(500).json({ message: "buruu" });
    console.error(error);
  }
};

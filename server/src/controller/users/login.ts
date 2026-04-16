import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { error } from "node:console";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const secret = process.env.SECRET;

  console.log("Нэвтрэх хүсэлт ирлээ:", email);
  try {
    if (!secret) {
      console.error("SECRET олдохгүй байна!");
      return res.status(500).json({ message: "Server SECRET missing" });
    }

    const userByEmail = await prisma.user.findUnique({ where: { email } });

    if (!userByEmail) {
      return res.status(404).json({ message: "Хэрэглэгч олдсонгүй" });
    }
    const match = await bcrypt.compare(
      password,
      userByEmail.password as string,
    );

    if (!match) {
      return res.status(401).json({ message: "Нууц үг буруу" });
    }

    const token = jwt.sign(
      { data: { userId: userByEmail.id, email: userByEmail.email } },
      secret,
      { expiresIn: "1h" },
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    console.error("БАКЕНД ДЭЭР АЛДАА ГАРЛАА:", error.message);
    return res.status(500).json({ message: error.message });
  }
};

import { Request, Response } from "express";
import { prisma } from "../../lib/prisma";
import { error } from "node:console";

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();
  res.json({ users });
  console.log(users);

  // console.log(error);
};

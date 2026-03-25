//nevtrech orh shalgalt
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

type JwtPayload = {
  data: {
    userId: number;
    email: string;
    role: "user" | "admin";
  };
};

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authorization = req.headers.authorization;

  if (!authorization) return res.send("no token");

  const accessToken = authorization.split("")[1];

  try {
    const decoded = jwt.verify(accessToken, "secret") as JwtPayload;

    req.user = decoded.data;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "aldaatai" });
  }
};

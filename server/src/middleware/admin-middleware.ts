import { NextFunction, Request, Response } from "express";

export const adminMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (user?.role === "admin") {
    next();
  } else {
    return res.status(400).json({
      message: "admin",
    });
  }
};

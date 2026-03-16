import express, { Request, Response } from "express";
import { prisma } from "./lib/prisma";
import dotenv from "dotenv";
import usersRouter from "./router/users.router";
import foodsRouter from "./router/foods.router";
import categoriesRouter from "./router/categories.router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", usersRouter);

////categories

app.use("/categories", categoriesRouter);

////////////////food

app.use("/foods", foodsRouter);

////////////order

app.get("/orders", async (req: Request, res: Response) => {
  const orders = await prisma.foodOrder.findMany();
  res.json({ orders });
});

app.post("/orders", async (req: Request, res: Response) => {
  const { totalPrice, status, foodOrderItems } = req.body;
  try {
    const foods = await prisma.foodOrder.create({
      data: {
        totalPrice,
        foodOrderItems,
        status,
      },
    });
    res.json({ foods });
  } catch (error) {
    res.send(error);
  }
});
app.delete("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.foodOrder.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: "ustgajij ustgana" });
  }
});

app.put("/orders/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { totalPrice, status, foodOrderItems } = req.body;
    await prisma.foodOrder.update({
      where: { id: Number(id) },
      data: { totalPrice, foodOrderItems, status },
    });
    res.status(200).send();
  } catch (error) {
    res.status(400).json({ error: "update hiigdehgu bn???" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

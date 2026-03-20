import express from "express";
import dotenv from "dotenv";
import usersRouter from "./router/users.router";
import foodsRouter from "./router/foods.router";
import categoriesRouter from "./router/categories.router";
import orderRouter from "./router/order.router";

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

app.use("/orders", orderRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

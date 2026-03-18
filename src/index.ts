import express from "express";
import dotenv from "dotenv";
import usersRouter from "./router/users.router";
import foodsRouter from "./router/foods.router";
import categoriesRouter from "./router/categories.router";
import orderRouter from "./router/order.router";
// import authRoutes from "./router/auth";
// import protectedRoutes from "./router/ptotected";

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

// app.use("/auth", authRoutes);
// app.use("/api", protectedRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

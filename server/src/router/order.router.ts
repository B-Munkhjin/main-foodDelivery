import express from "express";
import { getOrder } from "../controller/order/getOrder";
import { addOrder } from "../controller/order/addOrder";
import { deleteOrder } from "../controller/order/deleteOrder";
import { updateOrder } from "../controller/order/updateOrder";
import { getOrderById } from "../controller/order/getOrderById";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";

const router = express.Router();

router.get("/", getOrder);

router.get("/:id", getOrderById);

router.post("/", addOrder);

router.delete("/:id", deleteOrder);

router.patch("/:id", updateOrder);

export default router;

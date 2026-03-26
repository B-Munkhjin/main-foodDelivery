import express from "express";
import { updateCategory } from "../controller/categories/updateCategory";
import { deleteCategory } from "../controller/categories/deleteCategory";
import { addCategory } from "../controller/categories/addCategory";
import { getCategories } from "../controller/categories/getCategories";
import { getCategoriesById } from "../controller/categories/getCategoriesById";
import { authMiddleware } from "../middleware/auth-middleware";
import { adminMiddleware } from "../middleware/admin-middleware";

const router = express();

router.get("/", getCategories);

router.get("/:id", authMiddleware, getCategoriesById);

router.post("/", addCategory);

router.delete("/:id", authMiddleware, adminMiddleware, deleteCategory);

router.put("/:id", authMiddleware, adminMiddleware, updateCategory);

export default router;

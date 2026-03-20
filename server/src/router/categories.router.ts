import express from "express";
import { updateCategory } from "../controller/categories/updateCategory";
import { deleteCategory } from "../controller/categories/deleteCategory";
import { addCategory } from "../controller/categories/addCategory";
import { getCategories } from "../controller/categories/getCategories";
import { getCategoriesById } from "../controller/categories/getCategoriesById";

const router = express();

router.get("/", getCategories);

router.get("/:id", getCategoriesById);

router.post("/", addCategory);

router.delete("/:id", deleteCategory);

router.put("/:id", updateCategory);

export default router;

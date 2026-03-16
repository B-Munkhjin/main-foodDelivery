import express from "express";
import { deleteFood } from "../controller/foods/deleteFood";
import { updateFood } from "../controller/foods/updateFood";
import { addFoods } from "../controller/foods/addFood";
import { getFoods } from "../controller/foods/getFoods";
import { getFoodById } from "../controller/foods/getFoodById";

const router = express();

router.get("/", getFoods);

router.get("/:id", getFoodById);

router.post("/", addFoods);

router.delete("/:id", deleteFood);

router.put("/:id", updateFood);

export default router;

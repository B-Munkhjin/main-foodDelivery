"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const deleteFood_1 = require("../controller/foods/deleteFood");
const updateFood_1 = require("../controller/foods/updateFood");
const addFood_1 = require("../controller/foods/addFood");
const getFoods_1 = require("../controller/foods/getFoods");
const getFoodById_1 = require("../controller/foods/getFoodById");
const router = (0, express_1.default)();
router.get("/", getFoods_1.getFoods);
router.get("/:id", getFoodById_1.getFoodById);
router.post("/", addFood_1.addFoods);
router.delete("/:id", deleteFood_1.deleteFood);
router.put("/:id", updateFood_1.updateFood);
exports.default = router;

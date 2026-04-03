"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const updateCategory_1 = require("../controller/categories/updateCategory");
const deleteCategory_1 = require("../controller/categories/deleteCategory");
const addCategory_1 = require("../controller/categories/addCategory");
const getCategories_1 = require("../controller/categories/getCategories");
const getCategoriesById_1 = require("../controller/categories/getCategoriesById");
const router = (0, express_1.default)();
router.get("/", getCategories_1.getCategories);
router.get("/:id", getCategoriesById_1.getCategoriesById);
router.post("/", addCategory_1.addCategory);
router.delete("/:id", deleteCategory_1.deleteCategory);
router.put("/:id", updateCategory_1.updateCategory);
exports.default = router;

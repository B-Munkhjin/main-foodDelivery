"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const getOrder_1 = require("../controller/order/getOrder");
const addOrder_1 = require("../controller/order/addOrder");
const deleteOrder_1 = require("../controller/order/deleteOrder");
const updateOrder_1 = require("../controller/order/updateOrder");
const getOrderById_1 = require("../controller/order/getOrderById");
const router = express_1.default.Router();
router.get("/", getOrder_1.getOrder);
router.get("/:id", getOrderById_1.getOrderById);
router.post("/", addOrder_1.addOrder);
router.delete("/:id", deleteOrder_1.deleteOrder);
router.patch("/:id", updateOrder_1.updateOrder);
exports.default = router;

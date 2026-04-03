"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_router_1 = __importDefault(require("./router/users.router"));
const foods_router_1 = __importDefault(require("./router/foods.router"));
const categories_router_1 = __importDefault(require("./router/categories.router"));
const order_router_1 = __importDefault(require("./router/order.router"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/users", users_router_1.default);
////categories
app.use("/categories", categories_router_1.default);
////////////////food
app.use("/foods", foods_router_1.default);
////////////order
app.use("/orders", order_router_1.default);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

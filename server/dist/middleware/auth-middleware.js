"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
//nevtrech orh shalgalt
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization)
        return res.send("no token");
    const accessToken = authorization.split("")[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(accessToken, "secret");
        req.user = decoded.data;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: "aldaatai" });
    }
};
exports.authMiddleware = authMiddleware;

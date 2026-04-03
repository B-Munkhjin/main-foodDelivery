"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminMiddleware = void 0;
const adminMiddleware = (req, res, next) => {
    const user = req.user;
    if (user?.role === "admin") {
        next();
    }
    else {
        return res.status(400).json({
            message: "admin",
        });
    }
};
exports.adminMiddleware = adminMiddleware;

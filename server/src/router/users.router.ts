import express from "express";
import { getUsers } from "../controller/users/get-users";
import { getUserById } from "../controller/users/get-userById";
import { addUser } from "../controller/users/add-user";
import { updateUser } from "../controller/users/update-user";
import { deleteUser } from "../controller/users/delete-user";
import { login } from "../controller/users/login";
import { adminMiddleware } from "../middleware/admin-middleware";
import { authMiddleware } from "../middleware/auth-middleware";

const router = express();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.post("/", addUser);

router.delete("/:id", deleteUser);

router.put("/:id", updateUser);

router.post("/login", login);

export default router;

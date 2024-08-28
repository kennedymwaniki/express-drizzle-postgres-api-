import express from "express";

import {
  getUsers,
  getUserById,
  createUser,
  login,
  deleteUser,
  logoutUser,
  registerUser,
  getUserProfile,
} from "../controller/userController";
const router = express.Router();

router.get("/users", getUsers);
//or you can do router.route("/users").get(getUsers)

router.get("/users/:id", getUserById);
//or you can do router.route("/users/:id").get(getUsers)

router.post("/users", createUser);

router.get("/auth/login", login);

router.post("/auth/register", registerUser);

export default router;

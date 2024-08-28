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

//delete user
router.delete("/users/:id", deleteUser);

//or you can do router.route("/users/:id").get(getUsers)

router.post("/users", createUser);

router.post("/users/auth/login", login);
router.post("/users/auth/logout", logoutUser);
router.get("/users/profile", getUserProfile);

router.post("/auth/register", registerUser);

export default router;

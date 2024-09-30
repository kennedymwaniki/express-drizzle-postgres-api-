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
const userRouter = express.Router();

userRouter.get("/users", getUsers);
//or you can do userRouter.route("/users").get(getUsers)

userRouter.get("/users/:id", getUserById);

//delete user
userRouter.delete("/users/:id", deleteUser);

//or you can do userRouter.route("/users/:id").get(getUsers)

userRouter.post("/users", createUser);

userRouter.post("/users/auth/login", login);
userRouter.post("/users/auth/logout", logoutUser);
userRouter.get("/users/profile", getUserProfile);

userRouter.post("/auth/register", registerUser);

export default userRouter;

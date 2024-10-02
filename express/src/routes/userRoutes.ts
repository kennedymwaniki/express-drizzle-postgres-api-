import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  login,
  deleteUser,
  logout,
  getUserProfile,
  register,
} from "../controller/userController";
import { admin, protect } from "../middleware/authBearer";
const userRouter = express.Router();

userRouter.get("/users", getUsers);
//or you can do userRouter.route("/users").get(getUsers)

userRouter.get("/users/:id", protect, getUserById);

//delete user
userRouter.delete("/users/:id", deleteUser);

//or you can do userRouter.route("/users/:id").get(getUsers)

userRouter.post("/users/createuser", createUser);

userRouter.post("/users/auth/login", login);
userRouter.post("/users/logout", logout);
userRouter.post("/users/register", register);
userRouter.get("/users/profile", getUserProfile);

export default userRouter;

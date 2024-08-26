import express from "express";

import {
  createUser,
  getUserById,
  getUsers,
} from "../controller/userController";
const router = express.Router();

router.get("/users", getUsers);
//or you can do router.route("/users").get(getUsers)

router.get("/users/:id", getUserById);
//or you can do router.route("/users/:id").get(getUsers)

router.post("/users", createUser);

export default router;

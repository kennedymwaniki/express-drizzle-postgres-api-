import db from "../drizzle/db";
import { UsersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

import asyncHandler from "../middleware/asyncHandler";
//

//desc Auth user & get token
//route /api/auth/login
const login = asyncHandler(async (req: any, res: any) => {
  res.send("hello auth user");
});

//@desc register a user
//route /api/auth/register
const registerUser = asyncHandler(async (res: any, req: any) => {
  res.send("hello registered");
});

//@desc logout
//route api/auth/logout
//clear cookie
const logoutUser = asyncHandler(async (res: any, req: any) => {
  res.send("you are logout");
});

//@desc user profile
const getUserProfile = asyncHandler(async (res: any, req: any) => {
  res.send("user profile");
});

//@desc Fetches users
//@route /api/users
const getUsers = asyncHandler(async (req: any, res: any) => {
  const users = await db.query.UsersTable.findMany();
  res.json(users);
});

//@desc Fetches single user
//@route api/users/:id
const getUserById = asyncHandler(async (req: any, res: any) => {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userId, req.params.id),
  });
  if (user) {
    return res.json(user);
  } else {
    res.status(404);
    throw new Error(`User not found`);
  }
});

//@desc create a new user
const createUser = asyncHandler(async (req: any, res: any) => {
  const user = req.body;
  const User = await db.insert(UsersTable).values(user);
  return res.status(201).json({ message: "user creation successful", User });
});

//@desc delete user
//
const deleteUser = asyncHandler(async (req: any, res: any) => {
  await db.delete(UsersTable).where(eq(UsersTable.userId, req.params.id));
  res.status(201);
});
export {
  getUsers,
  getUserById,
  createUser,
  login,
  deleteUser,
  logoutUser,
  registerUser,
  getUserProfile,
};

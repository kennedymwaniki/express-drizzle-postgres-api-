import jwt from "jsonwebtoken";
import db from "../drizzle/db";
import { UsersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler";
import generateCookie from "../utils/generatecookie";
//desc Auth user & get token
//route /api/auth/login
const login = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  // temporary usertype

  const user: any = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email),
  });

  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const isValid = await bcrypt.compare(password, user.password as string);
  if (user && isValid) {
    generateCookie(user, res);
    res.json({
      id: user.userId,
      email: user.email,
      role: user.role,
      name: user.fullName,
    });
  } else {
    // res.json({ msg: "NO such user found" });
    res.status(401);
    throw new Error("invalid password or username");
  }
});

//@desc logout
//route api/auth/logout
//clear cookie
const logout = asyncHandler(async (req: any, res: any) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ Message: "logged out successfully" });
});

//@desc register a user
//route /api/auth/register
const register = asyncHandler(async (req: any, res: any) => {
  const USER = req.body;
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, USER.email),
  });
  if (user) {
    res.status(400);
    throw new Error("A user with such an email already exists");
  }
  const hashedPassword = await bcrypt.hash(USER.password, 10);
  USER.password = hashedPassword;
  const User: any = await db.insert(UsersTable).values(USER);
  if (User) {
    generateCookie(User, res);
    res.json({
      id: User.userId,
      email: User.email,
      role: User.role,
      name: User.fullName,
    });
    res.status(200).json({ Message: "Registered and loggedin successfully" });
  } else {
    res.status(400);
    throw new Error("invalid user data");
  }
});

// @desc users/createuser
//@desc create a new user
const createUser = asyncHandler(async (req: any, res: any) => {
  const user = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  const User = await db.insert(UsersTable).values(user);
  return res.status(201).json({ message: "user creation successful", User });
});

//@desc user profile
const getUserProfile = asyncHandler(async (req: any, res: any) => {
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

//!@desc delete user
//
const deleteUser = asyncHandler(async (req: any, res: any) => {
  const user = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.userId, req.params.id),
  });
  if (user) {
    const User = await db
      .delete(UsersTable)
      .where(eq(UsersTable.userId, req.params.id));
    return res.status(201).json({ message: "user deletion successful", User });
  } else {
    res.status(404);
    throw new Error(`User not found`);
  }
});
export {
  getUsers,
  getUserById,
  createUser,
  login,
  deleteUser,
  logout,
  register,
  getUserProfile,
};

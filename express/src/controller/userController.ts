import jwt from "jsonwebtoken";
import db from "../drizzle/db";
import { UsersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import asyncHandler from "../middleware/asyncHandler";

//desc Auth user & get token
//route /api/auth/login
const login = asyncHandler(async (req: any, res: any) => {
  const { email, password } = req.body;
  // temporary usertype

  const user: any = await db.query.UsersTable.findFirst({
    where: eq(UsersTable.email, email),
  });

  const isValid = await bcrypt.compare(password, user.password as string);
  if (user && isValid) {
    // generate jwt token
    const payload = {
      id: user.userId,
      role: user.role,
      // Session to expire after 3 hours
      exp: Math.floor(Date.now() / 1000) + 60 * 180,
    };
    const SECRET = process.env.secret!;
    const token = jwt.sign(payload, SECRET);
    // set jwt as http only cookie

    res.cookie("jwt", token, {
      httpOnly: true,
      // if it is not in production it is in development mode
      secure: process.env.NODE_ENV! !== "production",
      sameSite: "strict",
      maxAge: 60 * 180 * 1000,
    });
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

//@desc register a user
//route /api/auth/register
const registerUser = asyncHandler(async (req: any, res: any) => {
  res.send("you are registered");
});

//@desc logout
//route api/auth/logout
//clear cookie
const logoutUser = asyncHandler(async (req: any, res: any) => {
  res.send("you are logged out");
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

//@desc create a new user
const createUser = asyncHandler(async (req: any, res: any) => {
  const user = req.body;
  // hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);
  user.password = hashedPassword;

  const User = await db.insert(UsersTable).values(user);
  return res.status(201).json({ message: "user creation successful", User });
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
  logoutUser,
  registerUser,
  getUserProfile,
};

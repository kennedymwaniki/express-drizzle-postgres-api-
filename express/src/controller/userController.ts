import db from "../drizzle/db";
import { UsersTable } from "../drizzle/schema";
import { eq } from "drizzle-orm";

import asyncHandler from "../middleware/asyncHandler";
//

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
  return res.status(200).json({ message: "user creation successful", User });
});

export { getUsers, getUserById, createUser };

import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler";
import { UsersTable } from "../drizzle/schema";
import db from "../drizzle/db";
import { eq } from "drizzle-orm";

interface JwtPayload {
  id: number;
  role: string;
  exp: number;
}

const protect = asyncHandler(async (req: any, res: any, next: any) => {
  let token;
  token = req.cookies.jwt;
  console.log("Token: ", token);

  if (token) {
    try {
      const decoded = jwt.verify(
        token as string,
        process.env.secret!
      ) as JwtPayload;
      req.user = await db.query.UsersTable.findFirst({
        where: eq(UsersTable.userId, decoded.id),
      });
      next();
    } catch (error) {
      res.status(401);
      throw new Error("NOt authorized, failed");
    }
  } else {
    res.status(401);
    throw new Error("NOt authorized, token required");
  }
});

// admin middleware
const admin = (req: any, res: any, next: any) => {
  if (req.user && req.user.admin) {
    next();
  } else {
    res.status(401);
    throw new Error("NOt authorized, token required");
  }
};

export { protect, admin };

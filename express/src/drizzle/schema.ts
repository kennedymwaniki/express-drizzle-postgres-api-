// import { Many, relations } from "drizzle-orm";
import {
  date,
  integer,
  pgEnum,
  pgTable,
  PrimaryKey,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["user", "admin", "both"]);
export const UsersTable = pgTable("users", {
  userId: serial("user_id").primaryKey(),
  fullName: varchar("full_name").notNull(),
  image: varchar("imageUrl"),
  email: varchar("email").unique().notNull(),
  password: varchar("password"),
  contactPhone: varchar("contact_phone"),
  address: text("address"),
  role: roleEnum("role").default("user").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
// DATABASEURL= postgresql://postgres:3784@localhost:5432/express

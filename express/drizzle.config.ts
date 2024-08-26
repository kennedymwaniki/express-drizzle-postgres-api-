import "dotenv/config";
import { defineConfig } from "drizzle-kit";

console.log("DATABASEURL IN DRIZZLE CONFIG:", process.env.DATABASEURL!);

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASEURL as string,
  },
  verbose: true,
  strict: true,
});

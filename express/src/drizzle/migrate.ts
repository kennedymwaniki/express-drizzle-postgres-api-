import "dotenv";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import db, { client } from "./db";

console.log("DATABASEURL IN MIGRATE.TS:", process.env.DATABASEURL as string);
async function migration() {
  await migrate(db, { migrationsFolder: __dirname + "/migrations" });
  await client.end();
  console.log("======== Migrations ended ========");
  process.exit(0);
}

migration();

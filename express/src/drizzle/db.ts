import { config } from "dotenv";
import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

config({ path: ".env" });
console.log("DATABASEURL IN DB.TS", process.env.DATABASEURL!);

export const client = new Client({
  connectionString: process.env.DATABASEURL!,
});

const main = async () => {
  await client.connect();
};
main();

const db = drizzle(client, { schema, logger: true });
export default db;

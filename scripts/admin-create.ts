import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { hash } from "@node-rs/argon2";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { adminUsers } from "../src/lib/db/schema";
import { eq } from "drizzle-orm";
import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const rl = readline.createInterface({ input, output });

  try {
    const email = (await rl.question("Admin Email: ")).trim().toLowerCase();
    const name = (await rl.question("Admin Name: ")).trim();
    const password = (await rl.question("Admin Password: ")).trim();

    if (!email || !password || !name) {
      console.error("All fields are required.");
      process.exit(1);
    }

    const sql = neon(dbUrl);
    const db = drizzle(sql);

    const [existing] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email));

    if (existing) {
      console.error(`User with email ${email} already exists.`);
      process.exit(1);
    }

    const passwordHash = await hash(password);
    await db.insert(adminUsers).values({
      email,
      name,
      passwordHash,
    });

    console.log(`✓ Admin user ${email} created successfully.`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

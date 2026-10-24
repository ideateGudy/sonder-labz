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
    const email = (await rl.question("Admin Email to Reset: ")).trim().toLowerCase();
    const newPassword = (await rl.question("New Password: ")).trim();

    if (!email || !newPassword) {
      console.error("Email and new password are required.");
      process.exit(1);
    }

    const sql = neon(dbUrl);
    const db = drizzle(sql);

    const [existing] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, email));

    if (!existing) {
      console.error(`User with email ${email} not found.`);
      process.exit(1);
    }

    const passwordHash = await hash(newPassword);
    await db
      .update(adminUsers)
      .set({ passwordHash })
      .where(eq(adminUsers.id, existing.id));

    console.log(`✓ Password for ${email} has been reset.`);
  } finally {
    rl.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

"use server";

import { verify } from "@node-rs/argon2";
import { redirect } from "next/navigation";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { adminUsers } from "@/lib/db/schema";
import { createSession } from "@/lib/auth/session";
import { checkRateLimit } from "@/lib/rate-limit";

const schema = z.object({
  email: z.string().email().max(254),
  password: z.string().min(1).max(200),
});

const DUMMY_HASH =
  process.env.DUMMY_PASSWORD_HASH ||
  "$argon2id$v=19$m=65536,t=3,p=4$anFia2Fza2pmYXM$dGhpcyBpcyBhIGR1bW15IGhhc2ggZm9yIHRpbWluZyBwcm90ZWN0aW9u";

export async function login(_: unknown, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { error: "Enter a valid email and password." };
  }

  const limited = await checkRateLimit("login", parsed.data.email);
  if (!limited.ok) {
    return { error: "Too many attempts. Try again in a few minutes." };
  }

  if (!db) {
    return { error: "Database not configured. Please set DATABASE_URL." };
  }

  try {
    const [user] = await db
      .select()
      .from(adminUsers)
      .where(eq(adminUsers.email, parsed.data.email.toLowerCase()));

    const passwordHashToCompare = user?.passwordHash ?? DUMMY_HASH;
    const ok = await verify(passwordHashToCompare, parsed.data.password);

    if (!user || !ok) {
      return { error: "Email or password is incorrect." };
    }

    // Update last login
    await db
      .update(adminUsers)
      .set({ lastLoginAt: new Date() })
      .where(eq(adminUsers.id, user.id));

    await createSession(user.id);
  } catch (err) {
    console.error("Login verification error:", err);
    return { error: "Email or password is incorrect." };
  }

  redirect("/admin");
}

import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { createHash, randomBytes } from "node:crypto";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { sessions, adminUsers } from "@/lib/db/schema";

const COOKIE = "sl_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days sliding
const hash = (t: string) => createHash("sha256").update(t).digest("hex");

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const expiresAt = new Date(Date.now() + TTL_MS);

  if (db) {
    await db.insert(sessions).values({
      userId,
      tokenHash: hash(token),
      expiresAt,
    });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

export const getSession = cache(async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token || !db) return null;

  try {
    const [row] = await db
      .select({
        id: sessions.id,
        expiresAt: sessions.expiresAt,
        user: {
          id: adminUsers.id,
          email: adminUsers.email,
          name: adminUsers.name,
        },
      })
      .from(sessions)
      .innerJoin(adminUsers, eq(adminUsers.id, sessions.userId))
      .where(eq(sessions.tokenHash, hash(token)));

    if (!row || row.expiresAt < new Date()) {
      return null;
    }

    return row;
  } catch (err) {
    console.error("Error retrieving session:", err);
    return null;
  }
});

/**
 * Call at top of every admin layout, page, Server Action and Route Handler.
 */
export async function requireAdmin() {
  const s = await getSession();
  if (!s) {
    redirect("/admin/login");
  }
  return s.user;
}

export async function destroySession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;

  if (token && db) {
    try {
      await db.delete(sessions).where(eq(sessions.tokenHash, hash(token)));
    } catch (err) {
      console.error("Failed to delete session from db:", err);
    }
  }

  cookieStore.delete(COOKIE);
}

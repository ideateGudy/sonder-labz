"use server";

import { hash, verify } from "@node-rs/argon2";
import { requireAdmin, destroySession } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { adminUsers, sessions } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { redirect } from "next/navigation";

const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required."),
  newPassword: z.string().min(8, "New password must be at least 8 characters.").max(128),
  confirmPassword: z.string().min(1, "Please confirm your new password."),
});

export async function changeOwnPassword(_: unknown, formData: FormData) {
  const user = await requireAdmin();

  const raw = {
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = changePasswordSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: parsed.error.issues[0]?.message || "Invalid input." };
  }

  if (parsed.data.newPassword !== parsed.data.confirmPassword) {
    return { ok: false, error: "New password and confirmation do not match." };
  }

  if (!db) {
    return { ok: false, error: "Database not connected." };
  }

  const [dbUser] = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.id, user.id));

  if (!dbUser) {
    return { ok: false, error: "User record not found." };
  }

  const currentPasswordMatches = await verify(dbUser.passwordHash, parsed.data.currentPassword);
  if (!currentPasswordMatches) {
    return { ok: false, error: "The current password you entered is incorrect." };
  }

  const newHash = await hash(parsed.data.newPassword);

  // Update password and invalidate all sessions for security
  await db
    .update(adminUsers)
    .set({ passwordHash: newHash })
    .where(eq(adminUsers.id, user.id));

  await db.delete(sessions).where(eq(sessions.userId, user.id));

  await destroySession();
  redirect("/admin/login");
}

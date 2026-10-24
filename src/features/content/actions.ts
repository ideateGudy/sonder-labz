"use server";

import { revalidateTag, revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { contentSchemas, type SectionKey } from "./schemas";

export async function saveContent(key: SectionKey, input: unknown) {
  const user = await requireAdmin(); // 1. Authorise

  const schema = contentSchemas[key];
  if (!schema) {
    return { ok: false as const, message: "Invalid section key." };
  }

  const parsed = schema.safeParse(input); // 2. Validate
  if (!parsed.success) {
    return {
      ok: false as const,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check all fields and conform to character limits.",
    };
  }

  if (db) {
    await db
      .insert(contentBlocks)
      .values({
        sectionKey: key,
        data: parsed.data,
        updatedBy: user.id,
      })
      .onConflictDoUpdate({
        target: contentBlocks.sectionKey,
        set: {
          data: parsed.data,
          updatedBy: user.id,
          updatedAt: new Date(),
        },
      });
  }

  // 3. Revalidate affected pages
  revalidatePath("/", "layout");
  return { ok: true as const, message: "Section content updated successfully." };
}

"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

const serviceSchema = z.object({
  title: z.string().min(2).max(100),
  summary: z.string().min(10).max(500),
  platform: z.enum(["web", "mobile", "desktop"]),
  details: z.object({
    deliverables: z.array(z.string()),
    typicalStack: z.array(z.string()),
  }),
});

export async function saveService(id: string, input: unknown) {
  await requireAdmin();

  const parsed = serviceSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  if (db) {
    await db
      .update(services)
      .set({
        title: parsed.data.title,
        summary: parsed.data.summary,
        platform: parsed.data.platform,
        details: parsed.data.details,
      })
      .where(eq(services.id, id));
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

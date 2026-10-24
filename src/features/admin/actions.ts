"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/session";
import { db } from "@/lib/db";
import { projects, teamMembers, services, messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { z } from "zod";

// --- Projects CRUD ---
const projectSchema = z.object({
  title: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  summary: z.string().min(10).max(300),
  description: z.string().min(20).max(5000),
  platforms: z.array(z.string()).min(1),
  role: z.string().min(2).max(100),
  stack: z.array(z.string()).min(1),
  status: z.enum(["draft", "published"]),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional().or(z.literal("")),
  repoUrl: z.string().url().optional().or(z.literal("")),
});

export async function saveProject(id: string | null, input: unknown) {
  await requireAdmin();

  const parsed = projectSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  if (db) {
    if (id) {
      await db
        .update(projects)
        .set({
          ...parsed.data,
          liveUrl: parsed.data.liveUrl || null,
          repoUrl: parsed.data.repoUrl || null,
          updatedAt: new Date(),
        })
        .where(eq(projects.id, id));
    } else {
      await db.insert(projects).values({
        ...parsed.data,
        liveUrl: parsed.data.liveUrl || null,
        repoUrl: parsed.data.repoUrl || null,
      });
    }
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteProject(id: string) {
  await requireAdmin();
  if (db) {
    await db.delete(projects).where(eq(projects.id, id));
  }
  revalidatePath("/", "layout");
  return { ok: true };
}

// --- Team CRUD ---
const teamSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.string().min(2).max(80),
  bio: z.string().min(10).max(500),
  website: z.string().url().optional().or(z.literal("")),
  github: z.string().url().optional().or(z.literal("")),
  photoUrl: z.string().url().optional().or(z.literal("")),
  visible: z.boolean().default(true),
});

export async function saveTeamMember(id: string | null, input: unknown) {
  await requireAdmin();

  const parsed = teamSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  const links = {
    website: parsed.data.website || undefined,
    github: parsed.data.github || undefined,
  };

  if (db) {
    if (id) {
      await db
        .update(teamMembers)
        .set({
          name: parsed.data.name,
          role: parsed.data.role,
          bio: parsed.data.bio,
          links,
          photoUrl: parsed.data.photoUrl || null,
          visible: parsed.data.visible,
        })
        .where(eq(teamMembers.id, id));
    } else {
      await db.insert(teamMembers).values({
        name: parsed.data.name,
        role: parsed.data.role,
        bio: parsed.data.bio,
        links,
        photoUrl: parsed.data.photoUrl || null,
        visible: parsed.data.visible,
      });
    }
  }

  revalidatePath("/", "layout");
  return { ok: true };
}

export async function deleteTeamMember(id: string) {
  await requireAdmin();
  if (db) {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }
  revalidatePath("/", "layout");
  return { ok: true };
}

// --- Messages Inbox Actions ---
export async function updateMessageStatus(id: string, status: "new" | "read" | "archived") {
  await requireAdmin();
  if (db) {
    await db.update(messages).set({ status }).where(eq(messages.id, id));
  }
  revalidatePath("/admin/messages");
  return { ok: true };
}

export async function deleteMessage(id: string) {
  await requireAdmin();
  if (db) {
    await db.delete(messages).where(eq(messages.id, id));
  }
  revalidatePath("/admin/messages");
  return { ok: true };
}

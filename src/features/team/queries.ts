import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { teamMembers } from "@/lib/db/schema";

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  bio: string;
  links: {
    website?: string;
    github?: string;
    linkedin?: string;
    x?: string;
  };
  photoUrl?: string | null;
  visible: boolean;
  sortOrder: number;
}

export const fallbackTeamMembers: TeamMemberItem[] = [
  {
    id: "lead-dev",
    name: "dev.ideategudy.tech",
    role: "Lead Developer",
    bio: "Systems architect and lead engineer building fullstack web platforms, mobile runtimes, and native desktop software.",
    links: {
      website: "https://dev.ideategudy.tech",
      github: "https://github.com",
    },
    visible: true,
    sortOrder: 1,
  },
];

export async function getTeamMembers(): Promise<TeamMemberItem[]> {
  if (!db) {
    return fallbackTeamMembers;
  }

  try {
    const rows = await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.visible, true))
      .orderBy(teamMembers.sortOrder);

    if (!rows || rows.length === 0) {
      return fallbackTeamMembers;
    }

    return rows.map((r: any) => ({
      ...r,
      links: (r.links as any) || {},
    }));
  } catch (err) {
    console.error("Failed to query team members, using fallback:", err);
    return fallbackTeamMembers;
  }
}

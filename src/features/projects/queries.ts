import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { projects } from "@/lib/db/schema";

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  description: string;
  platforms: string[];
  role: string;
  stack: string[];
  status: string;
  featured: boolean;
  sortOrder: number;
  liveUrl?: string | null;
  repoUrl?: string | null;
  publishedAt?: Date | null;
}

export const fallbackProjects: ProjectItem[] = [
  {
    id: "p1",
    slug: "realtime-telemetry-engine",
    title: "Realtime Telemetry & Logistics Suite",
    summary:
      "Sub-millisecond data synchronization platform for high-throughput sensor fleets.",
    description:
      "Engineered an enterprise telemetry hub tracking over 50,000 concurrent IoT edge devices. Features dynamic dashboarding, offline command caching, and end-to-end cryptographic verification.",
    platforms: ["web", "desktop"],
    role: "Fullstack Architecture & Core System",
    stack: ["Next.js", "TypeScript", "Rust / Tauri", "PostgreSQL", "WebSocket"],
    status: "published",
    featured: true,
    sortOrder: 1,
    liveUrl: "https://dev.ideategudy.tech",
    repoUrl: null,
  },
  {
    id: "p2",
    slug: "cross-platform-field-companion",
    title: "Field Operations Companion",
    summary:
      "Offline-first mobile application providing real-time synchronization for distributed technicians.",
    description:
      "Built for unstable connectivity environments. Implements local SQLite persistence with automatic conflict-free delta sync once network coverage is restored.",
    platforms: ["mobile"],
    role: "Mobile App Development",
    stack: ["React Native", "Expo", "TypeScript", "SQLite", "Node.js"],
    status: "published",
    featured: true,
    sortOrder: 2,
    liveUrl: null,
    repoUrl: null,
  },
  {
    id: "p3",
    slug: "fintech-reconciliation-portal",
    title: "Multi-Currency Settlement Engine",
    summary:
      "Automated financial transaction reconciliation and anomaly detection platform.",
    description:
      "Secure web portal handling high-volume ledger audits, automated dispute resolution flows, and granular role-based compliance reporting.",
    platforms: ["web"],
    role: "Backend & Web Interface",
    stack: ["Next.js", "PostgreSQL", "Tailwind CSS", "Zod", "Server Actions"],
    status: "published",
    featured: true,
    sortOrder: 3,
    liveUrl: null,
    repoUrl: null,
  },
];

export async function getProjects(options?: {
  platform?: string;
  featuredOnly?: boolean;
}): Promise<ProjectItem[]> {
  if (!db) {
    let result = fallbackProjects.filter((p) => p.status === "published");
    if (options?.featuredOnly) {
      result = result.filter((p) => p.featured);
    }
    if (options?.platform && options.platform !== "all") {
      result = result.filter((p) => p.platforms.includes(options.platform!));
    }
    return result;
  }

  try {
    const rows = await db
      .select()
      .from(projects)
      .where(eq(projects.status, "published"))
      .orderBy(projects.sortOrder);

    let result = rows as ProjectItem[];

    if (options?.featuredOnly) {
      result = result.filter((p) => p.featured);
    }
    if (options?.platform && options.platform !== "all") {
      result = result.filter((p) => p.platforms.includes(options.platform!));
    }

    return result.length > 0 ? result : fallbackProjects;
  } catch (err) {
    console.error("Failed to query projects, using fallback:", err);
    return fallbackProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectItem | null> {
  if (!db) {
    const found = fallbackProjects.find(
      (p) => p.slug === slug && p.status === "published"
    );
    return found || null;
  }

  try {
    const [row] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug));

    if (!row || row.status !== "published") {
      return null;
    }

    return row as ProjectItem;
  } catch (err) {
    console.error("Failed to fetch project by slug:", err);
    const found = fallbackProjects.find((p) => p.slug === slug);
    return found || null;
  }
}

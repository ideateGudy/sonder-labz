import "server-only";
import { eq, desc } from "drizzle-orm";
import { db } from "@/lib/db";
import { services } from "@/lib/db/schema";

export interface ServiceDetail {
  deliverables?: string[];
  typicalStack?: string[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  details: ServiceDetail;
  platform: string;
  sortOrder: number;
}

export const fallbackServices: ServiceItem[] = [
  {
    id: "web",
    slug: "web-applications",
    title: "Web Applications",
    summary:
      "Fullstack web software built with Next.js, TypeScript, robust databases, and zero-compromise UX.",
    platform: "web",
    sortOrder: 1,
    details: {
      deliverables: [
        "End-to-end fullstack architecture",
        "High performance Server Components & APIs",
        "Responsive mobile-first layouts",
        "Automated tests & CI/CD pipeline",
      ],
      typicalStack: ["Next.js", "React", "TypeScript", "PostgreSQL", "Tailwind CSS"],
    },
  },
  {
    id: "mobile",
    slug: "mobile-applications",
    title: "Mobile Applications",
    summary:
      "Smooth, native-feeling iOS and Android apps engineered for speed, offline reliability, and intuitive gestures.",
    platform: "mobile",
    sortOrder: 2,
    details: {
      deliverables: [
        "Cross-platform iOS and Android builds",
        "Offline-first local caching",
        "Push notification systems",
        "App Store & Google Play publishing",
      ],
      typicalStack: ["React Native", "Expo", "TypeScript", "SQLite", "Native Modules"],
    },
  },
  {
    id: "desktop",
    slug: "desktop-applications",
    title: "Desktop Applications",
    summary:
      "Native desktop software for macOS, Windows, and Linux that handles complex workflows, file systems, and hardware peripherals.",
    platform: "desktop",
    sortOrder: 3,
    details: {
      deliverables: [
        "Cross-platform desktop binaries",
        "Native system tray & deep OS integrations",
        "Auto-updating and code signing",
        "High-throughput local compute",
      ],
      typicalStack: ["Tauri", "Rust", "TypeScript", "Next.js / Webview"],
    },
  },
];

export async function getServices(): Promise<ServiceItem[]> {
  if (!db) {
    return fallbackServices;
  }

  try {
    const rows = await db
      .select()
      .from(services)
      .orderBy(services.sortOrder);

    if (!rows || rows.length === 0) {
      return fallbackServices;
    }

    return rows.map((r: any) => ({
      ...r,
      details: (r.details as ServiceDetail) || {},
    }));
  } catch (err) {
    console.error("Failed to query services, using fallback:", err);
    return fallbackServices;
  }
}

import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });
dotenv.config();
import { hash } from "@node-rs/argon2";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { adminUsers, contentBlocks, services, teamMembers } from "../src/lib/db/schema";
import { defaults } from "../src/features/content/defaults";
import { eq } from "drizzle-orm";

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not set in environment.");
    process.exit(1);
  }

  const email = process.env.ADMIN_EMAIL || "admin@sonderlabz.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPasswordImmediately123!";
  const name = process.env.ADMIN_NAME || "Lead Developer";

  console.log(`Connecting to database...`);
  const sql = neon(dbUrl);
  const db = drizzle(sql);

  // 1. Seed Admin
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.email, email.toLowerCase()));

  if (existing.length === 0) {
    console.log(`Creating initial admin user: ${email}`);
    const passwordHash = await hash(password);
    await db.insert(adminUsers).values({
      email: email.toLowerCase(),
      name,
      passwordHash,
    });
    console.log(`✓ Admin user created.`);
  } else {
    console.log(`Admin user ${email} already exists.`);
  }

  // 2. Seed Content Blocks
  console.log("Seeding default content blocks...");
  for (const [key, value] of Object.entries(defaults)) {
    await db
      .insert(contentBlocks)
      .values({
        sectionKey: key,
        data: value,
      })
      .onConflictDoNothing();
  }
  console.log("✓ Content blocks seeded.");

  // 3. Seed Three Services (Web, Mobile, Desktop)
  console.log("Seeding default services...");
  const defaultServices = [
    {
      slug: "web-applications",
      title: "Web Applications",
      platform: "web",
      sortOrder: 1,
      summary:
        "Fullstack web software built with Next.js, TypeScript, robust databases, and zero-compromise UX.",
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
      slug: "mobile-applications",
      title: "Mobile Applications",
      platform: "mobile",
      sortOrder: 2,
      summary:
        "Smooth, native-feeling iOS and Android apps engineered for speed, offline reliability, and intuitive gestures.",
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
      slug: "desktop-applications",
      title: "Desktop Applications",
      platform: "desktop",
      sortOrder: 3,
      summary:
        "Native desktop software for macOS, Windows, and Linux that handles complex workflows, file systems, and hardware peripherals.",
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

  for (const serv of defaultServices) {
    await db.insert(services).values(serv).onConflictDoNothing();
  }
  console.log("✓ Services seeded.");

  // 4. Seed Lead Developer Team Member
  console.log("Seeding lead developer team member...");
  const existingTeam = await db.select().from(teamMembers);
  if (existingTeam.length === 0) {
    await db.insert(teamMembers).values({
      name: "dev.ideategudy.tech",
      role: "Lead Developer",
      bio: "Founding engineer specializing in high-performance fullstack systems, mobile architecture, and desktop tooling.",
      links: {
        website: "https://dev.ideategudy.tech",
        github: "https://github.com",
      },
      visible: true,
      sortOrder: 1,
    });
    console.log("✓ Team member seeded.");
  }

  console.log("Database seed completed successfully.");
}

main().catch((err) => {
  console.error("Seed error:", err);
  process.exit(1);
});

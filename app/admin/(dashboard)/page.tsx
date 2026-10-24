import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Mail, Briefcase, Users, FileEdit, AlertCircle } from "lucide-react";
import { db } from "@/lib/db";
import { messages, projects, teamMembers } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export default async function AdminOverviewPage() {
  let unreadCount = 0;
  let projectCount = 3;
  let teamCount = 1;

  if (db) {
    try {
      const unread = await db
        .select()
        .from(messages)
        .where(eq(messages.status, "new"));
      unreadCount = unread.length;

      const pList = await db.select().from(projects);
      projectCount = pList.length;

      const tList = await db.select().from(teamMembers);
      teamCount = tList.length;
    } catch (err) {
      console.error("Failed to load dashboard metrics:", err);
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Agency Overview
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick metrics, inbox alerts, and content management shortcuts.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Unread Messages
            </span>
            <Mail className="size-4 text-primary" />
          </div>
          <div className="text-3xl font-bold font-display text-foreground">
            {unreadCount}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {unreadCount > 0 ? "Awaiting your reply" : "Inbox is completely caught up"}
          </p>
        </div>

        <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Live Projects
            </span>
            <Briefcase className="size-4 text-primary" />
          </div>
          <div className="text-3xl font-bold font-display text-foreground">
            {projectCount}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Published in showcase</p>
        </div>

        <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Active Team
            </span>
            <Users className="size-4 text-primary" />
          </div>
          <div className="text-3xl font-bold font-display text-foreground">
            {teamCount}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Displaying on About page</p>
        </div>
      </div>

      {/* Quick Actions & Content Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card space-y-4">
          <h2 className="text-lg font-bold text-foreground">Quick Management</h2>
          <div className="grid grid-cols-2 gap-3">
            <Button asChild variant="secondary" className="justify-start">
              <Link href="/admin/content">
                <FileEdit className="size-4 mr-2" />
                <span>Edit Copy</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="justify-start">
              <Link href="/admin/messages">
                <Mail className="size-4 mr-2" />
                <span>View Inbox</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="justify-start">
              <Link href="/admin/projects">
                <Briefcase className="size-4 mr-2" />
                <span>Projects</span>
              </Link>
            </Button>
            <Button asChild variant="secondary" className="justify-start">
              <Link href="/admin/team">
                <Users className="size-4 mr-2" />
                <span>Team Roster</span>
              </Link>
            </Button>
          </div>
        </div>

        <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-5 text-lume" />
            <h2 className="text-lg font-bold text-foreground">Content Readiness</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            All starter copy and lead developer records are live. Update section copy
            or add team members anytime using the content editor.
          </p>
          <div className="pt-2">
            <Button asChild variant="primary">
              <Link href="/admin/content">Open Content Editor</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

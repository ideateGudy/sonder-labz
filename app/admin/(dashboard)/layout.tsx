import Link from "next/link";
import { requireAdmin } from "@/lib/auth/session";
import { Logo } from "@/components/brand/Logo";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { logout } from "@/features/admin/logout";
import {
  LayoutDashboard,
  FileEdit,
  Briefcase,
  Users,
  Settings,
  Mail,
  ExternalLink,
  LogOut,
  Monitor,
  KeyRound,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/content", label: "Content Editor", icon: FileEdit },
  { href: "/admin/services", label: "Services", icon: Monitor },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
  { href: "/admin/account", label: "Account", icon: KeyRound },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card/60 backdrop-blur-xl flex flex-col justify-between hidden md:flex">
        <div className="p-6">
          <Logo className="mb-8" />
          <nav className="space-y-1.5">
            {ADMIN_NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  <Icon className="size-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-6 border-t border-border/60 space-y-4">
          <div className="text-xs">
            <p className="font-semibold text-foreground">{user.name}</p>
            <p className="text-muted-foreground truncate">{user.email}</p>
          </div>

          <div className="flex items-center justify-between">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-primary hover:underline"
            >
              <span>View Site</span>
              <ExternalLink className="size-3" />
            </a>

            <form action={logout}>
              <button
                type="submit"
                aria-label="Sign out"
                className="inline-flex items-center gap-1.5 text-xs text-destructive hover:underline cursor-pointer"
              >
                <LogOut className="size-3" />
                <span>Sign out</span>
              </button>
            </form>
          </div>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-border bg-card/40 backdrop-blur-xl px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold text-foreground">
              Sonder Labz Control Center
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
          </div>
        </header>

        <main className="flex-1 p-6 md:p-10 max-w-6xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

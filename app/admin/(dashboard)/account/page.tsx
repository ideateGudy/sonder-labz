import { requireAdmin } from "@/lib/auth/session";
import { AccountSecurityForm } from "@/components/admin/AccountSecurityForm";

export default async function AdminAccountPage() {
  const user = await requireAdmin();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Account & Security
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update your administrator credentials and manage session security.
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-[var(--radius-lg)] border border-border bg-card space-y-6">
        <div className="border-b border-border/60 pb-4">
          <div className="text-xs uppercase font-semibold text-muted-foreground tracking-wider mb-1">
            Logged in as
          </div>
          <div className="text-lg font-bold text-foreground">{user.name}</div>
          <div className="text-sm text-muted-foreground font-mono">{user.email}</div>
        </div>

        <AccountSecurityForm />
      </div>
    </div>
  );
}

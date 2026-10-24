import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Agency Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Global metadata, contact email endpoints, and system parameters.
        </p>
      </div>

      <div className="p-6 md:p-8 rounded-[var(--radius-lg)] border border-border bg-card space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Agency Name
          </label>
          <input
            type="text"
            readOnly
            value="Sonder Labz"
            className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Primary Contact Email
          </label>
          <input
            type="email"
            readOnly
            value="contact@sonderlabz.com"
            className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Lead Developer Portfolio
          </label>
          <input
            type="url"
            readOnly
            value="https://dev.ideategudy.tech"
            className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Security & Administration Notice
          </label>
          <p className="text-xs text-muted-foreground leading-relaxed">
            Public registration is completely disabled. Admin credentials and password resets
            must be executed through trusted CLI commands (`pnpm seed:admin`, `pnpm admin:create`, `pnpm admin:reset`).
          </p>
        </div>
      </div>
    </div>
  );
}

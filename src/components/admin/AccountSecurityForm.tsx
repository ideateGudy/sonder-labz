"use client";

import * as React from "react";
import { useActionState } from "react";
import { changeOwnPassword } from "@/features/admin/account-actions";
import { Button } from "@/components/ui/button";

export function AccountSecurityForm() {
  const [state, formAction, isPending] = useActionState(changeOwnPassword, null);

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div
          role="alert"
          className="rounded-[var(--radius-sm)] border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
        >
          {state.error}
        </div>
      )}

      <div>
        <label
          htmlFor="currentPassword"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
        >
          Current Password
        </label>
        <input
          id="currentPassword"
          name="currentPassword"
          type="password"
          required
          className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </div>

      <div>
        <label
          htmlFor="newPassword"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
        >
          New Password (min 8 chars)
        </label>
        <input
          id="newPassword"
          name="newPassword"
          type="password"
          required
          className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
        >
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
        />
      </div>

      <p className="text-xs text-muted-foreground leading-relaxed">
        Changing your password will sign you out of all active browser sessions immediately.
      </p>

      <Button type="submit" disabled={isPending} variant="primary">
        {isPending ? "Updating password..." : "Update password"}
      </Button>
    </form>
  );
}

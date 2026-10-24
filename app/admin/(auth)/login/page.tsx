"use client";

import * as React from "react";
import { useActionState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/brand/Logo";
import { login } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <Logo className="mb-4" />
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Sign in to Sonder Labz
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Private management portal for authorised team members.
          </p>
        </div>

        <GlassCard tone="strong" padding="lg">
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
                htmlFor="email"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Admin Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                placeholder="name@sonderlabz.com"
                className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              variant="primary"
              className="w-full h-11"
            >
              {isPending ? "Verifying credentials..." : "Sign in to Dashboard"}
            </Button>
          </form>
        </GlassCard>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          No public accounts. Credentials managed via CLI.
        </p>
      </div>
    </div>
  );
}

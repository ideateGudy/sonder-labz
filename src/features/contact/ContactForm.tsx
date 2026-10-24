"use client";

import * as React from "react";
import { useActionState } from "react";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { submitContactMessage } from "./actions";
import { CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContactMessage, null);
  const [submitted, setSubmitted] = React.useState(false);

  React.useEffect(() => {
    if (state?.ok) {
      setSubmitted(true);
    }
  }, [state]);

  if (submitted) {
    return (
      <GlassCard tone="strong" padding="lg" className="text-center py-12 space-y-4">
        <div className="mx-auto size-12 rounded-full bg-lume/20 flex items-center justify-center text-lume">
          <CheckCircle2 className="size-6" />
        </div>
        <h3 className="text-2xl font-bold font-display text-foreground">Message Sent</h3>
        <p className="text-muted-foreground max-w-md mx-auto text-sm leading-relaxed">
          {state?.message}
        </p>
        <div className="pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => setSubmitted(false)}
          >
            Send another message
          </Button>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard tone="strong" padding="lg">
      <form action={formAction} className="space-y-6">
        {state?.message && !state.ok && (
          <div
            role="alert"
            className="rounded-[var(--radius-sm)] border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive"
          >
            {state.message}
          </div>
        )}

        {/* Spam bot honeypot (visually hidden) */}
        <div className="hidden" aria-hidden="true">
          <label htmlFor="website_url">Website</label>
          <input
            id="website_url"
            name="website_url"
            type="text"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="name"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Your Name *
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
            {state?.errors?.name && (
              <p className="mt-1 text-xs text-destructive">{state.errors.name[0]}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
            >
              Work Email *
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="name@company.com"
              className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
            />
            {state?.errors?.email && (
              <p className="mt-1 text-xs text-destructive">{state.errors.email[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="projectType"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            Project Platform
          </label>
          <select
            id="projectType"
            name="projectType"
            defaultValue="not_sure"
            className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
          >
            <option value="web">Web Application</option>
            <option value="mobile">Mobile Application (iOS / Android)</option>
            <option value="desktop">Desktop Application (macOS / Windows / Linux)</option>
            <option value="not_sure">Multi-Platform / Not sure yet</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="message"
            className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5"
          >
            Project Summary & Objectives *
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            placeholder="Tell us what you are building, key problems to solve, and expected timeline..."
            className="w-full rounded-[var(--radius-sm)] border border-input bg-background/50 px-3.5 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring"
          />
          {state?.errors?.message && (
            <p className="mt-1 text-xs text-destructive">{state.errors.message[0]}</p>
          )}
        </div>

        <Button
          type="submit"
          disabled={isPending}
          variant="primary"
          size="lg"
          className="w-full"
        >
          {isPending ? "Sending inquiry..." : "Send message"}
        </Button>
      </form>
    </GlassCard>
  );
}

"use client";

import * as React from "react";
import { saveContent } from "@/features/content/actions";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { toast } from "sonner";
import { Save, Check, ExternalLink } from "lucide-react";

export function ContentEditorForm({
  sectionKey,
  initialData,
}: {
  sectionKey: string;
  initialData: any;
}) {
  const [data, setData] = React.useState(initialData);
  const [isPending, setIsPending] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await saveContent(sectionKey as any, data);
      if (res.ok) {
        setIsSaved(true);
        toast.success("Section content updated successfully");
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        toast.error(res.message || "Failed to update content");
      }
    } catch (err) {
      toast.error("Failed to save changes");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-border">
        <h2 className="text-xl font-bold font-display uppercase tracking-wider text-foreground">
          {sectionKey} Section
        </h2>
        <div className="flex items-center gap-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground"
          >
            <span>View on site</span>
            <ExternalLink className="size-3" />
          </a>
          <Button
            type="submit"
            disabled={isPending}
            variant="primary"
            size="sm"
            className="h-9 px-4"
          >
            {isSaved ? (
              <>
                <Check className="size-4 mr-1 text-lume" />
                <span>Saved</span>
              </>
            ) : (
              <>
                <Save className="size-4 mr-1" />
                <span>{isPending ? "Saving..." : "Save changes"}</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {Object.entries(data).map(([field, value]) => {
          if (typeof value === "object" && value !== null) {
            return (
              <div key={field} className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {field} (JSON)
                </label>
                <textarea
                  rows={6}
                  value={JSON.stringify(value, null, 2)}
                  onChange={(e) => {
                    try {
                      const parsed = JSON.parse(e.target.value);
                      setData({ ...data, [field]: parsed });
                    } catch {
                      // Allow typing in JSON
                    }
                  }}
                  className="w-full font-mono text-xs rounded-[var(--radius-sm)] border border-input bg-card p-3 text-foreground"
                />
              </div>
            );
          }

          const isLong = String(value).length > 80;

          return (
            <div key={field} className="space-y-1.5">
              <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {field}
              </label>
              {isLong ? (
                <textarea
                  rows={4}
                  value={value as string}
                  onChange={(e) => setData({ ...data, [field]: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              ) : (
                <input
                  type="text"
                  value={value as string}
                  onChange={(e) => setData({ ...data, [field]: e.target.value })}
                  className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2.5 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-ring"
                />
              )}
            </div>
          );
        })}
      </div>
    </form>
  );
}

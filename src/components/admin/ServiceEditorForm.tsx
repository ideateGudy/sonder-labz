"use client";

import * as React from "react";
import { saveService } from "@/features/services/actions";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Save, Check, Plus, Trash2 } from "lucide-react";

export function ServiceEditorForm({
  service,
}: {
  service: any;
}) {
  const [data, setData] = React.useState({
    title: service.title,
    summary: service.summary,
    platform: service.platform,
    deliverables: service.details?.deliverables || [],
    typicalStack: service.details?.typicalStack || [],
  });

  const [isPending, setIsPending] = React.useState(false);
  const [isSaved, setIsSaved] = React.useState(false);

  const [newDeliverable, setNewDeliverable] = React.useState("");
  const [newStackItem, setNewStackItem] = React.useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsPending(true);

    try {
      const res = await saveService(service.id, {
        title: data.title,
        summary: data.summary,
        platform: data.platform,
        details: {
          deliverables: data.deliverables,
          typicalStack: data.typicalStack,
        },
      });

      if (res.ok) {
        setIsSaved(true);
        toast.success(`${data.title} service updated`);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        toast.error("Failed to update service");
      }
    } catch {
      toast.error("An error occurred while saving");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h2 className="text-xl font-bold font-display text-foreground">{service.title}</h2>
          <span className="text-xs uppercase font-mono text-muted-foreground">
            Platform: {service.platform}
          </span>
        </div>
        <Button type="submit" disabled={isPending} variant="primary" size="sm">
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

      <div className="space-y-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Service Title
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
            className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2 text-sm text-foreground"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1.5">
            Summary Description
          </label>
          <textarea
            rows={3}
            value={data.summary}
            onChange={(e) => setData({ ...data, summary: e.target.value })}
            className="w-full rounded-[var(--radius-sm)] border border-input bg-card px-3.5 py-2 text-sm text-foreground"
            required
          />
        </div>

        {/* Deliverables */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Deliverables & Included Items
          </label>
          <div className="space-y-2 mb-3">
            {data.deliverables.map((item: string, idx: number) => (
              <div
                key={idx}
                className="flex items-center justify-between gap-2 p-2 rounded border border-border/60 bg-background/50 text-xs"
              >
                <span>{item}</span>
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      deliverables: data.deliverables.filter((_: any, i: number) => i !== idx),
                    })
                  }
                  className="text-destructive hover:text-destructive/80"
                >
                  <Trash2 className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add deliverable..."
              value={newDeliverable}
              onChange={(e) => setNewDeliverable(e.target.value)}
              className="flex-1 rounded-[var(--radius-sm)] border border-input bg-card px-3 py-1.5 text-xs text-foreground"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                if (newDeliverable.trim()) {
                  setData({
                    ...data,
                    deliverables: [...data.deliverables, newDeliverable.trim()],
                  });
                  setNewDeliverable("");
                }
              }}
            >
              <Plus className="size-3.5 mr-1" />
              <span>Add</span>
            </Button>
          </div>
        </div>

        {/* Typical Stack */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Typical Stack Tags
          </label>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {data.typicalStack.map((tech: string, idx: number) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-foreground/5 border border-border text-xs font-mono"
              >
                <span>{tech}</span>
                <button
                  type="button"
                  onClick={() =>
                    setData({
                      ...data,
                      typicalStack: data.typicalStack.filter((_: any, i: number) => i !== idx),
                    })
                  }
                  className="text-muted-foreground hover:text-foreground"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add technology (e.g. Next.js, Rust)..."
              value={newStackItem}
              onChange={(e) => setNewStackItem(e.target.value)}
              className="flex-1 rounded-[var(--radius-sm)] border border-input bg-card px-3 py-1.5 text-xs text-foreground"
            />
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => {
                if (newStackItem.trim()) {
                  setData({
                    ...data,
                    typicalStack: [...data.typicalStack, newStackItem.trim()],
                  });
                  setNewStackItem("");
                }
              }}
            >
              <Plus className="size-3.5 mr-1" />
              <span>Add</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

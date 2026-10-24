import { getContent } from "@/features/content/queries";
import { ContentEditorForm } from "@/components/admin/ContentEditorForm";
import { GlassCard } from "@/components/ui/glass-card";

export default async function AdminContentPage() {
  const [hero, servicesIntro, process, about, cta, privacy, terms] =
    await Promise.all([
      getContent("hero"),
      getContent("servicesIntro"),
      getContent("process"),
      getContent("about"),
      getContent("cta"),
      getContent("privacy"),
      getContent("terms"),
    ]);

  const sections = [
    { key: "hero", data: hero },
    { key: "servicesIntro", data: servicesIntro },
    { key: "process", data: process },
    { key: "about", data: about },
    { key: "cta", data: cta },
    { key: "privacy", data: privacy },
    { key: "terms", data: terms },
  ];

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-display">
          Website Content Editor
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Update text, headings, steps, and copy across every public page in real time.
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((s) => (
          <div
            key={s.key}
            className="p-6 md:p-8 rounded-[var(--radius-lg)] border border-border bg-card shadow-sm"
          >
            <ContentEditorForm sectionKey={s.key} initialData={s.data} />
          </div>
        ))}
      </div>
    </div>
  );
}

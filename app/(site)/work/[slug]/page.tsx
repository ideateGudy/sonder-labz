import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/site/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { getProjectBySlug } from "@/features/projects/queries";
import { FadeInView } from "@/components/site/MotionWrapper";
import { ArrowLeft, ExternalLink, Code } from "lucide-react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.summary,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-12 md:py-20">
      <Container>
        <FadeInView direction="left" distance={16}>
          <div className="mb-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/work" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground">
                <ArrowLeft className="size-4" />
                <span>Back to all projects</span>
              </Link>
            </Button>
          </div>
        </FadeInView>

        <div className="max-w-4xl space-y-8">
          <FadeInView direction="up">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                {project.platforms.map((p) => (
                  <span
                    key={p}
                    className="rounded-full border border-border bg-foreground/5 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground font-display">
                {project.title}
              </h1>

              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.summary}
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.1}>
            <div className="flex flex-wrap items-center gap-4 pt-2 border-y border-border/60 py-4">
              {project.liveUrl && (
                <Button asChild variant="primary">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <span>Launch Live System</span>
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}
              {project.repoUrl && (
                <Button asChild variant="secondary">
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <Code className="size-4" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.15}>
            <GlassCard tone="strong" padding="lg" className="space-y-6">
              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Our Engineering Role
                </h2>
                <p className="text-base font-medium text-foreground">{project.role}</p>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Architecture & Implementation
                </h2>
                <div className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                  {project.description}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                  Technologies Used
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-mono text-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          </FadeInView>
        </div>
      </Container>
    </div>
  );
}

import Link from "next/link";
import { Suspense } from "react";
import { Container } from "@/components/site/container";
import { GlassCard } from "@/components/ui/glass-card";
import { getProjects } from "@/features/projects/queries";
import { FadeInView, StaggerChildren } from "@/components/site/MotionWrapper";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "Work & Projects",
  description: "Browse software systems and applications engineered by Sonder Labz.",
};

async function WorkProjectsList({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  const { platform } = await searchParams;
  const currentPlatform = platform || "all";
  const projectsList = await getProjects({ platform: currentPlatform });

  const platforms = [
    { id: "all", label: "All Platforms" },
    { id: "web", label: "Web" },
    { id: "mobile", label: "Mobile" },
    { id: "desktop", label: "Desktop" },
  ];

  return (
    <>
      {/* Platform Filter Bar */}
      <FadeInView direction="none" delay={0.1}>
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border/50">
          {platforms.map((p) => {
            const isActive = currentPlatform === p.id;
            const href = p.id === "all" ? "/work" : `/work?platform=${p.id}`;

            return (
              <Link
                key={p.id}
                href={href}
                className={`rounded-[var(--radius-sm)] px-4 py-2 text-sm font-medium transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "border border-border bg-white/40 dark:bg-white/5 text-muted-foreground hover:text-foreground"
                }`}
              >
                {p.label}
              </Link>
            );
          })}
        </div>
      </FadeInView>

      {/* Project List */}
      {projectsList.length === 0 ? (
        <FadeInView>
          <GlassCard tone="default" padding="lg" className="text-center py-16">
            <p className="text-muted-foreground">
              No projects found matching the selected platform.
            </p>
          </GlassCard>
        </FadeInView>
      ) : (
        <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 gap-8" staggerDelay={0.08}>
          {projectsList.map((project) => (
            <GlassCard
              key={project.id}
              tone="default"
              padding="lg"
              interactive
              className="group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex flex-wrap gap-2">
                    {project.platforms.map((plat) => (
                      <span
                        key={plat}
                        className="rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                      >
                        {plat}
                      </span>
                    ))}
                  </div>
                  <div className="size-9 rounded-full border border-border bg-white/50 dark:bg-white/5 flex items-center justify-center text-foreground group-hover:text-primary transition-all">
                    <ArrowUpRight className="size-4" />
                  </div>
                </div>

                <h2 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors mb-2">
                  <Link href={`/work/${project.slug}`}>{project.title}</Link>
                </h2>

                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {project.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="text-xs font-mono text-muted-foreground mb-2">
                  Role: {project.role}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded bg-foreground/5 px-2 py-0.5 text-xs font-mono text-foreground/70"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </GlassCard>
          ))}
        </StaggerChildren>
      )}
    </>
  );
}

export default function WorkPage({
  searchParams,
}: {
  searchParams: Promise<{ platform?: string }>;
}) {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <FadeInView direction="up">
          <div className="max-w-3xl mb-12 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">
              Selected Work
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Case studies and production systems built across web, mobile, and desktop.
            </p>
          </div>
        </FadeInView>

        <Suspense
          fallback={
            <div className="h-48 flex items-center justify-center text-muted-foreground">
              Loading projects...
            </div>
          }
        >
          <WorkProjectsList searchParams={searchParams} />
        </Suspense>
      </Container>
    </div>
  );
}

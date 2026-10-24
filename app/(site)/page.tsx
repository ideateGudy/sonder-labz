import Link from "next/link";
import { Container } from "@/components/site/container";
import { Section, SectionHeading } from "@/components/site/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { DeviceTrio } from "@/components/site/DeviceTrio";
import { getContent } from "@/features/content/queries";
import { getServices } from "@/features/services/queries";
import { getProjects } from "@/features/projects/queries";
import { getTeamMembers } from "@/features/team/queries";
import { ArrowUpRight, Monitor, Smartphone, LayoutGrid, CheckCircle2 } from "lucide-react";

import { HeroIntroAnimation } from "@/components/site/HeroIntroAnimation";
import { FadeInView, StaggerChildren } from "@/components/site/MotionWrapper";

export default async function HomePage() {
  const [heroContent, servicesIntro, processContent, ctaContent, servicesList, featuredProjects, teamList] =
    await Promise.all([
      getContent("hero"),
      getContent("servicesIntro"),
      getContent("process"),
      getContent("cta"),
      getServices(),
      getProjects({ featuredOnly: true }),
      getTeamMembers(),
    ]);

  return (
    <div className="overflow-hidden">
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            <div className="lg:col-span-7">
              <HeroIntroAnimation>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.08]">
                  {heroContent.headline}
                </h1>
                <p className="max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  {heroContent.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Button asChild variant="primary" size="lg">
                    <Link href="/contact">{heroContent.primaryCta}</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/work">{heroContent.secondaryCta}</Link>
                  </Button>
                </div>
              </HeroIntroAnimation>
            </div>

            <div className="lg:col-span-5 relative">
              <DeviceTrio />
            </div>
          </div>
        </Container>
      </section>

      {/* 2. What We Build (Services Rows) */}
      <Section id="services" className="border-t border-border/40">
        <FadeInView>
          <SectionHeading
            title={servicesIntro.heading}
            description={servicesIntro.subheading}
          />
        </FadeInView>

        <StaggerChildren className="divide-y divide-border/60" staggerDelay={0.12}>
          {servicesList.map((service, index) => {
            const Icon =
              service.platform === "mobile"
                ? Smartphone
                : service.platform === "desktop"
                ? LayoutGrid
                : Monitor;

            return (
              <div
                key={service.id || index}
                className="py-10 md:py-14 grid grid-cols-1 md:grid-cols-12 gap-6 items-start transition-colors"
              >
                <div className="md:col-span-4 flex items-center gap-3">
                  <div className="size-10 rounded-[var(--radius-sm)] border border-border bg-white/60 dark:bg-white/5 flex items-center justify-center text-primary">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="text-2xl font-bold font-display tracking-tight text-foreground">
                    {service.title}
                  </h3>
                </div>

                <div className="md:col-span-4">
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {service.summary}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col gap-2">
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                    Key Deliverables
                  </div>
                  <ul className="space-y-1.5 text-sm text-foreground/90">
                    {service.details?.deliverables?.slice(0, 3).map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <CheckCircle2 className="size-4 text-lume shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </StaggerChildren>

        <FadeInView delay={0.2} className="pt-6">
          <Button asChild variant="ghost">
            <Link href="/services" className="inline-flex items-center gap-1.5">
              <span>View all services breakdown</span>
              <ArrowUpRight className="size-4" />
            </Link>
          </Button>
        </FadeInView>
      </Section>

      {/* 3. Featured Work */}
      {featuredProjects.length > 0 && (
        <Section id="work" className="border-t border-border/40">
          <FadeInView>
            <SectionHeading
              title="Featured Work"
              description="Production systems and applications built for scale and reliability."
            />
          </FadeInView>

          <StaggerChildren className="space-y-8" staggerDelay={0.15}>
            {featuredProjects.map((project, idx) => (
              <GlassCard
                key={project.id || idx}
                tone="default"
                padding="lg"
                interactive
                className="group transition-all hover:border-primary/40"
              >
                <Link href={`/work/${project.slug}`} className="block">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        {project.platforms.map((p) => (
                          <span
                            key={p}
                            className="rounded-full border border-border bg-foreground/5 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-bold font-display text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <div className="size-10 rounded-full border border-border bg-white/50 dark:bg-white/5 flex items-center justify-center text-foreground group-hover:border-primary/50 group-hover:text-primary transition-all">
                      <ArrowUpRight className="size-5" />
                    </div>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mb-6">
                    {project.summary}
                  </p>

                  <div className="flex flex-wrap items-center gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border/60 bg-white/40 dark:bg-white/5 px-2 py-1 text-xs text-foreground/80 font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              </GlassCard>
            ))}
          </StaggerChildren>

          <FadeInView delay={0.2} className="mt-8">
            <Button asChild variant="secondary">
              <Link href="/work">Explore all projects</Link>
            </Button>
          </FadeInView>
        </Section>
      )}

      {/* 4. How We Work */}
      <Section id="process" className="border-t border-border/40">
        <FadeInView>
          <SectionHeading
            title={processContent.heading}
            description={processContent.subheading}
          />
        </FadeInView>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {processContent.steps.map((step, idx) => (
            <GlassCard key={idx} tone="strong" padding="lg" className="space-y-4">
              <div className="text-sm font-mono font-semibold text-lume">
                {step.number}
              </div>
              <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {step.body}
              </p>
            </GlassCard>
          ))}
        </StaggerChildren>
      </Section>

      {/* 5. Team Preview */}
      <Section id="team" className="border-t border-border/40">
        <FadeInView>
          <SectionHeading
            title="Engineers & Leadership"
            description="Software created by builders who care deeply about craft and performance."
          />
        </FadeInView>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
          {teamList.map((member, idx) => (
            <GlassCard key={member.id || idx} tone="default" padding="lg" className="space-y-4">
              {member.photoUrl ? (
                <div className="size-16 rounded-full overflow-hidden border border-border shrink-0">
                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="size-full object-cover"
                  />
                </div>
              ) : (
                <div className="size-16 rounded-full border border-border bg-primary/10 flex items-center justify-center text-primary font-bold text-xl font-display">
                  {member.name.charAt(0).toUpperCase()}
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold text-foreground">{member.name}</h3>
                <p className="text-sm text-primary font-medium">{member.role}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {member.bio}
              </p>
              {member.links?.website && (
                <div className="pt-2">
                  <a
                    href={member.links.website}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground hover:underline"
                  >
                    <span>Portfolio</span>
                    <ArrowUpRight className="size-3" />
                  </a>
                </div>
              )}
            </GlassCard>
          ))}
        </StaggerChildren>
      </Section>

      {/* 6. Closing Call to Action */}
      <Section className="border-t border-border/40 pb-28">
        <FadeInView distance={32}>
          <GlassCard
            tone="strong"
            padding="lg"
            className="text-center py-16 px-6 max-w-3xl mx-auto space-y-6"
          >
            <h2 className="text-3xl md:text-5xl font-bold font-display tracking-tight text-foreground">
              {ctaContent.heading}
            </h2>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
              {ctaContent.body}
            </p>
            <div className="pt-2">
              <Button asChild variant="primary" size="lg" className="h-12 px-8">
                <Link href="/contact">{ctaContent.button}</Link>
              </Button>
            </div>
          </GlassCard>
        </FadeInView>
      </Section>
    </div>
  );
}

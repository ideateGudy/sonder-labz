import Link from "next/link";
import { Container } from "@/components/site/container";
import { Section, SectionHeading } from "@/components/site/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { getServices } from "@/features/services/queries";
import { getContent } from "@/features/content/queries";
import { FadeInView, StaggerChildren } from "@/components/site/MotionWrapper";
import { Monitor, Smartphone, LayoutGrid, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Services",
  description:
    "Explore our core application engineering capabilities across Web, Mobile, and Desktop platforms.",
};

export default async function ServicesPage() {
  const [servicesList, intro] = await Promise.all([
    getServices(),
    getContent("servicesIntro"),
  ]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        <FadeInView direction="up">
          <div className="max-w-3xl mb-16 space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">
              Application Services
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              {intro.subheading}
            </p>
          </div>
        </FadeInView>

        <StaggerChildren className="space-y-16" staggerDelay={0.15}>
          {servicesList.map((service, index) => {
            const Icon =
              service.platform === "mobile"
                ? Smartphone
                : service.platform === "desktop"
                ? LayoutGrid
                : Monitor;

            return (
              <GlassCard
                key={service.id || index}
                tone="default"
                padding="lg"
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
              >
                <div className="lg:col-span-5 space-y-4">
                  <div className="size-12 rounded-[var(--radius-sm)] border border-border bg-primary/10 flex items-center justify-center text-primary">
                    <Icon className="size-6" />
                  </div>
                  <h2 className="text-3xl font-bold font-display text-foreground">
                    {service.title}
                  </h2>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {service.summary}
                  </p>
                  <div className="pt-4">
                    <Button asChild variant="primary">
                      <Link href="/contact" className="inline-flex items-center gap-2">
                        <span>Initiate {service.title} project</span>
                        <ArrowRight className="size-4" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-6 lg:border-l lg:border-border/60 lg:pl-8">
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                      Included Capabilities & Deliverables
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {service.details?.deliverables?.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-[var(--radius-sm)] border border-border/50 bg-background/50"
                        >
                          <CheckCircle2 className="size-4 text-lume shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground/90">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {service.details?.typicalStack && (
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Typical Engineering Stack
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {service.details.typicalStack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-background px-2.5 py-1 text-xs font-mono text-foreground/80"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </StaggerChildren>
      </Container>
    </div>
  );
}

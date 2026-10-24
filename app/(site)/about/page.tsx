import { Container } from "@/components/site/container";
import { GlassCard } from "@/components/ui/glass-card";
import { getContent } from "@/features/content/queries";
import { getTeamMembers } from "@/features/team/queries";
import { FadeInView, StaggerChildren } from "@/components/site/MotionWrapper";
import { ArrowUpRight } from "lucide-react";

export const metadata = {
  title: "About & Team",
  description: "Learn about the Sonder Labz philosophy, approach, and our engineering team.",
};

export default async function AboutPage() {
  const [aboutContent, teamList] = await Promise.all([
    getContent("about"),
    getTeamMembers(),
  ]);

  return (
    <div className="py-12 md:py-20">
      <Container>
        <FadeInView direction="up">
          <div className="max-w-3xl mb-16 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">
              {aboutContent.heading}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed whitespace-pre-line">
              {aboutContent.story}
            </p>
          </div>
        </FadeInView>

        {/* Values */}
        {aboutContent.values && aboutContent.values.length > 0 && (
          <div className="mb-20">
            <FadeInView direction="up">
              <h2 className="text-2xl font-bold font-display text-foreground mb-8">
                Guiding Principles
              </h2>
            </FadeInView>
            <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerDelay={0.1}>
              {aboutContent.values.map((v, i) => (
                <GlassCard key={i} tone="default" padding="lg" className="space-y-3">
                  <h3 className="text-lg font-bold text-foreground">{v.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {v.description}
                  </p>
                </GlassCard>
              ))}
            </StaggerChildren>
          </div>
        )}

        {/* Team Section */}
        <div>
          <FadeInView direction="up">
            <h2 className="text-2xl font-bold font-display text-foreground mb-8">
              The Team
            </h2>
          </FadeInView>
          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.12}>
            {teamList.map((member) => (
              <GlassCard key={member.id} tone="strong" padding="lg" className="space-y-4">
                {member.photoUrl ? (
                  <div className="size-20 rounded-full overflow-hidden border-2 border-primary/40 shrink-0">
                    <img
                      src={member.photoUrl}
                      alt={member.name}
                      className="size-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="size-20 rounded-full border border-border bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl font-display">
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

                <div className="flex flex-wrap gap-3 pt-2">
                  {member.links?.website && (
                    <a
                      href={member.links.website}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
                    >
                      <span>Website</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                  {member.links?.github && (
                    <a
                      href={member.links.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-foreground hover:underline"
                    >
                      <span>GitHub</span>
                      <ArrowUpRight className="size-3" />
                    </a>
                  )}
                </div>
              </GlassCard>
            ))}
          </StaggerChildren>
        </div>
      </Container>
    </div>
  );
}

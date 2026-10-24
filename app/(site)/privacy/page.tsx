import { Container } from "@/components/site/container";
import { GlassCard } from "@/components/ui/glass-card";
import { getContent } from "@/features/content/queries";
import { FadeInView } from "@/components/site/MotionWrapper";

export const metadata = {
  title: "Privacy Policy",
  description: "Sonder Labz privacy policy.",
};

export default async function PrivacyPage() {
  const privacy = await getContent("privacy");

  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="max-w-3xl mx-auto space-y-6">
          <FadeInView direction="up">
            <div>
              <h1 className="text-4xl font-bold tracking-tight text-foreground font-display">
                {privacy.title}
              </h1>
              <p className="mt-2 text-xs font-mono text-muted-foreground">
                Last updated: {privacy.lastUpdated}
              </p>
            </div>
          </FadeInView>

          <FadeInView direction="up" delay={0.1}>
            <GlassCard tone="strong" padding="lg">
              <div className="text-base text-foreground/90 leading-relaxed whitespace-pre-line">
                {privacy.content}
              </div>
            </GlassCard>
          </FadeInView>
        </div>
      </Container>
    </div>
  );
}

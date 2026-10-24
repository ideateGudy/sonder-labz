import Link from "next/link";
import { Container } from "@/components/site/container";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="py-24 md:py-36">
      <Container>
        <GlassCard
          tone="strong"
          padding="lg"
          className="text-center max-w-xl mx-auto py-16 space-y-6"
        >
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-lume">
            Error 404
          </div>
          <h1 className="text-3xl md:text-5xl font-bold font-display text-foreground">
            Page Not Found
          </h1>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            The requested page does not exist or has been moved to another location.
          </p>
          <div className="pt-2">
            <Button asChild variant="primary">
              <Link href="/">Return to Home</Link>
            </Button>
          </div>
        </GlassCard>
      </Container>
    </div>
  );
}

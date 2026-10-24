import Link from "next/link";
import { Container } from "@/components/site/container";
import { Section, SectionHeading } from "@/components/site/section";
import { GlassCard } from "@/components/ui/glass-card";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/brand/ThemeToggle";
import { LogoMark, Logo } from "@/components/brand/Logo";

export default function StyleguidePage() {
  if (process.env.NODE_ENV === "production") {
    return (
      <Container className="py-24">
        <h1 className="text-2xl font-bold">Not available in production</h1>
      </Container>
    );
  }

  return (
    <div className="py-12">
      <Container>
        <div className="mb-12 border-b border-border pb-6">
          <h1 className="text-4xl font-bold tracking-tight">Sonder Labz Styleguide</h1>
          <p className="mt-2 text-muted-foreground">
            Dev-only preview of tokens, components, buttons, and glass cards.
          </p>
        </div>

        {/* Brand & Logo */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Brand & Logos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-4">LogoMark (Inline SVG)</p>
              <LogoMark className="size-12 text-foreground" />
            </div>
            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-4">Logo Lockup</p>
              <Logo />
            </div>
            <div className="p-6 rounded-[var(--radius-lg)] border border-border bg-card">
              <p className="text-xs text-muted-foreground mb-4">Theme Toggle</p>
              <ThemeToggle />
            </div>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Buttons</h2>
          <div className="flex flex-wrap items-center gap-4 p-6 rounded-[var(--radius-lg)] border border-border bg-card">
            <Button variant="primary">Start a project</Button>
            <Button variant="secondary">See our work</Button>
            <Button variant="ghost">Learn more</Button>
            <Button variant="outline">Outline button</Button>
            <Button variant="danger">Delete project</Button>
          </div>
        </section>

        {/* Glass Cards */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Glass Cards</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard tone="default" padding="lg">
              <h3 className="text-lg font-bold">Default Tone</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Standard glass treatment with backdrop-blur-xl and subtle border.
              </p>
            </GlassCard>

            <GlassCard tone="strong" padding="lg">
              <h3 className="text-lg font-bold">Strong Tone</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Higher opacity background for forms and dense text readability.
              </p>
            </GlassCard>

            <GlassCard tone="flat" padding="lg" interactive>
              <h3 className="text-lg font-bold">Flat & Interactive</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Hover to see smooth transition. Ideal for nested cards or clickable items.
              </p>
            </GlassCard>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Typography Scale</h2>
          <div className="space-y-6 p-6 rounded-[var(--radius-lg)] border border-border bg-card">
            <div>
              <p className="text-xs text-muted-foreground">Display H1 (Bricolage Grotesque)</p>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                We build web, mobile and desktop software
              </h1>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Display H2</p>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight">
                Crafted for founders and businesses
              </h2>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Body Text (Onest)</p>
              <p className="text-base text-muted-foreground max-w-2xl leading-relaxed">
                Sonder Labz designs and develops high-impact digital experiences. Every detail
                is considered: from responsive tactile feedback to sub-millisecond data queries.
              </p>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}

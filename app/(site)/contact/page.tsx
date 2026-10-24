import { Container } from "@/components/site/container";
import { ContactForm } from "@/features/contact/ContactForm";
import { FadeInView } from "@/components/site/MotionWrapper";
import { Mail, Clock, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Contact",
  description: "Start a project conversation with the Sonder Labz engineering team.",
};

export default function ContactPage() {
  return (
    <div className="py-12 md:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <FadeInView direction="right" className="lg:col-span-5 space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground font-display">
              Start a project
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We collaborate with founders and product teams to engineer durable web, mobile,
              and desktop software.
            </p>

            <div className="space-y-4 pt-4 border-t border-border/60">
              <div className="flex items-start gap-3">
                <Clock className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Rapid Response</h2>
                  <p className="text-xs text-muted-foreground">
                    We review submissions daily and respond within 24 business hours.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <ShieldCheck className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">NDA & Confidentiality</h2>
                  <p className="text-xs text-muted-foreground">
                    All project details and intellectual property are kept strictly confidential.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-semibold text-foreground">Direct Engineering Contact</h2>
                  <a
                    href="mailto:contact@sonderlabz.com"
                    className="text-xs text-primary hover:underline"
                  >
                    contact@sonderlabz.com
                  </a>
                </div>
              </div>
            </div>
          </FadeInView>

          <FadeInView direction="left" delay={0.15} className="lg:col-span-7">
            <ContactForm />
          </FadeInView>
        </div>
      </Container>
    </div>
  );
}

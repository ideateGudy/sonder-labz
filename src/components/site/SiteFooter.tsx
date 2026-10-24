import Link from "next/link";
import { Container } from "./container";
import { Logo } from "@/components/brand/Logo";

export function SiteFooter() {
  const currentYear = 2026;

  return (
    <footer className="border-t border-border bg-background/50 backdrop-blur-md pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8 mb-16">
          <div className="md:col-span-2 space-y-4">
            <Logo />
            <p className="max-w-sm text-sm text-muted-foreground leading-relaxed">
              Sonder Labz designs and builds high-craft web, mobile and desktop applications for ambitious businesses and founders.
            </p>
            <p className="text-xs text-muted-foreground pt-2">
              Led by{" "}
              <a
                href="https://dev.ideategudy.tech"
                target="_blank"
                rel="noreferrer"
                className="text-foreground hover:underline underline-offset-4"
              >
                dev.ideategudy.tech
              </a>
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Work
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About & Team
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="text-xs font-semibold tracking-wider uppercase text-foreground">
              Legal & Admin
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/admin"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between border-t border-border pt-8 text-xs text-muted-foreground gap-4">
          <p>© {currentYear} Sonder Labz. All rights reserved.</p>
          <p>Crafted with precision & care.</p>
        </div>
      </Container>
    </footer>
  );
}

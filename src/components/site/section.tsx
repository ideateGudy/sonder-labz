import * as React from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  container?: boolean;
}

export function Section({
  className,
  container = true,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-16 md:py-24 lg:py-32 relative", className)}
      {...props}
    >
      {container ? <Container>{children}</Container> : children}
    </section>
  );
}

export interface SectionHeadingProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  description,
  align = "left",
  className,
  ...props
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16 max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}

"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const glass = cva(
  [
    "relative rounded-[var(--radius-lg)] border",
    "border-[color:var(--glass-border)] bg-[color:var(--glass-bg)]",
    "shadow-[var(--glass-shadow)]",
    "backdrop-blur-xl backdrop-saturate-150",
    "supports-[not(backdrop-filter:blur(1px))]:bg-white/90 dark:supports-[not(backdrop-filter:blur(1px))]:bg-ink/90",
  ],
  {
    variants: {
      tone: {
        default: "",
        strong: "bg-[color:var(--glass-bg-strong)]",
        flat: "shadow-none backdrop-blur-md",
      },
      padding: {
        none: "",
        sm: "p-4",
        md: "p-5 md:p-6",
        lg: "p-6 md:p-8",
      },
      interactive: {
        true: "transition-colors duration-200 hover:bg-[color:var(--glass-bg-strong)] focus-within:ring-2 ring-ring",
        false: "",
      },
    },
    defaultVariants: {
      tone: "default",
      padding: "md",
      interactive: false,
    },
  }
);

export interface GlassCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof glass> {
  as?: React.ElementType;
}

export function GlassCard({
  as: Tag = "div",
  className,
  tone,
  padding,
  interactive,
  ...props
}: GlassCardProps) {
  return (
    <Tag
      className={cn(glass({ tone, padding, interactive }), className)}
      {...props}
    />
  );
}

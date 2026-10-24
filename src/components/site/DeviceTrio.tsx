"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { GlassCard } from "@/components/ui/glass-card";

export function DeviceTrio() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Scroll signature: frames drift gracefully as the hero scrolls away
  const xLeft = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -35]);
  const xRight = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 35]);
  const yMid = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -20]);

  // Entrance animation variants
  const frameEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

  const browserVariants = {
    hidden: { opacity: 0, x: -24, y: 15 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay: 0.2, ease: frameEase },
    },
  };

  const phoneVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 25 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.85, delay: 0.35, ease: frameEase },
    },
  };

  const desktopVariants = {
    hidden: { opacity: 0, x: 24, y: 20 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.8, delay: 0.5, ease: frameEase },
    },
  };

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="relative mx-auto aspect-[4/3] w-full max-w-xl select-none"
    >
      {/* 1. Browser Window (Web) */}
      <motion.div
        variants={reduce ? undefined : browserVariants}
        initial="hidden"
        animate="visible"
        style={{ x: xLeft }}
        className="absolute left-0 top-8 w-[64%] z-10"
      >
        <GlassCard tone="strong" padding="none" className="overflow-hidden border border-[color:var(--glass-border)] shadow-xl">
          {/* Browser header */}
          <div className="flex items-center gap-1.5 border-b border-border/50 bg-background/50 px-3.5 py-2.5">
            <div className="size-2.5 rounded-full bg-red-400/80" />
            <div className="size-2.5 rounded-full bg-yellow-400/80" />
            <div className="size-2.5 rounded-full bg-green-400/80" />
            <div className="mx-auto h-3 w-28 rounded-full bg-foreground/10" />
          </div>
          {/* Browser content preview */}
          <div className="p-4 space-y-3 bg-card/40">
            <div className="flex gap-2">
              <div className="h-4 w-1/3 rounded bg-primary/20" />
              <div className="h-4 w-1/4 rounded bg-foreground/10" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-16 rounded bg-foreground/5 border border-border/40 p-2 space-y-1.5">
                <div className="h-2 w-12 rounded bg-foreground/20" />
                <div className="h-4 w-8 rounded bg-primary/30" />
              </div>
              <div className="h-16 rounded bg-foreground/5 border border-border/40 p-2 space-y-1.5">
                <div className="h-2 w-10 rounded bg-foreground/20" />
                <div className="h-4 w-12 rounded bg-lume/30" />
              </div>
            </div>
            <div className="h-8 rounded bg-primary/10 border border-primary/20 flex items-center px-2">
              <div className="h-2 w-20 rounded bg-primary/40" />
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* 2. Mobile Phone (Mobile) */}
      <motion.div
        variants={reduce ? undefined : phoneVariants}
        initial="hidden"
        animate="visible"
        style={{ y: yMid }}
        className="absolute left-[44%] top-0 w-[30%] z-20"
      >
        <GlassCard tone="strong" padding="none" className="rounded-[28px] overflow-hidden border-2 border-border/80 shadow-2xl">
          {/* Phone notch */}
          <div className="flex justify-center pt-2 pb-1 bg-background/80">
            <div className="h-2.5 w-12 rounded-full bg-foreground/20" />
          </div>
          {/* Phone screen */}
          <div className="p-3 space-y-2.5 bg-card/60 min-h-[190px]">
            <div className="flex justify-between items-center">
              <div className="h-3 w-10 rounded bg-foreground/20" />
              <div className="size-4 rounded-full bg-lume/40" />
            </div>
            <div className="h-14 rounded-xl bg-gradient-to-br from-iris/30 to-iris/10 border border-iris/20 p-2 flex flex-col justify-end">
              <div className="h-2 w-14 rounded bg-white/60 mb-1" />
              <div className="h-3 w-20 rounded bg-white/80" />
            </div>
            <div className="space-y-1.5">
              <div className="h-6 rounded-lg bg-foreground/5 border border-border/40 flex items-center px-2">
                <div className="size-2 rounded-full bg-foreground/30 mr-1.5" />
                <div className="h-2 w-12 rounded bg-foreground/20" />
              </div>
              <div className="h-6 rounded-lg bg-foreground/5 border border-border/40 flex items-center px-2">
                <div className="size-2 rounded-full bg-foreground/30 mr-1.5" />
                <div className="h-2 w-16 rounded bg-foreground/20" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* 3. Desktop Application Window (Desktop) */}
      <motion.div
        variants={reduce ? undefined : desktopVariants}
        initial="hidden"
        animate="visible"
        style={{ x: xRight }}
        className="absolute right-0 bottom-2 w-[56%] z-15"
      >
        <GlassCard tone="strong" padding="none" className="overflow-hidden border border-[color:var(--glass-border)] shadow-xl">
          <div className="flex items-center justify-between border-b border-border/50 bg-background/50 px-3 py-2">
            <div className="h-2.5 w-16 rounded bg-foreground/20" />
            <div className="flex gap-1.5">
              <div className="size-2 rounded bg-foreground/20" />
              <div className="size-2 rounded bg-foreground/20" />
            </div>
          </div>
          <div className="p-3 bg-card/40 grid grid-cols-3 gap-2">
            <div className="col-span-1 border-r border-border/40 pr-2 space-y-1.5">
              <div className="h-2 w-full rounded bg-primary/30" />
              <div className="h-2 w-4/5 rounded bg-foreground/10" />
              <div className="h-2 w-3/4 rounded bg-foreground/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <div className="h-10 rounded bg-foreground/5 border border-border/30 p-1.5 flex flex-col justify-between">
                <div className="h-1.5 w-12 rounded bg-lume" />
                <div className="h-2 w-20 rounded bg-foreground/20" />
              </div>
              <div className="h-6 rounded bg-primary/20 border border-primary/30 flex items-center justify-center">
                <div className="h-2 w-12 rounded bg-primary" />
              </div>
            </div>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}

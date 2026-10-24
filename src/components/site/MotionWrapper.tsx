"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface FadeInViewProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export function FadeInView({
  children,
  className,
  id,
  delay = 0,
  direction = "up",
  distance = 24,
}: FadeInViewProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  const offsetMap = {
    up: { x: 0, y: distance },
    down: { x: 0, y: -distance },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = offsetMap[direction] || offsetMap.up;

  return (
    <motion.div
      id={id}
      initial={{ opacity: 0, x: initialOffset.x, y: initialOffset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.65,
        delay,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerChildrenProps {
  children?: React.ReactNode;
  className?: string;
  id?: string;
  staggerDelay?: number;
}

export function StaggerChildren({
  children,
  className,
  id,
  staggerDelay = 0.1,
}: StaggerChildrenProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <div id={id} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {React.Children.map(children, (child, idx) => (
        <motion.div
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

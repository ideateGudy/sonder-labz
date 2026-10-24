"use client";

import { motion, useReducedMotion } from "motion/react";
import * as React from "react";

export function HeroIntroAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className="space-y-6 text-left">{children}</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 text-left"
    >
      {React.Children.map(children, (child, idx) => (
        <motion.div key={idx} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

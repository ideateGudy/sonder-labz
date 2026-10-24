import { z } from "zod";

export const contentSchemas = {
  hero: z.object({
    headline: z.string().min(3).max(90),
    description: z.string().min(10).max(220),
    primaryCta: z.string().min(2).max(30),
    secondaryCta: z.string().min(2).max(30),
  }),
  servicesIntro: z.object({
    heading: z.string().max(80),
    subheading: z.string().max(200),
  }),
  process: z.object({
    heading: z.string().max(80),
    subheading: z.string().max(200).optional(),
    steps: z
      .array(
        z.object({
          number: z.string().max(10),
          title: z.string().max(40),
          body: z.string().max(240),
        })
      )
      .min(2)
      .max(8),
  }),
  about: z.object({
    heading: z.string().max(80),
    story: z.string().max(1200),
    values: z
      .array(
        z.object({
          title: z.string().max(40),
          description: z.string().max(200),
        })
      )
      .max(6)
      .optional(),
  }),
  cta: z.object({
    heading: z.string().max(90),
    body: z.string().max(200),
    button: z.string().max(30),
  }),
  footer: z.object({
    tagline: z.string().max(200),
    leadDeveloperUrl: z.string().url(),
  }),
  privacy: z.object({
    title: z.string().max(80),
    lastUpdated: z.string().max(40),
    content: z.string().max(10000),
  }),
  terms: z.object({
    title: z.string().max(80),
    lastUpdated: z.string().max(40),
    content: z.string().max(10000),
  }),
} as const;

export type SectionKey = keyof typeof contentSchemas;
export type SectionData<K extends SectionKey> = z.infer<(typeof contentSchemas)[K]>;

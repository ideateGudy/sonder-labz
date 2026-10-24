"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { createHash } from "node:crypto";
import { db } from "@/lib/db";
import { messages } from "@/lib/db/schema";
import { checkRateLimit } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(80),
  email: z.string().email("Enter an email like name@company.com.").max(254),
  projectType: z.enum(["web", "mobile", "desktop", "not_sure"]).optional(),
  message: z.string().min(10, "Please provide at least a sentence explaining your project.").max(2000),
  honeypot: z.string().max(0, "Invalid submission."), // Spam bot trap
});

export async function submitContactMessage(prevState: any, formData: FormData) {
  const honeypotVal = formData.get("website_url");
  const honeypotStr = typeof honeypotVal === "string" ? honeypotVal : "";

  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    projectType: formData.get("projectType") || undefined,
    message: formData.get("message"),
    honeypot: honeypotStr,
  };

  const parsed = contactSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      errors: parsed.error.flatten().fieldErrors,
      message: "Please check the form fields and correct any mistakes.",
    };
  }

  // Silent drop for bots
  if (raw.honeypot && raw.honeypot.length > 0) {
    return {
      ok: true,
      message: "Your message has been received. We will get back to you shortly.",
    };
  }

  // Rate limit by IP or email
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for") || "127.0.0.1";
  const ip = forwardedFor.split(",")[0].trim();
  const ipHash = createHash("sha256").update(ip).digest("hex");

  const limitCheck = await checkRateLimit("contact", ipHash);
  if (!limitCheck.ok) {
    return {
      ok: false,
      message: "Too many messages sent. Please wait a few moments before trying again.",
    };
  }

  if (db) {
    try {
      await db.insert(messages).values({
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        projectType: parsed.data.projectType,
        body: parsed.data.message,
        status: "new",
        ipHash,
      });
    } catch (err) {
      console.error("Failed to store contact submission:", err);
    }
  }

  return {
    ok: true,
    message: "Thank you for reaching out. We review every inquiry and typically reply within 24 hours.",
  };
}

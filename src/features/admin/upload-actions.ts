"use server";

import { requireAdmin } from "@/lib/auth/session";
import { uploadToCloudinary } from "@/lib/cloudinary";

export async function uploadImageAction(formData: FormData) {
  await requireAdmin();

  const file = formData.get("file") as File;
  if (!file) {
    return { ok: false, error: "No file was provided." };
  }

  // Validate MIME type
  const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
  if (!allowedTypes.includes(file.type)) {
    return { ok: false, error: "Only JPEG, PNG, WebP, and AVIF images are permitted." };
  }

  // Validate file size (max 5 MB)
  const MAX_SIZE = 5 * 1024 * 1024;
  if (file.size > MAX_SIZE) {
    return { ok: false, error: "Image file exceeds maximum 5MB size limit." };
  }

  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const result = await uploadToCloudinary(buffer, "sonder-labz/team");
    if (!result) {
      return {
        ok: false,
        error: "Cloudinary upload failed. Check your Cloudinary API credentials in .env.local.",
      };
    }

    return { ok: true, url: result.url };
  } catch (err: any) {
    console.error("Upload handler error:", err);
    return { ok: false, error: err.message || "Failed to upload image." };
  }
}

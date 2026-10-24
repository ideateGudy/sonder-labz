import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { rateLimits } from "@/lib/db/schema";

const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_ATTEMPTS = 5;

// In-memory fallback map when database is not connected
const memoryStore = new Map<string, { count: number; windowStart: number }>();

export async function checkRateLimit(
  action: string,
  identifier: string
): Promise<{ ok: boolean; remaining: number }> {
  const key = `${action}:${identifier.toLowerCase()}`;
  const now = Date.now();

  if (!db) {
    const record = memoryStore.get(key);
    if (!record || now - record.windowStart > WINDOW_MS) {
      memoryStore.set(key, { count: 1, windowStart: now });
      return { ok: true, remaining: MAX_ATTEMPTS - 1 };
    }

    if (record.count >= MAX_ATTEMPTS) {
      return { ok: false, remaining: 0 };
    }

    record.count += 1;
    return { ok: true, remaining: MAX_ATTEMPTS - record.count };
  }

  try {
    const [existing] = await db
      .select()
      .from(rateLimits)
      .where(eq(rateLimits.key, key));

    if (!existing || now - existing.windowStart.getTime() > WINDOW_MS) {
      await db
        .insert(rateLimits)
        .values({
          key,
          count: 1,
          windowStart: new Date(),
        })
        .onConflictDoUpdate({
          target: rateLimits.key,
          set: { count: 1, windowStart: new Date() },
        });

      return { ok: true, remaining: MAX_ATTEMPTS - 1 };
    }

    if (existing.count >= MAX_ATTEMPTS) {
      return { ok: false, remaining: 0 };
    }

    await db
      .update(rateLimits)
      .set({ count: existing.count + 1 })
      .where(eq(rateLimits.key, key));

    return { ok: true, remaining: MAX_ATTEMPTS - (existing.count + 1) };
  } catch (error) {
    console.error("Rate limit check failed, allowing conservatively:", error);
    return { ok: true, remaining: 1 };
  }
}

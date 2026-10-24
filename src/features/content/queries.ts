import "server-only";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { contentBlocks } from "@/lib/db/schema";
import { contentSchemas, type SectionKey, type SectionData } from "./schemas";
import { defaults } from "./defaults";

export async function getContent<K extends SectionKey>(key: K): Promise<SectionData<K>> {
  if (!db) {
    return defaults[key];
  }

  try {
    const [row] = await db
      .select()
      .from(contentBlocks)
      .where(eq(contentBlocks.sectionKey, key));

    if (!row || !row.data) {
      return defaults[key];
    }

    const parsed = contentSchemas[key].safeParse(row.data);
    return (parsed.success ? parsed.data : defaults[key]) as SectionData<K>;
  } catch (err) {
    console.error(`Failed to fetch content block [${key}]:`, err);
    return defaults[key];
  }
}

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL;

// We provide a fallback mock or lazy init to prevent build breaks when DATABASE_URL is not yet configured
export const sql = connectionString ? neon(connectionString) : (null as any);
export const db = connectionString
  ? drizzle(sql, { schema })
  : (null as any);

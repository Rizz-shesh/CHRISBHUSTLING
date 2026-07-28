// TEMPLATE-MANAGED (__ prefix) — do not edit. Define tables in ./schema.ts
// and query via: import { db } from "./database";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

// Supabase's pooled (pgbouncer) connection string — required for serverless
// functions, which open many short-lived connections per invocation.
// A short connect_timeout makes a missing/wrong env var fail fast instead of
// hanging until the function's maxDuration.
const client = postgres(process.env.DATABASE_URL!, { prepare: false, connect_timeout: 8 });

export const db = drizzle(client, { schema });

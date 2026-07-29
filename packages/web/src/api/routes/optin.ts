import type { Hono } from "hono";
import { z } from "zod";
import { and, eq, gte } from "drizzle-orm";
import { db } from "../database";
import * as schema from "../database/schema";

const optinInput = z.object({
  firstName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
});

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;

function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip") ?? "unknown";
}

/** Exit-intent / delayed opt-in popup — plain endpoint (not oRPC) so the client can hit a fixed URL with a bare fetch(). */
export function registerOptin(app: Hono) {
  app.post("/api/optin", async (c) => {
    let body: unknown;
    try {
      body = await c.req.json();
    } catch {
      return c.json({ ok: false, error: "Invalid request body." }, 400);
    }

    const parsed = optinInput.safeParse(body);
    if (!parsed.success) {
      return c.json({ ok: false, error: "A first name and valid email are required." }, 400);
    }

    const ip = clientIp(c.req.raw.headers);
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW_MS);
    const recent = await db
      .select({ id: schema.optinSubmissions.id })
      .from(schema.optinSubmissions)
      .where(and(eq(schema.optinSubmissions.ip, ip), gte(schema.optinSubmissions.createdAt, windowStart)));

    if (recent.length >= RATE_LIMIT_MAX) {
      return c.json({ ok: false, error: "Too many submissions. Please try again later." }, 429);
    }

    const [row] = await db
      .insert(schema.optinSubmissions)
      .values({
        firstName: parsed.data.firstName,
        email: parsed.data.email.toLowerCase(),
        ip,
      })
      .returning();
    if (!row) return c.json({ ok: false, error: "Could not save your submission." }, 500);

    const webhook = process.env.GHL_OPTIN_WEBHOOK_URL?.trim();
    if (!webhook) return c.json({ ok: true, id: row.id, ghlSynced: false });

    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: row.firstName,
          email: row.email,
          source: "chrisbhustling-site-optin",
          tag: "funnel-search-optin",
        }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);

      await db
        .update(schema.optinSubmissions)
        .set({ pushedToGhlAt: new Date(), ghlError: null })
        .where(eq(schema.optinSubmissions.id, row.id));
      return c.json({ ok: true, id: row.id, ghlSynced: true });
    } catch (error) {
      await db
        .update(schema.optinSubmissions)
        .set({ ghlError: (error as Error).message.slice(0, 500) })
        .where(eq(schema.optinSubmissions.id, row.id));
      return c.json({ ok: true, id: row.id, ghlSynced: false });
    }
  });
}

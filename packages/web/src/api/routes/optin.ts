import type { Hono } from "hono";
import { z } from "zod";
import { and, eq, gte } from "drizzle-orm";
import { db } from "../database";
import * as schema from "../database/schema";
import { clientIp, isLikelyBot, spamProtectionInput } from "../spam-protection";

const optinInput = z.object({
  firstName: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(200),
  ...spamProtectionInput,
});

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const DUPLICATE_WINDOW_MS = 24 * 60 * 60 * 1_000;

/** Exit-intent / delayed opt-in popup — plain endpoint (not oRPC) so the client can hit a fixed URL with a bare fetch(). */
export function optin(app: Hono) {
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
    if (isLikelyBot(parsed.data)) return c.json({ ok: true, id: 0, ghlSynced: false });

    const ip = clientIp(c.req.raw.headers);
    const email = parsed.data.email.toLowerCase();
    const now = Date.now();
    const recentIpPromise =
      ip === "unknown"
        ? Promise.resolve([])
        : db
            .select({ id: schema.optinSubmissions.id })
            .from(schema.optinSubmissions)
            .where(
              and(
                eq(schema.optinSubmissions.ip, ip),
                gte(schema.optinSubmissions.createdAt, new Date(now - RATE_LIMIT_WINDOW_MS)),
              ),
            )
            .limit(RATE_LIMIT_MAX);
    const recentEmailPromise = db
      .select({ id: schema.optinSubmissions.id })
      .from(schema.optinSubmissions)
      .where(
        and(
          eq(schema.optinSubmissions.email, email),
          gte(schema.optinSubmissions.createdAt, new Date(now - DUPLICATE_WINDOW_MS)),
        ),
      )
      .limit(1);
    const [recentIp, recentEmail] = await Promise.all([recentIpPromise, recentEmailPromise]);

    if (recentIp.length >= RATE_LIMIT_MAX || recentEmail.length > 0) {
      return c.json({ ok: true, id: 0, ghlSynced: false });
    }

    const [row] = await db
      .insert(schema.optinSubmissions)
      .values({
        firstName: parsed.data.firstName,
        email,
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

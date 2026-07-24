import { z } from "zod";
import { desc, eq } from "drizzle-orm";
import { ORPCError } from "@orpc/server";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

const creds = z.object({
  username: z.string(),
  password: z.string(),
});

function checkAuth(username: string, password: string) {
  const u = process.env.ADMIN_USERNAME;
  const p = process.env.ADMIN_PASSWORD;
  if (!u || !p) {
    throw new ORPCError("INTERNAL_SERVER_ERROR", {
      message: "Admin credentials are not configured.",
    });
  }
  if (username !== u || password !== p) {
    throw new ORPCError("UNAUTHORIZED", { message: "Invalid credentials." });
  }
}

export const admin = {
  // Verify a login attempt. Returns ok on success, throws UNAUTHORIZED otherwise.
  login: base.input(creds).handler(({ input }) => {
    checkAuth(input.username, input.password);
    return { ok: true as const };
  }),

  // Full list of rental signups — credentials re-verified on every call.
  listSignups: base.input(creds).handler(async ({ input }) => {
    checkAuth(input.username, input.password);
    const rows = await db
      .select()
      .from(schema.rentalSignups)
      .orderBy(desc(schema.rentalSignups.createdAt));
    return rows;
  }),

  listServiceInquiries: base.input(creds).handler(async ({ input }) => {
    checkAuth(input.username, input.password);
    return db
      .select()
      .from(schema.serviceInquiries)
      .orderBy(desc(schema.serviceInquiries.createdAt));
  }),

  deleteServiceInquiry: base
    .input(creds.extend({ id: z.number().int().positive() }))
    .handler(async ({ input }) => {
      checkAuth(input.username, input.password);
      await db.delete(schema.serviceInquiries).where(eq(schema.serviceInquiries.id, input.id));
      return { ok: true as const, id: input.id };
    }),

  deleteRentalSignup: base
    .input(creds.extend({ id: z.number().int().positive() }))
    .handler(async ({ input }) => {
      checkAuth(input.username, input.password);
      await db.delete(schema.rentalSignups).where(eq(schema.rentalSignups.id, input.id));
      return { ok: true as const, id: input.id };
    }),

  // Push a single lead to GoHighLevel via the configured inbound webhook,
  // then stamp the row as pushed. Credentials re-verified on every call.
  pushToGhl: base
    .input(creds.extend({ id: z.number().int().positive() }))
    .handler(async ({ input }) => {
      checkAuth(input.username, input.password);

      const webhook = process.env.GHL_WEBHOOK_URL?.trim();
      if (!webhook) {
        throw new ORPCError("PRECONDITION_FAILED", {
          message:
            "GHL webhook is not configured. Add GHL_WEBHOOK_URL to the .env file.",
        });
      }

      const [row] = await db
        .select()
        .from(schema.rentalSignups)
        .where(eq(schema.rentalSignups.id, input.id))
        .limit(1);

      if (!row) {
        throw new ORPCError("NOT_FOUND", { message: "Lead not found." });
      }

      const payload = {
        name: row.name,
        email: row.email,
        phone: row.phone ?? "",
        area: row.area ?? "",
        createdAt: row.createdAt.toISOString(),
        source: "chrisbhustling.com — rental signup",
      };

      let res: Response;
      try {
        res = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        throw new ORPCError("BAD_GATEWAY", {
          message: `Could not reach GHL webhook: ${(err as Error).message}`,
        });
      }

      if (!res.ok) {
        throw new ORPCError("BAD_GATEWAY", {
          message: `GHL webhook responded ${res.status}.`,
        });
      }

      const pushedAt = new Date();
      await db
        .update(schema.rentalSignups)
        .set({ pushedToGhlAt: pushedAt })
        .where(eq(schema.rentalSignups.id, input.id));

      return { ok: true as const, id: input.id, pushedToGhlAt: pushedAt };
    }),
};

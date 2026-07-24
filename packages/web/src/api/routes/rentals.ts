import { z } from "zod";
import { eq } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

export const rentals = {
  signup: base
    .input(
      z.object({
        name: z.string().min(1).max(120),
        email: z.string().email().max(200),
        phone: z.string().max(40).optional(),
        area: z.string().max(120).optional(),
        consent: z.literal(true),
      }),
    )
    .handler(async ({ input }) => {
      const [row] = await db
        .insert(schema.rentalSignups)
        .values({
          name: input.name.trim(),
          email: input.email.trim().toLowerCase(),
          phone: input.phone?.trim() || null,
          area: input.area?.trim() || null,
        })
        .returning();
      const webhook = process.env.GHL_WEBHOOK_URL?.trim();
      if (!webhook) return { ok: true, id: row.id, ghlSynced: false };

      try {
        const response = await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            leadType: "service-inquiry",
            source: "Chris B Hustling website",
            inquiryId: `rental-${row.id}`,
            service: "Rental Housing",
            serviceSlug: "rental-housing",
            name: row.name,
            email: row.email,
            phone: row.phone ?? "",
            preferredContact: row.phone ? "Phone" : "Email",
            message: row.area ? `Rental area or city: ${row.area}` : "Rental housing inquiry",
            consent: input.consent,
            createdAt: row.createdAt.toISOString(),
          }),
        });
        if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
        await db
          .update(schema.rentalSignups)
          .set({ pushedToGhlAt: new Date() })
          .where(eq(schema.rentalSignups.id, row.id));
        return { ok: true, id: row.id, ghlSynced: true };
      } catch {
        return { ok: true, id: row.id, ghlSynced: false };
      }
    }),
};

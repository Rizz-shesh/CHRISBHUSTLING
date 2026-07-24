import { z } from "zod";
import { eq } from "drizzle-orm";
import { base } from "../__core/app";
import { db } from "../database";
import * as schema from "../database/schema";

const inquiryInput = z.object({
  serviceSlug: z.string().min(1).max(120),
  serviceTitle: z.string().min(1).max(160),
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  phone: z.string().min(7).max(40),
  preferredContact: z.enum(["Phone", "Email", "Text"]),
  message: z.string().max(2000).optional(),
  consent: z.literal(true),
});

export const services = {
  inquire: base.input(inquiryInput).handler(async ({ input }) => {
    const [row] = await db
      .insert(schema.serviceInquiries)
      .values({
        serviceSlug: input.serviceSlug,
        serviceTitle: input.serviceTitle,
        name: input.name.trim(),
        email: input.email.trim().toLowerCase(),
        phone: input.phone.trim(),
        preferredContact: input.preferredContact,
        message: input.message?.trim() || null,
        consent: input.consent,
      })
      .returning();

    const webhook = process.env.GHL_WEBHOOK_URL?.trim();
    if (!webhook) return { ok: true as const, id: row.id, ghlSynced: false };

    const payload = {
      leadType: "service-inquiry",
      source: "Chris B Hustling website",
      inquiryId: row.id,
      service: row.serviceTitle,
      serviceSlug: row.serviceSlug,
      name: row.name,
      email: row.email,
      phone: row.phone,
      preferredContact: row.preferredContact,
      message: row.message ?? "",
      consent: row.consent,
      createdAt: row.createdAt.toISOString(),
    };

    try {
      const response = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);

      const pushedAt = new Date();
      await db
        .update(schema.serviceInquiries)
        .set({ pushedToGhlAt: pushedAt, ghlError: null })
        .where(eq(schema.serviceInquiries.id, row.id));
      return { ok: true as const, id: row.id, ghlSynced: true };
    } catch (error) {
      await db
        .update(schema.serviceInquiries)
        .set({ ghlError: (error as Error).message.slice(0, 500) })
        .where(eq(schema.serviceInquiries.id, row.id));
      return { ok: true as const, id: row.id, ghlSynced: false };
    }
  }),
};

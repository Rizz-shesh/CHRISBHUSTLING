import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

/**
 * Rental list signups — the "apartments & houses for rent" lead-capture insert.
 */
export const rentalSignups = sqliteTable("rental_signups", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  area: text("area"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  // Set when this lead has been pushed to GoHighLevel (GHL) from the admin dashboard.
  pushedToGhlAt: integer("pushed_to_ghl_at", { mode: "timestamp" }),
});

export const serviceInquiries = sqliteTable("service_inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  serviceSlug: text("service_slug").notNull(),
  serviceTitle: text("service_title").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredContact: text("preferred_contact").notNull(),
  message: text("message"),
  consent: integer("consent", { mode: "boolean" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  pushedToGhlAt: integer("pushed_to_ghl_at", { mode: "timestamp" }),
  ghlError: text("ghl_error"),
});

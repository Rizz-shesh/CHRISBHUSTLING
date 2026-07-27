import { pgTable, serial, text, boolean, timestamp } from "drizzle-orm/pg-core";

/**
 * Rental list signups — the "apartments & houses for rent" lead-capture insert.
 */
export const rentalSignups = pgTable("rental_signups", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  area: text("area"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  // Set when this lead has been pushed to GoHighLevel (GHL) from the admin dashboard.
  pushedToGhlAt: timestamp("pushed_to_ghl_at"),
});

export const serviceInquiries = pgTable("service_inquiries", {
  id: serial("id").primaryKey(),
  serviceSlug: text("service_slug").notNull(),
  serviceTitle: text("service_title").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  preferredContact: text("preferred_contact").notNull(),
  message: text("message"),
  consent: boolean("consent").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  pushedToGhlAt: timestamp("pushed_to_ghl_at"),
  ghlError: text("ghl_error"),
});

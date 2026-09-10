import { z } from "zod";

const MIN_FORM_AGE_MS = 2_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1_000;
const CLOCK_SKEW_MS = 10_000;

export const spamProtectionInput = {
  // Humans never see or fill this field. Basic form bots usually do.
  website: z.string().max(200),
  formStartedAt: z.number().int().positive(),
};

export type SpamProtectionInput = {
  website: string;
  formStartedAt: number;
};

export function isLikelyBot(input: SpamProtectionInput, now = Date.now()) {
  const age = now - input.formStartedAt;
  return input.website.trim().length > 0 || age < MIN_FORM_AGE_MS || age > MAX_FORM_AGE_MS + CLOCK_SKEW_MS;
}

export function clientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return headers.get("x-real-ip")?.trim() || "unknown";
}

export const discardedSubmission = { ok: true as const, id: 0, ghlSynced: false };

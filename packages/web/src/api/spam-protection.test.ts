import { describe, expect, test } from "bun:test";
import { clientIp, isLikelyBot } from "./spam-protection";

describe("spam protection", () => {
  const now = 2_000_000;

  test("accepts an empty honeypot after a realistic completion time", () => {
    expect(isLikelyBot({ website: "", formStartedAt: now - 5_000 }, now)).toBe(false);
  });

  test("rejects a filled honeypot", () => {
    expect(isLikelyBot({ website: "https://spam.example", formStartedAt: now - 5_000 }, now)).toBe(true);
  });

  test("rejects submissions completed implausibly quickly", () => {
    expect(isLikelyBot({ website: "", formStartedAt: now - 500 }, now)).toBe(true);
  });

  test("rejects stale form timestamps", () => {
    expect(isLikelyBot({ website: "", formStartedAt: now - 25 * 60 * 60 * 1_000 }, now)).toBe(true);
  });

  test("uses the first forwarded IP address", () => {
    expect(clientIp(new Headers({ "x-forwarded-for": "203.0.113.8, 10.0.0.1" }))).toBe("203.0.113.8");
  });
});

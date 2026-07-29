import type { RouterClient } from "@orpc/server";
import { base, createApp } from "./__core/app";
import { ping } from "./routes/ping";
import { rentals } from "./routes/rentals";
import { admin } from "./routes/admin";
import { services } from "./routes/services";
import { registerOptin } from "./routes/optin";

// API features are oRPC procedures, one file per feature in ./routes/,
// composed into this router — typed end-to-end via the clients
// (web: src/web/lib/api.ts, mobile: lib/api.ts).
// Keep each routes/ file under 500 lines (`bun run lint` enforces this);
// split into more feature files as they grow.
// Patterns and examples: skills/app/references/api.md
export const router = base.router({
  ping,
  rentals,
  admin,
  services,
});

export type AppRouter = typeof router;
/** Typed client for the router — used by the web and mobile api clients. */
export type AppRouterClient = RouterClient<AppRouter>;

const app = createApp(router);
// Rare plain-HTTP endpoints (webhooks, streaming, the Better Auth handler)
// register here with full paths, e.g. app.post("/api/webhooks/example", ...)
registerOptin(app);

export default app;

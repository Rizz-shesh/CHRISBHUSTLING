import { getRequestListener } from "@hono/node-server";
import app from "../packages/web/src/api";

// Explicit Node.js (req, res) handler instead of hono/vercel's Web-standard
// handle(), which relies on Vercel statically detecting the Fetch signature
// from source — detection that fails against our pre-bundled function file,
// leaving every request to hang until maxDuration.
export default getRequestListener(app.fetch);

import { handle } from "hono/vercel";
import app from "../packages/web/src/api";

export default handle(app);

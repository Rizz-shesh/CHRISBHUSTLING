import { handle } from "hono/vercel";

import app from "../../web/src/api";

export default handle(app);

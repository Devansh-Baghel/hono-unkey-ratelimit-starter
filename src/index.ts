import { Hono } from "hono";
import { env } from "hono/adapter";
import { Ratelimit } from "@unkey/ratelimit";
import { getConnInfo } from "hono/cloudflare-workers";

const app = new Hono();

// Home route (unprotected)
app.get("/", (c) => {
  return c.text(
    "Welcome to Hono app on Cloudflare Workers with Unkey rate limiting"
  );
});

// Protected route with rate limiting
app.get("/secret", async (c) => {
  const { UNKEY_ROOT_KEY } = env<{ UNKEY_ROOT_KEY: string }>(c);

  if (!UNKEY_ROOT_KEY) {
    return c.text("Server misconfiguration: UNKEY_ROOT_KEY not set", 500);
  }

  const limiter = new Ratelimit({
    namespace: "cloudflare-hono-example",
    limit: 2,
    duration: "30s",
    rootKey: UNKEY_ROOT_KEY,
  });

  // Use the 'CF-Connecting-IP' header to identify the user
  const identifier = c.req.raw.headers.get("CF-Connecting-IP")!;

  const ratelimit = await limiter.limit(identifier);
  if (!ratelimit.success) {
    return c.text("Please try again later", 429);
  }

  return c.text("ok");
});

export default app;

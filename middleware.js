import arcjet, { detectBot, shield } from "@arcjet/next";
import { clerkMiddleware } from "@clerk/nextjs/server";

// Create Arcjet middleware
const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({
      mode: "LIVE"
    }),
    detectBot({
      mode: "LIVE",
      deny: ["browsers", "libraries", "unknown"]
    })
  ]
});

// Clerk authentication middleware configuration
export default clerkMiddleware({
  beforeAuth: (req) => {
    // Execute Arcjet middleware before authentication
    return aj(req);
  },
  publicRoutes: ["/", "/api/inngest", "/api/seed", "/sign-in(.*)", "/sign-up(.*)"]
});

// Configure Middleware matcher
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"]
};

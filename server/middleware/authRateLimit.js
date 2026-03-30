const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 5;

const attempts = new Map();

const getClientKey = (req) => {
  const forwardedFor = String(req.headers["x-forwarded-for"] || "")
    .split(",")[0]
    .trim();
  return forwardedFor || req.ip || "unknown";
};

const cleanupExpired = (now) => {
  for (const [key, entry] of attempts.entries()) {
    if (now - entry.firstAttemptAt >= WINDOW_MS) {
      attempts.delete(key);
    }
  }
};

const loginRateLimit = (req, res, next) => {
  const now = Date.now();
  cleanupExpired(now);

  const key = getClientKey(req);
  const entry = attempts.get(key);

  if (!entry) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    return next();
  }

  if (now - entry.firstAttemptAt >= WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now });
    return next();
  }

  if (entry.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil(
      (WINDOW_MS - (now - entry.firstAttemptAt)) / 1000,
    );
    res.setHeader("Retry-After", String(retryAfterSeconds));
    return res.status(429).json({
      success: false,
      message: "Too many login attempts. Please try again later.",
    });
  }

  entry.count += 1;
  attempts.set(key, entry);
  return next();
};

module.exports = {
  loginRateLimit,
};

import rateLimit from "express-rate-limit";

export const voteLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 10
});

export const createPollLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20
});
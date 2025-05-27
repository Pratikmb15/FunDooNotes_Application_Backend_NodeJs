import rateLimit from "express-rate-limit";

// Rate limiter middleware: limit each IP to 100 requests per 15 minutes
const apiRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: {
        status: 429,//status code 429-To many request
        message: 'Too many requests from this IP, please try again later.',
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default apiRateLimiter;

export const loginRateLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutes
    max: 5,
    message: 'Too many login attempts, try again in 5 minutes.',
});

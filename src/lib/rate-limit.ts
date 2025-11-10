// lib/rate-limit.ts

// Simple in-memory rate limiter
// للإنتاج، استخدم Vercel KV أو Upstash Redis

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const store: RateLimitStore = {};

// تنظيف البيانات القديمة كل ساعة
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach((key) => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60 * 60 * 1000);

export async function rateLimit(identifier: string) {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 3; // 3 requests per hour

  if (!store[identifier] || store[identifier].resetTime < now) {
    // إنشاء أو إعادة تعيين النافذة
    store[identifier] = {
      count: 1,
      resetTime: now + windowMs,
    };
    return { success: true, remaining: maxRequests - 1 };
  }

  if (store[identifier].count >= maxRequests) {
    // تجاوز الحد الأقصى
    return {
      success: false,
      remaining: 0,
      resetTime: new Date(store[identifier].resetTime),
    };
  }

  // زيادة العداد
  store[identifier].count++;
  return {
    success: true,
    remaining: maxRequests - store[identifier].count,
  };
}
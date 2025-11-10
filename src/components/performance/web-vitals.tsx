"use client";

import { useReportWebVitals } from "next/web-vitals";
import { event } from "@/lib/analytics/google-analytics";

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.log(metric);
    }

    // Send to analytics
    event({
      action: metric.name,
      category: "Web Vitals",
      label: metric.id,
      value: Math.round(metric.value),
    });

    // Send to Vercel Analytics automatically
  });

  return null;
}
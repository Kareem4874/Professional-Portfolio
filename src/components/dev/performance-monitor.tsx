"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";

interface PerformanceMetrics {
  fcp?: number;
  lcp?: number;
  cls?: number;
  fid?: number;
  ttfb?: number;
}

export function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({});

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Observe performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const metric = entry as PerformanceEntry & { name?: string; value?: number };
        
        if (metric.name && metric.value !== undefined) {
          setMetrics((prev) => ({
            ...prev,
            [metric.name]: metric.value,
          }));
        }
      }
    });

    observer.observe({ entryTypes: ["measure", "navigation", "paint"] });

    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card className="p-4 bg-background/95 backdrop-blur">
        <h3 className="font-semibold mb-2 text-xs">Performance Metrics</h3>
        <div className="space-y-1 text-xs">
          {metrics.fcp && (
            <div>FCP: {Math.round(metrics.fcp)}ms</div>
          )}
          {metrics.lcp && (
            <div>LCP: {Math.round(metrics.lcp)}ms</div>
          )}
          {metrics.ttfb && (
            <div>TTFB: {Math.round(metrics.ttfb)}ms</div>
          )}
        </div>
      </Card>
    </div>
  );
}
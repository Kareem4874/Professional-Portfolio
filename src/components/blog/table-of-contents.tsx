"use client";

import { useEffect, useState } from "react";
import { TableOfContentsItem } from "@/types/blog";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  items: TableOfContentsItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0% 0% -80% 0%" }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (items.length === 0) return null;

  return (
    <nav className="space-y-1">
      <h3 className="font-heading font-semibold mb-4 text-sm uppercase tracking-wider">
        On This Page
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li
            key={item.id}
            style={{ paddingLeft: `${(item.level - 1) * 0.75}rem` }}
          >
            <button
              onClick={() => handleClick(item.id)}
              className={cn(
                "text-sm text-left transition-colors hover:text-accent w-full",
                activeId === item.id
                  ? "text-accent font-semibold"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
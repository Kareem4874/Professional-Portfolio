"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface BlogFiltersProps {
  tags: { name: string; count: number }[];
  selectedTag: string | null;
  onTagChange: (tag: string | null) => void;
}

export function BlogFilters({ tags, selectedTag, onTagChange }: BlogFiltersProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-heading font-semibold">Filter by Tag</h3>
        {selectedTag && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onTagChange(null)}
            className="gap-2"
          >
            <X className="h-4 w-4" />
            Clear
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <Badge
            key={tag.name}
            variant={selectedTag === tag.name ? "accent" : "secondary"}
            className="cursor-pointer hover:scale-105 transition-transform"
            onClick={() => onTagChange(selectedTag === tag.name ? null : tag.name)}
          >
            {tag.name} ({tag.count})
          </Badge>
        ))}
      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { BlogPost } from "@/types";

export function BlogSearch({ posts }: { posts: BlogPost[] }) {
  const [query, setQuery] = useState("");

  return (
    <div className="relative mb-8 max-w-md">
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search articles..."
        className="pl-10"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          const cards = document.querySelectorAll("[data-blog-card]");
          const q = e.target.value.toLowerCase();
          cards.forEach((el) => {
            const title = el.getAttribute("data-title")?.toLowerCase() ?? "";
            const hidden = q && !title.includes(q);
            (el as HTMLElement).style.display = hidden ? "none" : "";
          });
        }}
      />
    </div>
  );
}

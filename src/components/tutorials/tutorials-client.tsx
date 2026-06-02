"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Eye, Heart, Play, FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TUTORIAL_CATEGORIES } from "@/lib/constants";
import type { Tutorial } from "@/types";

const typeIcons = {
  youtube: Play,
  pdf: FileText,
  article: BookOpen,
  blog: BookOpen,
};

export function TutorialsClient({ tutorials }: { tutorials: Tutorial[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return tutorials.filter((t) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        t.title.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchCat = category === "all" || t.category === category;
      return matchSearch && matchCat;
    });
  }, [tutorials, search, category]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tutorials..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All categories</option>
          {TUTORIAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((t, idx) => {
          const Icon = typeIcons[t.type];
          return (
            <Card
              key={`${t.id ?? t.slug}-${idx}`}
              className="glass overflow-hidden hover:shadow-lg transition-shadow"
            >
              {t.thumbnail && !broken[t.id] && (
                <div className="relative aspect-video">
                  {t.thumbnail.startsWith("blob:") ||
                  t.thumbnail.startsWith("data:") ? (
                    // plain img for blob/data URLs
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={t.thumbnail}
                      alt={t.title}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={t.thumbnail}
                      alt={t.title}
                      fill
                      className="object-cover"
                      sizes="400px"
                      onError={() => setBroken((s) => ({ ...s, [t.id]: true }))}
                    />
                  )}
                </div>
              )}
              {(!t.thumbnail || broken[t.id]) && (
                <div className="relative aspect-video flex items-center justify-center bg-muted/20">
                  <div className="text-muted-foreground">No image</div>
                </div>
              )}
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  <Badge variant="accent">{t.category}</Badge>
                  <Badge variant="outline">
                    <Icon className="h-3 w-3 mr-1 inline" />
                    {t.type}
                  </Badge>
                </div>
                <CardTitle className="text-lg">
                  <Link
                    href={`/tutorials/${t.slug}`}
                    className="hover:text-primary"
                  >
                    {t.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {t.description}
                </p>
                <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {t.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {t.likes}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Eye, Heart, Play, FileText, BookOpen } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TUTORIAL_CATEGORIES } from "@/lib/constants";
import {
  getYouTubeEmbedUrl,
  getYouTubeVideoId,
  getYouTubeWatchUrl,
} from "@/lib/utils";
import type { Tutorial } from "@/types";

const typeIcons = {
  youtube: Play,
  pdf: FileText,
  article: BookOpen,
  blog: BookOpen,
};

function getTutorialThumbnail(tutorial: Tutorial) {
  if (tutorial.thumbnail) return tutorial.thumbnail;
  if (tutorial.type === "youtube" && tutorial.videoUrl) {
    const id = getYouTubeVideoId(tutorial.videoUrl);
    return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
  }
  return null;
}

function getTutorialPlayerUrl(tutorial: Tutorial) {
  if (tutorial.type === "youtube") return null;
  return tutorial.videoUrl ?? null;
}

function getTutorialWatchUrl(tutorial: Tutorial) {
  if (tutorial.type === "youtube") return getYouTubeWatchUrl(tutorial.videoUrl);
  return tutorial.videoUrl ?? null;
}

export function TutorialsClient({ tutorials }: { tutorials: Tutorial[] }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const [embedError, setEmbedError] = useState<Record<string, boolean>>({});
  const [activeTutorialId, setActiveTutorialId] = useState<string | null>(null);

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
          const thumbnail = getTutorialThumbnail(t);
          const playerUrl = getTutorialPlayerUrl(t);
          const watchUrl = getTutorialWatchUrl(t);
          const canOpen = t.type === "youtube" ? !!watchUrl : !!playerUrl;
          const isActive = activeTutorialId === t.id && !!playerUrl;
          return (
            <Card
              key={`${t.id ?? t.slug}-${idx}`}
              className="glass overflow-hidden transform transition-all duration-300 hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg cursor-pointer group"
              onClick={() => {
                if (t.type === "youtube" && watchUrl) {
                  window.open(watchUrl, "_blank", "noopener,noreferrer");
                  return;
                }
                if (playerUrl && !embedError[t.id]) {
                  setActiveTutorialId((current) =>
                    current === t.id ? null : t.id,
                  );
                }
              }}
            >
              {isActive && playerUrl && !embedError[t.id] ? (
                <div className="relative aspect-video bg-black">
                  {t.type === "youtube" ? (
                    <iframe
                      src={playerUrl}
                      title={t.title}
                      className="h-full w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                      referrerPolicy="strict-origin-when-cross-origin"
                      onError={() =>
                        setEmbedError((s) => ({ ...s, [t.id]: true }))
                      }
                      allowFullScreen
                    />
                  ) : (
                    <video
                      src={playerUrl}
                      controls
                      autoPlay
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              ) : isActive && embedError[t.id] ? (
                <div className="relative aspect-video flex flex-col items-center justify-center gap-3 bg-black p-4 text-center text-sm text-white">
                  <p>Video cannot be played inline here.</p>
                  <a
                    href={watchUrl ?? t.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white px-4 py-2 text-black"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Open on YouTube
                  </a>
                </div>
              ) : (
                <div className="relative aspect-video group-hover:opacity-90 transition-opacity duration-300">
                  {thumbnail && !broken[t.id] ? (
                    thumbnail.startsWith("blob:") ||
                    thumbnail.startsWith("data:") ? (
                      // plain img for blob/data URLs
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={thumbnail}
                        alt={t.title}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <Image
                        src={thumbnail}
                        alt={t.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                        onError={() =>
                          setBroken((s) => ({ ...s, [t.id]: true }))
                        }
                      />
                    )
                  ) : (
                    <div className="relative aspect-video flex items-center justify-center bg-muted/20">
                      <div className="text-muted-foreground">No image</div>
                    </div>
                  )}
                  {canOpen && !isActive && (
                    <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/25 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      <div className="rounded-full bg-white/90 p-3 shadow-lg">
                        <Play className="h-5 w-5 text-black" />
                      </div>
                    </div>
                  )}
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
                    onClick={(e) => e.stopPropagation()}
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

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function extractYouTubeSrc(source: string): string | null {
  const iframeMatch = source.match(/src=["']([^"']+)["']/i);
  if (iframeMatch) return iframeMatch[1];
  return null;
}

export function getYouTubeVideoId(url?: string) {
  if (!url) return null;
  const candidate = extractYouTubeSrc(url) ?? url;

  try {
    const parsed = new URL(candidate);
    const hostname = parsed.hostname.toLowerCase();
    const pathname = parsed.pathname.replace(/\/+$/, "");

    if (hostname.includes("youtu.be")) {
      return pathname.slice(1);
    }
    if (hostname.includes("youtube.com")) {
      if (pathname.startsWith("/watch")) {
        return parsed.searchParams.get("v");
      }
      if (pathname.startsWith("/embed/")) {
        return pathname.split("/embed/")[1];
      }
      if (pathname.startsWith("/shorts/")) {
        return pathname.split("/shorts/")[1];
      }
      if (pathname.startsWith("/v/")) {
        return pathname.split("/v/")[1];
      }
      return parsed.searchParams.get("v");
    }
    return null;
  } catch {
    return null;
  }
}

export function getYouTubeWatchUrl(source?: string) {
  const id = getYouTubeVideoId(source);
  return id ? `https://www.youtube.com/watch?v=${id}` : null;
}

export function getYouTubeEmbedUrl(source?: string) {
  const id = getYouTubeVideoId(source);
  if (!id) return null;
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    playsinline: "1",
    controls: "1",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(typeof date === "string" ? new Date(date) : date);
}

export function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200));
}

export function truncate(text: string, length: number): string {
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}

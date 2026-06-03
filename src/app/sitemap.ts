import type { MetadataRoute } from "next";
import { SITE, NAV_LINKS } from "@/lib/constants";
import { getBlogPosts, getProjects, getTutorials } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url;
  const staticPages = NAV_LINKS.map((link) => ({
    url: `${base}${link.href === "/" ? "" : link.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: link.href === "/" ? 1 : 0.8,
  }));

  const [projects, tutorials, posts] = await Promise.all([
    getProjects(),
    getTutorials(),
    getBlogPosts(),
  ]);

  const dynamic = [
    ...projects.map((p) => ({
      url: `${base}/projects/${p.slug}`,
      lastModified: new Date(p.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...tutorials.map((t) => ({
      url: `${base}/tutorials/${t.slug}`,
      lastModified: new Date(t.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...posts.map((p) => ({
      url: `${base}/blog/${p.slug}`,
      lastModified: new Date(p.publishedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [...staticPages, ...dynamic];
}

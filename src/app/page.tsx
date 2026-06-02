import Link from "next/link";
import Image from "next/image";
import { HeroSection } from "@/components/home/hero-section";
import { StatsSection } from "@/components/home/stats-section";
import { SectionHeading } from "@/components/shared/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getApprovedTestimonials,
  getCertificates,
  getProjects,
  getSettings,
  getTutorials,
} from "@/lib/data";
import { formatDate, getYouTubeVideoId } from "@/lib/utils";
import { Star } from "lucide-react";

export default async function HomePage() {
  const [settings, projects, tutorials, certificates, testimonials] =
    await Promise.all([
      getSettings(),
      getProjects(true),
      getTutorials(),
      getCertificates(),
      getApprovedTestimonials(),
    ]);

  const featuredTutorials = tutorials.filter((t) => t.featured).slice(0, 3);
  const featuredCerts = certificates.filter((c) => c.featured).slice(0, 3);

  const getTutorialThumbnail = (tutorial: {
    thumbnail?: string;
    type: string;
    videoUrl?: string;
  }) => {
    if (tutorial.thumbnail) return tutorial.thumbnail;
    if (tutorial.type === "youtube" && tutorial.videoUrl) {
      const id = getYouTubeVideoId(tutorial.videoUrl);
      return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
    }
    return null;
  };

  return (
    <>
      <HeroSection subtitle={settings.heroSubtitle} />
      <StatsSection stats={settings.stats} />

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Featured Projects" href="/projects" />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-bg">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Featured Tutorials" href="/tutorials" />
          <div className="grid gap-6 md:grid-cols-3">
            {featuredTutorials.map((t) => {
              const thumbnail = getTutorialThumbnail(t);
              return (
                <Card key={t.id} className="glass overflow-hidden">
                  {thumbnail && (
                    <div className="relative aspect-video">
                      <Image
                        src={thumbnail}
                        alt={t.title}
                        fill
                        className="object-cover"
                        sizes="400px"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <Badge variant="accent">{t.category}</Badge>
                    <CardTitle className="text-lg">
                      <Link href={`/tutorials/${t.slug}`}>{t.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {t.description}
                    </p>
                    <p className="mt-2 text-xs text-muted-foreground">
                      {t.views} views · {t.likes} likes
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="Latest Certificates" href="/certificates" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCerts.map((c) => (
              <Card
                key={c.id}
                className="glass overflow-hidden group hover:shadow-lg transition-shadow"
              >
                {c.imageUrl && (
                  <div className="relative aspect-4/3">
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="400px"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{c.title}</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    {c.organization} · {formatDate(c.date)}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 gradient-bg">
        <div className="mx-auto max-w-7xl px-4 lg:px-8">
          <SectionHeading title="What People Say" href="/testimonials" />
          <div className="grid gap-6 md:grid-cols-2">
            {testimonials.slice(0, 2).map((t) => (
              <Card key={t.id} className="glass p-6">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground italic">
                  &ldquo;{t.message}&rdquo;
                </p>
                <p className="mt-4 font-semibold">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.occupation}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

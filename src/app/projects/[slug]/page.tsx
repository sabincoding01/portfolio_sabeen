import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { ExternalLink, ArrowLeft } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return createMetadata({
    title: project.title,
    description: project.description,
    path: `/projects/${slug}`,
    image: project.thumbnail,
  });
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  const sections = [
    { title: "Case Study", content: project.caseStudy },
    { title: "Challenges", content: project.challenges },
    { title: "Solutions", content: project.solutions },
    { title: "Lessons Learned", content: project.lessons },
  ];

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 lg:px-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/projects"><ArrowLeft className="h-4 w-4" /> Back to projects</Link>
      </Button>

      <div className="relative aspect-video overflow-hidden rounded-2xl mb-8">
        <Image src={project.thumbnail} alt={project.title} fill className="object-cover" priority sizes="900px" />
      </div>

      <h1 className="text-4xl font-bold">{project.title}</h1>
      <p className="mt-4 text-lg text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <Badge key={t} variant="secondary">{t}</Badge>
        ))}
      </div>

      <div className="mt-6 flex gap-4">
        {project.githubUrl && (
          <Button variant="outline" asChild>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
              <GitHubIcon className="h-4 w-4" /> GitHub
            </a>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="gradient" asChild>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Live Demo
            </a>
          </Button>
        )}
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {project.screenshots.map((src, i) => (
            <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
              <Image src={src} alt={`Screenshot ${i + 1}`} fill className="object-cover" sizes="500px" />
            </div>
          ))}
        </div>
      )}

      <div className="mt-12 space-y-8">
        {sections.map(
          (s) =>
            s.content && (
              <section key={s.title} className="glass rounded-2xl p-6">
                <h2 className="text-xl font-bold mb-3">{s.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.content}</p>
              </section>
            )
        )}
      </div>
    </article>
  );
}

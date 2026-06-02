import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTutorialBySlug, getTutorials } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { ArrowLeft, ExternalLink } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tutorials = await getTutorials();
  return tutorials.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) return {};
  return createMetadata({
    title: tutorial.title,
    description: tutorial.description,
    path: `/tutorials/${slug}`,
  });
}

export default async function TutorialDetailPage({ params }: Props) {
  const { slug } = await params;
  const tutorial = await getTutorialBySlug(slug);
  if (!tutorial) notFound();

  const all = await getTutorials();
  const related = all
    .filter((t) => t.category === tutorial.category && t.id !== tutorial.id)
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/tutorials"><ArrowLeft className="h-4 w-4" /> Back</Link>
      </Button>
      <Badge variant="accent" className="mb-4">{tutorial.category}</Badge>
      <h1 className="text-4xl font-bold">{tutorial.title}</h1>
      <p className="mt-4 text-muted-foreground">{tutorial.description}</p>
      <p className="mt-2 text-sm text-muted-foreground">{tutorial.views} views · {tutorial.likes} likes</p>

      {tutorial.videoUrl && (
        <div className="mt-8 aspect-video rounded-2xl overflow-hidden bg-black">
          <iframe
            src={tutorial.videoUrl.replace("watch?v=", "embed/")}
            title={tutorial.title}
            className="h-full w-full"
            allowFullScreen
          />
        </div>
      )}

      {tutorial.content && (
        <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{tutorial.content}</ReactMarkdown>
        </div>
      )}

      {tutorial.pdfUrl && (
        <Button className="mt-6" asChild>
          <a href={tutorial.pdfUrl} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4" /> Download PDF Notes
          </a>
        </Button>
      )}

      {related.length > 0 && (
        <section className="mt-12 border-t border-border pt-8">
          <h2 className="text-xl font-bold mb-4">Related Tutorials</h2>
          <ul className="space-y-2">
            {related.map((t) => (
              <li key={t.id}>
                <Link href={`/tutorials/${t.slug}`} className="text-primary hover:underline">{t.title}</Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}

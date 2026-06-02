import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { formatDate, readingTime } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};
  return createMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${slug}`,
    image: post.coverImage,
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/blog"><ArrowLeft className="h-4 w-4" /> Back to blog</Link>
      </Button>
      {post.coverImage && (
        <div className="relative aspect-video rounded-2xl overflow-hidden mb-8">
          <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority sizes="800px" />
        </div>
      )}
      <div className="flex flex-wrap gap-2 mb-4">
        {post.categories.map((c) => <Badge key={c} variant="secondary">{c}</Badge>)}
        {post.tags.map((t) => <Badge key={t} variant="outline">#{t}</Badge>)}
      </div>
      <h1 className="text-4xl font-bold">{post.title}</h1>
      <p className="mt-4 text-muted-foreground">
        {post.author ?? "Sabin Timalsina"} · {formatDate(post.publishedAt)} · {readingTime(post.content)} min read
      </p>
      <div className="prose prose-lg dark:prose-invert mt-8 max-w-none">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
      </div>
    </article>
  );
}

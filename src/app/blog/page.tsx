import Link from "next/link";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { getBlogPosts } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { readingTime, formatDate } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BlogSearch } from "@/components/blog/blog-search";

export const metadata = createMetadata({
  title: "Blog",
  description: "Articles on React, web development, and teaching.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featured = posts.filter((p) => p.featured);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Blog" description="Insights on development, design, and teaching." />
      <BlogSearch posts={posts} />

      {featured.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-6">Featured</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {featured.map((post) => (
              <Card key={post.id} className="glass overflow-hidden md:col-span-2 md:grid md:grid-cols-2">
                {post.coverImage && (
                  <div className="relative aspect-video md:aspect-auto md:min-h-[240px]">
                    <Image src={post.coverImage} alt={post.title} fill className="object-cover" sizes="600px" />
                  </div>
                )}
                <div className="p-6 flex flex-col justify-center">
                  <Badge className="w-fit mb-2">Featured</Badge>
                  <CardTitle className="text-2xl">
                    <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
                  </CardTitle>
                  <p className="mt-2 text-muted-foreground">{post.excerpt}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {formatDate(post.publishedAt)} · {readingTime(post.content)} min read
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card key={post.id} className="glass">
            <CardHeader>
              <div className="flex flex-wrap gap-1 mb-2">
                {post.categories.map((c) => (
                  <Badge key={c} variant="secondary">{c}</Badge>
                ))}
              </div>
              <CardTitle>
                <Link href={`/blog/${post.slug}`} className="hover:text-primary">{post.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-3">{post.excerpt}</p>
              <p className="mt-3 text-xs text-muted-foreground">
                {formatDate(post.publishedAt)} · {readingTime(post.content)} min
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

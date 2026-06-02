"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AdminHeader } from "@/components/admin/admin-header";
import { ModuleCards } from "@/components/admin/module-cards";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { isFirebaseConfigured } from "@/lib/firebase";
import {
  seedProjects,
  seedCertificates,
  seedTutorials,
  seedTestimonials,
  seedBlogPosts,
  seedAchievements,
  seedGallery,
  seedSkills,
} from "@/data/seed";
import type {
  Project,
  Certificate,
  Tutorial,
  Testimonial,
  BlogPost,
  Achievement,
  GalleryItem,
  Skill,
} from "@/types";
import { AlertCircle } from "lucide-react";

export default function AdminDashboardPage() {
  const { items: projects } = useFirestoreCrud<Project>(COLLECTIONS.projects, seedProjects);
  const { items: certificates } = useFirestoreCrud<Certificate>(COLLECTIONS.certificates, seedCertificates);
  const { items: tutorials } = useFirestoreCrud<Tutorial>(COLLECTIONS.tutorials, seedTutorials);
  const { items: testimonials } = useFirestoreCrud<Testimonial>(COLLECTIONS.testimonials, seedTestimonials);
  const { items: blogPosts } = useFirestoreCrud<BlogPost>(COLLECTIONS.blogPosts, seedBlogPosts);
  const { items: achievements } = useFirestoreCrud<Achievement>(COLLECTIONS.achievements, seedAchievements);
  const { items: gallery } = useFirestoreCrud<GalleryItem>(COLLECTIONS.gallery, seedGallery);
  const { items: skills } = useFirestoreCrud<Skill>(COLLECTIONS.skills, seedSkills);

  const counts = useMemo(
    () => ({
      projects: projects.length,
      certificates: certificates.length,
      tutorials: tutorials.length,
      testimonials: testimonials.length,
      blogPosts: blogPosts.length,
      achievements: achievements.length,
      gallery: gallery.length,
      skills: skills.length,
      contacts: 0,
    }),
    [projects, certificates, tutorials, testimonials, blogPosts, achievements, gallery, skills]
  );

  const chartData = [
    { name: "Projects", count: counts.projects },
    { name: "Tutorials", count: counts.tutorials },
    { name: "Blog", count: counts.blogPosts },
    { name: "Certs", count: counts.certificates },
  ];

  const pendingTestimonials = testimonials.filter((t) => !t.approved).length;
  const firebaseOn = isFirebaseConfigured();

  return (
    <div className="max-w-7xl">
      <AdminHeader
        title="Dashboard"
        description="Manage your entire portfolio from one place — projects, content, media, and site settings."
      />

      {!firebaseOn && (
        <Card className="mb-8 border-amber-500/40 bg-amber-500/5">
          <CardContent className="flex gap-4 p-4 sm:items-center">
            <AlertCircle className="h-8 w-8 shrink-0 text-amber-500" />
            <div className="flex-1">
              <p className="font-medium">Demo mode active</p>
              <p className="text-sm text-muted-foreground mt-1">
                You can browse and preview data. To save changes permanently, add Firebase keys to{" "}
                <code className="text-xs bg-muted px-1 rounded">.env.local</code> and restart the server.
              </p>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/settings">Setup guide</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {pendingTestimonials > 0 && (
        <Card className="mb-8 border-amber-500/50">
          <CardContent className="flex flex-wrap items-center justify-between gap-4 p-4">
            <p className="text-amber-700 dark:text-amber-300">
              <strong>{pendingTestimonials}</strong> testimonial(s) waiting for approval
            </p>
            <Button size="sm" asChild>
              <Link href="/admin/testimonials">Review now</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-10">
        {[
          { label: "Total content", value: Object.values(counts).reduce((a, b) => a + b, 0) },
          { label: "Projects", value: counts.projects },
          { label: "Tutorials", value: counts.tutorials },
          { label: "Blog posts", value: counts.blogPosts },
        ].map((stat) => (
          <Card key={stat.label} className="bg-gradient-to-br from-primary/5 to-transparent">
            <CardContent className="p-5">
              <p className="text-3xl font-bold tabular-nums">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle className="text-lg">Content at a glance</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="rgb(99, 102, 241)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Manage everything</h2>
      <p className="text-muted-foreground mb-6 text-sm">
        Click a module to add, edit, or delete items. Changes sync to your live site when Firebase is connected.
      </p>
      <ModuleCards counts={counts} />
    </div>
  );
}

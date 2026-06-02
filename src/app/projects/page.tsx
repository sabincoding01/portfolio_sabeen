import { ProjectsClient } from "@/components/projects/projects-client";
import { PageHeader } from "@/components/layout/page-header";
import { getProjects } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Projects",
  description: "Portfolio projects built with React, Next.js, and modern web technologies.",
  path: "/projects",
});

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader
        title="Projects"
        description="Case studies and live work showcasing modern web development."
      />
      <ProjectsClient projects={projects} />
    </div>
  );
}

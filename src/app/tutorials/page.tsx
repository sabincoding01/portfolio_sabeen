import { TutorialsClient } from "@/components/tutorials/tutorials-client";
import { PageHeader } from "@/components/layout/page-header";
import { getTutorials } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Tutorials",
  description: "YouTube videos, PDF notes, articles, and blog tutorials.",
  path: "/tutorials",
});

export default async function TutorialsPage() {
  const tutorials = await getTutorials();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader title="Tutorials" description="Learn React, JavaScript, Python, and more." />
      <TutorialsClient tutorials={tutorials} />
    </div>
  );
}

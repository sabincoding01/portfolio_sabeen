import { PageHeader } from "@/components/layout/page-header";
import { GitHubHub } from "@/components/github/github-hub";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "GitHub Hub",
  description: "Live GitHub stats, repositories, and contribution activity.",
  path: "/github",
});

export default function GitHubPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader
        title="GitHub Hub"
        description="Repositories, languages, and open-source activity."
      />
      <GitHubHub />
    </div>
  );
}

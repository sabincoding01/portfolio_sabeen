import { PageHeader } from "@/components/layout/page-header";
import { SkillsGrid } from "@/components/skills/skills-grid";
import { getSkills } from "@/lib/data";
import { createMetadata } from "@/lib/seo";

export const metadata = createMetadata({
  title: "Skills",
  description: "Technical skills in React, Next.js, JavaScript, Firebase, and design tools.",
  path: "/skills",
});

export default async function SkillsPage() {
  const skills = await getSkills();
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader
        title="Skills & Expertise"
        description="Proficiency across front-end, back-end, and creative tools."
      />
      <SkillsGrid skills={skills} />
    </div>
  );
}

import { PageHeader } from "@/components/layout/page-header";
import { getAchievements } from "@/lib/data";
import { createMetadata } from "@/lib/seo";
import { formatDate } from "@/lib/utils";
import { Award, Briefcase, GraduationCap, Rocket } from "lucide-react";

const typeIcons = {
  internship: Briefcase,
  training: GraduationCap,
  certification: Award,
  project: Rocket,
  other: Award,
};

export const metadata = createMetadata({
  title: "Achievements",
  description: "Milestones, internships, training programs, and certifications.",
  path: "/achievements",
});

export default async function AchievementsPage() {
  const achievements = await getAchievements();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 lg:px-8">
      <PageHeader title="Achievements" description="A timeline of milestones and accomplishments." />
      <div className="relative border-l-2 border-primary/30 pl-8 space-y-10">
        {achievements.map((a) => {
          const Icon = typeIcons[a.type] ?? Award;
          return (
            <div key={a.id} className="relative glass rounded-2xl p-6 -ml-2">
              <span className="absolute -left-[45px] flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <p className="text-sm text-primary font-medium">{formatDate(a.date)}</p>
              <h3 className="text-xl font-bold mt-1">{a.title}</h3>
              <p className="text-muted-foreground mt-2">{a.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

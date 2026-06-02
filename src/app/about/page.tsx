import { PageHeader } from "@/components/layout/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { seedTimeline } from "@/data/seed";
import { createMetadata } from "@/lib/seo";
import { GraduationCap, Briefcase, Target, Users } from "lucide-react";

export const metadata = createMetadata({
  title: "About",
  description: "Learn about Sabin Timalsina's journey, education, internships, and teaching experience.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader
        title="About Me"
        description="Front-end developer, trainer, and content creator passionate about empowering learners."
      />

      <section className="mb-16">
        <Card className="glass">
          <CardContent className="p-8 prose prose-lg dark:prose-invert max-w-none">
            <p>
              I&apos;m <strong>Sabin Timalsina</strong>, a front-end developer specializing in React and Next.js.
              I combine clean code with premium UI design to build experiences that impress recruiters,
              clients, and students alike.
            </p>
            <p>
              Beyond development, I conduct training programs and create tutorials that make complex
              topics accessible. My mission is to bridge the gap between learning and industry-ready skills.
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-8">Career Journey</h2>
        <div className="relative border-l-2 border-primary/30 pl-8 space-y-8">
          {seedTimeline.map((event) => (
            <div key={event.id} className="relative">
              <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {event.year.slice(2)}
              </span>
              <h3 className="font-semibold text-lg">{event.title}</h3>
              <p className="text-muted-foreground mt-1">{event.description}</p>
              <span className="text-sm text-primary">{event.year}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: GraduationCap, title: "Education", desc: "Computer Science with focus on web technologies and UI/UX." },
          { icon: Briefcase, title: "Internship", desc: "Front-end internship building production React applications." },
          { icon: Users, title: "Teaching", desc: "120+ students trained through bootcamps and workshops." },
          { icon: Target, title: "Vision", desc: "Empower developers in Nepal with world-class web skills." },
        ].map((item) => (
          <Card key={item.title} className="glass">
            <CardHeader>
              <item.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle>{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

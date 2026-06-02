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
              I&apos;m <strong>Sabin Timalsina</strong>, a web developer, data analyst, and graphics designer.
              I build responsive, user-friendly websites and digital experiences using React, JavaScript,
              HTML, CSS, Tailwind, and Material UI.
            </p>
            <p>
              I have worked on school management systems, educational websites, expense trackers,
              weather apps, and business websites. I combine technical development with creative design
              to deliver products that are both functional and visually appealing.
            </p>
            <p>
              Currently pursuing a BSc CSIT degree, I also create learning resources, teach students,
              and support teams through robotics training, workshops, and collaborative projects.
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
          { icon: GraduationCap, title: "Education", desc: "Currently pursuing BSc CSIT with a focus on full-stack web development and data analysis." },
          { icon: Briefcase, title: "Experience", desc: "Built responsive websites, school systems, and business solutions while working as a computer instructor." },
          { icon: Users, title: "Training", desc: "Delivered robotics training and developer workshops to students and learner groups." },
          { icon: Target, title: "Achievements", desc: "Hackathon shortlisted, intern-certified, and experienced in team management." },
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

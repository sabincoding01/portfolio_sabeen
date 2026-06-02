import { PageHeader } from "@/components/layout/page-header";
import { seedServices } from "@/data/seed";
import { createMetadata } from "@/lib/seo";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata = createMetadata({
  title: "Services",
  description: "Front-end development, React apps, training, and UI/UX design services.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <PageHeader
        title="Services"
        description="Professional development, design, and training for your next project."
      />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {seedServices.map((service) => {
          const Icon = (Icons[service.icon as keyof typeof Icons] ?? Icons.Code2) as LucideIcon;
          return (
            <Card key={service.id} className="glass hover:shadow-xl transition-all hover:-translate-y-1">
              <CardHeader>
                <Icon className="h-10 w-10 text-primary mb-2" />
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{service.description}</p>
                <ul className="space-y-2 text-sm">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="mt-12 text-center">
        <Button variant="gradient" size="lg" asChild>
          <Link href="/contact">Get a Quote</Link>
        </Button>
      </div>
    </div>
  );
}

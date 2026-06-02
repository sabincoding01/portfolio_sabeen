"use client";

import { motion } from "framer-motion";
import { FolderKanban, Award, BookOpen, Clock, Users } from "lucide-react";
import { AnimatedCounter } from "@/components/shared/animated-counter";
import type { SiteSettings } from "@/types";

const statConfig = [
  { key: "projects" as const, label: "Projects Completed", icon: FolderKanban },
  { key: "certificates" as const, label: "Certificates Earned", icon: Award },
  { key: "tutorials" as const, label: "Tutorials Published", icon: BookOpen },
  { key: "yearsLearning" as const, label: "Years of Learning", icon: Clock },
  { key: "studentsTaught" as const, label: "Students Taught", icon: Users },
];

export function StatsSection({ stats }: { stats?: SiteSettings["stats"] }) {
  const defaults = {
    projects: 24,
    certificates: 18,
    tutorials: 45,
    yearsLearning: 5,
    studentsTaught: 120,
  };
  const data = { ...defaults, ...stats };

  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {statConfig.map((stat, i) => (
            <motion.div
              key={stat.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass rounded-2xl p-6 text-center"
            >
              <stat.icon className="mx-auto h-8 w-8 text-primary" />
              <p className="mt-4 text-3xl font-bold">
                <AnimatedCounter value={data[stat.key]} suffix="+" />
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

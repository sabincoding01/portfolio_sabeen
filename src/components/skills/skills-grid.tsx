"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Skill, SkillCategory } from "@/types";

const categoryLabels: Record<SkillCategory, string> = {
  frontend: "Front-End",
  backend: "Back-End",
  tools: "Tools & Design",
};

export function SkillsGrid({ skills }: { skills: Skill[] }) {
  const categories: SkillCategory[] = ["frontend", "backend", "tools"];

  return (
    <div className="space-y-12">
      {categories.map((cat) => {
        const items = skills.filter((s) => s.category === cat);
        if (!items.length) return null;
        return (
          <section key={cat}>
            <h2 className="text-xl font-bold mb-6">{categoryLabels[cat]}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((skill, i) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="glass hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-base">{skill.name}</CardTitle>
                        <span className="text-sm font-bold text-primary">{skill.proficiency}%</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress value={skill.proficiency} className="h-2" />
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

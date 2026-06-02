"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ADMIN_MODULES } from "@/lib/admin-modules";

interface ModuleCardsProps {
  counts: Record<string, number>;
}

export function ModuleCards({ counts }: ModuleCardsProps) {
  const modules = ADMIN_MODULES.filter((m) => m.href !== "/admin");

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {modules.map((mod, i) => {
        const count = mod.collection ? counts[mod.collection] ?? 0 : 0;
        return (
          <motion.div
            key={mod.href}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className="group h-full border-border/80 bg-card/80 hover:border-primary/40 hover:shadow-lg transition-all">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <mod.icon className="h-5 w-5" />
                  </div>
                  {mod.collection && (
                    <Badge variant="secondary" className="tabular-nums">
                      {count} items
                    </Badge>
                  )}
                </div>
                <CardTitle className="text-lg mt-3">{mod.label}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2 min-h-[2.5rem]">
                  {mod.description}
                </p>
                <div className="mt-4 flex gap-2">
                  <Button variant="default" size="sm" className="flex-1" asChild>
                    <Link href={mod.href}>
                      Manage <ArrowRight className="h-4 w-4 ml-1 opacity-70 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="sm" asChild title={`Add ${mod.label}`}>
                    <Link href={mod.href}>
                      <Plus className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/icons/social-icons";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/types";

export function ProjectCard({
  project,
  index = 0,
}: {
  project: Project;
  index?: number;
}) {
  const [broken, setBroken] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group overflow-hidden glass transition-all hover:shadow-xl hover:-translate-y-1">
        <div className="relative aspect-video overflow-hidden">
          {project.thumbnail && !broken ? (
            project.thumbnail.startsWith("blob:") ||
            project.thumbnail.startsWith("data:") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.thumbnail}
                alt={project.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 400px"
                onError={() => setBroken(true)}
              />
            )
          ) : (
            <div className="flex items-center justify-center bg-muted/20 w-full h-full">
              No image
            </div>
          )}
        </div>
        <CardHeader>
          <CardTitle className="line-clamp-1">
            <Link
              href={`/projects/${project.slug}`}
              className="hover:text-primary"
            >
              {project.title}
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <GitHubIcon />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="ml-auto text-sm font-medium text-primary hover:underline"
          >
            View case study →
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

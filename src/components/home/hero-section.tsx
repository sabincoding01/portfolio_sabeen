"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons/social-icons";
import { SITE, TYPING_ROLES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TypingEffect } from "@/components/shared/typing-effect";

export function HeroSection({ subtitle }: { subtitle?: string }) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-28 pb-16">
      <div className="mesh-bg absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
            Welcome to my portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
            Hi, I&apos;m{" "}
            <span className="gradient-text">{SITE.name}</span>
          </h1>
          <p className="mt-4 text-xl text-muted-foreground md:text-2xl">
            <TypingEffect words={TYPING_ROLES} className="font-medium text-foreground" />
          </p>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed">
            {subtitle ??
              "I build premium web experiences with React & Next.js, train developers, and create content that empowers the next generation of builders."}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="gradient" size="lg" asChild>
              <a href={SITE.cvUrl} download>
                <Download className="h-5 w-5" /> Download CV
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">
                <Mail className="h-5 w-5" /> Contact Me
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex gap-4">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="rounded-full glass p-3 hover:scale-110 transition-transform" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="rounded-full glass p-3 hover:scale-110 transition-transform" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={SITE.twitter} target="_blank" rel="noopener noreferrer" className="rounded-full glass p-3 hover:scale-110 transition-transform" aria-label="Twitter">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.28 4.28 0 001.88-2.37 8.53 8.53 0 01-2.7 1.03 4.26 4.26 0 00-7.28 3.88A12.1 12.1 0 013 4.9a4.26 4.26 0 001.32 5.69 4.22 4.22 0 01-1.93-.53v.05a4.26 4.26 0 003.42 4.18 4.3 4.3 0 01-1.92.07 4.26 4.26 0 003.98 2.96A8.55 8.55 0 012 19.54a12.07 12.07 0 006.54 1.92c7.85 0 12.14-6.5 12.14-12.13 0-.18-.01-.35-.02-.53A8.67 8.67 0 0024 5.5a8.44 8.44 0 01-2.54.7z" />
              </svg>
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl dark:border-white/10">
            <Image
              src={SITE.image}
              alt={SITE.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 400px"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

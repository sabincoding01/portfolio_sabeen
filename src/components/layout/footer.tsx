import Link from "next/link";
import { Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, YouTubeIcon } from "@/components/icons/social-icons";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="text-xl font-bold gradient-text">{SITE.name}</p>
            <p className="mt-2 text-sm text-muted-foreground">{SITE.title}</p>
            <div className="mt-4 flex gap-3">
              <a href={SITE.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <GitHubIcon className="text-muted-foreground hover:text-primary" />
              </a>
              <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <LinkedInIcon className="text-muted-foreground hover:text-primary" />
              </a>
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <YouTubeIcon className="text-muted-foreground hover:text-primary" />
              </a>
              <a href={`mailto:${SITE.email}`} aria-label="Email">
                <Mail className="h-5 w-5 text-muted-foreground hover:text-primary" />
              </a>
            </div>
          </div>
          <div>
            <p className="font-semibold">Quick Links</p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {NAV_LINKS.slice(0, 8).map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold">Get in Touch</p>
            <p className="mt-3 text-sm text-muted-foreground">{SITE.email}</p>
            <p className="text-sm text-muted-foreground">{SITE.phone}</p>
            <Link
              href="/contact"
              className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
            >
              Contact Form →
            </Link>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Trophy,
  BookOpen,
  FileText,
  Images,
  MessageSquare,
  Wrench,
  Settings,
  Mail,
  type LucideIcon,
} from "lucide-react";

export interface AdminModule {
  href: string;
  label: string;
  description: string;
  icon: LucideIcon;
  group: "overview" | "content" | "media" | "site";
  collection?: string;
}

export const ADMIN_MODULES: AdminModule[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Overview, analytics, and quick actions",
    icon: LayoutDashboard,
    group: "overview",
  },
  {
    href: "/admin/projects",
    label: "Projects",
    description: "Portfolio projects, case studies, and links",
    icon: FolderKanban,
    group: "content",
    collection: "projects",
  },
  {
    href: "/admin/tutorials",
    label: "Tutorials",
    description: "Videos, PDFs, articles, and categories",
    icon: BookOpen,
    group: "content",
    collection: "tutorials",
  },
  {
    href: "/admin/blog",
    label: "Blog",
    description: "Posts, tags, categories, and featured articles",
    icon: FileText,
    group: "content",
    collection: "blogPosts",
  },
  {
    href: "/admin/certificates",
    label: "Certificates",
    description: "Credentials, images, and PDF downloads",
    icon: Award,
    group: "content",
    collection: "certificates",
  },
  {
    href: "/admin/achievements",
    label: "Achievements",
    description: "Timeline milestones and accomplishments",
    icon: Trophy,
    group: "content",
    collection: "achievements",
  },
  {
    href: "/admin/skills",
    label: "Skills",
    description: "Proficiency levels and skill categories",
    icon: Wrench,
    group: "content",
    collection: "skills",
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    description: "Training, events, and work photos",
    icon: Images,
    group: "media",
    collection: "gallery",
  },
  {
    href: "/admin/testimonials",
    label: "Testimonials",
    description: "Approve and manage visitor feedback",
    icon: MessageSquare,
    group: "media",
    collection: "testimonials",
  },
  {
    href: "/admin/contacts",
    label: "Messages",
    description: "Contact form submissions",
    icon: Mail,
    group: "media",
    collection: "contacts",
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Hero text, stats, and site configuration",
    icon: Settings,
    group: "site",
  },
];

export const ADMIN_NAV_GROUPS = [
  { id: "overview" as const, label: "Overview" },
  { id: "content" as const, label: "Content" },
  { id: "media" as const, label: "Media & inbox" },
  { id: "site" as const, label: "Site" },
];

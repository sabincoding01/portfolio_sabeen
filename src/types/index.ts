export type SkillCategory = "frontend" | "backend" | "tools";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  icon?: string;
  order?: number;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  screenshots?: string[];
  caseStudy?: string;
  challenges?: string;
  solutions?: string;
  lessons?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Certificate {
  id: string;
  title: string;
  description: string;
  organization: string;
  date: string;
  imageUrl?: string;
  fileUrl?: string;
  fileType?: "image" | "pdf";
  featured?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  type: "internship" | "training" | "certification" | "project" | "other";
  icon?: string;
}

export type TutorialType = "youtube" | "pdf" | "article" | "blog";
export type TutorialCategory =
  | "React"
  | "JavaScript"
  | "Python"
  | "HTML/CSS"
  | "AI Tools";

export interface Tutorial {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: TutorialType;
  category: TutorialCategory;
  content?: string;
  videoUrl?: string;
  pdfUrl?: string;
  thumbnail?: string;
  views: number;
  likes: number;
  featured?: boolean;
  publishedAt: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  categories: string[];
  tags: string[];
  featured?: boolean;
  publishedAt: string;
  author?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo?: string;
  occupation: string;
  rating: number;
  message: string;
  approved: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  description?: string;
  createdAt: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  type: "education" | "work" | "teaching" | "milestone";
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
}

export interface SiteSettings {
  heroTitle?: string;
  heroSubtitle?: string;
  stats?: {
    projects: number;
    certificates: number;
    tutorials: number;
    yearsLearning: number;
    studentsTaught: number;
  };
  social?: Record<string, string>;
}

export interface AnalyticsSnapshot {
  visitors: number;
  pageViews: number;
  tutorials: number;
  certificates: number;
  projects: number;
  feedback: number;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

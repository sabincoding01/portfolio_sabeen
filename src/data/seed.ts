import type {
  Achievement,
  BlogPost,
  Certificate,
  GalleryItem,
  Project,
  Service,
  SiteSettings,
  Skill,
  Testimonial,
  TimelineEvent,
  Tutorial,
} from "@/types";

export const defaultSettings: SiteSettings = {
  heroTitle: "Sabin Timalsina",
  heroSubtitle:
    "I craft premium web experiences with React & Next.js, train developers, and create educational content that empowers learners.",
  stats: {
    projects: 24,
    certificates: 18,
    tutorials: 45,
    yearsLearning: 5,
    studentsTaught: 120,
  },
};

export const seedSkills: Skill[] = [
  { id: "1", name: "HTML", category: "frontend", proficiency: 95, order: 1 },
  { id: "2", name: "CSS", category: "frontend", proficiency: 92, order: 2 },
  { id: "3", name: "JavaScript", category: "frontend", proficiency: 90, order: 3 },
  { id: "4", name: "React", category: "frontend", proficiency: 88, order: 4 },
  { id: "5", name: "Next.js", category: "frontend", proficiency: 85, order: 5 },
  { id: "6", name: "Tailwind CSS", category: "frontend", proficiency: 90, order: 6 },
  { id: "7", name: "PHP", category: "backend", proficiency: 70, order: 7 },
  { id: "8", name: "Firebase", category: "backend", proficiency: 78, order: 8 },
  { id: "9", name: "Git", category: "tools", proficiency: 85, order: 9 },
  { id: "10", name: "GitHub", category: "tools", proficiency: 88, order: 10 },
  { id: "11", name: "Canva", category: "tools", proficiency: 80, order: 11 },
  { id: "12", name: "Photoshop", category: "tools", proficiency: 72, order: 12 },
];

export const seedProjects: Project[] = [
  {
    id: "1",
    slug: "premium-portfolio-platform",
    title: "Premium Portfolio Platform",
    description:
      "Full-stack personal brand platform with CMS, analytics, and AI assistant built with Next.js and Firebase.",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
    technologies: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
    githubUrl: "https://github.com/sabintimalsina",
    liveUrl: "https://example.com",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    ],
    caseStudy:
      "Designed as a SaaS-grade portfolio combining content management, learning hub, and developer showcase.",
    challenges: "Balancing performance with rich animations and real-time CMS updates.",
    solutions: "Server components, lazy loading, and Firestore with optimistic UI patterns.",
    lessons: "Architecture upfront saves weeks when scaling content types.",
    createdAt: "2025-06-01",
  },
  {
    id: "2",
    slug: "react-learning-dashboard",
    title: "React Learning Dashboard",
    description:
      "Interactive dashboard for students tracking progress, assignments, and tutorial completions.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    technologies: ["React", "Recharts", "Firebase"],
    githubUrl: "https://github.com/sabintimalsina",
    featured: true,
    createdAt: "2024-11-15",
  },
  {
    id: "3",
    slug: "ecommerce-storefront",
    title: "E-Commerce Storefront",
    description: "Modern product catalog with cart, filters, and responsive UI for local businesses.",
    thumbnail: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80",
    technologies: ["Next.js", "Tailwind CSS", "PHP"],
    liveUrl: "https://example.com",
    featured: false,
    createdAt: "2024-08-20",
  },
];

export const seedCertificates: Certificate[] = [
  {
    id: "1",
    title: "React Developer Certification",
    description: "Advanced React patterns, hooks, and performance optimization.",
    organization: "Meta / Coursera",
    date: "2024-10-12",
    imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
    featured: true,
  },
  {
    id: "2",
    title: "JavaScript Algorithms",
    description: "Data structures and algorithms in JavaScript.",
    organization: "freeCodeCamp",
    date: "2024-06-05",
    imageUrl: "https://images.unsplash.com/photo-1627398242454-45a1465d247b?w=600&q=80",
    featured: true,
  },
  {
    id: "3",
    title: "Responsive Web Design",
    description: "Mobile-first design and accessibility fundamentals.",
    organization: "freeCodeCamp",
    date: "2023-12-18",
    imageUrl: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=600&q=80",
  },
];

export const seedAchievements: Achievement[] = [
  {
    id: "1",
    title: "Front-End Internship Completed",
    description: "Built production UI components and collaborated in agile sprints.",
    date: "2024-09-01",
    type: "internship",
  },
  {
    id: "2",
    title: "React Training Program",
    description: "Conducted 8-week React bootcamp for 40+ students.",
    date: "2024-07-15",
    type: "training",
  },
  {
    id: "3",
    title: "Meta React Certification",
    description: "Earned professional React developer certification.",
    date: "2024-10-12",
    type: "certification",
  },
  {
    id: "4",
    title: "Portfolio Platform Launch",
    description: "Shipped full-stack personal brand and CMS platform.",
    date: "2025-06-01",
    type: "project",
  },
];

export const seedTutorials: Tutorial[] = [
  {
    id: "1",
    slug: "react-hooks-complete-guide",
    title: "React Hooks — Complete Guide",
    description: "Master useState, useEffect, useMemo, useCallback, and custom hooks.",
    type: "youtube",
    category: "React",
    videoUrl: "https://youtube.com/watch?v=example",
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
    views: 1250,
    likes: 89,
    featured: true,
    publishedAt: "2025-03-10",
  },
  {
    id: "2",
    slug: "javascript-es6-cheatsheet",
    title: "JavaScript ES6+ Cheatsheet",
    description: "PDF notes covering modern JavaScript syntax and patterns.",
    type: "pdf",
    category: "JavaScript",
    pdfUrl: "/notes/javascript-es6.pdf",
    views: 890,
    likes: 56,
    featured: true,
    publishedAt: "2025-02-20",
  },
  {
    id: "3",
    slug: "tailwind-css-masterclass",
    title: "Tailwind CSS Masterclass",
    description: "Build responsive UIs faster with utility-first CSS.",
    type: "article",
    category: "HTML/CSS",
    content: "## Introduction\n\nTailwind CSS revolutionizes how we style components...",
    views: 640,
    likes: 42,
    publishedAt: "2025-01-15",
  },
];

export const seedBlogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "why-i-choose-react-and-nextjs",
    title: "Why I Choose React and Next.js for Client Projects",
    excerpt:
      "A practical look at developer experience, performance, and hiring advantages.",
    content:
      "# Why React and Next.js\n\nWhen clients need a modern web presence, React and Next.js deliver...\n\n## Performance\n\nServer components and static generation reduce time-to-interactive.\n\n## Ecosystem\n\nRich libraries for forms, charts, and animations accelerate delivery.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
    categories: ["React", "Career"],
    tags: ["nextjs", "react", "webdev"],
    featured: true,
    publishedAt: "2025-04-01",
    author: "Sabin Timalsina",
  },
  {
    id: "2",
    slug: "teaching-frontend-effectively",
    title: "Teaching Front-End Development Effectively",
    excerpt: "Lessons from training 120+ students in Nepal.",
    content:
      "# Teaching Front-End\n\nGreat trainers combine empathy, structure, and hands-on projects...",
    categories: ["Teaching"],
    tags: ["education", "training"],
    publishedAt: "2025-03-15",
    author: "Sabin Timalsina",
  },
];

export const seedTestimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    occupation: "Bootcamp Student",
    rating: 5,
    message:
      "Sabin explains React concepts clearly. His tutorials helped me land my first internship.",
    approved: true,
    createdAt: "2025-02-10",
    photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
  },
  {
    id: "2",
    name: "Rajesh Karki",
    occupation: "Startup Founder",
    rating: 5,
    message:
      "Professional, fast, and detail-oriented. Our portfolio site exceeded expectations.",
    approved: true,
    createdAt: "2025-01-20",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80",
  },
];

export const seedGallery: GalleryItem[] = [
  {
    id: "1",
    title: "React Workshop — Kathmandu",
    imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
    category: "Training",
    createdAt: "2025-03-01",
  },
  {
    id: "2",
    title: "Tech Meetup Presentation",
    imageUrl: "https://images.unsplash.com/photo-1540575467067-178a50c2df87?w=800&q=80",
    category: "Events",
    createdAt: "2025-02-15",
  },
  {
    id: "3",
    title: "Portfolio Design Session",
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    category: "Work",
    createdAt: "2025-01-10",
  },
];

export const seedTimeline: TimelineEvent[] = [
  {
    id: "1",
    year: "2025",
    title: "Full-Stack Portfolio Platform",
    description: "Launched premium personal brand and CMS platform.",
    type: "milestone",
  },
  {
    id: "2",
    year: "2024",
    title: "Front-End Internship",
    description: "Completed internship building production React applications.",
    type: "work",
  },
  {
    id: "3",
    year: "2024",
    title: "React Trainer",
    description: "Started conducting React bootcamps and corporate workshops.",
    type: "teaching",
  },
  {
    id: "4",
    year: "2022",
    title: "Computer Science Studies",
    description: "Focused on web technologies, algorithms, and UI design.",
    type: "education",
  },
];

export const seedServices: Service[] = [
  {
    id: "1",
    title: "Front-End Development",
    description: "Pixel-perfect, accessible interfaces with modern frameworks.",
    icon: "Code2",
    features: ["Responsive design", "Performance optimization", "Cross-browser support"],
  },
  {
    id: "2",
    title: "React Development",
    description: "Scalable component architecture and state management.",
    icon: "Atom",
    features: ["Custom hooks", "TypeScript", "Testing-ready code"],
  },
  {
    id: "3",
    title: "Portfolio Development",
    description: "Stand-out personal brands that impress recruiters and clients.",
    icon: "Layout",
    features: ["CMS integration", "SEO", "Animations"],
  },
  {
    id: "4",
    title: "UI/UX Design",
    description: "User-centered design with glassmorphism and premium aesthetics.",
    icon: "Palette",
    features: ["Wireframes", "Design systems", "Prototyping"],
  },
  {
    id: "5",
    title: "Website Design",
    description: "Complete websites for businesses, trainers, and creators.",
    icon: "Globe",
    features: ["Landing pages", "Contact forms", "Analytics"],
  },
  {
    id: "6",
    title: "Computer Training",
    description: "Hands-on training in web development and digital skills.",
    icon: "GraduationCap",
    features: ["React bootcamps", "1-on-1 mentoring", "Workshop materials"],
  },
];

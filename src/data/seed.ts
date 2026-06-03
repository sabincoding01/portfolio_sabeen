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
    "I am a passionate web developer, data analyst, and graphics designer. I build modern, responsive websites using React, Tailwind, and clean UI design.",
  stats: {
    projects: 12,
    certificates: 10,
    tutorials: 20,
    yearsLearning: 4,
    studentsTaught: 120,
  },
};

export const seedSkills: Skill[] = [
  { id: "1", name: "HTML", category: "frontend", proficiency: 95, order: 1 },
  { id: "2", name: "CSS", category: "frontend", proficiency: 92, order: 2 },
  { id: "3", name: "JavaScript", category: "frontend", proficiency: 90, order: 3 },
  { id: "4", name: "React", category: "frontend", proficiency: 88, order: 4 },
  { id: "5", name: "Tailwind CSS", category: "frontend", proficiency: 90, order: 5 },
  { id: "6", name: "Node.js", category: "backend", proficiency: 75, order: 6 },
  { id: "7", name: "PHP", category: "backend", proficiency: 70, order: 7 },
  { id: "8", name: "Python", category: "backend", proficiency: 72, order: 8 },
  { id: "9", name: "Canva", category: "tools", proficiency: 85, order: 9 },
  { id: "10", name: "Photoshop", category: "tools", proficiency: 80, order: 10 },
  { id: "11", name: "Data Analysis", category: "tools", proficiency: 78, order: 11 },
  { id: "12", name: "Material UI", category: "tools", proficiency: 82, order: 12 },
];

export const seedProjects: Project[] = [
  {
    id: "1",
    slug: "school-management-system",
    title: "School Management System",
    description:
      "Responsive school management platform for attendance, student records, and communication.",
    thumbnail: "https://images.unsplash.com/photo-1581091870620-5d4e6f7b7e98?w=800&q=80",
    technologies: ["React", "Tailwind CSS", "Firebase"],
    githubUrl: "https://github.com/sabincoding01",
    liveUrl: "https://example.com",
    featured: true,
    screenshots: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&q=80",
    ],
    caseStudy:
      "Built a school management solution that simplifies attendance tracking, student records, and parent communication.",
    challenges: "Creating a simple yet powerful interface for administrators, teachers, and students.",
    solutions: "Implemented responsive dashboards and reusable React components for consistent workflows.",
    lessons: "Good UX and data organization help schools manage operations efficiently.",
    createdAt: "2025-05-01",
  },
  {
    id: "2",
    slug: "health-service-portal",
    title: "Health Service Website",
    description:
      "Modern health service portal with appointment booking, service overviews, and mobile-friendly pages.",
    thumbnail: "https://images.unsplash.com/photo-1536305030017-99fa4b22afdf?w=800&q=80",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    githubUrl: "https://github.com/sabincoding01",
    liveUrl: "https://example.com",
    featured: true,
    createdAt: "2025-03-20",
  },
  {
    id: "3",
    slug: "business-portfolio-website",
    title: "Business Portfolio Website",
    description:
      "A polished portfolio website showcasing services, client work, and contact details for businesses.",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
    technologies: ["Next.js", "React", "Tailwind CSS"],
    githubUrl: "https://github.com/sabincoding01",
    liveUrl: "https://example.com",
    featured: false,
    createdAt: "2024-11-10",
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

export const seedTutorials: Tutorial[] = [];

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
    name: "Anika Rai",
    occupation: "Business Owner",
    rating: 5,
    message:
      "Sabin delivered a clean and responsive website that exceeded our expectations. His attention to detail and modern design approach made the entire project smooth and successful.",
    approved: true,
    createdAt: "2025-05-10",
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80",
  },
  {
    id: "2",
    name: "Rohan Thapa",
    occupation: "Client",
    rating: 5,
    message:
      "Working with Sabin was a great experience. He communicated clearly, completed tasks on time, and transformed our ideas into a professional and user-friendly website.",
    approved: true,
    createdAt: "2025-04-25",
    photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&q=80",
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
    title: "School Management System",
    description: "Built a responsive school management system for attendance, student records, and communication.",
    type: "work",
  },
  {
    id: "2",
    year: "2025",
    title: "Health Service Website",
    description: "Created a health service portal with appointment booking and service showcases.",
    type: "work",
  },
  {
    id: "3",
    year: "2024",
    title: "Robotics Training Instructor",
    description: "Delivered robotics training and computer lessons to student groups.",
    type: "teaching",
  },
  {
    id: "4",
    year: "2024",
    title: "BSc CSIT Studies",
    description: "Pursuing BSc CSIT while building web applications and digital designs.",
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

export const SITE = {
  name: "Sabin Timalsina",
  title: "Web Developer | Data Analyst | Graphics Designer",
  description:
    "Sabin Timalsina is a web developer, data analyst, and graphics designer building responsive, modern websites and digital experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "sabintimalsina74@gmail.com",
  phone: "+977 9864155993",
  whatsapp: "9779864155993",
  linkedin: "https://www.linkedin.com/in/sabin-timalsina-63090831b/",
  github: "https://github.com/sabincoding01",
  youtube: "https://x.com/sabin67680?s=21",
  twitter: "https://x.com/sabin67680?s=21",
  instagram: "https://www.instagram.com/saveen0?igsh=MXhwcXRmNjJkMGh5dQ%3D%3D&utm_source=qr",
  cvUrl: "/cv/sabin-timalsina-cv.pdf",
  image: "/images/sabin-profile.png",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/certificates", label: "Certificates" },
  { href: "/achievements", label: "Achievements" },
  { href: "/tutorials", label: "Tutorials" },
  { href: "/blog", label: "Blog" },
  { href: "/github", label: "GitHub Hub" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/gallery", label: "Gallery" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
] as const;

export const TYPING_ROLES = [
  "Web Developer",
  "Data Analyst",
  "Graphics Designer",
  "React Developer",
  "Front-End Developer",
] as const;

export const TUTORIAL_CATEGORIES = [
  "React",
  "JavaScript",
  "Python",
  "HTML/CSS",
  "AI Tools",
] as const;

export const GALLERY_CATEGORIES = [
  "Training",
  "Events",
  "Work",
  "Screenshots",
] as const;

export const CHAT_SUGGESTIONS = [
  "Who is Sabin?",
  "What technologies does Sabin know?",
  "What projects has Sabin built?",
  "How can I contact Sabin?",
  "What tutorials are available?",
] as const;

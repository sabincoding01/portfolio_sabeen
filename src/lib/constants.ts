export const SITE = {
  name: "Sabin Timalsina",
  title: "Front-End Developer | React Developer | Trainer | Content Creator",
  description:
    "Premium portfolio of Sabin Timalsina — React & Next.js developer, trainer, and content creator building modern web experiences.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "sabintimalsina@gmail.com",
  phone: "+977-98XXXXXXXX",
  whatsapp: "97798XXXXXXXX",
  linkedin: "https://linkedin.com/in/sabintimalsina",
  github: "https://github.com/sabintimalsina",
  youtube: "https://youtube.com/@sabintimalsina",
  twitter: "https://twitter.com/sabintimalsina",
  cvUrl: "/cv/sabin-timalsina-cv.pdf",
  image: "/images/sabin-profile.jpg",
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
  "Front-End Developer",
  "React Developer",
  "Trainer",
  "Content Creator",
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

import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import {
  seedAchievements,
  seedBlogPosts,
  seedCertificates,
  seedGallery,
  seedProjects,
  seedSkills,
  seedTestimonials,
  seedTutorials,
  defaultSettings,
} from "@/data/seed";
import { COLLECTIONS, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import type {
  Achievement,
  BlogPost,
  Certificate,
  GalleryItem,
  Project,
  SiteSettings,
  Skill,
  Testimonial,
  Tutorial,
} from "@/types";

function mapDoc<T>(id: string, data: DocumentData): T {
  return { id, ...data } as T;
}

async function fetchCollection<T>(
  collectionName: string,
  fallback: T[],
  orderField = "createdAt"
): Promise<T[]> {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) return fallback;

  try {
    const q = query(
      collection(db, collectionName),
      orderBy(orderField, "desc")
    );
    const snap = await getDocs(q);
    if (snap.empty) return fallback;
    return snap.docs.map((d) => mapDoc<T>(d.id, d.data()));
  } catch {
    return fallback;
  }
}

export async function getSettings(): Promise<SiteSettings> {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) return defaultSettings;

  try {
    const ref = doc(db, COLLECTIONS.settings, "site");
    const snap = await getDoc(ref);
    if (!snap.exists()) return defaultSettings;
    return { ...defaultSettings, ...snap.data() } as SiteSettings;
  } catch {
    return defaultSettings;
  }
}

export async function getProjects(featuredOnly = false): Promise<Project[]> {
  const projects = await fetchCollection<Project>(
    COLLECTIONS.projects,
    seedProjects
  );
  if (featuredOnly) return projects.filter((p) => p.featured);
  return projects;
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  const projects = await getProjects();
  return projects.find((p) => p.slug === slug) ?? null;
}

export async function getCertificates(): Promise<Certificate[]> {
  return fetchCollection<Certificate>(
    COLLECTIONS.certificates,
    seedCertificates,
    "date"
  );
}

export async function getAchievements(): Promise<Achievement[]> {
  return fetchCollection<Achievement>(
    COLLECTIONS.achievements,
    seedAchievements,
    "date"
  );
}

export async function getTutorials(): Promise<Tutorial[]> {
  return fetchCollection<Tutorial>(
    COLLECTIONS.tutorials,
    seedTutorials,
    "publishedAt"
  );
}

export async function getTutorialBySlug(slug: string): Promise<Tutorial | null> {
  const tutorials = await getTutorials();
  return tutorials.find((t) => t.slug === slug) ?? null;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return fetchCollection<BlogPost>(
    COLLECTIONS.blogPosts,
    seedBlogPosts,
    "publishedAt"
  );
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function getApprovedTestimonials(): Promise<Testimonial[]> {
  const db = getFirebaseDb();
  if (!isFirebaseConfigured() || !db) {
    return seedTestimonials.filter((t) => t.approved);
  }

  try {
    const q = query(
      collection(db, COLLECTIONS.testimonials),
      where("approved", "==", true),
      orderBy("createdAt", "desc")
    );
    const snap = await getDocs(q);
    if (snap.empty) return seedTestimonials.filter((t) => t.approved);
    return snap.docs.map((d) => mapDoc<Testimonial>(d.id, d.data()));
  } catch {
    return seedTestimonials.filter((t) => t.approved);
  }
}

export async function getGallery(): Promise<GalleryItem[]> {
  return fetchCollection<GalleryItem>(COLLECTIONS.gallery, seedGallery);
}

export async function getSkills(): Promise<Skill[]> {
  const skills = await fetchCollection<Skill>(
    COLLECTIONS.skills,
    seedSkills,
    "order"
  );
  return skills.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export async function getPortfolioContext(): Promise<string> {
  const [settings, projects, skills, tutorials, certificates] =
    await Promise.all([
      getSettings(),
      getProjects(),
      getSkills(),
      getTutorials(),
      getCertificates(),
    ]);

  return JSON.stringify({
    name: "Sabin Timalsina",
    title: "Front-End Developer | React Developer | Trainer | Content Creator",
    bio: settings.heroSubtitle,
    email: "sabintimalsina@gmail.com",
    skills: skills.map((s) => `${s.name} (${s.proficiency}%)`),
    projects: projects.map((p) => ({
      title: p.title,
      description: p.description,
      tech: p.technologies,
    })),
    tutorials: tutorials.map((t) => ({
      title: t.title,
      category: t.category,
      type: t.type,
    })),
    certificates: certificates.map((c) => ({
      title: c.title,
      org: c.organization,
    })),
    stats: settings.stats,
  });
}

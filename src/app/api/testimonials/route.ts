import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { COLLECTIONS, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { rateLimit } from "@/lib/rate-limit";
import { sanitizeText } from "@/lib/sanitize";
import { z } from "zod";

const testimonialSchema = z.object({
  name: z.string().min(2).max(100),
  occupation: z.string().min(2).max(100),
  rating: z.number().min(1).max(5),
  message: z.string().min(20).max(2000),
  photo: z.string().url().optional().or(z.literal("")),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limit = rateLimit(`testimonial:${ip}`, 3, 300_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = testimonialSchema.safeParse({
      name: sanitizeText(body.name ?? "", 100),
      occupation: sanitizeText(body.occupation ?? "", 100),
      rating: Number(body.rating),
      message: sanitizeText(body.message ?? "", 2000),
      photo: body.photo || undefined,
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid testimonial data" }, { status: 400 });
    }

    const db = getFirebaseDb();
    if (!isFirebaseConfigured() || !db) {
      return NextResponse.json({
        success: true,
        message: "Testimonial received. It will appear after admin approval once Firebase is configured.",
      });
    }

    await addDoc(collection(db, COLLECTIONS.testimonials), {
      ...parsed.data,
      approved: false,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your testimonial will appear after admin approval.",
    });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

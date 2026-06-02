import { NextResponse } from "next/server";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { COLLECTIONS, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { rateLimit } from "@/lib/rate-limit";
import { isValidEmail, sanitizeText } from "@/lib/sanitize";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(200),
  message: z.string().min(10).max(5000),
});

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "anonymous";
  const limit = rateLimit(`contact:${ip}`, 5, 60_000);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse({
      name: sanitizeText(body.name ?? "", 100),
      email: sanitizeText(body.email ?? "", 200),
      message: sanitizeText(body.message ?? "", 5000),
    });

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }

    const { name, email, message } = parsed.data;
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const db = getFirebaseDb();
    if (isFirebaseConfigured() && db) {
      await addDoc(collection(db, COLLECTIONS.contacts), {
        name,
        email,
        message,
        createdAt: serverTimestamp(),
        read: false,
      });
    }

    if (process.env.CONTACT_WEBHOOK_URL) {
      await fetch(process.env.CONTACT_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}

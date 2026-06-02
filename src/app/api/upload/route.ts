import { NextResponse } from "next/server";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirebaseApp, isFirebaseConfigured } from "@/lib/firebase";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ status: "ok", route: "/api/upload" });
}

export async function POST(request: Request) {
  try {
    if (!isFirebaseConfigured()) {
      return NextResponse.json(
        { error: "Firebase is not configured." },
        { status: 500 },
      );
    }

    const form = await request.formData();
    const file = form.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const app = getFirebaseApp();
    if (!app) {
      return NextResponse.json(
        { error: "Firebase app not initialized." },
        { status: 500 },
      );
    }

    const storage = getStorage(app);
    const path = `uploads/${Date.now()}_${String(form.get("filename") ?? "upload").replace(/[^a-zA-Z0-9.\-_]/g, "_")}`;
    const fileRef = ref(storage, path);

    await uploadBytes(fileRef, buffer, { contentType: file.type });
    const downloadUrl = await getDownloadURL(fileRef);

    return NextResponse.json({ url: downloadUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json(
      { error: "Upload failed. Check Firebase configuration." },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({ status: "ok", route: "/api/upload" });
}

export async function POST(request: Request) {
  try {
    const form = await request.formData();
    const file = form.get("file") as Blob | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const rawName = String(form.get("filename") ?? "upload");
    const filename = rawName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const key = `${Date.now()}_${filename}`;

    const arrayBuffer = await file.arrayBuffer();
    const store = getStore("uploads");
    await store.set(key, arrayBuffer);

    const url = `/api/images/${key}`;
    return NextResponse.json({ url });
  } catch (err) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Upload failed." }, { status: 500 });
  }
}

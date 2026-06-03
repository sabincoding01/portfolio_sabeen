import { NextResponse } from "next/server";
import { getStore } from "@netlify/blobs";

export const runtime = "nodejs";

function getMimeType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  const map: Record<string, string> = {
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
    avif: "image/avif",
    svg: "image/svg+xml",
    pdf: "application/pdf",
  };
  return map[ext] ?? "application/octet-stream";
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> },
) {
  try {
    const { key } = await params;
    const store = getStore("uploads");
    const data = await store.get(key, { type: "arrayBuffer" });

    if (!data) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return new Response(data as ArrayBuffer, {
      headers: {
        "Content-Type": getMimeType(key),
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (err) {
    console.error("Image serve error:", err);
    return NextResponse.json({ error: "Failed to serve image" }, { status: 500 });
  }
}

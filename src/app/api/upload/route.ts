import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

export const runtime = "nodejs";

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !cloudKey || !cloudSecret) {
  console.error(
    "Cloudinary is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key: cloudKey,
  api_secret: cloudSecret,
});

export async function POST(request: Request) {
  try {
    if (!cloudName || !cloudKey || !cloudSecret) {
      return NextResponse.json(
        {
          error:
            "Cloudinary upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET.",
        },
        { status: 500 },
      );
    }

    const form = await request.formData();
    const file = form.get("file") as Blob | null;
    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const filename = String(form.get("filename") ?? `upload_${Date.now()}`);
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const mime = (file.type as string) || "application/octet-stream";
    const dataUri = `data:${mime};base64,${base64}`;

    const result = await cloudinary.uploader.upload(dataUri, {
      folder: "portfolio_images",
      use_filename: true,
      unique_filename: true,
    });

    return NextResponse.json({ url: result.secure_url });
  } catch (err) {
    console.error("Upload error", err);
    return NextResponse.json(
      { error: "Upload failed. Check Cloudinary configuration." },
      { status: 500 },
    );
  }
}

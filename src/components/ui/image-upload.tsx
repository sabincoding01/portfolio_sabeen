"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  value?: string | null;
  onChange: (url: string | null) => void;
  label?: string;
  accept?: string;
  maxSizeMb?: number;
};

export default function ImageUpload({
  value,
  onChange,
  label = "Image",
  accept = "image/*",
  maxSizeMb = 5,
}: Props) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [file, setFile] = useState<File | null>(null);
  const [urlInput, setUrlInput] = useState("");
  const [preview, setPreview] = useState<string | null>(value ?? null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setPreview(value ?? null);
  }, [value]);

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setPreview(String(reader.result));
    reader.readAsDataURL(file);
    return () => reader.abort && reader.abort();
  }, [file]);

  const handleFile = async (f: File) => {
    setError(null);
    if (!f.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    if (f.size > maxSizeMb * 1024 * 1024) {
      setError(`File too large (max ${maxSizeMb}MB)`);
      return;
    }
    setFile(f);
    try {
      setLoading(true);
      const fd = new FormData();
      fd.append("file", f);
      fd.append("filename", f.name);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok || !data?.url) {
        throw new Error(data?.error || "Upload failed");
      }
      onChange(data.url);
      setPreview(data.url);
    } catch (e) {
      const message =
        e instanceof Error ? e.message : "Upload failed; please try again.";
      setError(message);
      return;
    } finally {
      setLoading(false);
    }
  };

  const handleUseUrl = () => {
    setError(null);
    try {
      const u = new URL(urlInput.trim());
      // quick check whether it's an image by extension
      if (!u.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif)$/i)) {
        // still allow, but warn
      }
      // verify loads
      const img = new Image();
      img.onload = () => {
        setPreview(urlInput.trim());
        onChange(urlInput.trim());
      };
      img.onerror = () => setError("Could not load image from URL");
      img.src = urlInput.trim();
    } catch {
      setError("Invalid URL");
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <h4 className="text-sm font-medium">{label}</h4>
        <div className="ml-auto flex gap-2">
          <Button
            variant={mode === "upload" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("upload")}
          >
            Upload
          </Button>
          <Button
            variant={mode === "url" ? "secondary" : "ghost"}
            size="sm"
            onClick={() => setMode("url")}
          >
            Use URL
          </Button>
        </div>
      </div>

      {mode === "upload" && (
        <div className="flex flex-col gap-2">
          <input
            accept={accept}
            type="file"
            onChange={(e) =>
              e.target.files &&
              e.target.files[0] &&
              handleFile(e.target.files[0])
            }
          />
          {loading && (
            <p className="text-sm text-muted-foreground">Uploading...</p>
          )}
        </div>
      )}

      {mode === "url" && (
        <div className="flex gap-2">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="https://example.com/image.jpg"
          />
          <Button onClick={handleUseUrl}>Set</Button>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {preview ? (
        <div className="mt-2">
          <img
            src={preview}
            alt="preview"
            className="max-h-48 w-auto rounded-md object-cover"
          />
          <div className="mt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setFile(null);
                setPreview(null);
                onChange(null);
              }}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">No image selected</p>
      )}
    </div>
  );
}

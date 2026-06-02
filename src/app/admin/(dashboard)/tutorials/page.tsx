"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedTutorials } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { slugify } from "@/lib/utils";
import { TUTORIAL_CATEGORIES } from "@/lib/constants";
import type { Tutorial } from "@/types";
import { Plus } from "lucide-react";

export default function AdminTutorialsPage() {
  const { items, loading, create, update, remove } = useFirestoreCrud<Tutorial>(
    COLLECTIONS.tutorials,
    seedTutorials,
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Tutorial | null>(null);
  const [form, setForm] = useState<Partial<Tutorial>>({
    title: "",
    slug: "",
    description: "",
    type: "article",
    category: "React",
    thumbnail: "",
    views: 0,
    likes: 0,
    publishedAt: new Date().toISOString().split("T")[0],
  });

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Tutorials</h1>
        <Button
          variant="gradient"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> Add
        </Button>
      </div>
      <CrudTable
        items={items}
        loading={loading}
        columns={[
          { key: "title", label: "Title" },
          { key: "category", label: "Category" },
          { key: "type", label: "Type" },
        ]}
        onEdit={(i) => {
          setEditing(i);
          setForm(i);
          setOpen(true);
        }}
        onDelete={remove}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Tutorial</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: slugify(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description ?? ""}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Type</Label>
              <select
                className="w-full h-10 rounded-lg border px-3"
                value={form.type}
                onChange={(e) =>
                  setForm({ ...form, type: e.target.value as Tutorial["type"] })
                }
              >
                <option value="youtube">YouTube</option>
                <option value="pdf">PDF</option>
                <option value="article">Article</option>
                <option value="blog">Blog</option>
              </select>
            </div>
            <div>
              <Label>Category</Label>
              <select
                className="w-full h-10 rounded-lg border px-3"
                value={form.category}
                onChange={(e) =>
                  setForm({
                    ...form,
                    category: e.target.value as Tutorial["category"],
                  })
                }
              >
                {TUTORIAL_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <Label>Video URL</Label>
              <Input
                value={form.videoUrl ?? ""}
                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Thumbnail</Label>
              <ImageUpload
                value={form.thumbnail ?? null}
                onChange={(url) =>
                  setForm({ ...form, thumbnail: url ?? undefined })
                }
              />
            </div>
            <div>
              <Label>Content (Markdown)</Label>
              <Textarea
                rows={6}
                value={form.content ?? ""}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
            </div>
            <Button
              variant="gradient"
              className="w-full"
              onClick={async () => {
                // basic validation
                if (!form.title || form.title.trim() === "")
                  return alert("Title is required");
                // prevent saving local blob/data URLs
                if (
                  form.thumbnail &&
                  (String(form.thumbnail).startsWith("blob:") ||
                    String(form.thumbnail).startsWith("data:"))
                ) {
                  return alert(
                    "Please upload the image to Firebase Storage or provide a public URL instead of a local preview.",
                  );
                }
                const data = {
                  ...form,
                  slug: form.slug || slugify(form.title ?? ""),
                };
                if (editing) await update(editing.id, data);
                else await create(data as Omit<Tutorial, "id">);
                setOpen(false);
              }}
            >
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

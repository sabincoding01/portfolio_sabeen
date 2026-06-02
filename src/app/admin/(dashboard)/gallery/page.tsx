"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedGallery } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ImageUpload from "@/components/ui/image-upload";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GALLERY_CATEGORIES } from "@/lib/constants";
import type { GalleryItem } from "@/types";
import { Plus } from "lucide-react";

export default function AdminGalleryPage() {
  const { items, loading, create, update, remove } =
    useFirestoreCrud<GalleryItem>(COLLECTIONS.gallery, seedGallery);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<GalleryItem | null>(null);
  const [form, setForm] = useState<Partial<GalleryItem>>({
    title: "",
    imageUrl: "",
    category: "Training",
    createdAt: new Date().toISOString().split("T")[0],
  });

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Gallery</h1>
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
        ]}
        onEdit={(i) => {
          setEditing(i);
          setForm(i);
          setOpen(true);
        }}
        onDelete={remove}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title ?? ""}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <ImageUpload
                value={form.imageUrl ?? null}
                onChange={(url) =>
                  setForm({ ...form, imageUrl: url ?? undefined })
                }
                label="Image"
              />
            </div>
            <div>
              <Label>Category</Label>
              <select
                className="w-full h-10 rounded-lg border px-3"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <Button
              variant="gradient"
              className="w-full"
              onClick={async () => {
                if (
                  form.imageUrl &&
                  (String(form.imageUrl).startsWith("blob:") ||
                    String(form.imageUrl).startsWith("data:"))
                ) {
                  return alert(
                    "Please upload the image to Firebase Storage or provide a public URL instead of a local preview.",
                  );
                }
                editing
                  ? await update(editing.id, form)
                  : await create(form as Omit<GalleryItem, "id">);
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

"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedBlogPosts } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { slugify } from "@/lib/utils";
import type { BlogPost } from "@/types";
import { Plus } from "lucide-react";

export default function AdminBlogPage() {
  const { items, loading, create, update, remove } = useFirestoreCrud<BlogPost>(
    COLLECTIONS.blogPosts,
    seedBlogPosts
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<BlogPost | null>(null);
  const [form, setForm] = useState<Partial<BlogPost>>({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    categories: [],
    tags: [],
    publishedAt: new Date().toISOString().split("T")[0],
  });

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <Button variant="gradient" onClick={() => { setEditing(null); setOpen(true); }}><Plus className="h-4 w-4" /> Add</Button>
      </div>
      <CrudTable items={items} loading={loading} columns={[{ key: "title", label: "Title" }, { key: "publishedAt", label: "Published" }]} onEdit={(i) => { setEditing(i); setForm(i); setOpen(true); }} onDelete={remove} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Blog Post</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value, slug: slugify(e.target.value) })} /></div>
            <div><Label>Excerpt</Label><Textarea value={form.excerpt ?? ""} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></div>
            <div><Label>Content (Markdown)</Label><Textarea rows={10} value={form.content ?? ""} onChange={(e) => setForm({ ...form, content: e.target.value })} /></div>
            <div><Label>Categories (comma-separated)</Label><Input value={Array.isArray(form.categories) ? form.categories.join(", ") : ""} onChange={(e) => setForm({ ...form, categories: e.target.value.split(",").map((s) => s.trim()) })} /></div>
            <div><Label>Tags (comma-separated)</Label><Input value={Array.isArray(form.tags) ? form.tags.join(", ") : ""} onChange={(e) => setForm({ ...form, tags: e.target.value.split(",").map((s) => s.trim()) })} /></div>
            <label className="flex gap-2"><input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} /> Featured</label>
            <Button variant="gradient" className="w-full" onClick={async () => { const data = { ...form, slug: form.slug || slugify(form.title ?? "") }; editing ? await update(editing.id, data) : await create(data as Omit<BlogPost, "id">); setOpen(false); }}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

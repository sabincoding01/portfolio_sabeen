"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedProjects } from "@/data/seed";
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
import type { Project } from "@/types";
import { Plus } from "lucide-react";
import { AdminHeader } from "@/components/admin/admin-header";

const empty: Omit<Project, "id"> = {
  slug: "",
  title: "",
  description: "",
  thumbnail: "",
  technologies: [],
  featured: false,
  createdAt: new Date().toISOString().split("T")[0],
};

export default function AdminProjectsPage() {
  const { items, loading, create, update, remove } = useFirestoreCrud<Project>(
    COLLECTIONS.projects,
    seedProjects,
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState(empty);

  const openCreate = () => {
    setEditing(null);
    setForm(empty);
    setOpen(true);
  };

  const openEdit = (item: Project) => {
    setEditing(item);
    setForm({
      slug: item.slug,
      title: item.title,
      description: item.description,
      thumbnail: item.thumbnail,
      technologies: item.technologies,
      githubUrl: item.githubUrl,
      liveUrl: item.liveUrl,
      featured: item.featured,
      caseStudy: item.caseStudy,
      challenges: item.challenges,
      solutions: item.solutions,
      lessons: item.lessons,
      createdAt: item.createdAt,
    });
    setOpen(true);
  };

  const handleSave = async () => {
    const data = {
      ...form,
      slug: form.slug || slugify(form.title),
      technologies:
        typeof form.technologies === "string"
          ? (form.technologies as unknown as string)
              .split(",")
              .map((t) => t.trim())
          : form.technologies,
    };
    if (
      data.thumbnail &&
      (String(data.thumbnail).startsWith("blob:") ||
        String(data.thumbnail).startsWith("data:"))
    ) {
      return alert(
        "Please upload the thumbnail to Firebase Storage or use a public URL instead of a local preview.",
      );
    }
    if (editing) await update(editing.id, data);
    else await create(data);
    setOpen(false);
  };

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-6">
        <AdminHeader
          title="Projects"
          description="Add portfolio projects with thumbnails, tech stack, GitHub and live links, and case study content."
        />
        <Button variant="gradient" onClick={openCreate} className="shrink-0">
          <Plus className="h-4 w-4" /> Add Project
        </Button>
      </div>

      <CrudTable
        items={items}
        loading={loading}
        columns={[
          { key: "title", label: "Title" },
          {
            key: "featured",
            label: "Featured",
            render: (p) => (p.featured ? "Yes" : "No"),
          },
        ]}
        onEdit={openEdit}
        onDelete={remove}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Project</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
            </div>
            <div>
              <Label>Slug</Label>
              <Input
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="auto-generated"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Textarea
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Thumbnail</Label>
              <ImageUpload
                value={form.thumbnail ?? null}
                onChange={(url) => setForm({ ...form, thumbnail: url ?? "" })}
              />
            </div>
            <div>
              <Label>Technologies (comma-separated)</Label>
              <Input
                value={
                  Array.isArray(form.technologies)
                    ? form.technologies.join(", ")
                    : ""
                }
                onChange={(e) =>
                  setForm({
                    ...form,
                    technologies: e.target.value
                      .split(",")
                      .map((t) => t.trim()) as unknown as string[],
                  })
                }
              />
            </div>
            <div>
              <Label>GitHub URL</Label>
              <Input
                value={form.githubUrl ?? ""}
                onChange={(e) =>
                  setForm({ ...form, githubUrl: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Live URL</Label>
              <Input
                value={form.liveUrl ?? ""}
                onChange={(e) => setForm({ ...form, liveUrl: e.target.value })}
              />
            </div>
            <div>
              <Label>Case Study</Label>
              <Textarea
                value={form.caseStudy ?? ""}
                onChange={(e) =>
                  setForm({ ...form, caseStudy: e.target.value })
                }
              />
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.checked })
                }
              />{" "}
              Featured
            </label>
            <Button variant="gradient" className="w-full" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

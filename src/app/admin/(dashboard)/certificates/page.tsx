"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedCertificates } from "@/data/seed";
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
import type { Certificate } from "@/types";
import { Plus } from "lucide-react";

export default function AdminCertificatesPage() {
  const { items, loading, create, update, remove } =
    useFirestoreCrud<Certificate>(COLLECTIONS.certificates, seedCertificates);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);
  const [form, setForm] = useState<Partial<Certificate>>({
    title: "",
    description: "",
    organization: "",
    date: new Date().toISOString().split("T")[0],
    imageUrl: "",
    fileUrl: "",
  });

  const handleSave = async () => {
    // prevent saving local previews
    if (
      form.imageUrl &&
      (String(form.imageUrl).startsWith("blob:") ||
        String(form.imageUrl).startsWith("data:"))
    ) {
      return alert(
        "Please upload the image or provide a public URL. Local previews cannot be saved.",
      );
    }
    const data = { ...form } as Omit<Certificate, "id">;
    if (data.imageUrl) data.fileType = "image";
    if (editing) await update(editing.id, data);
    else await create(data);
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Certificates</h1>
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
          { key: "organization", label: "Organization" },
          { key: "date", label: "Date" },
        ]}
        onEdit={(item) => {
          setEditing(item);
          setForm(item);
          setOpen(true);
        }}
        onDelete={remove}
      />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit" : "Add"} Certificate</DialogTitle>
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
              <Label>Organization</Label>
              <Input
                value={form.organization ?? ""}
                onChange={(e) =>
                  setForm({ ...form, organization: e.target.value })
                }
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={form.date ?? ""}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
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
              <ImageUpload
                value={form.imageUrl ?? null}
                onChange={(url) =>
                  setForm({ ...form, imageUrl: url ?? undefined })
                }
                label="Certificate image"
              />
            </div>
            <div>
              <Label>PDF/File URL</Label>
              <Input
                value={form.fileUrl ?? ""}
                onChange={(e) => setForm({ ...form, fileUrl: e.target.value })}
              />
            </div>
            <Button variant="gradient" className="w-full" onClick={handleSave}>
              Save
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

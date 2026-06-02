"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedAchievements } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Achievement } from "@/types";
import { Plus } from "lucide-react";

export default function AdminAchievementsPage() {
  const { items, loading, create, update, remove } = useFirestoreCrud<Achievement>(
    COLLECTIONS.achievements,
    seedAchievements
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Achievement | null>(null);
  const [form, setForm] = useState<Partial<Achievement>>({
    title: "",
    description: "",
    date: "",
    type: "other",
  });

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Achievements</h1>
        <Button variant="gradient" onClick={() => { setEditing(null); setOpen(true); }}><Plus className="h-4 w-4" /> Add</Button>
      </div>
      <CrudTable items={items} loading={loading} columns={[{ key: "title", label: "Title" }, { key: "type", label: "Type" }, { key: "date", label: "Date" }]} onEdit={(i) => { setEditing(i); setForm(i); setOpen(true); }} onDelete={remove} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Achievement</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Title</Label><Input value={form.title ?? ""} onChange={(e) => setForm({ ...form, title: e.target.value })} /></div>
            <div><Label>Type</Label>
              <select className="w-full h-10 rounded-lg border px-3" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as Achievement["type"] })}>
                <option value="internship">Internship</option>
                <option value="training">Training</option>
                <option value="certification">Certification</option>
                <option value="project">Project</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div><Label>Date</Label><Input type="date" value={form.date ?? ""} onChange={(e) => setForm({ ...form, date: e.target.value })} /></div>
            <div><Label>Description</Label><Textarea value={form.description ?? ""} onChange={(e) => setForm({ ...form, description: e.target.value })} /></div>
            <Button variant="gradient" className="w-full" onClick={async () => { editing ? await update(editing.id, form) : await create(form as Omit<Achievement, "id">); setOpen(false); }}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

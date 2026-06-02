"use client";

import { useState } from "react";
import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedSkills } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Skill } from "@/types";
import { Plus } from "lucide-react";

export default function AdminSkillsPage() {
  const { items, loading, create, update, remove } = useFirestoreCrud<Skill>(
    COLLECTIONS.skills,
    seedSkills
  );
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Skill | null>(null);
  const [form, setForm] = useState<Partial<Skill>>({
    name: "",
    category: "frontend",
    proficiency: 80,
    order: 0,
  });

  return (
    <div>
      <div className="flex justify-between mb-8">
        <h1 className="text-3xl font-bold">Skills</h1>
        <Button variant="gradient" onClick={() => { setEditing(null); setOpen(true); }}><Plus className="h-4 w-4" /> Add</Button>
      </div>
      <CrudTable items={items} loading={loading} columns={[{ key: "name", label: "Name" }, { key: "category", label: "Category" }, { key: "proficiency", label: "%" }]} onEdit={(i) => { setEditing(i); setForm(i); setOpen(true); }} onDelete={remove} />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editing ? "Edit" : "Add"} Skill</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Name</Label><Input value={form.name ?? ""} onChange={(e) => setForm({ ...form, name: e.target.value })} /></div>
            <div><Label>Category</Label>
              <select className="w-full h-10 rounded-lg border px-3" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value as Skill["category"] })}>
                <option value="frontend">Front-End</option>
                <option value="backend">Back-End</option>
                <option value="tools">Tools</option>
              </select>
            </div>
            <div><Label>Proficiency (0-100)</Label><Input type="number" min={0} max={100} value={form.proficiency ?? 0} onChange={(e) => setForm({ ...form, proficiency: Number(e.target.value) })} /></div>
            <Button variant="gradient" className="w-full" onClick={async () => { editing ? await update(editing.id, form) : await create(form as Omit<Skill, "id">); setOpen(false); }}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

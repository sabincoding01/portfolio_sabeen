"use client";

import { useFirestoreCrud } from "@/hooks/use-firestore-crud";
import { COLLECTIONS } from "@/lib/firebase";
import { seedTestimonials } from "@/data/seed";
import { CrudTable } from "@/components/admin/crud-table";
import { Badge } from "@/components/ui/badge";
import type { Testimonial } from "@/types";

export default function AdminTestimonialsPage() {
  const { items, loading, update, remove } = useFirestoreCrud<Testimonial>(
    COLLECTIONS.testimonials,
    seedTestimonials
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Testimonials</h1>
      <p className="text-muted-foreground mb-6">Approve testimonials before they appear on the public site.</p>
      <CrudTable
        items={items}
        loading={loading}
        columns={[
          { key: "name", label: "Name" },
          { key: "occupation", label: "Occupation" },
          {
            key: "approved",
            label: "Status",
            render: (t) => (
              <Badge variant={t.approved ? "default" : "outline"}>
                {t.approved ? "Approved" : "Pending"}
              </Badge>
            ),
          },
        ]}
        onEdit={(t) => update(t.id, { approved: !t.approved })}
        onDelete={remove}
      />
      <p className="text-sm text-muted-foreground mt-4">Click edit (pencil) to toggle approval status.</p>
    </div>
  );
}

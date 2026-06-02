"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, orderBy, query, updateDoc, doc } from "firebase/firestore";
import { COLLECTIONS, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { AdminHeader } from "@/components/admin/admin-header";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { Mail, Check } from "lucide-react";
import { toast } from "sonner";

interface ContactDoc {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt?: { seconds: number };
  read?: boolean;
}

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<ContactDoc[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const db = getFirebaseDb();
    if (!isFirebaseConfigured() || !db) {
      setLoading(false);
      return;
    }
    try {
      const snap = await getDocs(
        query(collection(db, COLLECTIONS.contacts), orderBy("createdAt", "desc"))
      );
      setContacts(
        snap.docs.map((d) => {
          const data = d.data();
          return {
            id: d.id,
            name: data.name,
            email: data.email,
            message: data.message,
            read: data.read,
            createdAt: data.createdAt,
          };
        })
      );
    } catch {
      toast.error("Could not load messages. Add Firestore index if needed.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const markRead = async (id: string) => {
    const db = getFirebaseDb();
    if (!db) return;
    await updateDoc(doc(db, COLLECTIONS.contacts, id), { read: true });
    toast.success("Marked as read");
    load();
  };

  return (
    <div className="max-w-4xl">
      <AdminHeader
        title="Contact messages"
        description="Inbox from your website contact form. Requires Firebase."
      />

      {loading && <p className="text-muted-foreground">Loading...</p>}

      {!isFirebaseConfigured() && (
        <Card className="p-6 text-center text-muted-foreground">
          Connect Firebase to receive and view contact form submissions.
        </Card>
      )}

      {!loading && isFirebaseConfigured() && contacts.length === 0 && (
        <Card className="p-8 text-center text-muted-foreground">
          No messages yet. They will appear here when visitors use the contact form.
        </Card>
      )}

      <div className="space-y-4">
        {contacts.map((c) => (
          <Card key={c.id} className={`p-5 ${!c.read ? "border-primary/50 bg-primary/5" : ""}`}>
            <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
              <div>
                <p className="font-semibold">{c.name}</p>
                <a href={`mailto:${c.email}`} className="text-sm text-primary flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {c.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                {!c.read && <Badge>New</Badge>}
                {!c.read && (
                  <Button size="sm" variant="outline" onClick={() => markRead(c.id)}>
                    <Check className="h-4 w-4" /> Mark read
                  </Button>
                )}
              </div>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{c.message}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}

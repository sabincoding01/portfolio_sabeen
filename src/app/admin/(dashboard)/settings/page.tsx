"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { toast } from "sonner";
import { COLLECTIONS, getFirebaseDb, isFirebaseConfigured } from "@/lib/firebase";
import { defaultSettings } from "@/data/seed";
import { AdminHeader } from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteSettings } from "@/types";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const firebaseOn = isFirebaseConfigured();

  useEffect(() => {
    async function load() {
      const db = getFirebaseDb();
      if (!db || !firebaseOn) {
        setLoading(false);
        return;
      }
      const snap = await getDoc(doc(db, COLLECTIONS.settings, "site"));
      if (snap.exists()) setSettings({ ...defaultSettings, ...snap.data() } as SiteSettings);
      setLoading(false);
    }
    load();
  }, [firebaseOn]);

  const save = async () => {
    const db = getFirebaseDb();
    if (!db) {
      toast.error("Firebase not configured");
      return;
    }
    await setDoc(doc(db, COLLECTIONS.settings, "site"), settings, { merge: true });
    toast.success("Settings saved");
  };

  return (
    <div className="max-w-3xl">
      <AdminHeader
        title="Website settings"
        description="Homepage hero text and statistics shown on the public site."
      />

      {!firebaseOn && (
        <Card className="mb-8 p-6">
          <CardTitle className="text-lg mb-4">Firebase setup (required to save)</CardTitle>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
            <li>Create a project at console.firebase.google.com</li>
            <li>Enable Authentication → Email/Password and create your admin user</li>
            <li>Enable Firestore Database</li>
            <li>Copy web app config into <code className="bg-muted px-1 rounded">.env.local</code></li>
            <li>Set <code className="bg-muted px-1 rounded">NEXT_PUBLIC_ADMIN_EMAILS=your@email.com</code></li>
            <li>Restart <code className="bg-muted px-1 rounded">npm run dev</code></li>
          </ol>
          <p className="mt-4 text-sm">
            <strong>Local dev without Firebase:</strong> add{" "}
            <code className="bg-muted px-1 rounded">NEXT_PUBLIC_DEV_ADMIN_PASSWORD=your-secret</code> to{" "}
            <code className="bg-muted px-1 rounded">.env.local</code> (development only).
          </p>
        </Card>
      )}

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : (
        <Card className="glass">
          <CardHeader>
            <CardTitle>Hero & stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Hero subtitle</Label>
              <Textarea
                value={settings.heroSubtitle ?? ""}
                onChange={(e) => setSettings({ ...settings, heroSubtitle: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {(
                [
                  "projects",
                  "certificates",
                  "tutorials",
                  "yearsLearning",
                  "studentsTaught",
                ] as const
              ).map((key) => (
                <div key={key}>
                  <Label className="capitalize">{key.replace(/([A-Z])/g, " $1")}</Label>
                  <Input
                    type="number"
                    value={settings.stats?.[key] ?? 0}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        stats: { ...settings.stats!, [key]: Number(e.target.value) },
                      })
                    }
                  />
                </div>
              ))}
            </div>
            <Button variant="gradient" onClick={save} disabled={!firebaseOn}>
              Save settings
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

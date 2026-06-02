"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Search, Download } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { formatDate } from "@/lib/utils";
import type { Certificate } from "@/types";

export function CertificatesClient({
  certificates,
}: {
  certificates: Certificate[];
}) {
  const [search, setSearch] = useState("");
  const [org, setOrg] = useState("all");
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const orgs = useMemo(() => {
    const set = new Set(certificates.map((c) => c.organization));
    return Array.from(set);
  }, [certificates]);

  const filtered = useMemo(() => {
    return certificates.filter((c) => {
      const q = search.toLowerCase();
      const matchSearch =
        !search ||
        c.title.toLowerCase().includes(q) ||
        c.organization.toLowerCase().includes(q);
      const matchOrg = org === "all" || c.organization === org;
      return matchSearch && matchOrg;
    });
  }, [certificates, search, org]);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search certificates..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="h-10 rounded-lg border border-input bg-background px-3 text-sm"
          value={org}
          onChange={(e) => setOrg(e.target.value)}
        >
          <option value="all">All organizations</option>
          {orgs.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((cert) => (
          <Card key={cert.id} className="glass overflow-hidden group">
            {cert.imageUrl && !broken[cert.id] && (
              <div className="relative aspect-[4/3]">
                {cert.imageUrl.startsWith("blob:") ||
                cert.imageUrl.startsWith("data:") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Image
                    src={cert.imageUrl}
                    alt={cert.title}
                    fill
                    className="object-cover"
                    sizes="400px"
                    onError={() =>
                      setBroken((s) => ({ ...s, [cert.id]: true }))
                    }
                  />
                )}
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg">{cert.title}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {cert.organization} · {formatDate(cert.date)}
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                {cert.description}
              </p>
              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      Preview
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{cert.title}</DialogTitle>
                    </DialogHeader>
                    {cert.imageUrl && (
                      <div className="relative aspect-video w-full">
                        <Image
                          src={cert.imageUrl}
                          alt={cert.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground">
                      {cert.description}
                    </p>
                  </DialogContent>
                </Dialog>
                {(cert.fileUrl || cert.imageUrl) && (
                  <Button variant="secondary" size="sm" asChild>
                    <a
                      href={cert.fileUrl ?? cert.imageUrl}
                      download
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4" /> Download
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

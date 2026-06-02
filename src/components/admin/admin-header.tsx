"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useAuth } from "@/components/providers/auth-provider";
import { FirebaseStatus } from "@/components/admin/firebase-status";
import { Button } from "@/components/ui/button";

interface AdminHeaderProps {
  title: string;
  description?: string;
}

export function AdminHeader({ title, description }: AdminHeaderProps) {
  const { adminEmail } = useAuth();

  return (
    <header className="mb-8 flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>
        )}
        {adminEmail && (
          <p className="mt-2 text-sm text-muted-foreground">
            Signed in as <span className="font-medium text-foreground">{adminEmail}</span>
          </p>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FirebaseStatus />
        <Button variant="outline" size="sm" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" /> View site
          </Link>
        </Button>
      </div>
    </header>
  );
}

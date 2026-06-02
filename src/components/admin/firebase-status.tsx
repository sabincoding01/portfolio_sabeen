"use client";

import { isFirebaseConfigured } from "@/lib/firebase";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FirebaseStatus({ className }: { className?: string }) {
  const connected = isFirebaseConfigured();

  return (
    <Badge
      variant="outline"
      className={cn(
        "gap-1.5 font-normal",
        connected
          ? "border-emerald-500/50 text-emerald-600 dark:text-emerald-400"
          : "border-amber-500/50 text-amber-600 dark:text-amber-400",
        className
      )}
    >
      <span
        className={cn(
          "h-2 w-2 rounded-full",
          connected ? "bg-emerald-500" : "bg-amber-500 animate-pulse"
        )}
      />
      {connected ? "Firebase connected" : "Demo mode — add .env.local"}
    </Badge>
  );
}

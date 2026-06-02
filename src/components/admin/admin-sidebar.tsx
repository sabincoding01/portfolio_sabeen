"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, LogOut, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { FirebaseStatus } from "@/components/admin/firebase-status";
import { ADMIN_MODULES, ADMIN_NAV_GROUPS } from "@/lib/admin-modules";

export function AdminSidebar() {
  const pathname = usePathname();
  const { logout, adminEmail } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const nav = (
    <>
      <div className="mb-6 px-2">
        <Link href="/admin" className="text-xl font-bold gradient-text" onClick={() => setMobileOpen(false)}>
          Sabin CMS
        </Link>
        <p className="text-xs text-muted-foreground mt-1">Portfolio control center</p>
      </div>

      <FirebaseStatus className="mb-4 mx-2 w-fit" />

      {ADMIN_NAV_GROUPS.map((group) => {
        const items = ADMIN_MODULES.filter((m) => m.group === group.id && m.href !== "/admin");
        if (!items.length && group.id !== "overview") return null;

        return (
          <div key={group.id} className="mb-4">
            <p className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.id === "overview" && (
                <Link
                  href="/admin"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary",
                    pathname === "/admin" && "bg-primary/10 font-medium text-primary"
                  )}
                >
                  {(() => {
                    const Icon = ADMIN_MODULES[0].icon;
                    return <Icon className="h-4 w-4 shrink-0" />;
                  })()}
                  Dashboard
                </Link>
              )}
              {items.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-secondary",
                    pathname === link.href && "bg-primary/10 font-medium text-primary"
                  )}
                >
                  <link.icon className="h-4 w-4 shrink-0" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

      <div className="mt-auto pt-4 border-t border-border space-y-2">
        {adminEmail && (
          <p className="px-3 text-xs text-muted-foreground truncate">{adminEmail}</p>
        )}
        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
          <Link href="/" target="_blank">
            <ExternalLink className="h-4 w-4" /> Public site
          </Link>
        </Button>
        <Button variant="ghost" className="w-full justify-start text-destructive hover:text-destructive" onClick={() => logout()}>
          <LogOut className="h-4 w-4 mr-2" /> Logout
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </Button>

      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-full w-72 flex-col border-r border-border bg-card p-4 shadow-xl transition-transform lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-2 top-2 lg:hidden"
          onClick={() => setMobileOpen(false)}
        >
          <X className="h-5 w-5" />
        </Button>
        {nav}
      </aside>
    </>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuth } from "@/components/providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FirebaseStatus } from "@/components/admin/firebase-status";
import { isFirebaseConfigured } from "@/lib/firebase";
import { isDevAdminEnabled } from "@/lib/dev-admin";
import { ADMIN_MODULES } from "@/lib/admin-modules";
import { LayoutDashboard } from "lucide-react";

const schema = z.object({
  email: z.string().optional(),
  password: z.string().min(1),
});

type FormData = z.infer<typeof schema>;

export default function AdminLoginPage() {
  const { signIn, signInDev, user, isAdmin, loading } = useAuth();
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const firebaseOn = isFirebaseConfigured();
  const devMode = isDevAdminEnabled();

  const adminEmails = useMemo(() => {
    const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
    return raw
      .split(",")
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (!loading && isAdmin) {
      router.replace("/admin");
    }
  }, [loading, isAdmin, router]);

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      if (!firebaseOn && devMode) {
        const ok = signInDev(data.password);
        if (!ok) {
          toast.error("Invalid dev password");
          return;
        }
        toast.success("Dev admin session started");
        // Full navigation ensures auth state is picked up cleanly
        router.replace("/admin");
        return;
      }

      if (!firebaseOn) {
        toast.error(
          "Add Firebase to .env.local or set NEXT_PUBLIC_DEV_ADMIN_PASSWORD for local access",
        );
        return;
      }

      if (!data.email) {
        toast.error("Email is required");
        return;
      }

      const normalizedEmail = data.email.toLowerCase();
      if (adminEmails.length > 0 && !adminEmails.includes(normalizedEmail)) {
        toast.error(
          "This email is not authorized for admin access. Add the email to NEXT_PUBLIC_ADMIN_EMAILS in .env.local.",
        );
        return;
      }

      await signIn(data.email, data.password);
      toast.success("Welcome to your dashboard!");
      await router.replace("/admin");
    } catch {
      toast.error("Invalid email or password");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">
          {isAdmin ? "Opening dashboard..." : "Loading..."}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-lg space-y-8">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <LayoutDashboard className="h-7 w-7" />
            </div>
            <h1 className="text-3xl font-bold gradient-text">Portfolio CMS</h1>
            <p className="mt-2 text-muted-foreground">
              Sign in to manage projects, tutorials, blog, and more
            </p>
            <div className="mt-4 flex justify-center">
              <FirebaseStatus />
            </div>
          </div>

          <Card className="glass border-border/80 shadow-xl">
            <CardHeader>
              <CardTitle>Admin sign in</CardTitle>
              <p className="text-sm text-muted-foreground">
                {firebaseOn
                  ? "Use your Firebase admin email and password"
                  : devMode
                    ? "Firebase off — use your dev password from .env.local"
                    : "Configure Firebase or dev password to continue"}
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {firebaseOn && (
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                )}
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder={
                      devMode && !firebaseOn ? "Dev admin password" : "••••••••"
                    }
                    {...register("password")}
                  />
                </div>
                <Button
                  type="submit"
                  variant="gradient"
                  className="w-full"
                  disabled={submitting}
                >
                  {submitting ? "Signing in..." : "Enter dashboard"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="border-dashed">
            <CardContent className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                After login you can manage
              </p>
              <div className="flex flex-wrap gap-2">
                {ADMIN_MODULES.filter((m) => m.href !== "/admin").map((m) => (
                  <span
                    key={m.href}
                    className="text-xs rounded-full bg-secondary px-2.5 py-1"
                  >
                    {m.label}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          <p className="text-center text-sm text-muted-foreground">
            <Link
              href="/"
              className="hover:text-primary underline-offset-4 hover:underline"
            >
              ← Back to public site
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

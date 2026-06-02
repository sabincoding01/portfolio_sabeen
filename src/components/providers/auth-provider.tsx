"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User,
} from "firebase/auth";
import { getFirebaseAuth, isFirebaseConfigured } from "@/lib/firebase";
import {
  hasDevAdminSession,
  setDevAdminSession,
  verifyDevAdminPassword,
} from "@/lib/dev-admin";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  isDevAdmin: boolean;
  adminEmail: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signInDev: (password: string) => boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getAdminEmails(): string[] {
  const raw = process.env.NEXT_PUBLIC_ADMIN_EMAILS ?? "";
  return raw.split(",").map((e) => e.trim().toLowerCase()).filter(Boolean);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [devAdmin, setDevAdmin] = useState(
    () => typeof window !== "undefined" && hasDevAdminSession()
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const syncDevSession = () => setDevAdmin(hasDevAdminSession());
    syncDevSession();

    const auth = getFirebaseAuth();
    if (!auth || !isFirebaseConfigured()) {
      setLoading(false);
      return;
    }

    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      syncDevSession();
      setLoading(false);
    });
    return () => unsub();
  }, []);

  const isFirebaseAdmin = useMemo(() => {
    if (!user?.email) return false;
    const admins = getAdminEmails();
    if (admins.length === 0) return Boolean(user);
    return admins.includes(user.email.toLowerCase());
  }, [user]);

  const isAdmin = isFirebaseAdmin || devAdmin;

  const signIn = useCallback(async (email: string, password: string) => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Firebase is not configured");
    await signInWithEmailAndPassword(auth, email, password);
  }, []);

  const signInDev = useCallback((password: string) => {
    const ok = verifyDevAdminPassword(password);
    if (ok) {
      setDevAdminSession(true);
      setDevAdmin(true);
    }
    return ok;
  }, []);

  const logout = useCallback(async () => {
    setDevAdminSession(false);
    setDevAdmin(false);
    const auth = getFirebaseAuth();
    if (auth) await signOut(auth);
  }, []);

  const adminEmail = user?.email ?? (devAdmin ? "dev@localhost" : null);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAdmin,
      isDevAdmin: devAdmin,
      adminEmail,
      signIn,
      signInDev,
      logout,
    }),
    [user, loading, isAdmin, devAdmin, adminEmail, signIn, signInDev, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

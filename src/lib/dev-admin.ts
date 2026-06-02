const DEV_SESSION_KEY = "portfolio-dev-admin";

export function isDevAdminEnabled(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_DEV_ADMIN_PASSWORD?.length);
}

export function getDevAdminPassword(): string {
  return process.env.NEXT_PUBLIC_DEV_ADMIN_PASSWORD ?? "";
}

export function setDevAdminSession(active: boolean): void {
  if (typeof window === "undefined") return;
  if (active) {
    sessionStorage.setItem(DEV_SESSION_KEY, "1");
  } else {
    sessionStorage.removeItem(DEV_SESSION_KEY);
  }
}

export function hasDevAdminSession(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(DEV_SESSION_KEY) === "1";
}

export function verifyDevAdminPassword(password: string): boolean {
  return isDevAdminEnabled() && password === getDevAdminPassword();
}

import { useCallback, useEffect, useState } from "react";
import { api } from "@/lib/api";

const STORAGE_KEY = "synapsea_admin_token";

export function useAdminAuth() {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(STORAGE_KEY));
  const [checking, setChecking] = useState<boolean>(Boolean(token));

  useEffect(() => {
    if (!token) { setChecking(false); return; }
    let cancelled = false;
    api("/api/admin/me", { token })
      .catch(() => {
        if (!cancelled) {
          localStorage.removeItem(STORAGE_KEY);
          setToken(null);
        }
      })
      .finally(() => { if (!cancelled) setChecking(false); });
    return () => { cancelled = true; };
  }, [token]);

  const login = useCallback(async (password: string) => {
    const { token: t } = await api<{ token: string }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ password }),
    });
    localStorage.setItem(STORAGE_KEY, t);
    setToken(t);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setToken(null);
  }, []);

  return { token, isAuthed: Boolean(token), checking, login, logout };
}

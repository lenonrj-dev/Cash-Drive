/* frontend/providers/AuthProvider.tsx */
"use client";

import React, { createContext, useCallback, useEffect, useMemo, useState } from "react";
import { clearToken, getToken, setToken } from "../lib/storage";
import * as authService from "../services/authService";
import type { MeResponse } from "../types/api";

type AuthContextValue = {
  user: MeResponse | null;
  token: string | null;
  isLoading: boolean;
  isAuthed: boolean;
  login: (email: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  signup: (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    acceptedTerms: boolean;
  }) => Promise<{ ok: boolean; error?: string }>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrate = useCallback(async () => {
    setIsLoading(true);
    const t = getToken();
    setTokenState(t);

    if (!t) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    const res = await authService.me();
    if (res.ok) setUser(res.data);
    else {
      clearToken();
      setTokenState(null);
      setUser(null);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const login = useCallback(async (email: string, password: string) => {
    const res = await authService.login(email, password);
    if (!res.ok) return { ok: false, error: res.error.message };
    setToken(res.data.token);
    setTokenState(res.data.token);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const signup = useCallback(async (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    acceptedTerms: boolean;
  }) => {
    const res = await authService.signup(payload);
    if (!res.ok) return { ok: false, error: res.error.message };
    setToken(res.data.token);
    setTokenState(res.data.token);
    setUser(res.data.user);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    clearToken();
    setTokenState(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      token,
      isLoading,
      isAuthed: Boolean(token && user),
      login,
      signup,
      logout,
    }),
    [user, token, isLoading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/* frontend/providers/AuthProvider.tsx */
/* eslint-disable react-hooks/set-state-in-effect */
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

    const user = await authService.me();
    if (user) setUser(user);
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
    try {
      const data = await authService.login(email, password);
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível entrar";
      return { ok: false, error: message };
    }
  }, []);

  const signup = useCallback(async (payload: {
    name: string;
    email: string;
    password: string;
    phone?: string | null;
    acceptedTerms: boolean;
  }) => {
    try {
      const data = await authService.signup(payload);
      setToken(data.token);
      setTokenState(data.token);
      setUser(data.user);
      return { ok: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Não foi possível criar conta";
      return { ok: false, error: message };
    }
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

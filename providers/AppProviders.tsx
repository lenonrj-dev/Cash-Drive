"use client";

import React from "react";
import ThemeProvider from "./ThemeProvider";
import AuthProvider from "./AuthProvider";
import BillingProvider from "./BillingProvider";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BillingProvider>{children}</BillingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

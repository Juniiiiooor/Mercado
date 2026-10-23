"use client";

import { createContext, useCallback, useContext, useMemo, useSyncExternalStore } from "react";
import type { ReactNode } from "react";
import { applyTheme, readTheme } from "@/lib/storage";

type Theme = "dark" | "light";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

/**
 * Assinantes da preferência de cor.
 *
 * O tema vive no `<html data-theme>`, e não em `useState`, para que o valor
 * continue correto mesmo antes da hidratação (o script inline em `layout.tsx`
 * já aplica a preferência salva). Aqui só publicamos mudanças para o React.
 */
const listeners = new Set<() => void>();

function subscribeTheme(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getThemeSnapshot(): Theme {
  if (typeof document === "undefined") return "light";
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function publishTheme(next: Theme) {
  applyTheme(next);
  listeners.forEach((listener) => listener());
}

/**
 * Preferência de cor do site.
 *
 * O tema padrão é claro (verde de supermercado), seguindo a referência visual
 * do estudo; o atributo `data-theme` fica no `<html>`.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, () => "light" as Theme);

  const setTheme = useCallback((next: Theme) => publishTheme(next), []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme: () => publishTheme(readTheme() === "dark" ? "light" : "dark"),
    }),
    [theme, setTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme precisa estar dentro de <ThemeProvider>.");
  }
  return context;
}

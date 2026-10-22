/**
 * Sites e ferramentas sem JavaScript desligado.
 *
 * `no-js` entra no HTML antes da hidratação (veja `layout.tsx`), então a
 * classe tem que refletir o estado padrão do navegador. O valor inicial é
 * `js`, mas o navegador persiste o que estiver salvo em `localStorage`.
 */

export const THEME_STORAGE_KEY = "mercado-do-bairro:tema";
export const CART_STORAGE_KEY = "mercado-do-bairro:carrinho";
export const ACCOUNT_STORAGE_KEY = "mercado-do-bairro:conta";
export const ORDERS_STORAGE_KEY = "mercado-do-bairro:pedidos";
export const RECENT_STORAGE_KEY = "mercado-do-bairro:vistos";

/** Lê um valor do `localStorage` sem quebrar em renderização no servidor. */
export function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

/** Escreve no `localStorage`, ignorando falhas de modo privado/cota. */
export function writeStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* silencioso: preferimos perder persistência a quebrar a interface */
  }
}

export function removeStorage(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* silencioso */
  }
}

/**
 * Chave de preferência de cor. O tema inicial é sempre escuro, então
 * escrevemos no `localStorage` apenas quando a pessoa troca manualmente.
 */
export function applyTheme(theme: "dark" | "light"): void {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  writeStorage(THEME_STORAGE_KEY, theme);
}

export function readTheme(fallback: "dark" | "light" = "dark"): "dark" | "light" {
  const stored = readStorage<"dark" | "light" | null>(THEME_STORAGE_KEY, null);
  return stored === "light" || stored === "dark" ? stored : fallback;
}

"use client";

import { useSyncExternalStore } from "react";

/**
 * Lê um valor do navegador (`localStorage`, `matchMedia`, `dataset`...) sem
 * provocar divergência de hidratação.
 *
 * O site é renderizado primeiro no servidor e depois no navegador. Se lêssemos
 * o `localStorage` durante o primeiro render, o HTML do servidor e o do cliente
 * sairiam diferentes e o React reclamaria. O padrão antigo era ler dentro de um
 * `useEffect` e guardar o resultado em `useState`, o que gera um render extra em
 * cascata (e hoje é apontado como erro pelo `react-hooks`).
 *
 * `useSyncExternalStore` resolve isso de forma correta: no servidor (e na
 * primeira passada do cliente) devolve `serverSnapshot`, e logo após a
 * hidratação passa a devolver `clientSnapshot`.
 */

/** Store vazia e estável para o snapshot de servidor. */
const emptySubscribe = () => () => {};

export function useHydratedValue<T>(getSnapshot: () => T, serverSnapshot: T): T {
  return useSyncExternalStore(emptySubscribe, getSnapshot, () => serverSnapshot);
}

/**
 * Variante booleana que só vira `true` depois da hidratação no navegador.
 * Útil para telas que precisam esperar o estado salvo antes de pintar.
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

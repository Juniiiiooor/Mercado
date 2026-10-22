"use client";

import { useCallback, useSyncExternalStore } from "react";
import { readStorage, writeStorage } from "@/lib/storage";

/**
 * Store persistida no `localStorage` e observável pelo React.
 *
 * O site renderiza no servidor antes de existir `localStorage`; se lermos o
 * valor salvo no primeiro render do cliente, o HTML do servidor e o do cliente
 * divergem e a hidratação quebra. Este hook evita isso combinando duas coisas:
 *
 * 1. `useSyncExternalStore` — devolve o valor do servidor até a hidratação
 *    terminar e só então passa a devolver o valor salvo no navegador;
 * 2. uma store por chave, compartilhada por todo mundo que usar o mesmo
 *    `storageKey`, para que duas telas abertas ao mesmo tempo fiquem em sincronia.
 */

type Store<T> = {
  key: string;
  fallback: T;
  snapshot: T | undefined;
  listeners: Set<() => void>;
};

/** Cache por chave: um mesmo `storageKey` reusa a mesma store. */
const stores = new Map<string, Store<unknown>>();

function getStore<T>(key: string, fallback: T): Store<T> {
  const existing = stores.get(key) as Store<T> | undefined;
  if (existing) return existing;
  const created: Store<T> = { key, fallback, snapshot: undefined, listeners: new Set() };
  stores.set(key, created as Store<unknown>);
  return created;
}

function subscribeTo<T>(store: Store<T>, listener: () => void): () => void {
  store.listeners.add(listener);
  return () => store.listeners.delete(listener);
}

/** Valor do navegador; na primeira passada devolve o mesmo do servidor. */
function clientSnapshot<T>(store: Store<T>): T {
  if (store.snapshot === undefined) {
    store.snapshot = readStorage<T>(store.key, store.fallback);
  }
  return store.snapshot;
}

function publish<T>(store: Store<T>, next: T): void {
  store.snapshot = next;
  writeStorage(store.key, next);
  store.listeners.forEach((listener) => listener());
}

/**
 * Lê e escreve um valor persistido, com hidratação segura.
 *
 * @param storageKey chave usada no `localStorage` (nunca mude sem motivo).
 * @param fallback valor devolvido no servidor e quando não há nada salvo.
 */
export function usePersistentState<T>(
  storageKey: string,
  fallback: T,
): readonly [T, (next: T | ((current: T) => T)) => void] {
  const store = getStore(storageKey, fallback);

  const value = useSyncExternalStore(
    useCallback((listener) => subscribeTo(store, listener), [store]),
    useCallback(() => clientSnapshot(store), [store]),
    useCallback(() => store.fallback, [store]),
  );

  const setValue = useCallback(
    (next: T | ((current: T) => T)) => {
      const resolved =
        typeof next === "function"
          ? (next as (current: T) => T)(clientSnapshot(store))
          : next;
      publish(store, resolved);
    },
    [store],
  );

  return [value, setValue] as const;
}

/** Encerra o cache de stores (usado apenas em testes). */
export function resetPersistentStores(): void {
  stores.clear();
}

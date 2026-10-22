"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import type { ReactNode } from "react";
import { placeOrder, signIn, signUp } from "@/lib/account-client";
import { findDemoAccount } from "@/data/demo-accounts";
import { usePersistentState } from "@/lib/use-persistent-state";
import { useMounted } from "@/lib/use-hydrated-value";
import { ACCOUNT_STORAGE_KEY, ORDERS_STORAGE_KEY } from "@/lib/storage";
import type { Order, User } from "@/types/domain";
import type { CheckoutPayload } from "@/lib/contracts";

export type AuthError = {
  message: string;
  /** Campo culpado, quando dá para apontar um. */
  field?: "email" | "password" | "name";
};

type AccountContextValue = {
  user: User | null;
  orders: Order[];
  /** `true` enquanto a sessão é reidratada do navegador. */
  loading: boolean;
  signInWithPassword: (email: string, password: string) => Promise<{ ok: true } | { ok: false; error: AuthError }>;
  register: (input: {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }) => Promise<{ ok: true } | { ok: false; error: AuthError }>;
  signOut: () => void;
  updateProfile: (patch: Partial<User>) => void;
  /** Fecha o pedido com os itens informados e devolve o registro criado. */
  checkout: (
    payload: CheckoutPayload,
    items: Order["items"],
  ) => Promise<Order>;
};

const AccountContext = createContext<AccountContextValue | null>(null);

export function AccountProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = usePersistentState<User | null>(ACCOUNT_STORAGE_KEY, null);
  const [orders, setOrders] = usePersistentState<Order[]>(ORDERS_STORAGE_KEY, []);
  // A sessão persistida é lida no navegador; até a hidratação terminar tratamos
  // como "carregando" para as telas não piscarem o estado deslogado.
  const loading = !useMounted();

  const signInWithPassword = useCallback<AccountContextValue["signInWithPassword"]>(
    async (email, password) => {
      const demo = findDemoAccount(email, password);
      if (demo) {
        setUser({
          name: demo.name,
          email: demo.email,
          phone: demo.phone,
          memberSince: demo.memberSince,
          clubTier: demo.clubTier,
          points: demo.points,
          address: parseAddress(demo.address),
        });
        setOrders(demo.orders);
        return { ok: true };
      }

      const userData = await signIn(email, password);
      setUser(userData);
      setOrders([]);
      return { ok: true };
    },
    [setUser, setOrders],
  );

  const register = useCallback<AccountContextValue["register"]>(async (input) => {
    const created = await signUp(input);
    setUser(created);
    setOrders([]);
    return { ok: true };
  }, [setUser, setOrders]);

  const signOut = useCallback(() => {
    setUser(null);
    setOrders([]);
  }, [setUser, setOrders]);

  const updateProfile = useCallback((patch: Partial<User>) => {
    setUser((current) => (current ? { ...current, ...patch } : current));
  }, [setUser]);

  const checkout = useCallback<AccountContextValue["checkout"]>(
    async ({ address, paymentMethod, fulfillment }, items) => {
      const order = await placeOrder({
        items,
        address,
        paymentMethod,
        fulfillment,
      });
      setOrders((current) => [order, ...current]);
      setUser((current) =>
        current ? { ...current, points: current.points + Math.round(order.total) } : current,
      );
      return order;
    },
    [setUser, setOrders],
  );

  const value = useMemo<AccountContextValue>(
    () => ({
      user,
      orders,
      loading,
      signInWithPassword,
      register,
      signOut,
      updateProfile,
      checkout,
    }),
    [user, orders, loading, signInWithPassword, register, signOut, updateProfile, checkout],
  );

  return <AccountContext.Provider value={value}>{children}</AccountContext.Provider>;
}

/** Converte a linha de endereço da demo em campos estruturados. */
function parseAddress(line: string): User["address"] {
  const [streetPart = "", rest = ""] = line.split(" — ");
  const [street = "", number = ""] = streetPart.split(", ");
  const [district = "", cityState = ""] = rest.split(", ");
  const [city = "", state = "SC"] = cityState.split("/");
  return {
    label: "Casa",
    street: street.trim(),
    number: number.trim(),
    district: district.trim(),
    city: city.trim(),
    state: state.trim(),
    zip: "",
  };
}

export function useAccount(): AccountContextValue {
  const context = useContext(AccountContext);
  if (!context) {
    throw new Error("useAccount precisa estar dentro de <AccountProvider>.");
  }
  return context;
}

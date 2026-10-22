"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { getProduct } from "@/data/products";
import { CART_STORAGE_KEY } from "@/lib/storage";
import { usePersistentState } from "@/lib/use-persistent-state";
import { calculateTotals, FREE_DELIVERY_THRESHOLD } from "@/lib/format";
import type { CartItemView, CartSummary } from "@/lib/contracts";
import type { CartLine } from "@/types/domain";

type Fulfillment = "entrega" | "retirada";

type CartContextValue = {
  lines: CartLine[];
  summary: CartSummary;
  /** Quantidade no carrinho apenas quando o produto está presente. */
  qtyOf: (productId: string) => number;
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  fulfillment: Fulfillment;
  setFulfillment: (value: Fulfillment) => void;
  /** Controle do painel lateral do carrinho. */
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const MAX_QTY = 30;

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = usePersistentState<CartLine[]>(CART_STORAGE_KEY, []);
  const [fulfillment, setFulfillment] = useState<Fulfillment>("entrega");
  const [isOpen, setIsOpen] = useState(false);

  const add = useCallback((productId: string, qty = 1) => {
    setLines((current) => {
      const existing = current.find((line) => line.productId === productId);
      if (!existing) return [...current, { productId, qty: Math.min(qty, MAX_QTY) }];
      return current.map((line) =>
        line.productId === productId
          ? { ...line, qty: Math.min(MAX_QTY, line.qty + qty) }
          : line,
      );
    });
  }, [setLines]);

  const remove = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.productId !== productId));
  }, [setLines]);

  const setQty = useCallback((productId: string, qty: number) => {
    setLines((current) => {
      if (qty <= 0) return current.filter((line) => line.productId !== productId);
      return current.map((line) =>
        line.productId === productId ? { ...line, qty: Math.min(MAX_QTY, qty) } : line,
      );
    });
  }, [setLines]);

  const clear = useCallback(() => setLines([]), [setLines]);

  const summary = useMemo<CartSummary>(() => {
    const items: CartItemView[] = [];
    for (const line of lines) {
      const product = getProduct(line.productId);
      if (!product) continue; // produto saiu do catálogo: ignora a linha órfã
      items.push({
        productId: product.id,
        name: product.name,
        brand: product.brand,
        unit: product.unit,
        size: product.size,
        price: product.price,
        compareAt: product.compareAt,
        qty: line.qty,
        lineTotal: Number((product.price * line.qty).toFixed(2)),
        category: product.category,
      });
    }
    const subtotal = Number(items.reduce((sum, item) => sum + item.lineTotal, 0).toFixed(2));
    const totals = calculateTotals(subtotal, fulfillment);
    return {
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      ...totals,
      missingForFreeDelivery:
        fulfillment === "entrega" ? Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal) : 0,
    };
  }, [lines, fulfillment]);

  const value = useMemo<CartContextValue>(
    () => ({
      lines,
      summary,
      qtyOf: (productId: string) => lines.find((line) => line.productId === productId)?.qty ?? 0,
      add,
      remove,
      setQty,
      clear,
      fulfillment,
      setFulfillment,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
    }),
    [lines, summary, add, remove, setQty, clear, fulfillment, isOpen],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart precisa estar dentro de <CartProvider>.");
  }
  return context;
}

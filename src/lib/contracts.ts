import type { CategoryId, OrderStatus, PaymentMethod, Unit, User } from "@/types/domain";

/**
 * Tipos públicos da API interna do site — a "fronteira" entre o app e os
 * provedores de estado. Ao trocar a persistência local por chamadas ao
 * servidor, é este contrato que você mantém.
 */

export type { CategoryId, OrderStatus, PaymentMethod, Unit, User };

export type CartItemView = {
  productId: string;
  name: string;
  brand: string;
  unit: Unit;
  size: number;
  /** Preço unitário vigente, já com desconto aplicado. */
  price: number;
  compareAt?: number;
  qty: number;
  /** Subtotal da linha (preço × quantidade). */
  lineTotal: number;
  /** Quanto ainda falta para atingir a próxima faixa de frete grátis. */
  category: CategoryId;
};

export type CartSummary = {
  items: CartItemView[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  /** Falta para o frete grátis (0 quando já conquistado). */
  missingForFreeDelivery: number;
};

export type CheckoutPayload = {
  address: string;
  paymentMethod: PaymentMethod;
  fulfillment: "entrega" | "retirada";
};

export const emptySummary: CartSummary = {
  items: [],
  count: 0,
  subtotal: 0,
  deliveryFee: 0,
  discount: 0,
  total: 0,
  missingForFreeDelivery: 0,
};

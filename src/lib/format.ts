/** Formatação de moeda, unidade e utilitários de carrinho. */

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export function formatPrice(value: number): string {
  return currency.format(value);
}

/** Preço por unidade de medida, útil para comparar embalagens de tamanhos diferentes. */
export function formatUnitPrice(price: number, size: number, unit: string): string {
  const base = size > 0 ? price / size : price;
  const suffix = unit === "kg" || unit === "L" ? unit : `${unit}/un`;
  return `${formatPrice(base)}/${suffix}`;
}

const longDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
});

const shortDate = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function formatLongDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return longDate.format(date);
}

export function formatShortDate(value: string | Date): string {
  const date = typeof value === "string" ? new Date(value) : value;
  return shortDate.format(date);
}

export function formatRating(value: number): string {
  return value.toFixed(1).replace(".", ",");
}

/** Faixa entrega grátis, em reais. */
export const FREE_DELIVERY_THRESHOLD = 120;
/** Taxa padrão de entrega, em reais. */
export const DELIVERY_FEE = 9.9;
/** Desconto do clube em pedidos acima da faixa premium. */
export const CLUB_MIN_ORDER = 150;
/** Percentual de desconto do clube. */
export const CLUB_DISCOUNT = 0.05;

export function deliveryFeeFor(subtotal: number, fulfillment: "entrega" | "retirada"): number {
  if (fulfillment === "retirada") return 0;
  if (subtotal >= FREE_DELIVERY_THRESHOLD) return 0;
  return DELIVERY_FEE;
}

export function clubDiscountFor(subtotal: number): number {
  return subtotal >= CLUB_MIN_ORDER ? subtotal * CLUB_DISCOUNT : 0;
}

export type Totals = {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
};

export function calculateTotals(
  subtotal: number,
  fulfillment: "entrega" | "retirada" = "entrega",
): Totals {
  const deliveryFee = deliveryFeeFor(subtotal, fulfillment);
  const discount = clubDiscountFor(subtotal);
  const total = Math.max(0, subtotal + deliveryFee - discount);
  return {
    subtotal: Number(subtotal.toFixed(2)),
    deliveryFee,
    discount: Number(discount.toFixed(2)),
    total: Number(total.toFixed(2)),
  };
}

/** Gera identificadores legíveis para pedidos (ex.: `MB-4F7K2Q`). */
export function makeOrderId(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";
  let suffix = "";
  for (let index = 0; index < 6; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `MB-${suffix}`;
}

export function slugify(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/**
 * Camada de acesso aos dados da conta.
 *
 * A demo não possui backend: as funções abaixo simulam latência de rede e
 * geram dados locais. Ao integrar um servidor real, basta substituir o
 * conteúdo destas funções por chamadas `fetch` — os tipos permanecem iguais.
 */

import type { Order, OrderItem, PaymentMethod, User } from "@/types/domain";
import { calculateTotals, makeOrderId } from "./format";

/** Latência simulada, em milissegundos. */
const LATENCY = 650;

function wait(ms = LATENCY) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
  phone?: string;
};

/**
 * Cadastra uma pessoa na demo.
 *
 * A senha não é armazenada — apenas descartada depois de validada.
 * Em produção, o cadastro deve acontecer no servidor, com hash (bcrypt/argon2).
 */
export async function signUp({ name, email, phone }: SignUpInput): Promise<User> {
  await wait();
  const now = new Date();
  return {
    name: name.trim(),
    email: email.trim().toLowerCase(),
    phone: phone?.trim() || undefined,
    memberSince: now.toISOString(),
    clubTier: "Folha",
    points: 120,
    address: {
      label: "Casa",
      street: "",
      number: "",
      district: "",
      city: "",
      state: "SC",
      zip: "",
    },
  };
}

/** Autentica na demo: qualquer e-mail válido com senha de 8+ caracteres entra. */
export async function signIn(email: string, _password: string): Promise<User> {
  await wait();
  const normalized = email.trim().toLowerCase();
  const firstName = normalized.split("@")[0].split(/[._-]/)[0] ?? "Cliente";
  const displayName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  return {
    name: `${displayName} Souza`,
    email: normalized,
    memberSince: new Date(Date.now() - 1000 * 60 * 60 * 24 * 214).toISOString(),
    clubTier: "Raiz",
    points: 780,
    address: {
      label: "Casa",
      street: "Rua das Palmeiras",
      number: "284",
      district: "Vila Nova",
      city: "Florianópolis",
      state: "SC",
      zip: "88035-100",
    },
  };
}

export type CheckoutInput = {
  items: OrderItem[];
  address: string;
  paymentMethod: PaymentMethod;
  fulfillment: "entrega" | "retirada";
};

/** Monta o pedido localmente e devolve os dados já com totais recalculados. */
export async function placeOrder({
  items,
  address,
  paymentMethod,
  fulfillment,
}: CheckoutInput): Promise<Order> {
  await wait(900);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totals = calculateTotals(subtotal, fulfillment);
  const eta = new Date();
  eta.setHours(eta.getHours() + (fulfillment === "entrega" ? 3 : 2));

  const paymentLabels: Record<PaymentMethod, string> = {
    pix: "Pix",
    credito: "Cartão de crédito",
    debito: "Cartão de débito",
    dinheiro: "Dinheiro na entrega",
  };

  return {
    id: makeOrderId(),
    createdAt: new Date().toISOString(),
    items,
    subtotal: totals.subtotal,
    deliveryFee: totals.deliveryFee,
    discount: totals.discount,
    total: totals.total,
    status: "confirmado",
    eta: eta.toISOString(),
    address,
    paymentMethod: paymentLabels[paymentMethod],
  };
}

/** Histórico inicial exibido quando a conta ainda não fez pedidos na demo. */
export function seedOrders(): Order[] {
  return [];
}

/**
 * Contas de demonstração.
 *
 * Diferente das contas criadas pelo formulário (que não guardam senha),
 * estas trazem histórico de pedidos e endereço completo para que a tela
 * principal do sistema já tenha conteúdo na primeira visita.
 *
 * Em um sistema real nada disso existiria no cliente: as credenciais ficariam
 * no servidor, com hash, e o histórico viria do banco de dados.
 */

import type { Order } from "@/types/domain";

export type DemoAccount = {
  email: string;
  password: string;
  name: string;
  phone: string;
  clubTier: "Folha" | "Raiz" | "Colheita";
  points: number;
  memberSince: string;
  address: string;
  orders: Order[];
};

const MENOS_DIAS = 1000 * 60 * 60 * 24;

function daysAgo(days: number): string {
  return new Date(Date.now() - days * MENOS_DIAS).toISOString();
}

export const demoAccounts: DemoAccount[] = [
  {
    email: "marina@exemplo.com",
    password: "mercado123",
    name: "Marina Souza",
    phone: "(48) 99812-4477",
    clubTier: "Raiz",
    points: 780,
    memberSince: daysAgo(214),
    address: "Rua das Palmeiras, 284 — Vila Nova, Florianópolis/SC",
    orders: [
      {
        id: "MB-7H2K9P",
        createdAt: daysAgo(4),
        items: [
          { productId: "morango", name: "Morango", unit: "cx", size: 300, price: 19.9, qty: 2 },
          {
            productId: "iogurte-natural",
            name: "Iogurte natural",
            unit: "pct",
            size: 500,
            price: 12.9,
            qty: 1,
          },
          {
            productId: "mel-silvestre",
            name: "Mel silvestre",
            unit: "pct",
            size: 500,
            price: 38.5,
            qty: 1,
          },
        ],
        subtotal: 91.2,
        deliveryFee: 9.9,
        discount: 0,
        total: 101.1,
        status: "entregue",
        eta: daysAgo(4),
        address: "Rua das Palmeiras, 284 — Vila Nova, Florianópolis/SC",
        paymentMethod: "Pix",
      },
      {
        id: "MB-3QW8ZD",
        createdAt: daysAgo(11),
        items: [
          {
            productId: "pao-fermentacao",
            name: "Pão de fermentação natural",
            unit: "un",
            size: 800,
            price: 18.9,
            qty: 1,
          },
          {
            productId: "cafe-especial",
            name: "Café especial torra média",
            unit: "pct",
            size: 250,
            price: 42.9,
            qty: 1,
          },
          { productId: "manteiga", name: "Manteiga com sal", unit: "pct", size: 200, price: 34.9, qty: 1 },
        ],
        subtotal: 96.7,
        deliveryFee: 9.9,
        discount: 0,
        total: 106.6,
        status: "entregue",
        eta: daysAgo(11),
        address: "Rua das Palmeiras, 284 — Vila Nova, Florianópolis/SC",
        paymentMethod: "Cartão de crédito",
      },
      {
        id: "MB-9T1VXB",
        createdAt: daysAgo(26),
        items: [
          { productId: "picanha", name: "Picanha bovina", unit: "kg", size: 1, price: 89.9, qty: 1 },
          {
            productId: "linguica-artesanal",
            name: "Linguiça artesanal",
            unit: "kg",
            size: 1,
            price: 39.9,
            qty: 1,
          },
          { productId: "cebola", name: "Cebola nacional", unit: "kg", size: 1, price: 7.4, qty: 1 },
          { productId: "cerveja-artesanal", name: "Cerveja pilsen artesanal", unit: "un", size: 500, price: 12.9, qty: 6 },
        ],
        subtotal: 214.6,
        deliveryFee: 0,
        discount: 10.73,
        total: 203.87,
        status: "entregue",
        eta: daysAgo(26),
        address: "Rua das Palmeiras, 284 — Vila Nova, Florianópolis/SC",
        paymentMethod: "Pix",
      },
    ],
  },
  {
    email: "joao@exemplo.com",
    password: "mercado123",
    name: "João Bittencourt",
    phone: "(48) 99145-2233",
    clubTier: "Folha",
    points: 240,
    memberSince: daysAgo(58),
    address: "Av. Beira Mar Norte, 1510 — Centro, Florianópolis/SC",
    orders: [
      {
        id: "MB-5J4MCH",
        createdAt: daysAgo(7),
        items: [
          {
            productId: "peito-de-frango",
            name: "Peito de frango",
            unit: "kg",
            size: 1,
            price: 27.9,
            qty: 2,
          },
          {
            productId: "arroz-integral",
            name: "Arroz integral agulhinha",
            unit: "pct",
            size: 1,
            price: 21.9,
            qty: 1,
          },
          { productId: "alface-crespa", name: "Alface crespa", unit: "un", size: 1, price: 5.5, qty: 2 },
        ],
        subtotal: 94.9,
        deliveryFee: 9.9,
        discount: 0,
        total: 104.8,
        status: "em-rota",
        eta: new Date(Date.now() + 1000 * 60 * 90).toISOString(),
        address: "Av. Beira Mar Norte, 1510 — Centro, Florianópolis/SC",
        paymentMethod: "Cartão de débito",
      },
    ],
  },
];

/** Encontra a conta de demonstração pelo par e-mail + senha. */
export function findDemoAccount(email: string, password: string): DemoAccount | undefined {
  const normalized = email.trim().toLowerCase();
  return demoAccounts.find(
    (account) => account.email === normalized && account.password === password,
  );
}

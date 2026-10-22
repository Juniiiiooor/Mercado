/**
 * Modelos de domínio do Mercado do Bairro.
 *
 * Nesta demo os tipos descrevem as entidades usadas tanto no catálogo
 * (dados estáticos em `src/data`) quanto na conta do cliente
 * (estado persistido no navegador pelo `AccountProvider`).
 */

export type Unit = "kg" | "g" | "un" | "dz" | "L" | "ml" | "cx" | "pct";

/** Um produto do catálogo. */
export type Product = {
  /** Identificador estável; também é o nome do arquivo em `public/img/products`. */
  id: string;
  name: string;
  /** Marca própria, fornecedor ou produtor. */
  brand: string;
  category: CategoryId;
  /** Preço em reais. */
  price: number;
  /** Preço original; quando presente, a interface exibe o desconto calculado. */
  compareAt?: number;
  unit: Unit;
  /** Quantidade de referência, por exemplo 500 g ou 1 L. */
  size: number;
  /** Etiquetas curtas exibidas como selos (ex.: "Orgânico", "Novo"). */
  tags?: string[];
  description: string;
  /** Sugestão de conservação/uso, exibida no detalhe do produto. */
  storage?: string;
  stock: number;
  rating: number;
  reviews: number;
  /** Destaque na vitrine da tela principal. */
  featured?: boolean;
  /** Sugestão para receitas e combos. */
  pairing?: string[];
};

export type CategoryId =
  | "hortifruti"
  | "padaria"
  | "laticinios"
  | "mercearia"
  | "bebidas"
  | "proteinas";

export type Category = {
  id: CategoryId;
  name: string;
  slug: string;
  blurb: string;
  /** Emoji usado como suporte visual; a foto do destaque é sempre editorial. */
  icon: string;
};

/** Linha do carrinho. */
export type CartLine = {
  productId: string;
  qty: number;
};

export type OrderStatus = "confirmado" | "em-rota" | "entregue";

export type OrderItem = {
  productId: string;
  name: string;
  unit: Unit;
  size: number;
  price: number;
  qty: number;
};

export type Order = {
  id: string;
  /** Data em ISO 8601. */
  createdAt: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: OrderStatus;
  /** Data sugerida de entrega, em ISO 8601. */
  eta: string;
  address: string;
  paymentMethod: string;
};

export type Address = {
  label: string;
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
  zip: string;
};

export type User = {
  name: string;
  email: string;
  /** Somente para a demo local: nunca armazene senhas em texto puro em produção. */
  phone?: string;
  memberSince: string;
  clubTier: "Folha" | "Raiz" | "Colheita";
  /** Pontos do clube de fidelidade. */
  points: number;
  address: Address;
};

export type AuthState = {
  user: User | null;
  /** `true` enquanto o estado é reidratado do `localStorage`. */
  loading: boolean;
};

export type PaymentMethod = "pix" | "credito" | "debito" | "dinheiro";

export type Fulfillment = "entrega" | "retirada";

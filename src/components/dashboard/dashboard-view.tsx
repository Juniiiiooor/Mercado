"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/providers/account-provider";
import { useCart } from "@/components/providers/cart-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { categories } from "@/data/categories";
import { CategoryIcon } from "@/components/ui/category-icon";
import { discountOf, getDeals, getFeaturedProducts, getProduct, products } from "@/data/products";
import { formatLongDate, formatPrice } from "@/lib/format";
import { RECENT_STORAGE_KEY } from "@/lib/storage";
import { usePersistentState } from "@/lib/use-persistent-state";
import {
  IconArrowRight,
  IconCheck,
  IconClock,
  IconLeaf,
  IconLogout,
  IconMoon,
  IconSearch,
  IconSun,
} from "@/components/ui/icons";import { ProductCard } from "@/components/shop/product-card";
import type { OrderStatus, Product } from "@/types/domain";

type TabId = "visao" | "catalogo" | "pedidos" | "conta";

const tabs: { id: TabId; label: string }[] = [
  { id: "visao", label: "Visão geral" },
  { id: "catalogo", label: "Catálogo" },
  { id: "pedidos", label: "Pedidos" },
  { id: "conta", label: "Minha conta" },
];

const statusLabels: Record<OrderStatus, string> = {
  confirmado: "Confirmado",
  "em-rota": "Saiu para entrega",
  entregue: "Entregue",
};

/**
 * Tela principal do sistema.
 *
 * Reúne visão geral, catálogo, pedidos e conta na mesma página, com
 * navegação por abas ancoradas. O estado vem do `AccountProvider`, então é
 * exatamente a mesma conta exibida no cabeçalho da vitrine.
 */
export function DashboardView() {
  const { user, orders, loading, signOut, updateProfile } = useAccount();
  const { summary, openCart, add, qtyOf, setQty } = useCart();
  const router = useRouter();

  const [tab, setTab] = useState<TabId>("visao");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>("todas");
  const [editing, setEditing] = useState(false);

  // Histórico de produtos vistos, persistido no navegador. Lido de forma segura
  // para a hidratação e reativo o suficiente para o botão "limpar" funcionar.
  const [recent, setRecent] = usePersistentState<string[]>(RECENT_STORAGE_KEY, []);

  useEffect(() => {
    if (!loading && !user) router.replace("/entrar");
  }, [loading, user, router]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term);
      const matchesCategory = category === "todas" || product.category === category;
      return matchesTerm && matchesCategory;
    });
  }, [query, category]);

  const savings = useMemo(
    () =>
      orders.reduce(
        (sum, order) =>
          sum +
          order.items.reduce((line, item) => {
            const product = getProduct(item.productId);
            return line + (product?.compareAt ? product.compareAt - product.price : 0) * item.qty;
          }, 0),
        0,
      ),
    [orders],
  );

  if (loading || !user) {
    return (
      <div className="app-shell">
        <div className="app-main">
          <div className="empty-state">
            <p className="eyebrow">Carregando sua conta</p>
            <p style={{ marginTop: "0.5rem" }}>Um instante enquanto buscamos seus dados.</p>
          </div>
        </div>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];
  const activeOrders = orders.filter((order) => order.status !== "entregue");

  return (
    <div className="app-shell">
      <aside className="app-side">
        <div className="app-side-head">
          <Link href="/" className="brand">
            <span className="brand-mark">mp</span>
            <span>
              Mercadinho <em>da</em> Praça
            </span>
          </Link>
        </div>

        <nav className="app-nav" aria-label="Seções do painel">
          <span className="nav-label">Painel</span>
          <button
            type="button"
            aria-current={tab === "visao" ? "page" : undefined}
            onClick={() => setTab("visao")}
          >
            <IconClock /> Visão geral
          </button>
          <button
            type="button"
            aria-current={tab === "catalogo" ? "page" : undefined}
            onClick={() => setTab("catalogo")}
          >
            <IconSearch /> Catálogo
          </button>
          <button
            type="button"
            aria-current={tab === "pedidos" ? "page" : undefined}
            onClick={() => setTab("pedidos")}
          >
            <IconCheck /> Pedidos
          </button>
          <button
            type="button"
            aria-current={tab === "conta" ? "page" : undefined}
            onClick={() => setTab("conta")}
          >
            <IconLeaf /> Minha conta
          </button>

          <span className="nav-label">Vitrine</span>
          <Link href="/mercado">Ir ao mercado</Link>
          <Link href="/receitas">Receitas</Link>
          <Link href="/lista">Lista de desejos</Link>
        </nav>

        <div className="app-side-foot">
          <div className="member-card">
            <span className="tier">Clube {user.clubTier}</span>
            <p className="points">{user.points.toLocaleString("pt-BR")}</p>
            <small>pontos acumulados</small>
          </div>
          <div className="row" style={{ gap: "0.4rem" }}>
            <button type="button" className="btn btn-ghost btn-sm" onClick={openCart}>
              Carrinho ({summary.count})
            </button>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={signOut}
              aria-label="Sair da conta"
            >
              <IconLogout />
            </button>
          </div>
        </div>
      </aside>

      <main className="app-main" id="conteudo">
        <header className="app-topbar">
          <div>
            <p className="eyebrow">Painel do cliente</p>
            <h1>
              Boa tarde, <em className="italic-accent">{firstName}</em>
            </h1>
            <p className="sub">
              Cliente desde {formatLongDate(user.memberSince)} · clube {user.clubTier}
            </p>
          </div>
          <div className="app-topbar-actions">
            <Link href="/mercado" className="btn btn-primary btn-sm">
              Nova compra
            </Link>
          </div>
        </header>

        <nav className="tabbar" aria-label="Seções da conta">
          {tabs.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={() => setTab(item.id)}
              aria-current={tab === item.id ? "page" : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <section id="visao" aria-labelledby="titulo-visao" className="stack" style={{ gap: "1.2rem" }}>
          <h2 id="titulo-visao" className="display-sm">
            Visão geral
          </h2>

          <div className="stat-grid">
            <article className="stat">
              <span className="label">Pedidos no histórico</span>
              <span className="value">{orders.length}</span>
              <span className="delta muted">{activeOrders.length} em andamento</span>
            </article>
            <article className="stat">
              <span className="label">Economia em promoções</span>
              <span className="value">{formatPrice(savings)}</span>
              <span className="delta muted">somando os descontos</span>
            </article>
            <article className="stat">
              <span className="label">Pontos do clube</span>
              <span className="value">{user.points.toLocaleString("pt-BR")}</span>
              <span className="delta">nível {user.clubTier}</span>
            </article>
            <article className="stat">
              <span className="label">Cesta atual</span>
              <span className="value">{summary.count}</span>
              <span className="delta muted">{formatPrice(summary.total)}</span>
            </article>
          </div>

          <ReorderRow recent={recent} onAdd={add} qtyOf={qtyOf} onSetQty={setQty} />

          <div>
            <div className="section-head">
              <h2 className="display-sm">Destaques da semana</h2>
              <button type="button" className="btn-link" onClick={() => setTab("catalogo")}>
                ver catálogo completo
              </button>
            </div>
            <div className="grid-cards">
              {getFeaturedProducts(4).map((product) => (
                <ProductCard key={product.id} product={product} compact />
              ))}
            </div>
          </div>

          <div className="panel">
            <p className="eyebrow">Ofertas que combinam com sua cesta</p>
            <div className="reorder-grid" style={{ marginTop: "0.9rem" }}>
              {getDeals(3).map((product) => (
                <article className="reorder-card" key={product.id}>
                  <img
                    src={`/img/products/${product.id}.jpg`}
                    alt={product.name}
                    width={72}
                    height={72}
                    loading="lazy"
                  />
                  <div>
                    <h3>{product.name}</h3>
                    <p>
                      {formatPrice(product.price)} · −{discountOf(product)}%
                    </p>
                  </div>
                  <div className="reorder-actions">
                    <button type="button" className="add-btn" onClick={() => add(product.id)}>
                      Adicionar
                    </button>
                    <Link href={`/produto/${product.id}`} className="btn-link">
                      detalhes
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="catalogo"
          aria-labelledby="titulo-catalogo"
          className="stack"
          style={{ gap: "1.2rem" }}
        >
          <h2 id="titulo-catalogo" className="display-sm">
            Catálogo
          </h2>

          <div className="catalog-toolbar">
            <div className="search-shell">
              <IconSearch />
              <input
                className="input"
                type="search"
                placeholder="Buscar no catálogo"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                aria-label="Buscar no catálogo"
              />
            </div>
            <span className="eyebrow">{filtered.length} resultados</span>
          </div>

          <div className="filter-row">
            <button
              type="button"
              className="chip"
              aria-pressed={category === "todas"}
              onClick={() => setCategory("todas")}
            >
              Todos
            </button>
            {categories.map((item) => (
              <button
                key={item.id}
                type="button"
                className="chip"
                aria-pressed={category === item.id}
                onClick={() => setCategory(item.id)}
              >
                <CategoryIcon id={item.id} className="chip-icon" /> {item.name}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <div className="empty-state">
              <p className="eyebrow">Nenhum produto</p>
              <p style={{ marginTop: "0.5rem" }}>Ajuste a busca ou escolha outro corredor.</p>
            </div>
          ) : (
            <div className="grid-cards">
              {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        <section id="pedidos" aria-labelledby="titulo-pedidos" className="stack" style={{ gap: "1.2rem" }}>
          <h2 id="titulo-pedidos" className="display-sm">
            Pedidos
          </h2>

          {orders.length === 0 ? (
            <div className="empty-state">
              <p className="eyebrow">Sem pedidos ainda</p>
              <p style={{ marginTop: "0.5rem" }}>
                Sua primeira compra aparece aqui, com o rastreio de cada etapa.
              </p>
              <Link href="/mercado" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
                Fazer primeira compra
              </Link>
            </div>
          ) : (
            <div className="order-list">
              {orders.map((order) => (
                <article className="order-card" key={order.id}>
                  <header className="order-head">
                    <div>
                      <p className="id">{order.id}</p>
                      <p className="when">{formatLongDate(order.createdAt)}</p>
                    </div>
                    <span className="status-pill" data-status={order.status}>
                      {statusLabels[order.status]}
                    </span>
                  </header>

                  <div className="order-body">
                    {order.items.slice(0, 3).map((item) => (
                      <div className="order-line" key={item.productId}>
                        <span className="name">
                          {item.qty}× {item.name}
                        </span>
                        <span className="price">{formatPrice(item.price * item.qty)}</span>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <span className="field-hint">mais {order.items.length - 3} itens</span>
                    )}
                    <div className="summary-row summary-total">
                      <strong>Total</strong>
                      <span className="price">{formatPrice(order.total)}</span>
                    </div>
                  </div>

                  <div className="track" aria-hidden="true">
                    <i data-done="true" />
                    <i data-done={order.status !== "confirmado"} />
                    <i data-done={order.status === "entregue"} />
                  </div>

                  <div className="order-actions">
                    <button
                      type="button"
                      className="btn btn-sm"
                      onClick={() => {
                        order.items.forEach((item) => add(item.productId, item.qty));
                        openCart();
                      }}
                    >
                      Comprar de novo
                    </button>
                    <Link href="/mercado" className="btn btn-ghost btn-sm">
                      Ver produtos parecidos
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        <section id="conta" aria-labelledby="titulo-conta" className="stack" style={{ gap: "1.2rem" }}>
          <h2 id="titulo-conta" className="display-sm">
            Minha conta
          </h2>

          <div className="account-grid">
            <div className="account-card">
              <h3>Dados pessoais</h3>
              {editing ? (
                <div className="stack" style={{ gap: "0.8rem" }}>
                  <div className="field">
                    <label className="field-label" htmlFor="perfil-nome">
                      Nome completo
                    </label>
                    <input
                      id="perfil-nome"
                      className="input"
                      value={user.name}
                      onChange={(event) => updateProfile({ name: event.target.value })}
                    />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="perfil-tel">
                      Telefone
                    </label>
                    <input
                      id="perfil-tel"
                      className="input"
                      value={user.phone ?? ""}
                      onChange={(event) => updateProfile({ phone: event.target.value })}
                    />
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => setEditing(false)}
                  >
                    Concluir edição
                  </button>
                </div>
              ) : (
                <dl className="kvs">
                  <div>
                    <dt>Nome</dt>
                    <dd>{user.name}</dd>
                  </div>
                  <div>
                    <dt>E-mail</dt>
                    <dd>{user.email}</dd>
                  </div>
                  <div>
                    <dt>Telefone</dt>
                    <dd>{user.phone || "não informado"}</dd>
                  </div>
                  <div>
                    <dt>Cliente desde</dt>
                    <dd>{formatLongDate(user.memberSince)}</dd>
                  </div>
                </dl>
              )}
              <button
                type="button"
                className="btn btn-ghost btn-sm"
                onClick={() => setEditing((value) => !value)}
              >
                {editing ? "Cancelar" : "Editar dados"}
              </button>
            </div>

            <div className="account-card">
              <h3>Endereço principal</h3>
              <dl className="kvs">
                <div>
                  <dt>Rua</dt>
                  <dd>{user.address.street || "—"}</dd>
                </div>
                <div>
                  <dt>Número</dt>
                  <dd>{user.address.number || "—"}</dd>
                </div>
                <div>
                  <dt>Bairro</dt>
                  <dd>{user.address.district || "—"}</dd>
                </div>
                <div>
                  <dt>Cidade</dt>
                  <dd>{user.address.city ? `${user.address.city}/${user.address.state}` : "—"}</dd>
                </div>
              </dl>
              <p className="field-hint">As mudanças valem para os próximos pedidos.</p>
            </div>

            <div className="account-card">
              <h3>Preferências</h3>
              <p className="lede" style={{ fontSize: "0.92rem" }}>
                Ajuste o tema do site e limpe o histórico local de itens vistos. Nada é enviado a
                servidores: tudo fica salvo no seu navegador.
              </p>
              <div className="row">
                <ThemeToggle />
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    window.localStorage.removeItem(RECENT_STORAGE_KEY);
                    setRecent([]);
                  }}
                >
                  Limpar itens vistos
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ReorderRow({
  recent,
  onAdd,
  qtyOf,
  onSetQty,
}: {
  recent: string[];
  onAdd: (id: string) => void;
  qtyOf: (id: string) => number;
  onSetQty: (id: string, qty: number) => void;
}) {
  const picks =
    recent.length > 0 ? recent.slice(0, 3) : getFeaturedProducts(3).map((product) => product.id);
  const items = picks
    .map((id) => getProduct(id))
    .filter((product): product is Product => Boolean(product));

  if (items.length === 0) return null;

  return (
    <div className="panel">
      <div className="spread">
        <p className="eyebrow">{recent.length > 0 ? "Comprar de novo" : "Bons começos"}</p>
        <Link href="/mercado" className="btn-link">
          ver tudo
        </Link>
      </div>
      <div className="reorder-grid" style={{ marginTop: "0.9rem" }}>
        {items.map((product) => (
          <article className="reorder-card" key={product.id}>
            <img
              src={`/img/products/${product.id}.jpg`}
              alt={product.name}
              width={72}
              height={72}
              loading="lazy"
            />
            <div>
              <h3>{product.name}</h3>
              <p>
                {recent.length > 0 ? "Na sua última cesta" : "Sugestão da semana"} ·{" "}
                {formatPrice(product.price)}
              </p>
            </div>
            <div className="reorder-actions">
              {qtyOf(product.id) === 0 ? (
                <button type="button" className="btn btn-sm" onClick={() => onAdd(product.id)}>
                  <IconArrowRight /> Repetir
                </button>
              ) : (
                <span className="qty">
                  <button
                    type="button"
                    onClick={() => onSetQty(product.id, qtyOf(product.id) - 1)}
                    aria-label={`Diminuir ${product.name}`}
                  >
                    −
                  </button>
                  <span>{qtyOf(product.id)}</span>
                  <button
                    type="button"
                    onClick={() => onSetQty(product.id, qtyOf(product.id) + 1)}
                    aria-label={`Aumentar ${product.name}`}
                  >
                    +
                  </button>
                </span>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button type="button" className="btn btn-ghost btn-sm" onClick={toggleTheme}>
      {theme === "dark" ? <IconSun /> : <IconMoon />}
      {theme === "dark" ? "Usar tema claro" : "Usar tema escuro"}
    </button>
  );
}

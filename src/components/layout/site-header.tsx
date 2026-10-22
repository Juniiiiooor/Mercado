"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/components/providers/cart-provider";
import { useAccount } from "@/components/providers/account-provider";
import { useTheme } from "@/components/providers/theme-provider";
import { IconCart, IconClose, IconMenu, IconMoon, IconSun, IconUser } from "@/components/ui/icons";
import { formatPrice } from "@/lib/format";

/** Navegação principal da vitrine. */
const links = [
  { href: "/mercado", label: "Mercado" },
  { href: "/#categorias", label: "Categorias" },
  { href: "/receitas", label: "Receitas" },
  { href: "/lista", label: "Lista de desejos" },
];

export function SiteHeader() {
  const { summary, openCart, isOpen, closeCart, qtyOf, setQty } = useCart();
  const { user } = useAccount();
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuState, setMenuState] = useState<{ open: boolean; path: string }>({
    open: false,
    path: pathname,
  });
  const menuOpen = menuState.open && menuState.path === pathname;
  const setMenuOpen = (next: boolean | ((open: boolean) => boolean)) =>
    setMenuState((current) => ({
      open: typeof next === "function" ? next(current.open) : next,
      path: pathname,
    }));
  const cartRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // O menu móvel se fecha sozinho quando a rota muda: guardamos a rota em que
  // ele foi aberto e só o consideramos aberto enquanto ela for a rota atual.

  // Bloqueia o scroll do fundo enquanto o carrinho está aberto.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      <div className="top-strip">
        <div className="shell">
          <span>
            Entrega no mesmo dia para pedidos até <strong>16h</strong>
          </span>
          <span>
            Frete grátis acima de <strong>R$ 120</strong>
          </span>
        </div>
      </div>

      <header
        className="site-header"
        data-scrolled={scrolled}
        data-open={menuOpen}
      >
        <div className="shell header-inner">
          <button
            type="button"
            className="icon-btn menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="menu-principal"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <IconClose title="Fechar menu" className="icon" />
            ) : (
              <IconMenu title="Abrir menu" className="icon" />
            )}
          </button>

          <Link href="/" className="brand" aria-label="Mercado do Bairro, página inicial">
            <span className="brand-mark">mb</span>
            <span>
              Mercado <em>do</em> Bairro
            </span>
          </Link>

          <nav className="header-nav" id="menu-principal" aria-label="Navegação principal">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <button
              type="button"
              className="icon-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              {theme === "dark" ? <IconSun /> : <IconMoon />}
            </button>

            <Link
              href={user ? "/painel" : "/entrar"}
              className="icon-btn"
              aria-label={user ? `Conta de ${user.name}` : "Entrar ou criar conta"}
            >
              <IconUser />
            </Link>

            <button
              type="button"
              className="icon-btn"
              ref={cartRef}
              onClick={openCart}
              aria-label={`Abrir carrinho, ${summary.count} ${summary.count === 1 ? "item" : "itens"}`}
            >
              <IconCart />
              {summary.count > 0 && (
                <span className="cart-count" aria-hidden="true">
                  {summary.count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {isOpen && (
        <>
          <div className="drawer-backdrop" onClick={closeCart} aria-hidden="true" />
          <aside
            className="drawer"
            role="dialog"
            aria-modal="true"
            aria-label="Carrinho de compras"
          >
            <header className="drawer-head">
              <div>
                <p className="eyebrow">Seu carrinho</p>
                <h2 className="display-sm">
                  {summary.count === 0
                    ? "Ainda vazio"
                    : `${summary.count} ${summary.count === 1 ? "item" : "itens"}`}
                </h2>
              </div>
              <button type="button" className="icon-btn" onClick={closeCart} aria-label="Fechar carrinho">
                <IconClose />
              </button>
            </header>

            <div className="drawer-body">
              {summary.items.length === 0 ? (
                <div className="empty-state">
                  <p className="eyebrow">Cesta vazia</p>
                  <p style={{ marginTop: "0.6rem" }}>
                    Escolha frutas, pães e produtos de mercearia para começar.
                  </p>
                  <Link
                    href="/mercado"
                    className="btn btn-primary btn-sm"
                    style={{ marginTop: "1rem" }}
                    onClick={closeCart}
                  >
                    Explorar o mercado
                  </Link>
                </div>
              ) : (
                summary.items.map((item) => (
                  <article className="mini-item" key={item.productId}>
                    <img
                      src={`/img/products/${item.productId}.jpg`}
                      alt={item.name}
                      width={64}
                      height={64}
                      loading="lazy"
                    />
                    <div className="stack" style={{ gap: "0.35rem" }}>
                      <span className="mini-item-sku">{item.brand}</span>
                      <h4>{item.name}</h4>
                      <div className="spread">
                        <span className="qty">
                          <button
                            type="button"
                            onClick={() => setQty(item.productId, qtyOf(item.productId) - 1)}
                            aria-label={`Diminuir quantidade de ${item.name}`}
                            disabled={item.qty <= 1}
                          >
                            −
                          </button>
                          <span aria-live="polite">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => setQty(item.productId, qtyOf(item.productId) + 1)}
                            aria-label={`Aumentar quantidade de ${item.name}`}
                          >
                            +
                          </button>
                        </span>
                        <span className="price">{formatPrice(item.lineTotal)}</span>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {summary.items.length > 0 && (
              <footer className="drawer-foot">
                {summary.missingForFreeDelivery > 0 ? (
                  <div className="free-shipping">
                    Faltam <strong>{formatPrice(summary.missingForFreeDelivery)}</strong> para o frete
                    grátis.
                    <div className="meter">
                      <span
                        style={{
                          width: `${Math.min(
                            100,
                            ((summary.subtotal / (summary.subtotal + summary.missingForFreeDelivery)) *
                              100) || 0,
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="free-shipping">
                    <strong>Frete grátis conquistado.</strong> Bom apetite!
                  </div>
                )}

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span className="price">{formatPrice(summary.subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Entrega</span>
                  <span className="price">
                    {summary.deliveryFee === 0 ? "Grátis" : formatPrice(summary.deliveryFee)}
                  </span>
                </div>
                {summary.discount > 0 && (
                  <div className="summary-row">
                    <span>Desconto do clube</span>
                    <span className="price">− {formatPrice(summary.discount)}</span>
                  </div>
                )}
                <div className="summary-row summary-total">
                  <strong>Total</strong>
                  <span className="price">{formatPrice(summary.total)}</span>
                </div>

                <Link href="/checkout" className="btn btn-primary btn-block" onClick={closeCart}>
                  Fechar pedido
                </Link>
                <Link
                  href="/mercado"
                  className="btn btn-ghost btn-block btn-sm"
                  onClick={closeCart}
                >
                  Continuar comprando
                </Link>
              </footer>
            )}
          </aside>
        </>
      )}
    </>
  );
}

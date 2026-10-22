"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/providers/cart-provider";
import { ProductCard } from "@/components/shop/product-card";
import { getProduct, getProductsByCategory } from "@/data/products";
import { formatPrice, formatUnitPrice } from "@/lib/format";
import { RECENT_STORAGE_KEY, readStorage, writeStorage } from "@/lib/storage";
import { IconCheck, IconClock, IconStar, IconTruck } from "@/components/ui/icons";
import type { Product } from "@/types/domain";

/**
 * Ficha do produto.
 *
 * Registra o item na lista de "vistos recentemente" (usada no painel) e
 * sugere combinações definidas no catálogo.
 */
export function ProductDetail({ product }: { product: Product }) {
  const { add, qtyOf, setQty } = useCart();
  const qty = qtyOf(product.id);
  const related = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 3);
  const pairings = (product.pairing ?? [])
    .map((id) => getProduct(id))
    .filter((item): item is Product => Boolean(item));

  useEffect(() => {
    const recent = readStorage<string[]>(RECENT_STORAGE_KEY, []);
    const next = [product.id, ...recent.filter((id) => id !== product.id)].slice(0, 8);
    writeStorage(RECENT_STORAGE_KEY, next);
  }, [product.id]);

  return (
    <>
      <div className="shell">
        <nav className="breadcrumb" aria-label="Você está aqui">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <Link href="/mercado">Mercado</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="pdp">
          <figure className="pdp-media">
            <img
              src={`/img/products/${product.id}.jpg`}
              alt={`${product.name} — ${product.brand}`}
              width={1200}
              height={900}
            />
          </figure>

          <div className="pdp-info">
            <span className="product-brand">{product.brand}</span>
            <h1 className="display-lg">{product.name}</h1>

            <div className="product-meta">
              <span className="stars" aria-hidden="true">
                <IconStar />
              </span>
              <span>
                {product.rating.toFixed(1).replace(".", ",")} · {product.reviews} avaliações
              </span>
            </div>

            <div className="pdp-price">
              <span className="price">{formatPrice(product.price)}</span>
              {product.compareAt && (
                <span className="price-was">{formatPrice(product.compareAt)}</span>
              )}
              <span className="field-hint">
                {formatUnitPrice(product.price, product.size, product.unit)}
              </span>
            </div>

            <p className="lede">{product.description}</p>

            <div className="pdp-actions">
              {qty === 0 ? (
                <button type="button" className="btn btn-primary" onClick={() => add(product.id)}>
                  Adicionar à cesta
                </button>
              ) : (
                <>
                  <span className="qty">
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty - 1)}
                      aria-label="Diminuir quantidade"
                    >
                      −
                    </button>
                    <span>{qty}</span>
                    <button
                      type="button"
                      onClick={() => setQty(product.id, qty + 1)}
                      aria-label="Aumentar quantidade"
                    >
                      +
                    </button>
                  </span>
                  <span className="badge">
                    <IconCheck /> na cesta
                  </span>
                </>
              )}
              <Link href="/checkout" className="btn btn-ghost">
                Ir para o pagamento
              </Link>
            </div>

            <dl className="pdp-facts">
              <div>
                <dt>Unidade</dt>
                <dd>
                  {product.size} {product.unit}
                </dd>
              </div>
              <div>
                <dt>Disponibilidade</dt>
                <dd>{product.stock > 0 ? `${product.stock} em estoque` : "esgotado"}</dd>
              </div>
              <div>
                <dt>Entrega</dt>
                <dd>{product.stock > 0 ? "Hoje, se confirmado até 16h" : "consultar"}</dd>
              </div>
            </dl>

            {product.storage && (
              <div className="panel" style={{ padding: "1rem" }}>
                <p className="eyebrow">Como conservar</p>
                <p style={{ marginTop: "0.4rem", fontSize: "0.92rem", color: "var(--ink-2)" }}>
                  {product.storage}
                </p>
              </div>
            )}

            <div className="row" style={{ gap: "1rem" }}>
              <span className="row" style={{ gap: "0.4rem" }}>
                <IconTruck /> Entrega no mesmo dia
              </span>
              <span className="row" style={{ gap: "0.4rem" }}>
                <IconClock /> Janelas de 2 horas
              </span>
            </div>
          </div>
        </div>
      </div>

      {pairings.length > 0 && (
        <section className="section shell" style={{ paddingTop: "clamp(1rem, 3vw, 2rem)" }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Combina com</p>
              <h2 className="display-md">Para fechar a receita</h2>
            </div>
          </div>
          <div className="grid-cards">
            {pairings.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="section shell" style={{ paddingTop: 0 }}>
          <div className="section-head">
            <div>
              <p className="eyebrow">Mesmo corredor</p>
              <h2 className="display-md">Outras opções parecidas</h2>
            </div>
          </div>
          <div className="grid-cards">
            {related.map((item) => (
              <ProductCard key={item.id} product={item} compact />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

"use client";

import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { IconCheck, IconStar } from "@/components/ui/icons";
import { discountOf, formatUnit } from "@/data/products";
import { formatPrice, formatRating } from "@/lib/format";
import type { Product } from "@/types/domain";

type Props = {
  product: Product;
  /** Exibe a avaliação e o estoque — útil na vitrine, dispensável em grades densas. */
  compact?: boolean;
};

/**
 * Cartão de produto.
 *
 * Quando o item já está no carrinho, o botão vira um controle de quantidade
 * e um selo "no carrinho" aparece sobre a foto.
 */
export function ProductCard({ product, compact = false }: Props) {
  const { add, qtyOf, setQty } = useCart();
  const qty = qtyOf(product.id);
  const off = discountOf(product);
  const lowStock = product.stock <= 15;

  return (
    <article className="product-card">
      <div className="product-media">
        <Link href={`/produto/${product.id}`} aria-label={`Ver detalhes de ${product.name}`}>
          <img
            src={`/img/products/${product.id}.jpg`}
            alt={`${product.name} — ${product.brand}`}
            loading="lazy"
            sizes="(max-width: 620px) 88vw, (max-width: 1024px) 44vw, 260px"
          />
        </Link>

        <div className="product-flags">
          {off > 0 && <span className="badge badge-deal">−{off}%</span>}
          {qty > 0 && (
            <span className="badge">
              <IconCheck className="icon" /> no carrinho
            </span>
          )}
          {product.tags?.[0] && off === 0 && (
            <span className="badge badge-plain">{product.tags[0]}</span>
          )}
        </div>
      </div>

      <div className="product-body">
        <span className="product-brand">{product.brand}</span>
        <h3 className="product-name">
          <Link href={`/produto/${product.id}`}>{product.name}</Link>
        </h3>

        {!compact && (
          <div className="product-meta">
            <span className="stars" aria-hidden="true">
              <IconStar className="icon" />
            </span>
            <span>
              {formatRating(product.rating)} · {product.reviews} avaliações
            </span>
          </div>
        )}

        <div className="product-foot">
          <div className="product-price">
            {product.compareAt && (
              <span className="price-was">{formatPrice(product.compareAt)}</span>
            )}
            <span className="price">{formatPrice(product.price)}</span>
            <span className="unit">
              {formatUnit(product)}
              {lowStock && ` · restam ${product.stock}`}
            </span>
          </div>

          {qty === 0 ? (
            <button
              type="button"
              className="add-btn"
              onClick={() => add(product.id)}
              aria-label={`Adicionar ${product.name} ao carrinho`}
            >
              Adicionar
            </button>
          ) : (
            <span className="qty">
              <button
                type="button"
                onClick={() => setQty(product.id, qty - 1)}
                aria-label={`Remover uma unidade de ${product.name}`}
              >
                −
              </button>
              <span aria-live="polite">{qty}</span>
              <button
                type="button"
                onClick={() => setQty(product.id, qty + 1)}
                aria-label={`Adicionar uma unidade de ${product.name}`}
              >
                +
              </button>
            </span>
          )}
        </div>
      </div>
    </article>
  );
}

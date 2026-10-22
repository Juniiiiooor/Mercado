"use client";

import { useState } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/shop/product-card";

type Props = {
  /** Quantidade inicial exibida antes de cliques. */
  initial?: number;
  step?: number;
};

/**
 * Vitrine de produtos com "carregar mais".
 *
 * O botão só aparece quando existem itens além dos já exibidos, então
 * catálogos pequenos não mostram controle algum.
 */
export function ProductShowcase({ initial = 12, step = 8 }: Props) {
  const [visible, setVisible] = useState(initial);

  const shown = products.slice(0, visible);
  const hasMore = visible < products.length;

  return (
    <div className="stack" style={{ gap: "1.6rem" }}>
      <div className="grid-cards">
        {shown.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="spread">
        <span className="eyebrow">
          {shown.length} de {products.length} produtos
        </span>
        {hasMore && (
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => setVisible((current) => current + step)}
          >
            Carregar mais
          </button>
        )}
      </div>
    </div>
  );
}

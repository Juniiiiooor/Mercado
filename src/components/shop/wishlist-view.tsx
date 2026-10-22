"use client";

import { useCallback } from "react";
import Link from "next/link";
import { useCart } from "@/components/providers/cart-provider";
import { ProductCard } from "@/components/shop/product-card";
import { getProduct } from "@/data/products";
import { usePersistentState } from "@/lib/use-persistent-state";
import { useMounted } from "@/lib/use-hydrated-value";
import type { Product } from "@/types/domain";

const KEY = "mercado-do-bairro:lista";

/**
 * Lista de desejos.
 *
 * Guarda apenas os identificadores no navegador e reaproveita o mesmo
 * cartão de produto do catálogo, para que a ação de adicionar ao carrinho
 * funcione igual em toda a loja.
 */
export function WishlistView() {
  const { add } = useCart();
  const [ids, setIds] = usePersistentState<string[]>(KEY, []);
  const ready = useMounted();

  const persist = useCallback((next: string[]) => setIds(next), [setIds]);

  const items = ids
    .map((id) => getProduct(id))
    .filter((product): product is Product => Boolean(product));

  function addAll() {
    items.forEach((product) => add(product.id));
  }

  return (
    <section className="shell" style={{ paddingBlock: "clamp(1.6rem, 4vw, 3rem)" }}>
      <nav className="breadcrumb" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Lista de desejos</span>
      </nav>

      <div className="section-head" style={{ marginTop: "1rem" }}>
        <div>
          <p className="eyebrow">Sua lista</p>
          <h1 className="display-lg">Itens que ficaram para depois</h1>
          <p className="lede" style={{ marginTop: "0.7rem", maxWidth: "52ch" }}>
            A lista fica salva neste navegador. Adicione tudo de uma vez quando a semana apertar.
          </p>
        </div>
        {items.length > 0 && (
          <div className="row">
            <button type="button" className="btn btn-primary" onClick={addAll}>
              Adicionar tudo à cesta
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => persist([])}>
              Esvaziar lista
            </button>
          </div>
        )}
      </div>

      {!ready ? (
        <p className="eyebrow">Carregando sua lista…</p>
      ) : items.length === 0 ? (
        <div className="empty-state">
          <p className="eyebrow">Lista vazia</p>          <p style={{ marginTop: "0.6rem" }}>
            Adicione produtos pela ficha de cada item para guardá-los aqui e retomar depois.
          </p>
          <Link href="/mercado" className="btn btn-primary btn-sm" style={{ marginTop: "1rem" }}>
            Explorar o mercado
          </Link>
        </div>
      ) : (
        <div className="grid-cards">
          {items.map((product) => (
            <div key={product.id} className="stack" style={{ gap: "0.5rem" }}>
              <ProductCard product={product} />
              <button type="button" className="btn-link" onClick={() => persist(ids.filter((id) => id !== product.id))}>
                Remover da lista
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

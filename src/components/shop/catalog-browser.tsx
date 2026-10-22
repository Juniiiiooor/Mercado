"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/shop/product-card";
import { categories } from "@/data/categories";
import { products } from "@/data/products";
import { IconSearch } from "@/components/ui/icons";

type SortKey = "relevancia" | "menor-preco" | "maior-preco" | "avaliacao";

type Props = {
  /** Categoria pré-selecionada (vinda da URL). */
  initialCategory?: string;
  /** Busca pré-preenchida (vinda da URL). */
  initialQuery?: string;
};

const PAGE_SIZE = 9;

const sortLabels: Record<SortKey, string> = {
  relevancia: "Mais relevantes",
  "menor-preco": "Menor preço",
  "maior-preco": "Maior preço",
  avaliacao: "Melhor avaliados",
};

/**
 * Catálogo com busca, facetas e ordenação.
 *
 * Tudo acontece no cliente porque o catálogo é pequeno e estático.
 * Ao ligar um backend, troque `products` por dados do servidor e mantenha
 * os mesmos parâmetros (`query`, `category`, `onlyDeals`, `sort`, `page`).
 */
export function CatalogBrowser({ initialCategory = "todas", initialQuery = "" }: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [maxPrice, setMaxPrice] = useState(120);
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesTerm =
        !term ||
        product.name.toLowerCase().includes(term) ||
        product.brand.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      const matchesCategory = category === "todas" || product.category === category;
      const matchesDeal = !onlyDeals || Boolean(product.compareAt);
      const matchesPrice = product.price <= maxPrice;
      return matchesTerm && matchesCategory && matchesDeal && matchesPrice;
    });

    const sorted = [...result];
    switch (sort) {
      case "menor-preco":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "maior-preco":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "avaliacao":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    }
    return sorted;
  }, [query, category, onlyDeals, maxPrice, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const visible = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function updateFilter(callback: () => void) {
    callback();
    setPage(1);
  }

  return (
    <div className="catalog-layout">
      <aside className="facets" aria-label="Filtros do catálogo">
        <div className="facet-group">
          <h3>Corredor</h3>
          <label>
            <input
              type="radio"
              name="categoria"
              checked={category === "todas"}
              onChange={() => updateFilter(() => setCategory("todas"))}
            />
            Todos os corredores
          </label>
          {categories.map((item) => (
            <label key={item.id}>
              <input
                type="radio"
                name="categoria"
                checked={category === item.id}
                onChange={() => updateFilter(() => setCategory(item.id))}
              />
              {item.name}
            </label>
          ))}
        </div>

        <div className="facet-group">
          <h3>Preço até R$ {maxPrice}</h3>
          <input
            type="range"
            min={5}
            max={120}
            step={5}
            value={maxPrice}
            onChange={(event) => updateFilter(() => setMaxPrice(Number(event.target.value)))}
            aria-label="Preço máximo"
          />
        </div>

        <div className="facet-group">
          <h3>Promoções</h3>
          <label>
            <input
              type="checkbox"
              checked={onlyDeals}
              onChange={(event) => updateFilter(() => setOnlyDeals(event.target.checked))}
            />
            Só itens com desconto
          </label>
        </div>

        <button
          type="button"
          className="btn btn-ghost btn-sm"
          onClick={() =>
            updateFilter(() => {
              setQuery("");
              setCategory("todas");
              setOnlyDeals(false);
              setMaxPrice(120);
              setSort("relevancia");
            })
          }
        >
          Limpar filtros
        </button>
      </aside>

      <div>
        <div className="catalog-results-head">
          <span className="count">
            {filtered.length} {filtered.length === 1 ? "produto" : "produtos"}
            {query && ` para “${query}”`}
          </span>

          <div className="select-wrap">
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as SortKey)}
              aria-label="Ordenar resultados"
            >
              {Object.entries(sortLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <div className="search-shell" style={{ marginBottom: "1.2rem" }}>
          <IconSearch />
          <input
            className="input"
            type="search"
            placeholder="Buscar por produto, marca ou ingrediente"
            value={query}
            onChange={(event) => updateFilter(() => setQuery(event.target.value))}
            aria-label="Buscar produtos"
          />
        </div>

        {visible.length === 0 ? (
          <div className="empty-state">
            <p className="eyebrow">Nada por aqui</p>
            <p style={{ marginTop: "0.5rem" }}>
              Não encontramos produtos com esses filtros. Tente ampliar o preço ou limpar a busca.
            </p>
          </div>
        ) : (
          <div className="grid-cards">
            {visible.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <nav className="pagination" aria-label="Paginação do catálogo">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={currentPage === 1}
              aria-label="Página anterior"
            >
              ←
            </button>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                aria-current={number === currentPage}
                aria-label={`Página ${number}`}
              >
                {number}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={currentPage === totalPages}
              aria-label="Próxima página"
            >
              →
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

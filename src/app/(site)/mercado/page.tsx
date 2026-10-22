import type { Metadata } from "next";
import Link from "next/link";
import { CatalogBrowser } from "@/components/shop/catalog-browser";

export const metadata: Metadata = {
  title: "Mercado",
  description:
    "Explore frutas, verduras, pães, laticínios, mercearia e cortes com filtros por corredor, preço e promoções.",
};

type SearchParams = Promise<{ categoria?: string; busca?: string }>;

export default async function MercadoPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <>
      <section className="catalog-hero shell">
        <nav className="breadcrumb" aria-label="Você está aqui">
          <Link href="/">Início</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">Mercado</span>
        </nav>
        <h1 style={{ marginTop: "0.8rem" }}>
          Tudo o que a semana pede, em um só lugar.
        </h1>
        <p className="lede">
          Filtre por corredor, ajuste o teto de preço e leve só o que combina com a sua cozinha.
          Os preços já incluem o que pagamos ao produtor.
        </p>
      </section>

      <div className="catalog-bar">
        <div className="shell">
          <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
            Catálogo completo
          </p>
          <div className="row">
            <span className="badge badge-plain">Entrega no mesmo dia</span>
            <span className="badge badge-plain">Frete grátis acima de R$ 120</span>
          </div>
        </div>
      </div>

      <section className="shell" style={{ paddingBottom: "clamp(3rem, 7vw, 5rem)" }}>
        <CatalogBrowser
          initialCategory={params.categoria ?? "todas"}
          initialQuery={params.busca ?? ""}
        />
      </section>
    </>
  );
}

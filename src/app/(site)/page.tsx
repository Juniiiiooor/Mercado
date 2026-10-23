import Link from "next/link";
import { ProductShowcase } from "@/components/shop/product-showcase";
import { NewsletterForm } from "@/components/shop/newsletter-form";
import { categories } from "@/data/categories";
import { discountOf, getDeals } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { IconArrowRight } from "@/components/ui/icons";

export default function HomePage() {
  const deals = getDeals(8);

  return (
    <>
      <section className="promo-banner">
        <div className="shell">
          <div className="promo-frame">
            <img
              src="/img/editorial/hero-mercado.jpg"
              alt="Banca de frutas e verduras frescas"
              loading="eager"
            />
            <div className="promo-copy">
              <span className="promo-kicker">Ofertas da semana</span>
              <h2>Frescor de feira com preço de mercado</h2>
              <p>Frutas, pães e mercearia com entrega no mesmo dia.</p>
              <Link href="/mercado" className="btn btn-primary">
                Ver ofertas
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section shell" id="categorias">
        <div className="section-head section-head-center">
          <h2 className="section-title">Categorias</h2>
        </div>

        <div className="home-category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/mercado?categoria=${category.id}`}
              className="home-category-card"
            >
              <div className="home-category-media">
                <img
                  src={`/img/products/${category.id === "acougue" ? "picanha" : category.id === "frios-laticinios" ? "queijo-minas" : category.id === "bebidas" ? "suco-de-laranja" : category.id === "hortifruti" ? "tomate-italiano" : category.id === "mercearia" ? "arroz-integral" : category.id === "limpeza" ? "cafe-especial" : category.id === "higiene" ? "manteiga" : category.id === "padaria" ? "pao-fermentacao" : category.id === "saudaveis" ? "leite-integral" : category.id === "pet-shop" ? "mel-silvestre" : category.id === "bazar" ? "ovos-caipiras" : "peito-de-frango"}.jpg`}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <span className="home-category-label">{category.name.toUpperCase()}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">Ofertas</h2>
          <Link href="/mercado" className="section-link">
            Ver mais <IconArrowRight />
          </Link>
        </div>

        <div className="home-deals">
          {deals.map((product) => (
            <article className="home-deal-card" key={product.id}>
              <Link href={`/produto/${product.id}`} className="home-deal-media">
                <img
                  src={`/img/products/${product.id}.jpg`}
                  alt={product.name}
                  loading="lazy"
                />
                {discountOf(product) > 0 && (
                  <span className="deal-badge">-{discountOf(product)}%</span>
                )}
              </Link>
              <div className="home-deal-body">
                <span className="home-deal-brand">{product.brand}</span>
                <h3 className="home-deal-name">
                  <Link href={`/produto/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="home-deal-price">
                  <span className="price">{formatPrice(product.price)}</span>
                  {product.compareAt && (
                    <span className="price-was">{formatPrice(product.compareAt)}</span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <h2 className="section-title">Destaques</h2>
          <Link href="/mercado" className="section-link">
            Ver mais <IconArrowRight />
          </Link>
        </div>
        <ProductShowcase initial={12} step={12} />
      </section>

      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="newsletter">
          <div>
            <h2>Receba ofertas e novidades exclusivas!</h2>
            <p>Informe seu e-mail para receber novidades, descontos e vantagens direto no seu e-mail.</p>
          </div>
          <NewsletterForm />
          <p className="newsletter-legal">
            Concordo em receber ofertas e comunicações promocionais, de acordo com a política de
            privacidade
          </p>
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import { ProductShowcase } from "@/components/shop/product-showcase";
import { categories } from "@/data/categories";
import { discountOf, getDeals } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { IconArrowRight } from "@/components/ui/icons";

const promoBanners = [
  {
    href: "/mercado",
    alt: "Oferta destaque",
    src: "https://edge.osuper.com.br/2SOFYma7t1WL7cIRImNexlD-hRk=/1920x0/smart/https://osuper-ecommerce-caita.s3-sa-east-1.amazonaws.com/8468a4b7-peaa-08banner-desktop-ecommerce.jpg",
  },
];

export default function HomePage() {
  const deals = getDeals(8);

  return (
    <>
      <section className="caita-banner">
        <div className="shell">
          <div className="banner-frame">
            {promoBanners.map((banner) => (
              <Link key={banner.href} href={banner.href}>
                <img src={banner.src} alt={banner.alt} loading="eager" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell" id="categorias">
        <div className="section-head section-head-center">
          <h2 className="section-title">Categorias</h2>
        </div>

        <div className="caita-category-grid">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/mercado?categoria=${category.id}`}
              className="caita-category-card"
            >
              <div className="caita-category-media">
                <img
                  src={`/img/products/${category.id === "acougue" ? "picanha" : category.id === "frios-laticinios" ? "queijo-minas" : category.id === "bebidas" ? "suco-de-laranja" : category.id === "hortifruti" ? "tomate-italiano" : category.id === "mercearia" ? "arroz-integral" : category.id === "limpeza" ? "cafe-especial" : category.id === "higiene" ? "manteiga" : category.id === "padaria" ? "pao-fermentacao" : category.id === "saudaveis" ? "leite-integral" : category.id === "pet-shop" ? "mel-silvestre" : category.id === "bazar" ? "ovos-caipiras" : "peito-de-frango"}.jpg`}
                  alt={category.name}
                  loading="lazy"
                />
              </div>
              <span className="caita-category-label">{category.name.toUpperCase()}</span>
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

        <div className="caita-deals">
          {deals.map((product) => (
            <article className="caita-deal-card" key={product.id}>
              <Link href={`/produto/${product.id}`} className="caita-deal-media">
                <img
                  src={`/img/products/${product.id}.jpg`}
                  alt={product.name}
                  loading="lazy"
                />
                {discountOf(product) > 0 && (
                  <span className="deal-badge">-{discountOf(product)}%</span>
                )}
              </Link>
              <div className="caita-deal-body">
                <span className="caita-deal-brand">{product.brand}</span>
                <h3 className="caita-deal-name">
                  <Link href={`/produto/${product.id}`}>{product.name}</Link>
                </h3>
                <div className="caita-deal-price">
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
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <label className="sr-only" htmlFor="newsletter-email">
              E-mail
            </label>
            <input id="newsletter-email" type="email" placeholder="Seu e-mail" />
            <button type="submit" className="btn btn-primary">
              Confirmar
            </button>
          </form>
          <p className="newsletter-legal">
            Concordo em receber ofertas e comunicações promocionais, de acordo com a política de
            privacidade
          </p>
        </div>
      </section>
    </>
  );
}

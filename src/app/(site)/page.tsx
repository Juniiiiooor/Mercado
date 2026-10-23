import Link from "next/link";
import { ProductShowcase } from "@/components/shop/product-showcase";
import { categories } from "@/data/categories";
import { discountOf, getDeals, getFeaturedProducts, getProductsByCategory } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { CategoryIcon } from "@/components/ui/category-icon";
import { IconArrowRight, IconCheck, IconClock, IconLeaf, IconTruck } from "@/components/ui/icons";

const marqueeItems = [
  "colhido no dia",
  "sem conservantes",
  "produtor identificado",
  "embalagem retornável",
  "entrega no bairro",
];

export default function HomePage() {
  const featured = getFeaturedProducts(4);
  const deals = getDeals(4);

  return (
    <>
      {/* ------------------------------------------------------------ abertura */}
      <section className="hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Mercado de bairro · Florianópolis</p>
            <h1>
              Da feira para a sua cozinha, <em>sem pressa</em> e sem intermediário.
            </h1>
            <p className="lede">
              Compramos direto de quem planta e de quem assa. Você escolhe hoje e recebe ainda hoje,
              com o nome do produtor em cada etiqueta.
            </p>

            <div className="hero-actions">
              <Link href="/mercado" className="btn btn-primary">
                Fazer a compra da semana
                <IconArrowRight />
              </Link>
              <Link href="/criar-conta" className="btn btn-ghost">
                Criar minha conta
              </Link>
            </div>

            <div className="hero-stats">
              <div className="hero-stat">
                <b>4h</b>
                <span>média de entrega</span>
              </div>
              <div className="hero-stat">
                <b>38</b>
                <span>produtores parceiros</span>
              </div>
              <div className="hero-stat">
                <b>R$ 120</b>
                <span>a partir do frete grátis</span>
              </div>
            </div>
          </div>

          <div className="hero-collage">
            <span className="hero-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="stamp-path" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <circle cx="60" cy="60" r="52" />
                <text>
                  <textPath href="#stamp-path">
                    do produtor direto pra você · sempre fresco ·
                  </textPath>
                </text>
              </svg>
            </span>

            <figure className="shot-main">
              <img
                src="/img/editorial/hero-mercado.jpg"
                alt="Banca de frutas e verduras em feira de rua, com caixotes de madeira"
                width={1600}
                height={1100}
              />
              <figcaption>Feira da Vila Nova · terça e sexta</figcaption>
            </figure>

            <figure className="shot-a">
              <img
                src="/img/editorial/padaria.jpg"
                alt="Pães artesanais dispostos em prateleira de padaria"
                width={800}
                height={800}
                loading="lazy"
              />
              <figcaption>Fornada das 6h</figcaption>
            </figure>

            <figure className="shot-b">
              <img
                src="/img/editorial/feira.jpg"
                alt="Barraca de feira com vegetais frescos organizados por tipo"
                width={800}
                height={800}
                loading="lazy"
              />
              <figcaption>Colheita da semana</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------- faixa */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </div>

      {/* ----------------------------------------------------------- categorias */}
      <section className="section shell" id="categorias">
        <div className="section-head">
          <div>
            <p className="eyebrow">Seis corredores</p>
            <h2 className="display-lg">
              Navegue como você faria <em className="italic-accent">na loja</em>.
            </h2>
          </div>
          <Link href="/mercado" className="btn btn-ghost btn-sm">
            Ver catálogo completo
            <IconArrowRight />
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category) => (
            <Link key={category.id} href={`/mercado?categoria=${category.id}`} className="category-card">
              <span className="icon" aria-hidden="true">
                <CategoryIcon id={category.id} />
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.blurb}</p>
              </div>
              <span className="count">
                {getProductsByCategory(category.id).length} itens disponíveis
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------- ofertas */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Ofertas de hoje</p>
            <h2 className="display-md">Preço baixo de verdade, sem letra miúda.</h2>
          </div>
          <span className="badge badge-plain">
            <IconClock className="icon" /> válidas até o fim do dia
          </span>
        </div>

        <div className="deal-strip">
          {deals.map((product) => (
            <article className="deal-card" key={product.id}>
              <img
                src={`/img/products/${product.id}.jpg`}
                alt={product.name}
                width={96}
                height={96}
                loading="lazy"
              />
              <div>
                <span className="badge badge-deal">−{discountOf(product)}%</span>
                <h3>{product.name}</h3>
                <div className="deal-values">
                  <span className="price">{formatPrice(product.price)}</span>
                  <span className="price-was">{formatPrice(product.compareAt ?? product.price)}</span>
                </div>
                <p className="deal-timer">{product.brand}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------- destaques */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Vitrine</p>
            <h2 className="display-md">O que está saindo mais esta semana</h2>
          </div>
          <Link href="/mercado" className="btn-link">
            ver todos os produtos
          </Link>
        </div>

        <ProductShowcase initial={8} step={8} />
      </section>

      {/* ------------------------------------------------------------ história */}
      <section className="section shell">
        <div className="story">
          <div className="story-media">
            <img
              src="/img/editorial/mercado-municipal.jpg"
              alt="Corredor de mercado público com bancas de madeira e produtos empilhados"
              width={1200}
              height={1500}
              loading="lazy"
            />
            <div className="story-badge">
              <b>desde 2016</b>
              <span>no mesmo endereço</span>
            </div>
          </div>

          <div>
            <p className="eyebrow">Nossa lógica de compra</p>
            <h2 className="display-lg" style={{ marginTop: "0.6rem" }}>
              Menos caminho entre a horta e o seu prato.
            </h2>
            <p className="lede" style={{ marginTop: "1rem" }}>
              Compramos em pequenos lotes, com produtores que conseguem entregar toda semana. O que
              não tem qualidade suficiente simplesmente não entra na banca — e isso aparece no preço
              final.
            </p>

            <ul className="story-list">
              <li>
                <span className="num">01</span>
                <div>
                  <h4>Origem declarada</h4>
                  <p>Cada etiqueta traz quem plantou, onde e quando a colheita saiu.</p>
                </div>
              </li>
              <li>
                <span className="num">02</span>
                <div>
                  <h4>Estoque curto, giro rápido</h4>
                  <p>Compramos para a semana. É por isso que quase nada fica na prateleira.</p>
                </div>
              </li>
              <li>
                <span className="num">03</span>
                <div>
                  <h4>Embalagem que volta</h4>
                  <p>Caixas e sacolas retornáveis com desconto a cada devolução.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- depoimentos */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <div>
            <p className="eyebrow">Quem compra aqui</p>
            <h2 className="display-md">Vizinhos, não clientes anônimos.</h2>
          </div>
        </div>

        <div className="quote-grid">
          <article className="quote">
            <blockquote>
              “Pedi às dez da manhã e às duas já estava na porta. O morango vinha melhor que o da
              feira.”
            </blockquote>
            <footer>
              <span className="avatar" aria-hidden="true">
                LS
              </span>
              <span>
                <strong>Luciana Sarmento</strong>
                <br />
                Vila Nova · cliente há 2 anos
              </span>
            </footer>
          </article>

          <article className="quote">
            <blockquote>
              “O pão de fermentação natural substituiu a padaria da esquina. Congela muito bem.”
            </blockquote>
            <footer>
              <span className="avatar" aria-hidden="true">
                RA
              </span>
              <span>
                <strong>Rafael Ávila</strong>
                <br />
                Centro · cliente há 8 meses
              </span>
            </footer>
          </article>

          <article className="quote">
            <blockquote>
              “Gosto de repetir a cesta da semana passada em dois cliques. Economiza meu domingo.”
            </blockquote>
            <footer>
              <span className="avatar" aria-hidden="true">
                MP
              </span>
              <span>
                <strong>Marina Prado</strong>
                <br />
                Trindade · cliente há 1 ano
              </span>
            </footer>
          </article>
        </div>
      </section>

      {/* --------------------------------------------------------------- CTA */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="cta">
          <div className="cta-inner">
            <div>
              <p className="eyebrow">Sua primeira compra</p>
              <h2 className="display-lg" style={{ marginTop: "0.5rem" }}>
                Comece com <em className="italic-accent">R$ 20 de desconto</em> na cesta.
              </h2>
              <p className="lede" style={{ marginTop: "0.9rem", maxWidth: "52ch" }}>
                Crie a conta, monte a cesta e o desconto entra automaticamente no fechamento. Sem
                cupom, sem pegadinha.
              </p>
              <div className="row" style={{ marginTop: "1.4rem" }}>
                <Link href="/criar-conta" className="btn btn-primary">
                  Criar conta agora
                  <IconArrowRight />
                </Link>
                <Link href="/entrar" className="btn btn-ghost">
                  Já sou cliente
                </Link>
              </div>
            </div>

            <ul className="story-list" style={{ marginTop: 0 }}>
              <li>
                <span className="num">
                  <IconTruck className="icon" />
                </span>
                <div>
                  <h4>Entrega em 4 horas</h4>
                  <p>Pedidos confirmados até 16h saem no mesmo dia.</p>
                </div>
              </li>
              <li>
                <span className="num">
                  <IconLeaf className="icon" />
                </span>
                <div>
                  <h4>Fresco ou devolvido</h4>
                  <p>Não gostou do produto? Devolvemos o valor sem discussão.</p>
                </div>
              </li>
              <li>
                <span className="num">
                  <IconCheck className="icon" />
                </span>
                <div>
                  <h4>Clube com pontos</h4>
                  <p>Cada real gasto vira ponto para trocar por produto.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Destaques secundários, com preço em unidade de medida. */}
      <section className="section shell" style={{ paddingTop: 0 }}>
        <div className="rule" />
        <div className="section-head" style={{ marginTop: "2rem" }}>
          <div>
            <p className="eyebrow">Escolhas do balcão</p>
            <h2 className="display-md">Quatro itens que sempre valem a pena</h2>
          </div>
        </div>

        <div className="grid-2">
          {featured.map((product) => (
            <article className="panel" key={product.id} style={{ display: "grid", gridTemplateColumns: "120px 1fr", gap: "1rem", alignItems: "center" }}>
              <img
                src={`/img/products/${product.id}.jpg`}
                alt={product.name}
                width={120}
                height={120}
                loading="lazy"
                style={{ borderRadius: "var(--radius-sm)", objectFit: "cover", width: "100%", height: 120 }}
              />
              <div>
                <span className="product-brand">{product.brand}</span>
                <h3 className="display-sm" style={{ marginTop: "0.2rem" }}>
                  <Link href={`/produto/${product.id}`}>{product.name}</Link>
                </h3>
                <p className="lede" style={{ fontSize: "0.9rem", marginTop: "0.4rem" }}>
                  {product.description.split(".")[0]}.
                </p>
                <div className="row" style={{ marginTop: "0.7rem" }}>
                  <span className="price" style={{ fontSize: "1.1rem", fontWeight: 600 }}>
                    {formatPrice(product.price)}
                  </span>
                  <Link href={`/produto/${product.id}`} className="btn-link">
                    ver detalhes
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

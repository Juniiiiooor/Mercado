import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/shop/product-card";
import { getProduct, products } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { IconClock } from "@/components/ui/icons";

export const metadata: Metadata = {
  title: "Receitas",
  description:
    "Três receitas de semana montadas com os produtos do mercado, com passo a passo e lista de compras.",
};

type Recipe = {
  slug: string;
  title: string;
  lead: string;
  time: string;
  servings: string;
  image: string;
  imageAlt: string;
  ingredients: { productId: string; qty: string }[];
  steps: { title: string; text: string }[];
};

const recipes: Recipe[] = [
  {
    slug: "pao-com-queijo-e-mel",
    title: "Pão de fermentação com queijo fresco e mel",
    lead: "Uma entrada que resolve qualquer visita inesperada. O contraste entre a casca do pão, o queijo fresco e o mel cru é o ponto alto.",
    time: "12 min",
    servings: "4 pessoas",
    image: "/img/editorial/padaria.jpg",
    imageAlt: "Pães artesanais em prateleira de madeira na padaria",
    ingredients: [
      { productId: "pao-fermentacao", qty: "1 unidade" },
      { productId: "queijo-minas", qty: "200 g" },
      { productId: "mel-silvestre", qty: "2 colheres" },
      { productId: "azeite-extra-virgem", qty: "1 fio" },
    ],
    steps: [
      {
        title: "Aqueça o pão",
        text: "Corte o pão em fatias grossas e leve ao forno a 180 °C por 5 minutos, só para devolver a crocância.",
      },
      {
        title: "Monte frio",
        text: "Fatias generosas de queijo fresco sobre o pão ainda quente. O queijo amolece sozinho, sem derreter.",
      },
      {
        title: "Finalize",
        text: "Um fio de azeite, o mel por cima e pimenta-do-reino moída na hora.",
      },
    ],
  },
  {
    slug: "salada-de-tomate-e-abacate",
    title: "Salada de tomate italiano com abacate",
    lead: "Só funciona com tomate maduro de verdade. Se estiver na safra, é a salada mais rápida da semana.",
    time: "15 min",
    servings: "2 pessoas",
    image: "/img/editorial/feira.jpg",
    imageAlt: "Barraca de feira com vegetais frescos organizados",
    ingredients: [
      { productId: "tomate-italiano", qty: "3 unidades" },
      { productId: "abacate-hass", qty: "1 unidade" },
      { productId: "alface-crespa", qty: "1 pé" },
      { productId: "azeite-extra-virgem", qty: "3 colheres" },
    ],
    steps: [
      {
        title: "Prepare a base",
        text: "Folhas de alface lavadas e secas vão primeiro. Folha molhada dilui o molho.",
      },
      {
        title: "Corte grosso",
        text: "Tomate em gomos e abacate em fatias de meio centímetro, sempre na hora de servir.",
      },
      {
        title: "Tempere no fim",
        text: "Azeite, sal grosso e um toque de limão ou vinagre. Misture com as mãos, sem exagerar.",
      },
    ],
  },
  {
    slug: "iogurte-com-morango-e-granola",
    title: "Iogurte natural com morango e mel",
    lead: "Café da manhã de dez minutos que também serve de sobremesa. Use morango em temperatura ambiente para soltar mais aroma.",
    time: "10 min",
    servings: "2 pessoas",
    image: "/img/editorial/mercado-municipal.jpg",
    imageAlt: "Corredor de mercado público com produtos empilhados em bancas",
    ingredients: [
      { productId: "iogurte-natural", qty: "400 g" },
      { productId: "morango", qty: "1 caixa" },
      { productId: "mel-silvestre", qty: "2 colheres" },
      { productId: "banana-prata", qty: "1 unidade" },
    ],
    steps: [
      {
        title: "Macere parte da fruta",
        text: "Amasse um terço dos morangos com o mel e deixe descansar 5 minutos para formar uma calda natural.",
      },
      {
        title: "Monte em camadas",
        text: "Iogurte, calda, fruta cortada e banana em rodelas. Repita uma vez.",
      },
      {
        title: "Finalize",
        text: "Um fio de mel por cima e, se quiser crocância, aveia ou castanhas tostadas.",
      },
    ],
  },
];

export default function ReceitasPage() {
  return (
    <div className="shell">
      <nav className="breadcrumb" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Receitas</span>
      </nav>

      <header className="section" style={{ paddingBottom: "1rem" }}>
        <p className="eyebrow">Cozinha do bairro</p>
        <h1 className="display-lg" style={{ marginTop: "0.6rem", maxWidth: "24ch" }}>
          Receitas curtas para quem compra fresco.
        </h1>
        <p className="lede" style={{ marginTop: "0.9rem", maxWidth: "58ch" }}>
          Três preparos que usam exatamente o que está na vitrine desta semana. Cada ingrediente
          abaixo leva direto para a ficha do produto.
        </p>
      </header>

      {recipes.map((recipe) => {
        const ingredients = recipe.ingredients
          .map((item) => ({ ...item, product: getProduct(item.productId) }))
          .filter((item) => Boolean(item.product));

        const total = ingredients.reduce(
          (sum, item) => sum + (item.product ? item.product.price : 0),
          0,
        );

        return (
          <article key={recipe.slug} id={recipe.slug} className="section">
            <div className="rule" style={{ marginBottom: "2rem" }} />

            <div className="recipe-hero">
              <div>
                <div className="row" style={{ gap: "0.6rem", marginBottom: "0.9rem" }}>
                  <span className="badge badge-plain">
                    <IconClock className="icon" /> {recipe.time}
                  </span>
                  <span className="badge badge-plain">{recipe.servings}</span>
                </div>
                <h2 className="display-md">{recipe.title}</h2>
                <p className="lede" style={{ marginTop: "0.8rem" }}>
                  {recipe.lead}
                </p>

                <ol className="recipe-steps" style={{ marginTop: "1.4rem" }}>
                  {recipe.steps.map((step, index) => (
                    <li key={step.title}>
                      <span className="step-num">{String(index + 1).padStart(2, "0")}</span>
                      <div>
                        <h3>{step.title}</h3>
                        <p>{step.text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <figure className="recipe-hero-media" style={{ marginBottom: "1.2rem" }}>
                  <img
                    src={recipe.image}
                    alt={recipe.imageAlt}
                    width={1200}
                    height={800}
                    loading="lazy"
                  />
                </figure>

                <div className="panel">
                  <div className="spread">
                    <p className="eyebrow">Lista de compras</p>
                    <span className="price" style={{ fontWeight: 600 }}>
                      ≈ {formatPrice(total)}
                    </span>
                  </div>
                  <ul className="ingredient-list" style={{ marginTop: "0.9rem" }}>
                    {ingredients.map((item) => (
                      <li key={item.productId}>
                        <span>
                          <Link className="ing-name" href={`/produto/${item.productId}`}>
                            {item.product?.name}
                          </Link>
                          <span className="ing-qty">{item.qty}</span>
                        </span>
                        <span className="price">
                          {item.product ? formatPrice(item.product.price) : "—"}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </article>
        );
      })}

      <section className="section">
        <div className="section-head">
          <div>
            <p className="eyebrow">Abasteça a cozinha</p>
            <h2 className="display-md">Produtos que aparecem nas receitas</h2>
          </div>
          <Link href="/mercado" className="btn btn-ghost btn-sm">
            Ver catálogo completo
          </Link>
        </div>
        <div className="grid-cards">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} compact />
          ))}
        </div>
      </section>
    </div>
  );
}

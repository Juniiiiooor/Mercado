import type { Category } from "@/types/domain";

/**
 * Seis corredores do mercado, na ordem em que aparecem na navegação.
 * O suporte visual de cada corredor é um ícone de linha (ver
 * `components/ui/category-icon.tsx`), escolhido pelo `id`.
 */
export const categories: Category[] = [
  {
    id: "hortifruti",
    name: "Hortifrúti",
    slug: "hortifruti",
    blurb: "Fruta, verdura e legume colhidos na semana.",
  },
  {
    id: "padaria",
    name: "Padaria",
    slug: "padaria",
    blurb: "Fermentação natural e fornadas do dia.",
  },
  {
    id: "laticinios",
    name: "Frios e laticínios",
    slug: "frios-laticinios",
    blurb: "Queijo, leite e manteiga de produtores locais.",
  },
  {
    id: "mercearia",
    name: "Mercearia",
    slug: "mercearia",
    blurb: "Despensa abastecida sem conservantes desnecessários.",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    slug: "bebidas",
    blurb: "Sucos, fermentados e água de verdade.",
  },
  {
    id: "proteinas",
    name: "Açougue e peixaria",
    slug: "acougue-peixaria",
    blurb: "Corte na hora, com rastreio de origem.",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

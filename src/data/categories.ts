import type { Category } from "@/types/domain";

/**
 * Corredores principais, organizados para aproximar da navegação do site
 * de referência (estudo acadêmico de clone visual).
 */
export const categories: Category[] = [
  {
    id: "acougue",
    name: "Açougue",
    slug: "acougue",
    blurb: "Carnes, aves e linguiças selecionadas.",
  },
  {
    id: "frios-laticinios",
    name: "Frios e laticínios",
    slug: "frios-e-laticinios",
    blurb: "Queijos, frios, leite e derivados.",
  },
  {
    id: "bebidas",
    name: "Bebidas",
    slug: "bebidas",
    blurb: "Sucos, águas, refrigerantes e fermentados.",
  },
  {
    id: "hortifruti",
    name: "Hortifruti",
    slug: "hortifruti",
    blurb: "Frutas, verduras e legumes frescos.",
  },
  {
    id: "mercearia",
    name: "Mercearia alimentos",
    slug: "mercearia-alimentos",
    blurb: "Arroz, feijão, massas e itens da despensa.",
  },
  {
    id: "limpeza",
    name: "Limpeza",
    slug: "limpeza",
    blurb: "Produtos para casa e lavanderia.",
  },
  {
    id: "higiene",
    name: "Higiene",
    slug: "higiene",
    blurb: "Cuidados pessoais e beleza.",
  },
  {
    id: "padaria",
    name: "Padaria",
    slug: "padaria",
    blurb: "Pães, bolos e produtos fresquinhos.",
  },
  {
    id: "saudaveis",
    name: "Saudáveis",
    slug: "saudaveis",
    blurb: "Integrais, naturais e funcionais.",
  },
  {
    id: "pet-shop",
    name: "Pet shop",
    slug: "pet-shop",
    blurb: "Produtos para cães, gatos e outros pets.",
  },
  {
    id: "bazar",
    name: "Bazar",
    slug: "bazar",
    blurb: "Utensílios, descartáveis e utilidades.",
  },
  {
    id: "congelados",
    name: "Congelados",
    slug: "congelados",
    blurb: "Prontos, vegetais e sobremesas congeladas.",
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((category) => category.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

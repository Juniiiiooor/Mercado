import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/shop/product-detail";
import { getProduct, products } from "@/data/products";

type Params = Promise<{ id: string }>;

/** Pré-renderiza todas as fichas de produto no build. */
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produto não encontrado" };
  return {
    title: product.name,
    description: product.description.slice(0, 155),
  };
}

export default async function ProdutoPage({ params }: { params: Params }) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  return <ProductDetail product={product} />;
}

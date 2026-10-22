import type { Metadata } from "next";
import { WishlistView } from "@/components/shop/wishlist-view";

export const metadata: Metadata = {
  title: "Lista de desejos",
  description: "Guarde os produtos que você quer comprar depois e adicione tudo à cesta de uma vez.",
};

export default function ListaPage() {
  return <WishlistView />;
}

import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutFlow } from "@/components/shop/checkout-flow";

export const metadata: Metadata = {
  title: "Fechar pedido",
  description: "Confirme endereço, janela de entrega e forma de pagamento do seu pedido.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="shell" style={{ paddingBlock: "clamp(1.6rem, 4vw, 3rem)" }}>
      <nav className="breadcrumb" aria-label="Você está aqui">
        <Link href="/">Início</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">Fechar pedido</span>
      </nav>

      <h1 className="display-lg" style={{ marginBlock: "1rem 0.6rem" }}>
        Fechar pedido
      </h1>
      <p className="lede" style={{ maxWidth: "60ch", marginBottom: "1.6rem" }}>
        Três passos rápidos: quem recebe, onde e como paga. Você revisa tudo antes de confirmar.
      </p>

      <CheckoutFlow />
    </section>
  );
}

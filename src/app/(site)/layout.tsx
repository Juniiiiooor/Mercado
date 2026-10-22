import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./home.css";
import "./catalogo.css";
import "./paginas.css";

export const metadata: Metadata = {
  title: {
    default: "Mercado do Bairro — compras com entrega no mesmo dia",
    template: "%s · Mercado do Bairro",
  },
  description:
    "Compre frutas, pão de fermentação natural, laticínios e mercearia de produtores da região. Entrega no mesmo dia para pedidos até 16h.",
};

/** Moldura da vitrine: cabeçalho fixo, conteúdo e rodapé. */
export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="conteudo">{children}</main>
      <SiteFooter />
    </>
  );
}

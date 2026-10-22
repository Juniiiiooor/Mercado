import type { Metadata } from "next";
import { DashboardView } from "@/components/dashboard/dashboard-view";

export const metadata: Metadata = {
  title: "Painel do cliente",
  description:
    "Acompanhe pedidos, repita a última cesta, veja seus pontos do clube e atualize seus dados.",
  robots: { index: false, follow: false },
};

/** Tela principal do sistema, disponível apenas para quem está autenticado. */
export default function PainelPage() {
  return <DashboardView />;
}

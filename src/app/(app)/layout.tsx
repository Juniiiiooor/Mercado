import "./app.css";

/** Moldura da área autenticada: sem vitrine, só a aplicação em tela cheia. */
export default function AppLayout({ children }: { children: React.ReactNode }) {
  return <main id="conteudo">{children}</main>;
}

import Link from "next/link";
import { categories } from "@/data/categories";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">mb</span>
            <span>
              Mercado <em>do</em> Bairro
            </span>
          </Link>
          <p className="footer-note">
            Compre de produtores da região com entrega no mesmo dia. Projeto de demonstração
            construído com Next.js — as fotos são de acervos livres e estão creditadas no README.
          </p>
        </div>

        <div>
          <h4>Corredores</h4>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/mercado?categoria=${category.id}`}>{category.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Serviços</h4>
          <ul>
            <li>
              <Link href="/receitas">Receitas da semana</Link>
            </li>
            <li>
              <Link href="/lista">Lista de desejos</Link>
            </li>
            <li>
              <Link href="/mercado?ordenar=preco">Ofertas do dia</Link>
            </li>
            <li>
              <Link href="/painel">Minha conta</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Atendimento</h4>
          <ul>
            <li>Segunda a sábado, 7h às 21h</li>
            <li>Domingo, 8h às 14h</li>
            <li>
              <a href="mailto:oi@mercadodobairro.exemplo">oi@mercadodobairro.exemplo</a>
            </li>
            <li>
              <a href="tel:+554832124400">(48) 3212-4400</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Mercado do Bairro · Loja demonstrativa</span>
        <span className="mono">Feito com Next.js · Dados salvos no seu navegador</span>
      </div>
    </footer>
  );
}

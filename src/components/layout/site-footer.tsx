import Link from "next/link";
import { categories } from "@/data/categories";
import { IconLeaf, IconLock, IconTruck } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark">mp</span>
            <span>
              Mercadinho <em>da</em> Praça
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
              <a href="mailto:oi@mercadinhopraca.exemplo">oi@mercadinhopraca.exemplo</a>
            </li>
            <li>
              <a href="tel:+554832124400">(48) 3212-4400</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="shell footer-trust">
        <ul className="footer-trust-list">
          <li>
            <IconLock />
            <span>
              <b>Conexão segura</b> — dados criptografados
            </span>
          </li>
          <li>
            <IconTruck />
            <span>
              <b>Entrega no mesmo dia</b> — pedidos até 16h
            </span>
          </li>
          <li>
            <IconLeaf />
            <span>
              <b>Produtor local</b> — origem declarada
            </span>
          </li>
        </ul>

        <div className="footer-pay">
          <span className="footer-pay-label">Pague com</span>
          <ul className="pay-badges">
            <li>Pix</li>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Elo</li>
            <li>Dinheiro</li>
          </ul>
        </div>
      </div>

      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Mercadinho da Praça · Loja demonstrativa</span>
        <span className="mono">Feito com Next.js · Dados salvos no seu navegador</span>
      </div>
    </footer>
  );
}

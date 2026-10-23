import Link from "next/link";
import { categories } from "@/data/categories";
import { IconLock, IconTruck } from "@/components/ui/icons";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-top">
        <div className="footer-app">
          <h4>Baixe nosso aplicativo</h4>
          <p>E aproveite ofertas exclusivas!</p>
          <div className="footer-app-badges">
            <span className="footer-store-badge">
              <span>Disponível no</span>
              <b>Google Play</b>
            </span>
            <span className="footer-store-badge">
              <span>Baixe na</span>
              <b>App Store</b>
            </span>
          </div>
        </div>

        <div className="footer-call">
          <h4>Central de atendimento</h4>
          <a href="tel:+554832124400">(48) 3212-4400</a>
          <span>Segunda a sábado, 7h às 21h</span>
        </div>

        <div className="footer-pay">
          <span className="footer-pay-label">Formas de pagamento</span>
          <ul className="pay-badges">
            <li>Pix</li>
            <li>Visa</li>
            <li>Mastercard</li>
            <li>Elo</li>
            <li>Dinheiro</li>
          </ul>
        </div>
      </div>

      <div className="shell footer-grid">
        <div>
          <h4>Sobre o serviço</h4>
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
            <li>
              <Link href="/formas-de-pagamento">Formas de pagamento</Link>
            </li>
            <li>
              <Link href="/politica-de-privacidade">Política de privacidade</Link>
            </li>
            <li>
              <Link href="/termos-de-uso">Termos de uso</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Categorias</h4>
          <ul>
            {categories.map((category) => (
              <li key={category.id}>
                <Link href={`/mercado?categoria=${category.id}`}>{category.name.toUpperCase()}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Perfil</h4>
          <ul>
            <li>
              <Link href="/criar-conta">Meu cadastro</Link>
            </li>
            <li>
              <Link href="/painel">Minhas compras</Link>
            </li>
            <li>
              <Link href="/lista">Produtos favoritos</Link>
            </li>
            <li>
              <Link href="/entrar">Alterar senha</Link>
            </li>
          </ul>
        </div>

        <div>
          <Link href="/" className="brand" aria-label="Mercadinho da Praça">
            <span className="brand-mark" aria-hidden="true">
              mp
            </span>
            <span className="brand-name" style={{ fontSize: "1.25rem" }}>
              Mercadinho <em>da</em> Praça
            </span>
          </Link>
          <p className="footer-note">
            Projeto acadêmico de clone de interface com finalidade de estudo. Nome alterado em
            relação à referência.
          </p>
          <div className="footer-seal">
            <IconLock />
            <span>Conexão segura</span>
          </div>
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
        </ul>
      </div>

      <div className="shell footer-bottom">
        <span>
          <strong>Mercadinho da Praça</strong> — Loja demonstrativa para fins acadêmicos
        </span>
        <span>CNPJ fictício — Endereço fictício · Concórdia - SC</span>
        <span>© {new Date().getFullYear()} Todos os direitos reservados.</span>
      </div>
    </footer>
  );
}

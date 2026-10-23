"use client";

import Link from "next/link";
import { IconLock, IconTruck } from "@/components/ui/icons";

/** Cabeçalho de marca reutilizado pelas duas telas de acesso. */
export function AuthBrandHeader() {
  return (
    <Link href="/" className="brand">
      <span className="brand-mark">mp</span>
      <span>
        Mercadinho <em>da</em> Pra�a
      </span>
    </Link>
  );
}

/** Migalha de pão no topo das telas de acesso, no estilo de supermercado. */
export function AuthBreadcrumb({ current }: { current: string }) {
  return (
    <nav className="auth-breadcrumb" aria-label="Trilha de navegação">
      <Link href="/">Início</Link>
      <span aria-hidden="true">/</span>
      <span aria-current="page">{current}</span>
    </nav>
  );
}

/**
 * Faixa de confiança inspirada no Caitá: conexão segura, privacidade dos dados
 * e formas de pagamento. Fica logo abaixo do formulário.
 */
export function AuthTrustStrip() {
  return (
    <div className="auth-trust">
      <div className="auth-trust-item">
        <IconLock className="icon" />
        <div>
          <b>Conexão segura</b>
          <span>Seus dados trafegam criptografados e não são repassados a terceiros.</span>
        </div>
      </div>

      <div className="auth-trust-item">
        <IconTruck className="icon" />
        <div>
          <b>Entrega no bairro</b>
          <span>Pedidos até 16h saem no mesmo dia. Frete grátis a partir de R$ 120.</span>
        </div>
      </div>

      <div className="auth-trust-pay">
        <span className="auth-trust-pay-label">Formas de pagamento</span>
        <ul className="pay-badges">
          <li>Pix</li>
          <li>Visa</li>
          <li>Mastercard</li>
          <li>Dinheiro</li>
        </ul>
      </div>
    </div>
  );
}

/** Bloco de ajuda/atendimento, como a “Central de atendimento” do Caitá. */
export function AuthSupportNote() {
  return (
    <p className="auth-support">
      Problemas para entrar? Fale com a <strong>Central de atendimento</strong> pelo telefone{" "}
      <a href="tel:4833330000">(48) 3333-0000</a> ou veja a{" "}
      <Link href="/receitas">central de ajuda</Link>.
    </p>
  );
}

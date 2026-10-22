import Link from "next/link";
import type { Metadata } from "next";
import { AuthAside, SignUpForm } from "@/components/auth/auth-forms";
import "../auth.css";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta no Mercado do Bairro em menos de um minuto e receba no mesmo dia, com entrega no bairro.",
};

export default function CriarContaPage() {
  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <Link href="/" className="brand">
          <span className="brand-mark">mb</span>
          <span>
            Mercado <em>do</em> Bairro
          </span>
        </Link>

        <SignUpForm />
      </div>

      <AuthAside />
    </div>
  );
}

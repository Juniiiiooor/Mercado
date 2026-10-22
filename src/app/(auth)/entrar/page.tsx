import Link from "next/link";
import type { Metadata } from "next";
import { AuthAside, SignInForm } from "@/components/auth/auth-forms";
import "../auth.css";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Acesse sua conta do Mercado do Bairro para repetir compras, acompanhar entregas e ver seus pontos do clube.",
};

export default function EntrarPage() {
  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <Link href="/" className="brand">
          <span className="brand-mark">mb</span>
          <span>
            Mercado <em>do</em> Bairro
          </span>
        </Link>

        <SignInForm />
      </div>

      <AuthAside />
    </div>
  );
}

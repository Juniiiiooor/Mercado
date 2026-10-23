import Link from "next/link";
import type { Metadata } from "next";
import { AuthAside, SignInForm } from "@/components/auth/auth-forms";
import { AuthBrandHeader, AuthBreadcrumb, AuthSupportNote, AuthTrustStrip } from "@/components/auth/auth-chrome";
import "../auth.css";

export const metadata: Metadata = {
  title: "Entrar",
  description:
    "Acesse sua conta do Mercadinho da Praça para repetir compras, acompanhar entregas e ver seus pontos do clube.",
};

export default function EntrarPage() {
  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <div className="auth-topbar">
          <AuthBrandHeader />
          <AuthBreadcrumb current="Entrar" />
        </div>

        <SignInForm />

        <div className="auth-footer">
          <AuthTrustStrip />
          <AuthSupportNote />
          <p className="auth-legal">
            Ao continuar, você concorda com os{" "}
            <Link href="/">termos de uso</Link> e a{" "}
            <Link href="/">política de privacidade</Link>.
          </p>
        </div>
      </div>

      <AuthAside />
    </div>
  );
}

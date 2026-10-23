import type { Metadata } from "next";
import { AuthAside, SignUpForm } from "@/components/auth/auth-forms";
import { AuthBrandHeader, AuthBreadcrumb, AuthSupportNote, AuthTrustStrip } from "@/components/auth/auth-chrome";
import "../auth.css";

export const metadata: Metadata = {
  title: "Criar conta",
  description:
    "Crie sua conta no Mercadinho da Pra�a em menos de um minuto e receba no mesmo dia, com entrega no bairro.",
};

export default function CriarContaPage() {
  return (
    <div className="auth-page">
      <div className="auth-form-side">
        <div className="auth-topbar">
          <AuthBrandHeader />
          <AuthBreadcrumb current="Criar conta" />
        </div>

        <SignUpForm />

        <div className="auth-footer">
          <AuthTrustStrip />
          <AuthSupportNote />
        </div>
      </div>

      <AuthAside />
    </div>
  );
}

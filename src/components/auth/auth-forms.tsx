"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/providers/account-provider";
import { IconArrowRight, IconCheck, IconLeaf, IconTruck } from "@/components/ui/icons";
import { demoAccounts } from "@/data/demo-accounts";
import { maskPhone } from "@/lib/validation";
import { formatPrice } from "@/lib/format";

type Mode = "entrar" | "criar";

/** Formulário de cadastro usado em /criar-conta. */
export function SignUpForm() {
  const { register } = useAccount();
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [acceptNews, setAcceptNews] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [strength, setStrength] = useState(0);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (name.trim().split(" ").length < 2) {
      setError("Informe nome e sobrenome para emitirmos a nota fiscal.");
      return;
    }
    if (!terms) {
      setError("É preciso aceitar os termos para criar a conta.");
      return;
    }

    setBusy(true);
    try {
      const result = await register({ name, email, password, phone });
      if (!result.ok) {
        setError(result.error.message);
        setBusy(false);
        return;
      }
      router.push("/painel");
    } catch {
      setError("Não foi possível criar a conta agora. Tente novamente em instantes.");
      setBusy(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <div className="auth-head">
        <p className="eyebrow">Primeira compra</p>
        <h1>Criar sua conta</h1>
        <p>
          Leva menos de um minuto. Depois disso, sua cesta, seus endereços e o histórico de pedidos
          ficam salvos.
        </p>
      </div>

      <div className="auth-switch">
        <Link href="/entrar">Entrar</Link>
        <Link href="/criar-conta" aria-current="page">
          Criar conta
        </Link>
      </div>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        <div className="field">
          <label className="field-label" htmlFor="nome">
            Nome completo
          </label>
          <input
            id="nome"
            className="input"
            value={name}
            onChange={(event) => setName(event.target.value)}
            autoComplete="name"
            placeholder="Ex.: Marina Souza"
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="voce@exemplo.com"
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="telefone">
            Telefone (opcional)
          </label>
          <input
            id="telefone"
            className="input"
            value={phone}
            onChange={(event) => setPhone(maskPhone(event.target.value))}
            autoComplete="tel"
            placeholder="(48) 99999-0000"
            inputMode="tel"
          />
          <span className="field-hint">Usamos apenas para avisar sobre a entrega.</span>
        </div>

        <div className="field">
          <label className="field-label" htmlFor="senha">
            Senha
          </label>
          <input
            id="senha"
            className="input"
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
              setStrength(scorePassword(event.target.value));
            }}
            autoComplete="new-password"
            placeholder="Mínimo de 8 caracteres"
            required
          />
          <div className="password-meter" aria-hidden="true">
            {[0, 1, 2, 3].map((index) => (
              <i
                key={index}
                data-on={index < strength && strength >= 2}
                data-low={index < strength && strength < 2}
              />
            ))}
          </div>
          <span className="field-hint">
            Use letras e números. Senhas longas são mais seguras que senhas curtas e complexas.
          </span>
        </div>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={terms}
            onChange={(event) => setTerms(event.target.checked)}
          />
          <span>
            Li e aceito os termos de uso e a política de privacidade do Mercado do Bairro.
          </span>
        </label>

        <label className="checkbox">
          <input
            type="checkbox"
            checked={acceptNews}
            onChange={(event) => setAcceptNews(event.target.checked)}
          />
          <span>Quero receber a lista de ofertas da semana por e-mail.</span>
        </label>

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Criando conta…" : "Criar conta e começar"}
          {!busy && <IconArrowRight />}
        </button>

        <p className="field-hint">
          Já tem conta? <Link className="btn-link" href="/entrar">Entrar</Link>
        </p>
      </form>
    </div>
  );
}

/** Formulário de acesso usado em /entrar. */
export function SignInForm() {
  const { signInWithPassword, register } = useAccount();
  const router = useRouter();

  const [mode, setMode] = useState<Mode>("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (mode === "criar" && name.trim().split(" ").length < 2) {
      setError("Informe nome e sobrenome para criar a conta.");
      return;
    }

    setBusy(true);
    try {
      if (mode === "criar") {
        const created = await register({ name, email, password });
        if (!created.ok) {
          setError(created.error.message);
          setBusy(false);
          return;
        }
        router.push("/painel");
        return;
      }

      const result = await signInWithPassword(email, password);
      if (!result.ok) {
        setError(result.error.message);
        setBusy(false);
        return;
      }
      router.push("/painel");
    } catch {
      setError("Algo saiu do previsto no acesso. Tente novamente.");
      setBusy(false);
    }
  }

  return (
    <div className="auth-form-wrap">
      <div className="auth-head">
        <p className="eyebrow">{mode === "entrar" ? "Bem-vindo de volta" : "Nova conta"}</p>
        <h1>{mode === "entrar" ? "Entrar na sua conta" : "Criar sua conta"}</h1>
        <p>
          {mode === "entrar"
            ? "Acesse para repetir a última compra, acompanhar entregas e ver seus pontos."
            : "Cadastre-se rapidamente para salvar endereços e histórico de pedidos."}
        </p>
      </div>

      <div className="auth-switch">
        <button
          type="button"
          aria-current={mode === "entrar" ? "page" : undefined}
          onClick={() => setMode("entrar")}
        >
          Entrar
        </button>
        <button
          type="button"
          aria-current={mode === "criar" ? "page" : undefined}
          onClick={() => setMode("criar")}
        >
          Criar conta
        </button>
      </div>

      {error && (
        <p className="alert" role="alert">
          {error}
        </p>
      )}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {mode === "criar" && (
          <div className="field">
            <label className="field-label" htmlFor="acesso-nome">
              Nome completo
            </label>
            <input
              id="acesso-nome"
              className="input"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Nome e sobrenome"
            />
          </div>
        )}

        <div className="field">
          <label className="field-label" htmlFor="acesso-email">
            E-mail
          </label>
          <input
            id="acesso-email"
            className="input"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            placeholder="voce@exemplo.com"
            required
          />
        </div>

        <div className="field">
          <label className="field-label" htmlFor="acesso-senha">
            Senha
          </label>
          <input
            id="acesso-senha"
            className="input"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === "entrar" ? "current-password" : "new-password"}
            placeholder="Sua senha"
            required
          />
          {mode === "criar" && <span className="field-hint">Mínimo de 8 caracteres.</span>}
        </div>

        {mode === "entrar" && (
          <div className="field-row" style={{ alignItems: "center" }}>
            <span className="field-hint">Entre com a senha usada no cadastro para ver seu histórico.</span>
            <Link href="/criar-conta" className="btn-link" style={{ justifySelf: "end" }}>
              Não tenho conta
            </Link>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Verificando…" : mode === "entrar" ? "Entrar" : "Criar conta"}
          {!busy && <IconArrowRight />}
        </button>
      </form>
    </div>
  );
}

/** Painel de marca exibido ao lado dos formulários. */
export function AuthAside() {
  return (
    <aside className="auth-brand-side">
      <img src="/img/editorial/hero-mercado.jpg" alt="" aria-hidden="true" />
      <div className="auth-brand-content">
        <p className="eyebrow" style={{ color: "#c9cdbd" }}>
          Mercado do Bairro
        </p>
        <h2>
          Comprar bem é <em>escolher bem</em>.
        </h2>
        <ul className="auth-perks">
          <li>
            <IconTruck />
            <span>Entrega no mesmo dia em pedidos até 16h, na região central.</span>
          </li>
          <li>
            <IconLeaf />
            <span>Frutas, pães e laticínios com origem declarada em cada etiqueta.</span>
          </li>
          <li>
            <IconCheck />
            <span>Repita a última cesta em dois cliques, com preços atualizados.</span>
          </li>
        </ul>
      </div>

      <div className="demo-credentials">
        <b>Contas para testar</b>
        <p>
          <code>{demoAccounts[0].email}</code> · <code>{demoAccounts[0].password}</code>
        </p>
        <p>
          <code>{demoAccounts[1].email}</code> · <code>{demoAccounts[1].password}</code>
        </p>
        <p style={{ marginTop: "0.5rem" }}>
          A primeira conta já vem com pedidos no histórico. Qualquer outro e-mail válido também
          entra, começando do zero.
        </p>
      </div>
    </aside>
  );
}

export function formatDemoHint(): string {
  return `Frete grátis acima de ${formatPrice(120)}`;
}

function scorePassword(value: string): number {
  if (!value) return 0;
  let score = 0;
  if (value.length >= 8) score += 1;
  if (value.length >= 12) score += 1;
  if (/[A-Z]/.test(value) && /[a-z]/.test(value)) score += 1;
  if (/[0-9]/.test(value) && /[^A-Za-z0-9]/.test(value)) score += 1;
  return Math.min(4, score);
}

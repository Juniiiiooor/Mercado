"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAccount } from "@/components/providers/account-provider";
import { IconArrowRight, IconCheck, IconLeaf, IconTruck } from "@/components/ui/icons";
import { demoAccounts } from "@/data/demo-accounts";
import {
  maskPhone,
  passwordStrength,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from "@/lib/validation";

/** Campos que podem receber erro em cada formulário. */
type SignUpField = "name" | "email" | "phone" | "password" | "terms";
type SignInField = "name" | "email" | "password";
type FieldErrors<T extends string> = Partial<Record<T, string>>;

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
  const [errors, setErrors] = useState<FieldErrors<SignUpField>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const strength = passwordStrength(password);

  /** Valida todos os campos e devolve o mapa de erros (vazio se estiver tudo certo). */
  function collectErrors(): FieldErrors<SignUpField> {
    const next: FieldErrors<SignUpField> = {};
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    const phoneError = validatePhone(phone);

    if (nameError) next.name = nameError;
    if (emailError) next.email = emailError;
    if (phoneError) next.phone = phoneError;
    if (passwordError) next.password = passwordError;
    if (!terms) next.terms = "É preciso aceitar os termos para criar a conta.";
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const found = collectErrors();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setBusy(true);
    try {
      const result = await register({ name, email, password, phone });
      if (!result.ok) {
        setFormError(result.error.message);
        setBusy(false);
        return;
      }
      router.push("/painel");
    } catch {
      setFormError("Não foi possível criar a conta agora. Tente novamente em instantes.");
      setBusy(false);
    }
  }

  /** Revalida um campo assim que a pessoa corrige, para o erro sumir na hora. */
  function clearError(field: SignUpField) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
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

      {formError && (
        <p className="alert" role="alert">
          {formError}
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
            onChange={(event) => {
              setName(event.target.value);
              clearError("name");
            }}
            autoComplete="name"
            placeholder="Ex.: Marina Souza"
            aria-invalid={errors.name ? "true" : undefined}
            aria-describedby={errors.name ? "erro-nome" : undefined}
            required
          />
          {errors.name && (
            <span className="field-error" id="erro-nome">
              {errors.name}
            </span>
          )}
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
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            autoComplete="email"
            placeholder="voce@exemplo.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "erro-email" : undefined}
            required
          />
          {errors.email && (
            <span className="field-error" id="erro-email">
              {errors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="telefone">
            Telefone (opcional)
          </label>
          <input
            id="telefone"
            className="input"
            value={phone}
            onChange={(event) => {
              setPhone(maskPhone(event.target.value));
              clearError("phone");
            }}
            autoComplete="tel"
            placeholder="(48) 99999-0000"
            inputMode="tel"
            aria-invalid={errors.phone ? "true" : undefined}
            aria-describedby={errors.phone ? "erro-telefone" : undefined}
          />
          {errors.phone ? (
            <span className="field-error" id="erro-telefone">
              {errors.phone}
            </span>
          ) : (
            <span className="field-hint">Usamos apenas para avisar sobre a entrega.</span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="senha">
            Senha
          </label>
          <PasswordInput
            id="senha"
            value={password}
            onChange={(value) => {
              setPassword(value);
              clearError("password");
            }}
            autoComplete="new-password"
            placeholder="Mínimo de 8 caracteres"
            strength={strength}
            invalid={Boolean(errors.password)}
            describedBy={errors.password ? "erro-senha" : undefined}
          />
          {errors.password ? (
            <span className="field-error" id="erro-senha">
              {errors.password}
            </span>
          ) : (
            <span className="field-hint">
              Use letras e números. Senhas longas são mais seguras que senhas curtas e complexas.
            </span>
          )}
        </div>

        <label className="checkbox">
          <input
            id="termos"
            type="checkbox"
            checked={terms}
            onChange={(event) => {
              setTerms(event.target.checked);
              clearError("terms");
            }}
            aria-invalid={errors.terms ? "true" : undefined}
            aria-describedby={errors.terms ? "erro-termos" : undefined}
          />
          <span>
            Li e aceito os termos de uso e a política de privacidade do Mercadinho da Pra�a.
          </span>
        </label>
        {errors.terms && (
          <span className="field-error" id="erro-termos">
            {errors.terms}
          </span>
        )}

        <label className="checkbox">
          <input
            type="checkbox"
            checked={acceptNews}
            onChange={(event) => setAcceptNews(event.target.checked)}
          />
          <span>
            Concordo em receber ofertas e comunicações promocionais, de acordo com a{" "}
            <Link className="btn-link" href="/">
              política de privacidade
            </Link>
            .
          </span>
        </label>

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Criando conta…" : "Criar conta e começar"}
          {!busy && <IconArrowRight />}
        </button>

        <p className="field-hint">
          Já tem conta?{" "}
          <Link className="btn-link" href="/entrar">
            Entrar
          </Link>
        </p>
      </form>
    </div>
  );
}

/** Formulário de acesso usado em /entrar, com alternância entre entrar e criar. */
export function SignInForm() {
  const { signInWithPassword, register } = useAccount();
  const router = useRouter();

  const [mode, setMode] = useState<"entrar" | "criar">("entrar");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FieldErrors<SignInField>>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const strength = passwordStrength(password);
  const isSignUp = mode === "criar";

  function collectErrors(): FieldErrors<SignInField> {
    const next: FieldErrors<SignInField> = {};

    // Na ordem em que os campos aparecem na tela, para o foco ir ao primeiro erro.
    if (isSignUp) {
      const nameError = validateName(name);
      if (nameError) next.name = nameError;
    }

    const emailError = validateEmail(email);
    if (emailError) next.email = emailError;

    if (isSignUp) {
      const passwordError = validatePassword(password);
      if (passwordError) next.password = passwordError;
    } else if (!password) {
      next.password = "Informe sua senha.";
    }
    return next;
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError(null);

    const found = collectErrors();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      focusFirstError(found);
      return;
    }

    setBusy(true);
    try {
      if (isSignUp) {
        const created = await register({ name, email, password });
        if (!created.ok) {
          setFormError(created.error.message);
          setBusy(false);
          return;
        }
        router.push("/painel");
        return;
      }

      const result = await signInWithPassword(email, password);
      if (!result.ok) {
        setFormError(result.error.message);
        setBusy(false);
        return;
      }
      router.push("/painel");
    } catch {
      setFormError("Algo saiu do previsto no acesso. Tente novamente.");
      setBusy(false);
    }
  }

  function clearError(field: SignInField) {
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  }

  /** Troca de aba limpando erros e senha, para não misturar os dois fluxos. */
  function switchMode(nextMode: "entrar" | "criar") {
    setMode(nextMode);
    setErrors({});
    setFormError(null);
    setPassword("");
  }

  return (
    <div className="auth-form-wrap">
      <div className="auth-head">
        <p className="eyebrow">{isSignUp ? "Nova conta" : "Bem-vindo de volta"}</p>
        <h1>{isSignUp ? "Criar sua conta" : "Entrar na sua conta"}</h1>
        <p>
          {isSignUp
            ? "Cadastre-se rapidamente para salvar endereços e histórico de pedidos."
            : "Acesse para repetir a última compra, acompanhar entregas e ver seus pontos."}
        </p>
      </div>

      <div className="auth-switch">
        <button
          type="button"
          aria-current={!isSignUp ? "page" : undefined}
          onClick={() => switchMode("entrar")}
        >
          Entrar
        </button>
        <button
          type="button"
          aria-current={isSignUp ? "page" : undefined}
          onClick={() => switchMode("criar")}
        >
          Criar conta
        </button>
      </div>

      {formError && (
        <p className="alert" role="alert">
          {formError}
        </p>
      )}

      <form className="auth-form" onSubmit={onSubmit} noValidate>
        {isSignUp && (
          <div className="field">
            <label className="field-label" htmlFor="acesso-nome">
              Nome completo
            </label>
            <input
              id="acesso-nome"
              className="input"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                clearError("name");
              }}
              autoComplete="name"
              placeholder="Nome e sobrenome"
              aria-invalid={errors.name ? "true" : undefined}
              aria-describedby={errors.name ? "erro-acesso-nome" : undefined}
            />
            {errors.name && (
              <span className="field-error" id="erro-acesso-nome">
                {errors.name}
              </span>
            )}
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
            onChange={(event) => {
              setEmail(event.target.value);
              clearError("email");
            }}
            autoComplete="email"
            placeholder="voce@exemplo.com"
            aria-invalid={errors.email ? "true" : undefined}
            aria-describedby={errors.email ? "erro-acesso-email" : undefined}
            required
          />
          {errors.email && (
            <span className="field-error" id="erro-acesso-email">
              {errors.email}
            </span>
          )}
        </div>

        <div className="field">
          <label className="field-label" htmlFor="acesso-senha">
            Senha
          </label>
          {isSignUp ? (
            <PasswordInput
              id="acesso-senha"
              value={password}
              onChange={(value) => {
                setPassword(value);
                clearError("password");
              }}
              autoComplete="new-password"
              placeholder="Mínimo de 8 caracteres"
              strength={strength}
              invalid={Boolean(errors.password)}
              describedBy={errors.password ? "erro-acesso-senha" : undefined}
            />
          ) : (
            <input
              id="acesso-senha"
              className="input"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                clearError("password");
              }}
              autoComplete="current-password"
              placeholder="Sua senha"
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={errors.password ? "erro-acesso-senha" : undefined}
              required
            />
          )}
          {errors.password && (
            <span className="field-error" id="erro-acesso-senha">
              {errors.password}
            </span>
          )}
        </div>

        {!isSignUp && (
          <div className="auth-form-foot">
            <span className="field-hint">
              Use a mesma senha do cadastro. Qualquer e-mail válido entra na demonstração.
            </span>
            <Link className="btn-link" href="/criar-conta">
              Criar uma conta
            </Link>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
          {busy ? "Verificando…" : isSignUp ? "Criar conta" : "Entrar"}
          {!busy && <IconArrowRight />}
        </button>
      </form>
    </div>
  );
}

/** Campo de senha com botão de mostrar/ocultar e medidor de força. */
function PasswordInput({
  id,
  value,
  onChange,
  autoComplete,
  placeholder,
  strength,
  invalid,
  describedBy,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete: string;
  placeholder: string;
  strength: number;
  invalid: boolean;
  describedBy?: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="input-affix">
        <input
          id={id}
          className="input"
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={invalid ? "true" : undefined}
          aria-describedby={describedBy}
          required
        />
        <button
          type="button"
          className="input-affix-btn"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
          aria-pressed={visible}
        >
          {visible ? "ocultar" : "mostrar"}
        </button>
      </div>
      <div className="password-meter" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <i
            key={index}
            data-on={index < strength && strength >= 2}
            data-low={index < strength && strength < 2}
          />
        ))}
      </div>
    </>
  );
}

/** IDs possíveis de cada campo (tela de cadastro e tela de acesso). */
const FIELD_IDS: Record<string, string[]> = {
  name: ["nome", "acesso-nome"],
  email: ["email", "acesso-email"],
  phone: ["telefone", "acesso-telefone"],
  password: ["senha", "acesso-senha"],
  terms: ["termos"],
};

/** Move o foco para o primeiro campo com erro, na ordem em que aparecem. */
function focusFirstError(errors: Record<string, string | undefined>) {
  const first = Object.keys(errors)[0];
  if (!first) return;
  for (const id of FIELD_IDS[first] ?? [first]) {
    const el = document.getElementById(id);
    if (el instanceof HTMLElement) {
      el.focus();
      return;
    }
  }
}

/** Painel de marca exibido ao lado dos formulários. */
export function AuthAside() {
  return (
    <aside className="auth-brand-side">
      <img src="/img/editorial/hero-mercado.jpg" alt="" aria-hidden="true" />
      <div className="auth-brand-content">
        <p className="eyebrow" style={{ color: "#9fb0bf" }}>
          Mercadinho da Pra�a
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

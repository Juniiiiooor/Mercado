"use client";

import { useState } from "react";
import type { FormEvent } from "react";

/**
 * Formulário de newsletter da vitrine.
 *
 * A demo não envia dados para nenhum servidor: só confirma a inscrição
 * no estado local para a interface dar retorno.
 */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setDone(true);
    setEmail("");
  }

  return (
    <form className="newsletter-form" onSubmit={handleSubmit}>
      <label className="sr-only" htmlFor="newsletter-email">
        E-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Seu e-mail"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Confirmar
      </button>
      {done && (
        <span className="newsletter-done" role="status">
          Inscrição confirmada!
        </span>
      )}
    </form>
  );
}

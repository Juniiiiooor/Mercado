"use client";

import { useState } from "react";
import { useAccount } from "@/components/providers/account-provider";
import { useCart } from "@/components/providers/cart-provider";
import {
  calculateTotals,
  formatLongDate,
  formatPrice,
  FREE_DELIVERY_THRESHOLD,
} from "@/lib/format";
import { IconCheck, IconClock, IconPin } from "@/components/ui/icons";
import type { Order, PaymentMethod } from "@/types/domain";
import type { CartItemView } from "@/lib/contracts";

type Step = "identificacao" | "entrega" | "pagamento" | "confirmado";

const paymentOptions: { value: PaymentMethod; label: string; hint: string }[] = [
  { value: "pix", label: "Pix", hint: "Confirmação imediata" },
  { value: "credito", label: "Cartão de crédito", hint: "Até 3x sem juros" },
  { value: "debito", label: "Cartão de débito", hint: "Cobrança na entrega" },
  { value: "dinheiro", label: "Dinheiro", hint: "Leve troco, se precisar" },
];

const slots = ["Hoje, 18h às 20h", "Hoje, 20h às 22h", "Amanhã, 8h às 10h", "Amanhã, 10h às 12h"];

export function CheckoutFlow() {
  const { user, checkout } = useAccount();
  const { summary, fulfillment, setFulfillment, clear } = useCart();

  const [step, setStep] = useState<Step>("identificacao");
  const [fullName, setFullName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [zip, setZip] = useState(user?.address.zip ?? "");
  const [street, setStreet] = useState(user?.address.street ?? "");
  const [number, setNumber] = useState(user?.address.number ?? "");
  const [district, setDistrict] = useState(user?.address.district ?? "");
  const [city, setCity] = useState(user?.address.city ?? "Florianópolis");
  const [slot, setSlot] = useState(slots[0]);
  const [payment, setPayment] = useState<PaymentMethod>("pix");
  const [placing, setPlacing] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const totals = calculateTotals(summary.subtotal, fulfillment);

  const addressLine =
    fulfillment === "retirada"
      ? "Retirada no balcão — Rua das Palmeiras, 100, Vila Nova"
      : `${street}, ${number} — ${district}, ${city}`;

  async function confirm() {
    setError(null);
    setPlacing(true);
    try {
      const created = await checkout(
        { address: addressLine, paymentMethod: payment, fulfillment },
        summary.items.map(toOrderItem),
      );
      setOrder(created);
      clear();
      setStep("confirmado");
    } catch {
      setError("Não conseguimos fechar o pedido agora. Tente de novo em instantes.");
    } finally {
      setPlacing(false);
    }
  }

  if (summary.items.length === 0 && step !== "confirmado") {
    return (
      <div className="empty-state">
        <p className="eyebrow">Carrinho vazio</p>
        <p style={{ marginTop: "0.6rem" }}>
          Adicione produtos ao carrinho para seguir para o fechamento do pedido.
        </p>
        <a className="btn btn-primary btn-sm" href="/mercado" style={{ marginTop: "1rem" }}>
          Ir ao mercado
        </a>
      </div>
    );
  }

  if (step === "confirmado" && order) {
    return (
      <div className="panel stack" style={{ gap: "1.2rem", maxWidth: 620 }}>
        <span className="badge">
          <IconCheck className="icon" /> pedido {order.id}
        </span>
        <h2 className="display-md">Recebemos seu pedido</h2>
        <p className="lede">
          {order.paymentMethod} · {order.items.length} itens ·{" "}
          <strong>{formatPrice(order.total)}</strong>
        </p>
        <div className="row" style={{ gap: "1.4rem" }}>
          <span className="row" style={{ gap: "0.4rem" }}>
            <IconClock className="icon" /> Entrega prevista para {formatLongDate(order.eta)}
          </span>
        </div>
        <span className="row" style={{ gap: "0.4rem" }}>
          <IconPin className="icon" /> {order.address}
        </span>
        <div className="row">
          <a className="btn btn-primary" href="/painel">
            Acompanhar no painel
          </a>
          <a className="btn btn-ghost" href="/mercado">
            Continuar comprando
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="two-col">
      <div className="panel stack" style={{ gap: "1.3rem" }}>
        <ol className="row" style={{ gap: "0.5rem", fontSize: "0.8rem" }}>
          {(["identificacao", "entrega", "pagamento"] as Step[]).map((item, index) => (
            <li key={item} className="row" style={{ gap: "0.4rem" }}>
              <span className={`badge ${step === item ? "" : "badge-plain"}`}>{index + 1}</span>
              <span style={{ textTransform: "capitalize" }}>{item}</span>
              {index < 2 && <span aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>

        {step === "identificacao" && (
          <div className="stack" style={{ gap: "1rem" }}>
            <h2 className="display-sm">Quem recebe o pedido?</h2>
            <div className="field">
              <label className="field-label" htmlFor="co-nome">
                Nome completo
              </label>
              <input
                id="co-nome"
                className="input"
                value={fullName}
                onChange={(event) => setFullName(event.target.value)}
                autoComplete="name"
              />
            </div>
            <div className="field">
              <label className="field-label" htmlFor="co-tel">
                Telefone com DDD
              </label>
              <input
                id="co-tel"
                className="input"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
                placeholder="(48) 99999-0000"
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              disabled={fullName.trim().length < 3 || phone.trim().length < 8}
              onClick={() => setStep("entrega")}
            >
              Continuar para entrega
            </button>
          </div>
        )}

        {step === "entrega" && (
          <div className="stack" style={{ gap: "1rem" }}>
            <h2 className="display-sm">Como você quer receber?</h2>
            <div className="row">
              <button
                type="button"
                className="chip"
                aria-pressed={fulfillment === "entrega"}
                onClick={() => setFulfillment("entrega")}
              >
                Entrega em casa
              </button>
              <button
                type="button"
                className="chip"
                aria-pressed={fulfillment === "retirada"}
                onClick={() => setFulfillment("retirada")}
              >
                Retirar no balcão
              </button>
            </div>

            {fulfillment === "entrega" ? (
              <div className="stack" style={{ gap: "0.8rem" }}>
                <div className="field-row">
                  <div className="field">
                    <label className="field-label" htmlFor="co-cep">
                      CEP
                    </label>
                    <input
                      id="co-cep"
                      className="input"
                      value={zip}
                      onChange={(event) => setZip(event.target.value)}
                      autoComplete="postal-code"
                      placeholder="88000-000"
                    />
                  </div>
                  <div className="field">
                    <label className="field-label" htmlFor="co-bairro">
                      Bairro
                    </label>
                    <input
                      id="co-bairro"
                      className="input"
                      value={district}
                      onChange={(event) => setDistrict(event.target.value)}
                    />
                  </div>
                </div>
                <div className="field-row">
                  <div className="field">
                    <label className="field-label" htmlFor="co-rua">
                      Rua
                    </label>
                    <input
                      id="co-rua"
                      className="input"
                      value={street}
                      onChange={(event) => setStreet(event.target.value)}
                      autoComplete="address-line1"
                    />
                  </div>
                  <div className="field" style={{ maxWidth: 140 }}>
                    <label className="field-label" htmlFor="co-num">
                      Número
                    </label>
                    <input
                      id="co-num"
                      className="input"
                      value={number}
                      onChange={(event) => setNumber(event.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="field-label" htmlFor="co-cidade">
                    Cidade
                  </label>
                  <input
                    id="co-cidade"
                    className="input"
                    value={city}
                    onChange={(event) => setCity(event.target.value)}
                  />
                </div>
              </div>
            ) : (
              <p className="lede">
                Retirada no balcão da Rua das Palmeiras, 100 — Vila Nova, das 7h às 21h. Sem taxa.
              </p>
            )}

            <div className="stack" style={{ gap: "0.5rem" }}>
              <span className="field-label">Janela de atendimento</span>
              <div className="row">
                {slots.map((item) => (
                  <button
                    key={item}
                    type="button"
                    className="chip"
                    aria-pressed={slot === item}
                    onClick={() => setSlot(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="row">
              <button type="button" className="btn btn-primary" onClick={() => setStep("pagamento")}>
                Escolher pagamento
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setStep("identificacao")}>
                Voltar
              </button>
            </div>
          </div>
        )}

        {step === "pagamento" && (
          <div className="stack" style={{ gap: "1rem" }}>
            <h2 className="display-sm">Como prefere pagar?</h2>
            <div className="stack" style={{ gap: "0.5rem" }}>
              {paymentOptions.map((option) => (
                <label key={option.value} className="checkbox">
                  <input
                    type="radio"
                    name="pagamento"
                    checked={payment === option.value}
                    onChange={() => setPayment(option.value)}
                  />
                  <span>
                    <strong style={{ color: "var(--ink)" }}>{option.label}</strong>
                    <br />
                    <span className="field-hint">{option.hint}</span>
                  </span>
                </label>
              ))}
            </div>

            {error && <p className="alert">{error}</p>}

            <div className="row">
              <button
                type="button"
                className="btn btn-primary"
                onClick={confirm}
                disabled={placing}
              >
                {placing ? "Fechando pedido…" : `Confirmar e pagar ${formatPrice(totals.total)}`}
              </button>
              <button type="button" className="btn btn-ghost" onClick={() => setStep("entrega")}>
                Voltar
              </button>
            </div>
          </div>
        )}
      </div>

      <aside className="panel stack" style={{ gap: "0.8rem" }} aria-label="Resumo do pedido">        <h3 className="display-sm">Resumo</h3>
        {summary.items.map((item) => (
          <div className="order-line" key={item.productId}>
            <span className="name">
              {item.qty}× {item.name}
            </span>
            <span className="price">{formatPrice(item.lineTotal)}</span>
          </div>
        ))}
        <hr />
        <div className="summary-row">
          <span>Subtotal</span>
          <span className="price">{formatPrice(totals.subtotal)}</span>
        </div>
        <div className="summary-row">
          <span>{fulfillment === "retirada" ? "Retirada" : "Entrega"}</span>
          <span className="price">
            {totals.deliveryFee === 0 ? "Grátis" : formatPrice(totals.deliveryFee)}
          </span>
        </div>
        {totals.discount > 0 && (
          <div className="summary-row">
            <span>Desconto do clube</span>
            <span className="price">− {formatPrice(totals.discount)}</span>
          </div>
        )}
        <div className="summary-row summary-total">
          <strong>Total</strong>
          <span className="price">{formatPrice(totals.total)}</span>
        </div>
        {fulfillment === "entrega" && summary.subtotal < FREE_DELIVERY_THRESHOLD && (
          <p className="field-hint">
            Faltam {formatPrice(FREE_DELIVERY_THRESHOLD - summary.subtotal)} para o frete grátis.
          </p>
        )}
      </aside>
    </div>
  );
}

function toOrderItem(item: CartItemView) {
  return {
    productId: item.productId,
    name: item.name,
    unit: item.unit,
    size: item.size,
    price: item.price,
    qty: item.qty,
  };
}

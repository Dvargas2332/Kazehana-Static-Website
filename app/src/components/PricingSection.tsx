import { useState } from "react";
import { ArrowRight, Check, Sparkles } from "lucide-react";
import { plans, pricingNotes } from "@/content/pricing";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function PricingSection({ onRequestDemo }: { onRequestDemo: (planName: string) => void }) {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");
  const yearly = billing === "yearly";

  return (
    <section className="section pricing" id="precios" aria-labelledby="pricing-title">
      <div className="container">
        <div className="section-heading section-heading--split pricing-heading">
          <div>
            <span className="section-kicker">PLANES Y PRECIOS</span>
            <h2 id="pricing-title">Un precio claro para cada tamaño de operación.</h2>
          </div>
          <p>
            Recepción, restaurante, contabilidad y facturación en una sola suscripción. Elige el plan que
            corresponde a tu operación y súmale módulos cuando el negocio crezca.
          </p>
        </div>

        <div className="billing-toggle" role="group" aria-label="Periodicidad de facturación">
          <button
            type="button"
            className={!yearly ? "billing-option billing-option--active" : "billing-option"}
            aria-pressed={!yearly}
            onClick={() => setBilling("monthly")}
          >
            Mensual
          </button>
          <button
            type="button"
            className={yearly ? "billing-option billing-option--active" : "billing-option"}
            aria-pressed={yearly}
            onClick={() => setBilling("yearly")}
          >
            Anual
            <span className="billing-save">2 meses gratis</span>
          </button>
        </div>

        <div className="plan-grid">
          {plans.map((plan) => {
            const price = yearly ? plan.yearly : plan.monthly;
            return (
              <article
                key={plan.id}
                className={`plan-card${plan.featured ? " plan-card--featured" : ""}`}
                aria-labelledby={`plan-${plan.id}`}
              >
                {plan.featured && (
                  <span className="plan-badge">
                    <Sparkles size={13} aria-hidden="true" /> El más elegido
                  </span>
                )}
                <h3 id={`plan-${plan.id}`}>{plan.name}</h3>
                <p className="plan-tagline">{plan.tagline}</p>
                <p className="plan-price">
                  <strong>{currency.format(price)}</strong>
                  <span>/mes</span>
                </p>
                <p className="plan-billing">
                  {yearly
                    ? `${currency.format(price * 12)} al año, impuestos no incluidos`
                    : "Facturación mensual, impuestos no incluidos"}
                </p>
                <p className="plan-rooms">{plan.rooms}</p>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check size={16} aria-hidden="true" /> {feature}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={plan.featured ? "button button--light" : "button button--outline"}
                  onClick={() => onRequestDemo(plan.name)}
                >
                  Solicitar demo <ArrowRight size={17} />
                </button>
              </article>
            );
          })}
        </div>

        <ul className="pricing-notes">
          {pricingNotes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

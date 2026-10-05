"use client";

import { useState, type FormEvent } from "react";
import { BRAND, ENQUIRY } from "@/content/site";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; msg: string };

/** Business enquiry. Asks for nothing about patients. */
export function EnquiryForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const payload = Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v)]));
    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, consent: f.get("consent") === "on" }),
      });
      if (res.ok) return setState({ kind: "sent" });
      const data = await res.json().catch(() => ({}));
      if (res.status === 503 || res.status === 502) {
        return setState({ kind: "error", msg: `We couldn't send this online right now. Please email ${BRAND.email}.` });
      }
      setState({ kind: "error", msg: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setState({ kind: "error", msg: `No connection. Please email ${BRAND.email}.` });
    }
  };

  if (state.kind === "sent") {
    return (
      <div className="form__done" role="status">
        <p className="display-m">
          Thank you. <em>We&apos;ll be in touch.</em>
        </p>
        <p className="muted">{BRAND.responseTime}.</p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit}>
      <div className="form__row">
        <Field label="Your name" name="name" required autoComplete="name" />
        <Field label="Practice or organisation" name="org" autoComplete="organization" />
      </div>
      <div className="form__row">
        <Field label="Email" name="email" type="email" required autoComplete="email" />
        <Field label="Phone (optional)" name="phone" type="tel" autoComplete="tel" />
      </div>
      <div className="form__row">
        <Select label="What do you need?" name="need" options={ENQUIRY.needs} />
        <Select label="Budget" name="budget" options={ENQUIRY.budgets} />
      </div>
      <label className="field">
        <span>Anything else?</span>
        <textarea name="message" rows={4} maxLength={2000} placeholder="Your specialty, timelines, what you have today. Please don't include any patient information." />
      </label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden />
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>
          I agree to be contacted about this enquiry. <a className="ulink" href="/privacy">How we use your details</a>.
        </span>
      </label>
      <div className="form__foot">
        <button className="blob blob--ink" disabled={state.kind === "sending"}>
          {state.kind === "sending" ? "Sending…" : "Send enquiry"}
        </button>
        <p className="form__msg" role="alert" aria-live="polite">
          {state.kind === "error" ? state.msg : ""}
        </p>
      </div>
    </form>
  );
}

function Field({ label, name, type = "text", required, autoComplete }: { label: string; name: string; type?: string; required?: boolean; autoComplete?: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <label className="field">
      <span>{label}</span>
      <select name={name} defaultValue="">
        <option value="" disabled>
          Choose one
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}

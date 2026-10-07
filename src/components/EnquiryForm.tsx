"use client";

import { useEffect, useRef, useState, type FocusEvent, type FormEvent } from "react";
import { BRAND, ENQUIRY } from "@/content/site";
import { fieldError } from "@/lib/enquiry";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; msg: string };
type Errors = Readonly<Record<string, string>>;
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;

const CHECKED = ["name", "org", "email", "phone", "message"];
const isControl = (t: EventTarget): t is Control => t instanceof HTMLInputElement || t instanceof HTMLSelectElement || t instanceof HTMLTextAreaElement;
const CONSENT = "Please confirm we may contact you.";

/**
 * Business enquiry. Asks for nothing about patients.
 * Fields are checked when you leave them (with the server's own rules), re-checked as you
 * correct them, and all at once on send, which then moves focus to the first problem.
 */
export function EnquiryForm() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [errors, setErrors] = useState<Errors>({});
  const form = useRef<HTMLFormElement>(null);
  const done = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (state.kind === "sent") done.current?.focus();
  }, [state.kind]);

  const check = (el: Control) => {
    const msg = el.name === "consent" ? ((el as HTMLInputElement).checked ? "" : CONSENT) : fieldError(el.name, el.value);
    setErrors((prev) => ({ ...prev, [el.name]: msg }));
  };
  const onBlur = (e: FocusEvent<HTMLFormElement>) => {
    if (isControl(e.target) && CHECKED.includes(e.target.name)) check(e.target);
  };
  // once a field shows a problem, it clears the moment it is put right
  const onInput = (e: FormEvent<HTMLFormElement>) => {
    if (isControl(e.target) && errors[e.target.name]) check(e.target);
  };

  const submit = async (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const f = new FormData(ev.currentTarget);
    const payload = Object.fromEntries([...f.entries()].map(([k, v]) => [k, String(v)]));
    const found: Record<string, string> = Object.fromEntries(CHECKED.map((name) => [name, fieldError(name, payload[name] ?? "")]));
    found.consent = f.get("consent") === "on" ? "" : CONSENT;
    setErrors(found);
    const first = Object.keys(found).find((name) => found[name]);
    if (first) return form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();

    setState({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, consent: true }),
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
      <div ref={done} className="form__done" role="status" tabIndex={-1}>
        <p className="display-m">
          Thank you. <em>We&apos;ll be in touch.</em>
        </p>
        <p className="muted">
          We reply with questions or a short proposal. {BRAND.responseTime}.
        </p>
      </div>
    );
  }

  const sending = state.kind === "sending";
  return (
    <form ref={form} className="form" method="post" action="/api/enquiry" noValidate onSubmit={submit} onBlur={onBlur} onInput={onInput}>
      <div className="form__row">
        <Field label="Your name" name="name" required autoComplete="name" error={errors.name} />
        <Field label="Practice or organisation" name="org" autoComplete="organization" error={errors.org} />
      </div>
      <div className="form__row">
        <Field label="Email" name="email" type="email" required autoComplete="email" error={errors.email} />
        <Field label="Phone" name="phone" type="tel" autoComplete="tel" error={errors.phone} />
      </div>
      <div className="form__row">
        <Select label="What do you need?" name="need" options={ENQUIRY.needs} />
        <Select label="Budget" name="budget" options={ENQUIRY.budgets} />
      </div>
      <label className="field">
        <span>
          Anything else? <Optional />
        </span>
        <textarea
          name="message"
          rows={4}
          maxLength={2000}
          placeholder="Your specialty, timelines, what you have today. Please don't include any patient information."
          aria-invalid={!!errors.message || undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        <Problem id="message-error" msg={errors.message} />
      </label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden />
      <label className="check">
        <input type="checkbox" name="consent" required aria-invalid={!!errors.consent || undefined} aria-describedby={errors.consent ? "consent-error" : undefined} onChange={(e) => errors.consent && check(e.currentTarget)} />
        <span>
          I agree to be contacted about this enquiry. <a className="ulink" href="/privacy">How we use your details</a>.
        </span>
      </label>
      <Problem id="consent-error" msg={errors.consent} className="check__error" />
      <div className="form__foot">
        <div className="form__button-wrapper">
          <button className="blob blob--ink" disabled={sending} aria-busy={sending || undefined}>
            {sending && <span className="form__spinner" aria-hidden />}
            {sending ? "Sending…" : "Send enquiry"}
          </button>
        </div>
        <div aria-live="polite">
          {state.kind === "error" && (
            <div className="form__error-box" role="alert">
              <p>{state.msg}</p>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}

const Optional = () => <i className="field__opt">(optional)</i>;

function Problem({ id, msg, className = "field__error" }: { id: string; msg?: string; className?: string }) {
  return msg ? (
    <span id={id} className={className}>
      {msg}
    </span>
  ) : null;
}

type FieldProps = { label: string; name: string; type?: string; required?: boolean; autoComplete?: string; error?: string };

function Field({ label, name, type = "text", required, autoComplete, error }: FieldProps) {
  return (
    <label className="field">
      <span>
        {label} {!required && <Optional />}
      </span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} aria-invalid={!!error || undefined} aria-describedby={error ? `${name}-error` : undefined} />
      <Problem id={`${name}-error`} msg={error} />
    </label>
  );
}

function Select({ label, name, options }: { label: string; name: string; options: readonly string[] }) {
  return (
    <label className="field">
      <span>
        {label} <Optional />
      </span>
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

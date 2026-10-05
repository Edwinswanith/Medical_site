"use client";

import { useState, type FormEvent } from "react";
import { CLINIC, SERVICES } from "@/content/site";

type State = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; msg: string };

export function EnquiryForm({ preset = "" }: { preset?: string }) {
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
        return setState({
          kind: "error",
          msg: `We couldn't send this online right now. Please call the desk on ${CLINIC.phone}.`,
        });
      }
      setState({ kind: "error", msg: data.error ?? "Something went wrong. Please try again." });
    } catch {
      setState({ kind: "error", msg: `No connection. Please call the desk on ${CLINIC.phone}.` });
    }
  };

  if (state.kind === "sent") {
    return (
      <div className="form__done" role="status">
        <p className="display-m">
          Thank you. <em>We&apos;ll call you back.</em>
        </p>
        <p className="muted">
          The front desk will ring to confirm a time. If it&apos;s urgent, call {CLINIC.phone}.
        </p>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={submit} noValidate={false}>
      <div className="form__row">
        <Field label="Full name" name="name" required autoComplete="name" />
        <Field label="Phone" name="phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="form__row">
        <Field label="Email (optional)" name="email" type="email" autoComplete="email" />
        <label className="field">
          <span>Speciality</span>
          <select name="service" defaultValue={preset}>
            <option value="">Not sure yet</option>
            {SERVICES.map((s) => (
              <option key={s.slug} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <Field label="Preferred day or time" name="when" placeholder="e.g. Weekday mornings" />
      <label className="field">
        <span>Anything we should know to book you in?</span>
        <textarea name="message" rows={4} maxLength={1500} placeholder="Keep it brief. Please don't share medical history here; your doctor will ask in person." />
      </label>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden />
      <label className="check">
        <input type="checkbox" name="consent" required />
        <span>I agree to be contacted about this enquiry by phone or email.</span>
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

function Field({
  label,
  name,
  type = "text",
  required,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="field">
      <span>{label}</span>
      <input name={name} type={type} required={required} autoComplete={autoComplete} placeholder={placeholder} />
    </label>
  );
}

import { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import type { Property } from "../data/properties";
import { partners, primary } from "../data/site";
import {
  submitEnquiry,
  validate,
  whatsappLink,
  type Enquiry,
  type FieldErrors,
  type SubmitResult,
} from "../lib/enquiry";

const empty: Enquiry = { name: "", email: "", phone: "", message: "" };

type FormProps = {
  /** when present, the enquiry is tied to this listing */
  property?: Property;
  seedMessage?: string;
  onSent?: () => void;
};

export function EnquiryForm({ property, seedMessage, onSent }: FormProps) {
  const [form, setForm] = useState<Enquiry>({
    ...empty,
    message: seedMessage ?? "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  const set = (key: keyof Enquiry) => (value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    // clear the error as soon as the visitor starts fixing it
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    const payload = { ...form, property: property?.title };
    const found = validate(payload);
    setErrors(found);
    if (Object.keys(found).length) return;

    setBusy(true);
    setFailed(null);
    try {
      setResult(await submitEnquiry(payload));
      onSent?.();
    } catch (err) {
      console.error("Enquiry submission failed", err);
      setFailed(
        `Something went wrong on our side. Please call ${partners
          .map((x) => `${x.name.split(" ")[0]} on ${x.phone}`)
          .join(" or ")}.`,
      );
    } finally {
      setBusy(false);
    }
  }

  if (result) {
    return (
      <div className="rise-in rounded-2xl border border-brass-400/40 bg-brass-300/12 p-8 text-center">
        <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-brass-500 text-ink-950">
          <i className="pi pi-check text-lg" aria-hidden="true" />
        </div>
        <h3 className="mt-5 font-display text-2xl text-ink-900">
          {result === "sent" ? "Thank you — that is with us." : "Almost there"}
        </h3>
        <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-ink-600">
          {result === "sent"
            ? `${primary.name.split(" ")[0]} will call you back within one working day. For anything urgent, ${primary.phone}.`
            : "WhatsApp should have opened with your enquiry filled in — press send and we will come back to you within one working day."}
        </p>
        <a
          href={whatsappLink(property?.title)}
          target="_blank"
          rel="noreferrer noopener"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-ink-900"
        >
          <i className="pi pi-whatsapp text-brass-600" aria-hidden="true" />
          <span className="link-underline pb-0.5">
            Or message us on WhatsApp
          </span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {property && (
        <div className="flex items-center gap-3 rounded-xl bg-sand-100 p-3">
          <img
            src={property.images[0]}
            alt=""
            className="h-14 w-16 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <p className="text-[0.62rem] uppercase tracking-[0.16em] text-brass-600">
              Enquiring about
            </p>
            <p className="truncate font-display text-lg text-ink-900">
              {property.title}
            </p>
          </div>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" error={errors.name} htmlFor="enq-name">
          <InputText
            id="enq-name"
            value={form.name}
            autoComplete="name"
            onChange={(e) => set("name")(e.target.value)}
            invalid={!!errors.name}
            className="w-full"
            placeholder="Rohan Shah"
          />
        </Field>

        <Field label="Mobile" error={errors.phone} htmlFor="enq-phone">
          <InputText
            id="enq-phone"
            value={form.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            onChange={(e) => set("phone")(e.target.value)}
            invalid={!!errors.phone}
            className="w-full"
            placeholder="+91 98250 00000"
          />
        </Field>
      </div>

      <Field label="Email" error={errors.email} htmlFor="enq-email" optional>
        <InputText
          id="enq-email"
          value={form.email}
          type="email"
          autoComplete="email"
          onChange={(e) => set("email")(e.target.value)}
          invalid={!!errors.email}
          className="w-full"
          placeholder="you@example.com"
        />
      </Field>

      <Field
        label="What are you looking for?"
        error={errors.message}
        htmlFor="enq-message"
        optional
      >
        <InputTextarea
          id="enq-message"
          value={form.message}
          onChange={(e) => set("message")(e.target.value)}
          invalid={!!errors.message}
          rows={4}
          autoResize
          className="w-full"
          placeholder="Budget, preferred localities, when you would like to move…"
        />
      </Field>

      {failed && (
        <p
          role="alert"
          className="rounded-xl border border-red-600/25 bg-red-600/8 px-4 py-3 text-sm text-red-800"
        >
          {failed}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <Button
          type="submit"
          label={busy ? "Sending…" : "Register my interest"}
          icon={busy ? "pi pi-spin pi-spinner" : "pi pi-send"}
          disabled={busy}
          className="gap-2! px-7! py-3!"
        />
        <a
          href={whatsappLink(property?.title)}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-2 text-sm text-ink-600 transition-colors hover:text-brass-600"
        >
          <i className="pi pi-whatsapp" aria-hidden="true" />
          <span className="link-underline pb-0.5">WhatsApp instead</span>
        </a>
      </div>

      <p className="text-xs leading-relaxed text-ink-400">
        We use your details only to answer this enquiry. No lists, no resale, no
        automated calls.
      </p>
    </form>
  );
}

function Field({
  label,
  error,
  htmlFor,
  optional,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-2 flex items-baseline gap-2 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-ink-600"
      >
        {label}
        {optional && (
          <span className="tracking-normal text-ink-400">optional</span>
        )}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

export function EnquiryDialog({
  property,
  visible,
  onHide,
}: {
  property?: Property;
  visible: boolean;
  onHide: () => void;
}) {
  return (
    <Dialog
      header={
        <span className="font-display text-2xl text-ink-900">
          Register your interest
        </span>
      }
      visible={visible}
      onHide={onHide}
      draggable={false}
      dismissableMask
      blockScroll
      className="w-[min(38rem,92vw)]"
      contentClassName="!pt-2 !pb-8 !px-6 sm:!px-8"
      headerClassName="!px-6 sm:!px-8 !pt-7 !pb-3"
    >
      <EnquiryForm key={property?.id ?? "general"} property={property} />
    </Dialog>
  );
}

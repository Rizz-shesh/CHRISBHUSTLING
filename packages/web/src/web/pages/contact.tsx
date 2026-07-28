import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "../components/logo";
import { SERVICE_PAGES } from "../data/service-pages";
import { useServiceInquiry } from "../queries/services";

const GENERAL_INQUIRY = { slug: "general-inquiry", title: "General Inquiry" };
const SERVICE_OPTIONS = [GENERAL_INQUIRY, ...SERVICE_PAGES.map((s) => ({ slug: s.slug, title: s.title }))];

export default function ContactPage() {
  const inquiry = useServiceInquiry();
  const [form, setForm] = useState({
    serviceSlug: GENERAL_INQUIRY.slug,
    name: "",
    email: "",
    phone: "",
    preferredContact: "Phone" as "Phone" | "Email" | "Text",
    message: "",
    consent: false,
  });

  const selected = SERVICE_OPTIONS.find((s) => s.slug === form.serviceSlug) ?? GENERAL_INQUIRY;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.consent) return;
    inquiry.mutate(
      {
        serviceSlug: selected.slug,
        serviceTitle: selected.title,
        name: form.name,
        email: form.email,
        phone: form.phone,
        preferredContact: form.preferredContact,
        message: form.message,
        consent: true,
      },
      {
        onSuccess: () =>
          setForm({
            serviceSlug: GENERAL_INQUIRY.slug,
            name: "",
            email: "",
            phone: "",
            preferredContact: "Phone",
            message: "",
            consent: false,
          }),
      },
    );
  };

  const inputClass =
    "mt-2 w-full border bg-[#11161d] px-4 py-3 text-[#f4eee4] outline-none transition-colors placeholder:text-[#6f716f] focus:border-[#d3a33f]";

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b bg-ink px-5 py-4" style={{ borderColor: "rgba(255,255,255,.12)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Logo href="/" />
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-brass">
            <ArrowLeft size={15} /> Back home
          </Link>
        </div>
      </header>

      <main style={{ background: "var(--ink-soft)" }}>
        <section>
          <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[.8fr_1.2fr] md:py-20">
            <div>
              <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">Take the next step</p>
              <h1 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#f4eee4] md:text-4xl">
                Talk with Chris B Hustling.
              </h1>
              <p className="mt-5 leading-7 text-[#c5c0b7]">
                Tell us what you are working toward. Your inquiry is saved securely for the Chris B Hustling
                team and routed into our lead follow-up system.
              </p>
              <div className="mt-7 space-y-3 text-sm text-[#b9b5ad]">
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brass" /> No obligation to submit an inquiry
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brass" /> Choose how you prefer to be contacted
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-brass" /> Tell us which service you're interested in
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="border bg-[#171c24] p-6 md:p-8" style={{ borderColor: "var(--ledger-line)" }}>
              {inquiry.isSuccess ? (
                <div className="flex min-h-80 flex-col items-center justify-center text-center">
                  <CheckCircle2 size={38} className="text-brass" />
                  <h3 className="mt-5 font-display text-2xl font-semibold text-[#f4eee4]">
                    Your inquiry is in the ledger.
                  </h3>
                  <p className="mt-3 max-w-md leading-7 text-[#c5c0b7]">
                    Thank you. The Chris B Hustling team can now review your request and follow up using your
                    preferred contact method.
                  </p>
                  <button type="button" onClick={() => inquiry.reset()} className="mt-6 text-sm font-semibold text-brass">
                    Send another inquiry
                  </button>
                </div>
              ) : (
                <>
                  <label className="block text-sm font-semibold text-[#ddd6ca]">
                    Which service are you interested in?
                    <select
                      value={form.serviceSlug}
                      onChange={(e) => setForm({ ...form, serviceSlug: e.target.value })}
                      className={inputClass}
                    >
                      {SERVICE_OPTIONS.map((s) => (
                        <option key={s.slug} value={s.slug}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-[#ddd6ca]">
                      Full name
                      <input
                        required
                        minLength={2}
                        autoComplete="name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm font-semibold text-[#ddd6ca]">
                      Phone number
                      <input
                        required
                        type="tel"
                        minLength={7}
                        autoComplete="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        className={inputClass}
                      />
                    </label>
                  </div>
                  <div className="mt-5 grid gap-5 sm:grid-cols-2">
                    <label className="text-sm font-semibold text-[#ddd6ca]">
                      Email address
                      <input
                        required
                        type="email"
                        autoComplete="email"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className={inputClass}
                      />
                    </label>
                    <label className="text-sm font-semibold text-[#ddd6ca]">
                      Preferred contact
                      <select
                        value={form.preferredContact}
                        onChange={(e) =>
                          setForm({ ...form, preferredContact: e.target.value as "Phone" | "Email" | "Text" })
                        }
                        className={inputClass}
                      >
                        <option>Phone</option>
                        <option>Email</option>
                        <option>Text</option>
                      </select>
                    </label>
                  </div>
                  <label className="mt-5 block text-sm font-semibold text-[#ddd6ca]">
                    How can we help?
                    <textarea
                      rows={5}
                      maxLength={2000}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Share your goals, questions, or current situation."
                      className={inputClass}
                    />
                  </label>
                  <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#aaa69f]">
                    <input
                      required
                      type="checkbox"
                      checked={form.consent}
                      onChange={(e) => setForm({ ...form, consent: e.target.checked })}
                      className="mt-1 accent-[#d3a33f]"
                    />
                    <span>
                      I agree that Chris B Hustling may contact me about this inquiry by my selected method.
                      Message and data rates may apply for text messages. Consent is not a condition of purchase.
                    </span>
                  </label>
                  {inquiry.isError && (
                    <p className="mt-4 text-sm text-[#e28d76]">We could not submit your inquiry. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={inquiry.isPending}
                    className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-[#11161d] transition-colors hover:bg-[#e2b653] disabled:opacity-60"
                  >
                    {inquiry.isPending ? "Submitting…" : "Submit inquiry"} <ArrowRight size={16} />
                  </button>
                </>
              )}
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

import { useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Logo } from "../components/logo";
import { SERVICE_PAGES, getServicePage } from "../data/service-pages";
import { useServiceInquiry } from "../queries/services";

export default function ServicePage() {
  const [, params] = useRoute("/services/:slug");
  const service = getServicePage(params?.slug ?? "");

  if (!service) {
    return <main className="flex min-h-screen items-center justify-center bg-cream"><Link href="/#services" className="text-brass">Back to services</Link></main>;
  }

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b bg-ink px-5 py-4" style={{ borderColor: "rgba(255,255,255,.12)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Logo href="/" />
          <Link href="/#services" className="inline-flex items-center gap-2 text-sm font-semibold text-brass"><ArrowLeft size={15} /> All services</Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-20">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">Chris B Hustling — Service</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4eee4] md:text-6xl">{service.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8" style={{ color: "var(--ink-70)" }}>{service.intro}</p>
            <a href="#inquiry" className="mt-8 inline-flex items-center gap-2 font-semibold text-brass">Discuss your goals <ArrowRight size={16} /></a>
          </div>
          <div className="aspect-[4/3] overflow-hidden border" style={{ borderColor: "var(--ledger-line)" }}>
            <img src={service.image} alt={service.title} className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="border-y" style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}>
          <div className="mx-auto max-w-[1100px] px-5 py-14 md:py-20">
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">What we can do for you</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-[#f4eee4] md:text-4xl">{service.offeringTitle}</h2>
            <p className="mt-4 max-w-2xl leading-7 text-[#b9b5ad]">A clear look at the practical support included in this service.</p>
            <div className="mt-9 grid gap-5 md:grid-cols-2">
              {service.offerings.map((item, index) => (
                <article
                  key={item.title}
                  className="group overflow-hidden border bg-[#171c24] transition-all duration-300 hover:-translate-y-1 hover:border-[#c99b40] hover:bg-[#1d232d] hover:shadow-[0_18px_45px_rgba(0,0,0,.28)]"
                  style={{ borderColor: "var(--ledger-line)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img src={service.gallery[index % service.gallery.length]} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171c24] via-transparent to-transparent" />
                    <span className="absolute left-5 top-5 border border-[#d3a33f]/60 bg-[#11161d]/85 px-2.5 py-1.5 font-mono text-[0.65rem] tracking-widest text-[#e2b653]">STEP {String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold leading-tight text-[#f4eee4] transition-colors group-hover:text-[#e2b653]">{item.title}</h3>
                    <p className="mt-3 text-[0.96rem] leading-7 text-[#c5c0b7]">{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-14 md:py-20">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">The Chris B Hustling difference</p>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold tracking-tight text-[#f4eee4] md:text-4xl">{service.benefitsTitle}</h2>
          <p className="mt-4 max-w-2xl leading-7 text-[#b9b5ad]">The principles behind how we work with you and what you can expect throughout the process.</p>
          <div className="mt-9 grid gap-6 md:grid-cols-2">
            {service.benefits.map((item, index) => (
              <article
                key={item.title}
                className="group relative overflow-hidden border bg-[#171c24] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#c99b40] hover:bg-[#1d232d] hover:shadow-[0_16px_40px_rgba(0,0,0,.24)] md:p-7"
                style={{ borderColor: "var(--ledger-line)" }}
              >
                <div className="absolute right-0 top-0 h-full w-28 opacity-[.12] transition-all duration-500 group-hover:w-36 group-hover:opacity-25">
                  <img src={service.gallery[(index + 1) % service.gallery.length]} alt="" className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#171c24] to-transparent" />
                </div>
                <div className="relative max-w-[85%]">
                  <span className="font-mono text-[0.65rem] tracking-[0.18em] text-[#d3a33f]">0{index + 1}</span>
                  <h3 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#f4eee4] transition-colors group-hover:text-[#e2b653]">{item.title}</h3>
                  <p className="mt-3 leading-7 text-[#c5c0b7]">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-12 border-t pt-8" style={{ borderColor: "var(--ledger-line)" }}>
            <a href="#inquiry" className="inline-flex items-center gap-2 font-semibold text-brass">Get started with Chris B Hustling <ArrowRight size={16} /></a>
          </div>
        </section>

        <InquiryForm serviceSlug={service.slug} serviceTitle={service.title} />

        <aside className="border-t" style={{ borderColor: "var(--ledger-line)" }}>
          <div className="mx-auto max-w-[1100px] px-5 py-12">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">Explore other services</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {SERVICE_PAGES.filter((item) => item.slug !== service.slug).map((item) => (
                <Link key={item.slug} href={`/services/${item.slug}`} className="border bg-[#171c24] px-4 py-3 text-sm font-semibold text-[#ddd6ca] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#c99b40] hover:bg-[#222934] hover:text-[#e2b653]" style={{ borderColor: "var(--ledger-line)" }}>{item.title}</Link>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

function InquiryForm({ serviceSlug, serviceTitle }: { serviceSlug: string; serviceTitle: string }) {
  const inquiry = useServiceInquiry();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredContact: "Phone" as "Phone" | "Email" | "Text",
    message: "",
    consent: false,
  });

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.consent) return;
    inquiry.mutate(
      { serviceSlug, serviceTitle, ...form, consent: true },
      { onSuccess: () => setForm({ name: "", email: "", phone: "", preferredContact: "Phone", message: "", consent: false }) },
    );
  };

  const inputClass = "mt-2 w-full border bg-[#11161d] px-4 py-3 text-[#f4eee4] outline-none transition-colors placeholder:text-[#6f716f] focus:border-[#d3a33f]";

  return (
    <section id="inquiry" className="border-t" style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}>
      <div className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[.8fr_1.2fr] md:py-20">
        <div>
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">Take the next step</p>
          <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-[#f4eee4] md:text-4xl">Ask about {serviceTitle}.</h2>
          <p className="mt-5 leading-7 text-[#c5c0b7]">Tell us what you are working toward. Your inquiry is saved securely for the Chris B Hustling team and routed into our lead follow-up system.</p>
          <div className="mt-7 space-y-3 text-sm text-[#b9b5ad]">
            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brass" /> No obligation to submit an inquiry</p>
            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brass" /> Choose how you prefer to be contacted</p>
            <p className="flex items-center gap-2"><CheckCircle2 size={16} className="text-brass" /> Your message is attached to this service</p>
          </div>
        </div>

        <form onSubmit={submit} className="border bg-[#171c24] p-6 md:p-8" style={{ borderColor: "var(--ledger-line)" }}>
          {inquiry.isSuccess ? (
            <div className="flex min-h-80 flex-col items-center justify-center text-center">
              <CheckCircle2 size={38} className="text-brass" />
              <h3 className="mt-5 font-display text-2xl font-semibold text-[#f4eee4]">Your inquiry is in the ledger.</h3>
              <p className="mt-3 max-w-md leading-7 text-[#c5c0b7]">Thank you. The Chris B Hustling team can now review your request and follow up using your preferred contact method.</p>
              <button type="button" onClick={() => inquiry.reset()} className="mt-6 text-sm font-semibold text-brass">Send another inquiry</button>
            </div>
          ) : (
            <>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#ddd6ca]">Full name<input required minLength={2} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} /></label>
                <label className="text-sm font-semibold text-[#ddd6ca]">Phone number<input required type="tel" minLength={7} autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} /></label>
              </div>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-semibold text-[#ddd6ca]">Email address<input required type="email" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} /></label>
                <label className="text-sm font-semibold text-[#ddd6ca]">Preferred contact
                  <select value={form.preferredContact} onChange={(e) => setForm({ ...form, preferredContact: e.target.value as "Phone" | "Email" | "Text" })} className={inputClass}>
                    <option>Phone</option><option>Email</option><option>Text</option>
                  </select>
                </label>
              </div>
              <label className="mt-5 block text-sm font-semibold text-[#ddd6ca]">How can we help?<textarea rows={5} maxLength={2000} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Share your goals, questions, or current situation." className={inputClass} /></label>
              <label className="mt-5 flex items-start gap-3 text-xs leading-5 text-[#aaa69f]">
                <input required type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1 accent-[#d3a33f]" />
                <span>I agree that Chris B Hustling may contact me about this inquiry by my selected method. Message and data rates may apply for text messages. Consent is not a condition of purchase.</span>
              </label>
              {inquiry.isError && <p className="mt-4 text-sm text-[#e28d76]">We could not submit your inquiry. Please try again.</p>}
              <button type="submit" disabled={inquiry.isPending} className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-[#11161d] transition-colors hover:bg-[#e2b653] disabled:opacity-60">
                {inquiry.isPending ? "Submitting…" : "Submit inquiry"} <ArrowRight size={16} />
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

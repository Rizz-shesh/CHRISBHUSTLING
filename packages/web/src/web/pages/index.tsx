import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "../components/logo";
import { AscendingLine } from "../components/ascending-line";
import { useRentalSignup } from "../queries/rentals";

/* ---------- small shared bits ---------- */

function Eyebrow({
  children,
  color = "brass",
}: {
  children: React.ReactNode;
  color?: "brass" | "brick";
}) {
  const c = color === "brick" ? "text-brick" : "text-brass";
  return (
    <span className={`eyebrow inline-flex items-center gap-2 ${c}`}>
      <span
        className="inline-block h-px w-6"
        style={{ background: "currentColor" }}
      />
      {children}
    </span>
  );
}

function SectionRule() {
  return <div className="h-px w-full" style={{ background: "var(--ledger-line)" }} />;
}

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 18 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- header ---------- */

const NAV = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Why Us", href: "#why" },
  { label: "Insights", href: "#blogs" },
  { label: "Contact", href: "/contact" },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header id="top" className="sticky top-0 z-50">
      {/* thin utility bar */}
      <div className="border-b" style={{ background: "var(--ink)", borderColor: "var(--ledger-line)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-1.5">
          <span className="eyebrow text-[0.6rem]" style={{ color: "var(--ink-45)" }}>
            Western PA · Roselle, NJ
          </span>
          <a
            href="/contact"
            className="eyebrow cta-underline text-[0.6rem]"
            style={{ color: "var(--ink-70)" }}
          >
            Get in touch
          </a>
        </div>
      </div>

      <div
        className="border-b backdrop-blur-md"
        style={{ background: "rgba(22,26,34,0.88)", borderColor: "var(--ledger-line)" }}
      >
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <Logo />
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="cta-underline text-sm font-medium"
                style={{ color: "var(--ink-70)" }}
              >
                {n.label}
              </a>
            ))}
            <a
              href="#rentals"
              className="border px-4 py-2 text-sm font-semibold text-brass transition-colors hover:bg-brass hover:text-ink"
              style={{ borderColor: "var(--brass)" }}
            >
              Get Started
            </a>
          </nav>
          <button
            className="text-brass md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="border-t md:hidden" style={{ borderColor: "var(--ledger-line)" }}>
            <nav className="mx-auto flex max-w-[1200px] flex-col px-5 py-3">
              {NAV.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b py-3 text-sm font-medium"
                  style={{ color: "var(--ink-70)", borderColor: "var(--ledger-line)" }}
                >
                  {n.label}
                </a>
              ))}
              <a
                href="#rentals"
                onClick={() => setOpen(false)}
                className="mt-4 border px-4 py-3 text-center text-sm font-semibold text-brass"
                style={{ borderColor: "var(--brass)" }}
              >
                Get Started
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

/* ---------- hero ---------- */

const HERO_TABS = [
  { label: "Credit Restoration", href: "#services" },
  { label: "Real Estate", href: "#services" },
  { label: "Business Building", href: "#services" },
];

function Hero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden">
      {/* treated photographic backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <img
          src="/images/hero.jpg"
          alt=""
          className="h-full w-full object-cover object-right opacity-[0.16]"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--ink) 38%, rgba(22,26,34,0.72) 68%, rgba(22,26,34,0.42) 100%)",
          }}
        />
      </div>
      <div className="mx-auto max-w-[1200px] px-5 pt-16 pb-10 md:pt-24 md:pb-16">
        <Reveal>
          <Eyebrow>File No. 00 — The Ledger</Eyebrow>
        </Reveal>

        <div className="mt-6 grid items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <motion.h1
              className="font-display text-[2.6rem] font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-[4.4rem]"
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              We help you improve your credit.
              <br />
              Buy the house.
              <br />
              <span className="text-brass">Build the business.</span>
            </motion.h1>

            <motion.p
              className="mt-7 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--ink-70)" }}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              One continuous ladder from restored credit to generational wealth.
              Blue-collar origin, white-collar outcome — earned credibility, not a
              fintech app.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap items-center gap-4"
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              <a
                href="#rentals"
                className="inline-flex items-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-ink transition-transform hover:bg-brass-lite"
              >
                Start your file <ArrowRight size={16} />
              </a>
              <a
                href="#services"
                className="cta-underline text-sm font-semibold text-brass"
              >
                See the five services
              </a>
            </motion.div>

            {/* scroll-jump tabs (no auto-rotate) */}
            <motion.div
              className="mt-10 flex flex-wrap gap-x-6 gap-y-2"
              initial={reduce ? false : { opacity: 0 }}
              animate={reduce ? undefined : { opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45 }}
            >
              {HERO_TABS.map((t, i) => (
                <a
                  key={t.label}
                  href={t.href}
                  className="eyebrow cta-underline flex items-center gap-2"
                  style={{ color: "var(--ink-70)" }}
                >
                  <span className="text-brass">0{i + 1}</span>
                  {t.label}
                </a>
              ))}
            </motion.div>
          </div>

          {/* signature ascending line chart */}
          <div className="relative">
            <div
              className="border p-5"
              style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="eyebrow" style={{ color: "var(--ink-45)" }}>
                  Score trajectory
                </span>
                <span className="font-mono text-xs text-brass">+180 pts</span>
              </div>
              <AscendingLine variant="hero" className="h-44 w-full md:h-56" />
              <div className="mt-4 flex items-center justify-between font-mono text-[0.65rem]" style={{ color: "var(--ink-45)" }}>
                <span>MONTH 01</span>
                <span>MONTH 12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- stats strip ---------- */

const STATS = [
  { n: "5", label: "Distinct services" },
  { n: "PA · NJ", label: "Region served" },
  { n: "1 Ladder", label: "Credit → wealth" },
  { n: "Since '24", label: "Building files" },
];

function Stats() {
  return (
    <section>
      <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-px px-5 md:grid-cols-4" style={{ background: "transparent" }}>
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="py-8 md:py-10 md:pr-6">
              <div className="font-display text-3xl font-semibold text-brass md:text-4xl">
                {s.n}
              </div>
              <div className="eyebrow mt-2" style={{ color: "var(--ink-45)" }}>
                {s.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <Reveal>
          <Eyebrow>File No. 01 — Who We Are</Eyebrow>
        </Reveal>
        <div className="mt-8 grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          {/* brass-line photo frame */}
          <Reveal>
            <div
              className="relative aspect-[4/5] w-full max-w-sm border p-3"
              style={{ borderColor: "var(--brass)" }}
            >
              <div className="relative h-full w-full overflow-hidden">
                <img
                  src="/images/about.jpg"
                  alt="Putting the work on paper — building each client's file"
                  className="h-full w-full object-cover"
                />
                <span
                  className="absolute bottom-3 left-3 px-2 py-1 font-mono text-[0.58rem] uppercase tracking-widest"
                  style={{ background: "rgba(22,26,34,0.82)", color: "var(--brass)" }}
                >
                  The file, in progress
                </span>
              </div>
              <span
                className="absolute -bottom-3 left-6 px-3 font-mono text-[0.62rem] uppercase tracking-widest"
                style={{ background: "var(--ink)", color: "var(--brass)" }}
              >
                Est. 2024
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div>
              <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.7rem]">
                A trusted partner in financial rebuilding.
              </h2>
              <p className="mt-6 text-base leading-relaxed" style={{ color: "var(--ink-70)" }}>
                Chris B Hustling is dedicated to empowering working people with the
                knowledge, tools, and support needed to thrive across life and
                business. We serve first-time buyers and first-time entrepreneurs —
                people let down by predatory finance who want something that reads as
                earned credibility.
              </p>
              <p className="mt-4 text-base leading-relaxed" style={{ color: "var(--ink-70)" }}>
                Honesty, transparency, and a client-centric approach — that's how we
                build enduring relationships and move clients from restored credit to
                lasting wealth.
              </p>
              <a
                href="/about"
                className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-brass cta-underline"
              >
                Read the full ledger <ArrowRight size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- services ---------- */

const SERVICES = [
  {
    no: "01",
    title: "Real Estate Services",
    body: "Real estate transactions are significant milestones. Whether buying, selling, or investing, our team guides you every step with services tailored to your goals.",
    img: "/images/svc1.jpg",
    href: "/services/real-estate-services",
  },
  {
    no: "02",
    title: "Credit Restoration",
    body: "A strong credit score unlocks better rates and bigger moves. Our restoration work is built to help you qualify for the home — and the future — you're after.",
    img: "/images/svc2.jpg",
    href: "/services/credit-restoration",
  },
  {
    no: "03",
    title: "Business Building",
    body: "Turn ideas into ventures. We give aspiring and existing owners the tools, resources, and guidance to start, grow, and scale effectively.",
    img: "/images/svc3.jpg",
    href: "/services/business-building",
  },
  {
    no: "04",
    title: "Mentorship For Starting A Business",
    body: "Personalized guidance and practical advice from entrepreneurs who've navigated the challenges of building successful businesses firsthand.",
    img: "/images/svc4.jpg",
    href: "/services/mentorship-for-starting-a-business",
  },
  {
    no: "05",
    title: "Consultation & Wealth Building",
    body: "Personalized consultation paired with strategic wealth-building tailored to your goals — the path to financial independence and long-term prosperity.",
    img: "/images/svc5.jpg",
    href: "/services/consultation-and-wealth-building",
  },
];

function Services() {
  return (
    <section id="services" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-end">
          <Reveal>
            <div>
              <Eyebrow>File No. 02 — Services</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.7rem]">
                Five distinct offerings.
                <br />
                One ascending ladder.
              </h2>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div
              className="border p-5"
              style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}
            >
              <span className="eyebrow" style={{ color: "var(--ink-45)" }}>
                The motif, transformed — a roofline
              </span>
              <AscendingLine variant="roofline" className="mt-3 h-28 w-full" />
            </div>
          </Reveal>
        </div>

        <div className="mt-12" style={{ borderTop: "1px solid var(--ledger-line)" }}>
          {SERVICES.map((s, i) => (
            <Reveal key={s.no} delay={i * 0.05}>
              <a
                href={s.href}
                className="group grid grid-cols-[5rem_1fr] items-center gap-5 border-b py-7 transition-colors hover:bg-[var(--ink-soft)] md:grid-cols-[5rem_7rem_1fr_auto] md:gap-8 md:px-2"
                style={{ borderColor: "var(--ledger-line)" }}
              >
                <span className="font-mono text-sm text-brass md:pt-1">
                  FILE {s.no}
                </span>
                <div className="relative hidden aspect-[4/3] overflow-hidden border md:block" style={{ borderColor: "var(--ledger-line)" }}>
                  <img
                    src={s.img}
                    alt={s.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[35%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight md:text-2xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
                    {s.body}
                  </p>
                </div>
                <span className="col-span-2 mt-1 inline-flex items-center gap-2 text-sm font-semibold text-brass md:col-span-1 md:pt-1">
                  Read More
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- BK AI Systems — affiliated resource insert ---------- */

function SystemsInsert() {
  return (
    <section id="systems" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <Reveal>
          <div
            className="relative border p-7 md:p-11"
            style={{ borderColor: "var(--brass)", background: "var(--ink-soft)" }}
          >
            {/* stamped tab */}
            <span
              className="absolute -top-3 left-8 px-3 font-mono text-[0.62rem] uppercase tracking-widest"
              style={{ background: "var(--ink)", color: "var(--brass)" }}
            >
              Affiliated Resource
            </span>

            {/* hairline top rule */}
            <div className="mb-7 h-px w-full" style={{ background: "var(--ledger-line)" }} />

            <div className="grid gap-8 md:grid-cols-[1.25fr_0.75fr] md:items-center md:gap-14">
              <div>
                <Eyebrow>File No. 06 — Systems</Eyebrow>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  Never miss a lead again.
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
                  Once your business is running, let it answer the phone for you too.
                  AI receptionists and GHL automation that respond instantly, capture
                  leads, and book customers around the clock — built by BK AI Systems.
                </p>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end md:text-right">
                <div className="md:text-right">
                  <span className="font-display text-lg font-semibold tracking-tight text-brass">
                    BK AI Systems
                  </span>
                  <div className="mt-1 font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
                    AI Reception · GHL Automation
                  </div>
                </div>
                <a
                  href="https://www.bkaisystems.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border px-5 py-3 text-sm font-semibold text-brass transition-colors hover:bg-brass hover:text-ink"
                  style={{ borderColor: "var(--brass)" }}
                >
                  Visit BK AI Systems <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* hairline bottom rule */}
            <div className="mt-8 h-px w-full" style={{ background: "var(--ledger-line)" }} />
          </div>
        </Reveal>
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- rental insert (lead capture) ---------- */

function RentalInsert() {
  const signup = useRentalSignup();
  const [form, setForm] = useState({ name: "", email: "", phone: "", area: "", consent: false });
  const done = signup.isSuccess;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.consent) return;
    signup.mutate({ ...form, consent: true });
  };

  return (
    <section id="rentals" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <Reveal>
          {/* the paper insert tucked into the ledger */}
          <div
            className="relative border-2 p-7 md:p-12 paper-grain"
            style={{ borderColor: "var(--brass)", color: "var(--ink)" }}
          >
            <span
              className="absolute -top-3 left-8 px-3 font-mono text-[0.62rem] uppercase tracking-widest"
              style={{ background: "var(--ink)", color: "var(--brass)" }}
            >
              Insert — Rental List
            </span>

            <div className="mb-9 aspect-[21/9] w-full overflow-hidden border" style={{ borderColor: "rgba(22,26,34,0.2)" }}>
              <img
                src="/images/rental.jpg"
                alt="Brick rowhouses and rental homes in Western Pennsylvania"
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
              <div>
                <span className="eyebrow" style={{ color: "var(--brick)" }}>
                  File No. 03 — Western Pennsylvania
                </span>
                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
                  Apartments & houses for rent in Western PA.
                </h2>
                <p className="mt-5 text-sm leading-relaxed" style={{ color: "rgba(22,26,34,0.72)" }}>
                  Local management, fair leasing, and practical living spaces. Clean
                  properties, clear terms, responsive communication. Fill out the
                  sign-up and get early access to our current list of available
                  apartments and houses.
                </p>
                <p className="mt-6 font-mono text-[0.68rem] uppercase tracking-widest" style={{ color: "rgba(22,26,34,0.5)" }}>
                  Individuals · Families · Working professionals
                </p>
              </div>

              {done ? (
                <div className="flex flex-col items-start justify-center">
                  <span className="font-mono text-xs uppercase tracking-widest text-brick">
                    Stamped — Received
                  </span>
                  <h3 className="mt-3 font-display text-2xl font-semibold" style={{ color: "var(--ink)" }}>
                    You're on the list.
                  </h3>
                  <p className="mt-2 text-sm" style={{ color: "rgba(22,26,34,0.72)" }}>
                    We'll be in touch with the current list of available rentals in
                    Western PA. Watch your inbox.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit} className="flex flex-col gap-4">
                  <InsertInput
                    label="Full name"
                    value={form.name}
                    onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                    required
                  />
                  <InsertInput
                    label="Email"
                    type="email"
                    value={form.email}
                    onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InsertInput
                      label="Phone"
                      value={form.phone}
                      onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                    />
                    <InsertInput
                      label="Area / city"
                      value={form.area}
                      onChange={(v) => setForm((f) => ({ ...f, area: v }))}
                    />
                  </div>
                  <label className="flex items-start gap-2 text-[0.68rem] leading-5" style={{ color: "rgba(22,26,34,0.65)" }}>
                    <input type="checkbox" required checked={form.consent} onChange={(e) => setForm((f) => ({ ...f, consent: e.target.checked }))} className="mt-1" />
                    <span>I agree that Chris B Hustling may contact me about rental availability. Message and data rates may apply for texts.</span>
                  </label>
                  {signup.isError && (
                    <p className="font-mono text-xs text-brick">
                      Something went wrong. Please try again.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={signup.isPending}
                    className="mt-1 inline-flex items-center justify-center gap-2 bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-60"
                  >
                    {signup.isPending ? "Submitting…" : "Get early access"}
                    {!signup.isPending && <ArrowRight size={16} />}
                  </button>
                </form>
              )}
            </div>
          </div>
        </Reveal>
      </div>
      <SectionRule />
    </section>
  );
}

function InsertInput({
  label,
  value,
  onChange,
  type = "text",
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "rgba(22,26,34,0.6)" }}>
        {label}
        {required && " *"}
      </span>
      <input
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
        className="border-b-2 bg-transparent py-2 text-sm outline-none transition-colors focus:border-brick"
        style={{ borderColor: "rgba(22,26,34,0.25)", color: "var(--ink)" }}
      />
    </label>
  );
}

/* ---------- why choose us ---------- */

const WHY = [
  {
    title: "Expertise & Experience",
    body: "Industry experts across real estate, finance, business development, and wealth management — practical knowledge and proven strategies in every interaction.",
  },
  {
    title: "Customized Solutions",
    body: "Every client has unique needs and goals. We tailor solutions to your specific requirements, whether buying your first home or launching a new venture.",
  },
  {
    title: "Commitment to Success",
    body: "Your success is our priority. We deliver exceptional service, foster long-term relationships, and help you reach your financial and personal aspirations.",
  },
  {
    title: "Holistic Approach",
    body: "We address both short-term objectives and long-term goals — an integrated strategy for sustainable wealth building and business development.",
  },
];

function Why() {
  return (
    <section id="why" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <div>
              <Eyebrow>File No. 04 — Why Choose Us</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold leading-tight tracking-tight md:text-[2.7rem]">
                Wealth, compounding.
              </h2>
              <p className="mt-5 text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
                We deliver exceptional service and value — here's why clients stay on
                the ladder with us.
              </p>
              <div
                className="mt-8 border p-5"
                style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}
              >
                <span className="eyebrow" style={{ color: "var(--ink-45)" }}>
                  The motif, transformed — compounding bars
                </span>
                <AscendingLine variant="bars" className="mt-3 h-32 w-full" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-x-10 sm:grid-cols-2" style={{ borderTop: "1px solid var(--ledger-line)" }}>
              {WHY.map((w) => (
                <div
                  key={w.title}
                  className="border-b py-7 sm:odd:pr-4 sm:even:pl-4"
                  style={{ borderColor: "var(--ledger-line)" }}
                >
                  <h3 className="font-display text-lg font-semibold tracking-tight text-brass">
                    {w.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
      <SectionRule />
    </section>
  );
}

/* ---------- blogs ---------- */

const BLOGS = [
  {
    date: "OCT 28, 2024",
    tag: "Credit",
    title: "How to Improve My Credit Score Quickly and Easily",
    excerpt:
      "A strong credit score is essential for accessing loans, better rates, and bigger opportunities. Here's where to start.",
    img: "/images/blog1.jpg",
    href: "/blog/how-to-improve-my-credit-score-quickly-and-easily",
  },
  {
    date: "SEP 25, 2024",
    tag: "Mentorship",
    title: "How to Find the Perfect Mentor for Your Business Start-Up",
    excerpt:
      "The right mentor can be a game changer in your entrepreneurial journey — providing guidance you can't get anywhere else.",
    img: "/images/blog2.jpg",
    href: "/blog/how-to-find-the-perfect-mentor-for-your-business-start-up",
  },
  {
    date: "AUG 20, 2024",
    tag: "Credit",
    title: "Boost Your Score: Credit Restoration at Chris B Hustling",
    excerpt:
      "Credit restoration is essential for anyone looking to improve their financial standing and unlock new opportunities.",
    img: "/images/blog3.jpg",
    href: "/blog/boost-your-score-credit-restoration-at-chris-b-hustling",
  },
];

function Blogs() {
  return (
    <section id="blogs" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Eyebrow>File No. 05 — Insights</Eyebrow>
              <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-[2.7rem]">
                Latest from the desk.
              </h2>
            </div>
            <a
              href="#blogs"
              className="cta-underline text-sm font-semibold text-brass"
            >
              View all
            </a>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-px sm:grid-cols-3" style={{ borderTop: "1px solid var(--ledger-line)" }}>
          {BLOGS.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08}>
              <a
                href={b.href}
                className="group flex h-full flex-col border-b py-7 sm:border-r sm:px-6 sm:last:border-r-0"
                style={{ borderColor: "var(--ledger-line)" }}
              >
                <div className="mb-5 aspect-[16/10] w-full overflow-hidden border" style={{ borderColor: "var(--ledger-line)" }}>
                  <img
                    src={b.img}
                    alt={b.title}
                    loading="lazy"
                    className="h-full w-full object-cover grayscale-[30%] transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[0.62rem] tracking-widest" style={{ color: "var(--ink-45)" }}>
                    {b.date}
                  </span>
                  <span className="eyebrow text-[0.58rem]" style={{ color: "var(--brick)" }}>
                    {b.tag}
                  </span>
                </div>
                <h3 className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight">
                  {b.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
                  {b.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brass">
                  Read More
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA band ---------- */

function CtaBand() {
  return (
    <section>
      <div style={{ background: "var(--ink-soft)", borderTop: "1px solid var(--ledger-line)", borderBottom: "1px solid var(--ledger-line)" }}>
        <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-6 px-5 py-14 md:flex-row md:items-center">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
            Ready to transform your financial future?
          </h2>
          <a
            href="#rentals"
            className="inline-flex shrink-0 items-center gap-2 bg-brass px-7 py-4 text-sm font-semibold text-ink transition-colors hover:bg-brass-lite"
          >
            Get Started <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- footer ---------- */

function Footer() {
  return (
    <footer id="contact" className="scroll-mt-24">
      <div className="mx-auto max-w-[1200px] px-5 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-5 max-w-sm text-sm leading-relaxed" style={{ color: "var(--ink-70)" }}>
              Your trusted partner in achieving financial freedom and success — from
              restored credit to generational wealth.
            </p>
          </div>

          <div>
            <span className="eyebrow" style={{ color: "var(--ink-45)" }}>
              Contact
            </span>
            <div className="mt-4 flex flex-col gap-2 font-mono text-sm" style={{ color: "var(--ink-70)" }}>
              <a href="mailto:info@chrisbhustling.com" className="cta-underline w-fit">
                info@chrisbhustling.com
              </a>
              <a href="tel:7242013759" className="cta-underline w-fit">
                724-201-3759
              </a>
              <span>579b Raritan Rd</span>
              <span>Roselle, NJ 07203</span>
            </div>
          </div>

          <div>
            <span className="eyebrow" style={{ color: "var(--ink-45)" }}>
              Explore
            </span>
            <div className="mt-4 flex flex-col gap-2 text-sm" style={{ color: "var(--ink-70)" }}>
              <a href="#services" className="cta-underline w-fit">Services</a>
              <a href="#blogs" className="cta-underline w-fit">Insights</a>
              <a href="/contact" className="cta-underline w-fit">Contact</a>
            </div>
          </div>
        </div>

        <div
          className="mt-14 flex flex-col items-start justify-between gap-2 pt-6 font-mono text-[0.68rem] uppercase tracking-widest sm:flex-row sm:items-center"
          style={{ borderTop: "1px solid var(--ledger-line)", color: "var(--ink-45)" }}
        >
          <span>© 2024 Chris B Hustling LLC. All rights reserved.</span>
          <span>Western PA · Roselle, NJ</span>
        </div>
      </div>
    </footer>
  );
}

/* ---------- page ---------- */

function Index() {
  return (
    <div className="min-h-screen" style={{ background: "var(--ink)" }}>
      <Header />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <SystemsInsert />
        <RentalInsert />
        <Why />
        <Blogs />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}

export default Index;

import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Logo } from "../components/logo";

const VALUES = ["Honesty", "Transparency", "Client-centered service", "Continuous improvement"];

export default function AboutPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--ink)", color: "#f4eee4" }}>
      <header className="border-b px-5 py-4" style={{ borderColor: "var(--ledger-line)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Logo href="/" />
          <Link href="/#about" className="inline-flex items-center gap-2 text-sm font-semibold text-brass"><ArrowLeft size={15} /> Back home</Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-[1100px] gap-10 px-5 py-14 md:grid-cols-[1.05fr_.95fr] md:items-center md:py-20">
          <div>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">File No. 01 — Our story</p>
            <h1 className="mt-5 font-display text-4xl font-semibold leading-tight tracking-tight text-[#f4eee4] md:text-6xl">Built to help people move forward.</h1>
            <p className="mt-6 text-lg leading-8 text-[#c5c0b7]">Welcome to Chris B Hustling, your trusted partner in pursuing financial freedom and lasting success. We empower individuals and businesses with practical knowledge, useful tools, and dedicated support across real estate, credit, entrepreneurship, mentorship, and wealth building.</p>
          </div>
          <div className="aspect-[4/3] overflow-hidden border" style={{ borderColor: "var(--ledger-line)" }}>
            <img src="/images/about/story.png" alt="Chris B Hustling business professionals" className="h-full w-full object-cover" />
          </div>
        </section>

        <section className="border-y" style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}>
          <div className="mx-auto max-w-[1100px] px-5 py-14 md:py-20">
            <div className="grid gap-7 md:grid-cols-2">
              <article className="group overflow-hidden border bg-[#171c24] transition-all duration-300 hover:-translate-y-1 hover:border-[#c99b40] hover:shadow-[0_18px_45px_rgba(0,0,0,.3)]" style={{ borderColor: "var(--ledger-line)" }}>
                <div className="h-56 overflow-hidden"><img src="/images/about/mission.jpg" alt="Team collaborating on a mission" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-7">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Our mission</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-[#f4eee4]">Empower through tailored support.</h2>
                  <p className="mt-4 leading-7 text-[#c5c0b7]">Our mission is to empower individuals and businesses through tailored solutions, innovative strategies, and unwavering support. We begin by understanding each client’s needs and goals, then apply experience, honesty, and continuous improvement to help them grow with confidence.</p>
                </div>
              </article>

              <article className="group overflow-hidden border bg-[#171c24] transition-all duration-300 hover:-translate-y-1 hover:border-[#c99b40] hover:shadow-[0_18px_45px_rgba(0,0,0,.3)]" style={{ borderColor: "var(--ledger-line)" }}>
                <div className="h-56 overflow-hidden"><img src="/images/about/vision.jpg" alt="Professionals planning for future growth" className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /></div>
                <div className="p-7">
                  <p className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-brass">Our vision</p>
                  <h2 className="mt-3 font-display text-3xl font-semibold text-[#f4eee4]">Be a catalyst for lasting growth.</h2>
                  <p className="mt-4 leading-7 text-[#c5c0b7]">We envision a future where people and businesses can turn ambitious goals into meaningful progress. Through trusted partnerships, integrity, innovation, and responsible leadership, we aim to create opportunities that help clients thrive in a changing business landscape.</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1100px] px-5 py-14 md:py-20">
          <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">What guides the work</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-[#f4eee4] md:text-4xl">Principles you can count on.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <div key={value} className="border bg-[#171c24] p-5 transition-colors hover:border-[#c99b40] hover:bg-[#1d232d]" style={{ borderColor: "var(--ledger-line)" }}>
                <span className="font-mono text-[0.65rem] text-brass">0{index + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-[#f4eee4]">{value}</h3>
              </div>
            ))}
          </div>
          <Link href="/contact" className="mt-10 inline-flex items-center gap-2 font-semibold text-brass">Start a conversation <ArrowRight size={16} /></Link>
        </section>
      </main>
    </div>
  );
}

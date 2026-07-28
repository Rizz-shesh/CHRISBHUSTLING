import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, useRoute } from "wouter";
import { Logo } from "../components/logo";
import { BLOG_POSTS, getBlogPost } from "../data/blog-posts";

export default function BlogPostPage() {
  const [, params] = useRoute("/blog/:slug");
  const post = getBlogPost(params?.slug ?? "");

  if (!post) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-5 text-ink">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-brass">404 — Article not found</p>
          <Link href="/#blogs" className="mt-6 inline-flex items-center gap-2 font-semibold text-brass">
            <ArrowLeft size={16} /> Back to Insights
          </Link>
        </div>
      </main>
    );
  }

  const related = BLOG_POSTS.filter((item) => item.slug !== post.slug);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b bg-ink px-5 py-4" style={{ borderColor: "rgba(255,255,255,.12)" }}>
        <div className="mx-auto flex max-w-[1200px] items-center justify-between">
          <Logo href="/" />
          <Link href="/#blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-brass">
            <ArrowLeft size={15} /> All insights
          </Link>
        </div>
      </header>

      <main>
        <article>
          <div className="mx-auto max-w-[900px] px-5 pb-12 pt-14 md:pb-16 md:pt-20">
            <div className="flex items-center gap-3 font-mono text-[0.68rem] uppercase tracking-[0.16em]">
              <span style={{ color: "var(--brick)" }}>{post.category}</span>
              <span style={{ color: "var(--ink-45)" }}>{post.date}</span>
            </div>
            <h1 className="mt-6 max-w-[820px] font-display text-4xl font-semibold leading-[1.08] tracking-tight text-[#f4eee4] md:text-6xl">
              {post.title}
            </h1>
          </div>

          <div className="mx-auto max-w-[1100px] px-5">
            <div className="aspect-[16/7] overflow-hidden border" style={{ borderColor: "var(--ledger-line)" }}>
              <img src={post.image} alt={post.title} className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="mx-auto max-w-[760px] px-5 py-14 md:py-20">
            {post.sections.map((section, index) => (
              <section key={`${section.heading ?? "intro"}-${index}`} className={index ? "mt-10" : ""}>
                {section.heading && (
                  <h2 className="mb-4 font-display text-2xl font-semibold leading-tight tracking-tight text-[#f4eee4] md:text-3xl">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="mt-4 text-base leading-8 md:text-lg" style={{ color: "var(--ink-70)" }}>
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            <div className="mt-14 border-y py-6" style={{ borderColor: "var(--ledger-line)" }}>
              <Link href="/contact" className="inline-flex items-center gap-2 font-semibold text-brass">
                Talk with Chris B Hustling <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </article>

        <aside className="border-t" style={{ borderColor: "var(--ledger-line)" }}>
          <div className="mx-auto max-w-[1000px] px-5 py-14">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-brass">Continue reading</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {related.map((item) => (
                <Link key={item.slug} href={`/blog/${item.slug}`} className="group border p-5" style={{ borderColor: "var(--ledger-line)" }}>
                  <span className="font-mono text-[0.65rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>{item.date}</span>
                  <h2 className="mt-2 font-display text-xl font-semibold leading-snug text-[#f4eee4] transition-colors group-hover:text-brass">{item.title}</h2>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}

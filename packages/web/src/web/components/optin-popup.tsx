import { useEffect, useRef, useState } from "react";
import { X, ArrowRight, CheckCircle2 } from "lucide-react";

const SESSION_KEY = "cbh_optin_seen";
const DELAY_MS = 8_000;
const EXIT_INTENT_ARM_DELAY_MS = 1_000;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "submitting" | "success" | "error";

/** Exit-intent / 8s-delay opt-in popup. Shows at most once per session. */
export function OptinPopup() {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);
  const shownRef = useRef(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const show = () => {
      if (shownRef.current) return;
      shownRef.current = true;
      sessionStorage.setItem(SESSION_KEY, "1");
      setOpen(true);
    };

    const timer = window.setTimeout(show, DELAY_MS);

    let armed = false;
    const armTimer = window.setTimeout(() => {
      armed = true;
    }, EXIT_INTENT_ARM_DELAY_MS);

    const onMouseLeave = (event: MouseEvent) => {
      if (armed && event.clientY <= 0) show();
    };
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(armTimer);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function close() {
    sessionStorage.setItem(SESSION_KEY, "1");
    setOpen(false);
  }

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!firstName.trim()) {
      setError("Please enter your first name.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setStatus("submitting");
    try {
      const res = await fetch("/api/optin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName: firstName.trim(), email: email.trim() }),
      });
      const data = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setError("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  if (!open) return null;

  const inputClass =
    "mt-2 w-full border bg-[#11161d] px-4 py-3 text-[#f4eee4] outline-none transition-colors placeholder:text-[#6f716f] focus:border-[#d3a33f]";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) close();
      }}
    >
      <div
        className="relative w-full max-w-md border bg-[#171c24] p-6 md:p-8"
        style={{ borderColor: "var(--ledger-line)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Stay in the loop"
      >
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-[#aaa69f] transition-colors hover:text-brass"
        >
          <X size={20} />
        </button>

        {status === "success" ? (
          <div className="flex min-h-56 flex-col items-center justify-center text-center">
            <CheckCircle2 size={38} className="text-brass" />
            <h2 className="mt-5 font-display text-2xl font-semibold text-[#f4eee4]">You're on the list.</h2>
            <p className="mt-3 leading-7 text-[#c5c0b7]">
              Thanks, {firstName.trim()}. Keep an eye on your inbox for updates from Chris B Hustling.
            </p>
            <button type="button" onClick={close} className="mt-6 text-sm font-semibold text-brass">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={submit}>
            <p className="font-mono text-[0.68rem] uppercase tracking-[0.2em] text-brass">Before you go</p>
            <h2 className="mt-3 font-display text-2xl font-semibold leading-tight text-[#f4eee4]">
              Stay in the loop.
            </h2>
            <p className="mt-3 leading-7 text-[#c5c0b7]">
              Get credit, real estate, and business-building tips from Chris B Hustling.
            </p>

            <label className="mt-5 block text-sm font-semibold text-[#ddd6ca]">
              First name
              <input
                required
                minLength={1}
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={inputClass}
              />
            </label>
            <label className="mt-4 block text-sm font-semibold text-[#ddd6ca]">
              Email address
              <input
                required
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={inputClass}
              />
            </label>

            {error && <p className="mt-4 text-sm text-[#e28d76]">{error}</p>}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 bg-brass px-6 py-3.5 text-sm font-semibold text-[#11161d] transition-colors hover:bg-[#e2b653] disabled:opacity-60"
            >
              {status === "submitting" ? "Submitting…" : "Keep me posted"} <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

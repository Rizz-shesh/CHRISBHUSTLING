import { type ReactNode, useState } from "react";
import {
  Check,
  Clock3,
  Download,
  LogOut,
  MapPin,
  RefreshCw,
  Send,
  Trash2,
  TrendingUp,
  Users,
} from "lucide-react";
import {
  useAdminLogin,
  usePushToGhl,
  useServiceInquiries,
  useDeleteServiceInquiry,
  useDeleteRentalSignup,
  useSignups,
  type AdminCreds,
} from "../queries/admin";

const STORAGE_KEY = "cbh_admin";

function loadCreds(): AdminCreds | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as AdminCreds) : null;
  } catch {
    return null;
  }
}

export default function AdminPage() {
  const [creds, setCreds] = useState<AdminCreds | null>(loadCreds);

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setCreds(null);
  };

  const onLogin = (c: AdminCreds) => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(c));
    setCreds(c);
  };

  if (!creds) {
    return (
      <div
        className="flex min-h-screen items-center justify-center px-5 py-10"
        style={{ background: "var(--ink)" }}
      >
        <LoginForm onLogin={onLogin} />
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--ink)" }}>
      <div className="mx-auto max-w-[1100px] px-5 py-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="eyebrow inline-flex items-center gap-2 text-brass">
              <span className="inline-block h-px w-6 bg-brass" />
              Admin Ledger
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
              Lead Inbox
            </h1>
          </div>
          <button
            onClick={logout}
            className="inline-flex items-center gap-2 border px-4 py-2 text-sm font-semibold text-brass transition-colors hover:bg-brass hover:text-ink"
            style={{ borderColor: "var(--brass)" }}
          >
            <LogOut size={15} /> Log out
          </button>
        </div>

        <div className="mt-8 h-px w-full" style={{ background: "var(--ledger-line)" }} />

        <Dashboard creds={creds} onUnauthorized={logout} />
      </div>
    </div>
  );
}

/* ---------- login ---------- */

function LoginForm({ onLogin }: { onLogin: (c: AdminCreds) => void }) {
  const login = useAdminLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    login.mutate(
      { username, password },
      { onSuccess: () => onLogin({ username, password }) },
    );
  };

  return (
    <div className="w-full max-w-sm">
      <form
        onSubmit={submit}
        className="border p-7"
        style={{ borderColor: "var(--ledger-line)", background: "var(--ink-soft)" }}
      >
        <span className="font-mono text-[0.62rem] uppercase tracking-widest text-brass">
          Restricted — sign in
        </span>
        <div className="mt-5 flex flex-col gap-4">
          <Field label="Username" value={username} onChange={setUsername} />
          <Field label="Password" type="password" value={password} onChange={setPassword} />
        </div>
        {login.isError && (
          <p className="mt-4 font-mono text-xs text-brick">
            Invalid credentials. Try again.
          </p>
        )}
        <button
          type="submit"
          disabled={login.isPending}
          className="mt-6 w-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {login.isPending ? "Checking…" : "Enter"}
        </button>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
        {label}
      </span>
      <input
        type={type}
        value={value}
        required
        onChange={(e) => onChange(e.target.value)}
        className="border-b-2 bg-transparent py-2 text-sm outline-none transition-colors focus:border-brass"
        style={{ borderColor: "var(--ledger-line)", color: "var(--paper)" }}
      />
    </label>
  );
}

/* ---------- dashboard ---------- */

function Dashboard({
  creds,
  onUnauthorized,
}: {
  creds: AdminCreds;
  onUnauthorized: () => void;
}) {
  const query = useSignups(creds);
  const serviceQuery = useServiceInquiries(creds);
  const deleteService = useDeleteServiceInquiry();
  const deleteRental = useDeleteRentalSignup();
  const [activeTab, setActiveTab] = useState<"services" | "rentals">("services");

  // If credentials became invalid server-side, drop back to login.
  if (query.isError) {
    const msg = (query.error as { message?: string })?.message ?? "";
    if (/unauthorized|credentials/i.test(msg)) {
      setTimeout(onUnauthorized, 0);
    }
  }

  const rows = query.data ?? [];
  const serviceRows = serviceQuery.data ?? [];

  // ----- dashboard metrics -----
  const now = Date.now();
  const WEEK = 7 * 24 * 60 * 60 * 1000;
  const allRows = [...rows, ...serviceRows];
  const total = allRows.length;
  const pushed = allRows.filter((r) => !!r.pushedToGhlAt).length;
  const pending = total - pushed;
  const last7 = allRows.filter((r) => now - new Date(r.createdAt).getTime() <= WEEK).length;

  const topArea = (() => {
    const counts = new Map<string, number>();
    for (const r of rows) {
      const a = (r.area || "").trim();
      if (!a) continue;
      counts.set(a, (counts.get(a) ?? 0) + 1);
    }
    let best = "";
    let bestN = 0;
    for (const [a, n] of counts) {
      if (n > bestN) {
        best = a;
        bestN = n;
      }
    }
    return best ? { area: best, n: bestN } : null;
  })();

  const exportCsv = () => {
    const header = ["Name", "Email", "Phone", "Area", "Date"];
    const lines = rows.map((r) =>
      [r.name, r.email, r.phone ?? "", r.area ?? "", new Date(r.createdAt).toISOString()]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(","),
    );
    const csv = [header.join(","), ...lines].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `rental-signups-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="order-2 mt-8 flex border-b" style={{ borderColor: "var(--ledger-line)" }}>
        <button type="button" onClick={() => setActiveTab("services")} className={`border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${activeTab === "services" ? "border-brass text-brass" : "border-transparent text-[#8f908d] hover:text-paper"}`}>
          Consultation Inquiries <span className="ml-2 font-mono text-xs">{serviceRows.length}</span>
        </button>
        <button type="button" onClick={() => setActiveTab("rentals")} className={`border-b-2 px-5 py-3 text-sm font-semibold transition-colors ${activeTab === "rentals" ? "border-brass text-brass" : "border-transparent text-[#8f908d] hover:text-paper"}`}>
          Rental Housing <span className="ml-2 font-mono text-xs">{rows.length}</span>
        </button>
      </div>

      <div className={`${activeTab === "services" ? "block" : "hidden"} order-3 mt-8 mb-10`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brass">All service submissions</span>
            <h2 className="mt-2 font-display text-2xl font-semibold text-paper">Five consultations plus rental housing</h2>
          </div>
          <button onClick={() => serviceQuery.refetch()} className="inline-flex items-center gap-2 text-sm font-semibold text-brass">
            <RefreshCw size={14} className={serviceQuery.isFetching ? "animate-spin" : ""} /> Refresh
          </button>
        </div>
        <div className="mt-5 overflow-x-auto border" style={{ borderColor: "var(--ledger-line)" }}>
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead><tr className="font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
              {['Name', 'Service', 'Contact', 'Preference', 'Message', 'Date', 'GHL', ''].map((label, index) => <th key={`${label}-${index}`} className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>{label}</th>)}
            </tr></thead>
            <tbody>
              {serviceRows.map((row) => (
                <tr key={row.id} className="align-top" style={{ color: "var(--ink-70)" }}>
                  <td className="border-b px-4 py-3 font-medium text-paper" style={{ borderColor: "var(--ledger-line)" }}>{row.name}</td>
                  <td className="border-b px-4 py-3 text-brass" style={{ borderColor: "var(--ledger-line)" }}>{row.serviceTitle}</td>
                  <td className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}><a href={`mailto:${row.email}`} className="text-brass">{row.email}</a><br /><a href={`tel:${row.phone}`} className="font-mono text-xs">{row.phone}</a></td>
                  <td className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>{row.preferredContact}</td>
                  <td className="max-w-xs border-b px-4 py-3 leading-6" style={{ borderColor: "var(--ledger-line)" }}>{row.message || '—'}</td>
                  <td className="border-b px-4 py-3 font-mono text-xs" style={{ borderColor: "var(--ledger-line)" }}>{new Date(row.createdAt).toLocaleDateString()}</td>
                  <td className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>{row.pushedToGhlAt ? <span className="inline-flex items-center gap-1 text-brass"><Check size={13} /> Synced</span> : <span className="text-brick" title={row.ghlError || 'Webhook not configured'}>Pending</span>}</td>
                  <td className="border-b px-4 py-3 text-right" style={{ borderColor: "var(--ledger-line)" }}><button type="button" disabled={deleteService.isPending} onClick={() => { if (window.confirm(`Delete ${row.name}'s ${row.serviceTitle} inquiry? This cannot be undone.`)) deleteService.mutate({ ...creds, id: row.id }, { onSuccess: () => serviceQuery.refetch() }); }} className="inline-flex items-center gap-1 text-xs text-brick hover:text-[#f0a18b] disabled:opacity-50"><Trash2 size={14} /> Delete</button></td>
                </tr>
              ))}
              {!serviceQuery.isLoading && serviceRows.length === 0 && <tr><td colSpan={8} className="px-4 py-10 text-center" style={{ color: "var(--ink-45)" }}>No consultation inquiries yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className={`${activeTab === "rentals" ? "block" : "hidden"} order-3 mt-8 mb-4`}><span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-brass">Service 06 — Rental housing inquiries</span></div>
      {/* ---------- metric cards ---------- */}
      <div className="order-1 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          icon={<Users size={16} />}
          label="Total leads"
          value={total}
          hint="All-time signups"
        />
        <StatCard
          icon={<Clock3 size={16} />}
          label="New this week"
          value={last7}
          hint="Last 7 days"
        />
        <StatCard
          icon={<Check size={16} />}
          label="Pushed to GHL"
          value={pushed}
          hint={total ? `${Math.round((pushed / total) * 100)}% of leads` : "—"}
        />
        <StatCard
          icon={<Send size={16} />}
          label="Pending push"
          value={pending}
          hint={pending ? "Awaiting sync" : "All synced"}
          accent={pending > 0}
        />
      </div>

      {topArea && activeTab === "rentals" && (
        <div
          className="order-3 mt-4 flex items-center gap-3 border px-4 py-3"
          style={{ borderColor: "var(--ledger-line)" }}
        >
          <span className="text-brass">
            <MapPin size={15} />
          </span>
          <span className="font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
            Top area
          </span>
          <span className="text-sm font-medium text-paper">{topArea.area}</span>
          <span className="font-mono text-xs" style={{ color: "var(--ink-45)" }}>
            {topArea.n} lead{topArea.n === 1 ? "" : "s"}
          </span>
        </div>
      )}

      <div className={`${activeTab === "rentals" ? "flex" : "hidden"} order-3 mt-8 flex-wrap items-center justify-between gap-4`}>
        <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
          <TrendingUp size={13} className="text-brass" />
          {query.isLoading ? "Loading…" : `${rows.length} total`}
        </span>
        <div className="flex items-center gap-3">
          <button
            onClick={() => query.refetch()}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brass"
          >
            <RefreshCw size={14} className={query.isFetching ? "animate-spin" : ""} /> Refresh
          </button>
          <button
            onClick={exportCsv}
            disabled={rows.length === 0}
            className="inline-flex items-center gap-2 bg-brass px-4 py-2 text-sm font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            <Download size={15} /> Export CSV
          </button>
        </div>
      </div>

      <div className={`${activeTab === "rentals" ? "block" : "hidden"} order-3 mt-6 overflow-x-auto border`} style={{ borderColor: "var(--ledger-line)" }}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="font-mono text-[0.62rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>Name</th>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>Email</th>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>Phone</th>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>Area</th>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>Date</th>
              <th className="border-b px-4 py-3 text-right" style={{ borderColor: "var(--ledger-line)" }}>GHL</th>
              <th className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }} />
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} style={{ color: "var(--ink-70)" }}>
                <td className="border-b px-4 py-3 font-medium text-paper" style={{ borderColor: "var(--ledger-line)" }}>
                  {r.name}
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>
                  <a href={`mailto:${r.email}`} className="cta-underline text-brass">{r.email}</a>
                </td>
                <td className="border-b px-4 py-3 font-mono text-xs" style={{ borderColor: "var(--ledger-line)" }}>
                  {r.phone || "—"}
                </td>
                <td className="border-b px-4 py-3" style={{ borderColor: "var(--ledger-line)" }}>
                  {r.area || "—"}
                </td>
                <td className="border-b px-4 py-3 font-mono text-xs" style={{ borderColor: "var(--ledger-line)" }}>
                  {new Date(r.createdAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="border-b px-4 py-3 text-right" style={{ borderColor: "var(--ledger-line)" }}>
                  <GhlCell
                    creds={creds}
                    id={r.id}
                    pushedAt={r.pushedToGhlAt}
                    onPushed={() => query.refetch()}
                  />
                </td>
                <td className="border-b px-4 py-3 text-right" style={{ borderColor: "var(--ledger-line)" }}><button type="button" disabled={deleteRental.isPending} onClick={() => { if (window.confirm(`Delete ${r.name}'s rental inquiry? This cannot be undone.`)) deleteRental.mutate({ ...creds, id: r.id }, { onSuccess: () => query.refetch() }); }} className="inline-flex items-center gap-1 text-xs text-brick hover:text-[#f0a18b] disabled:opacity-50"><Trash2 size={14} /> Delete</button></td>
              </tr>
            ))}
            {!query.isLoading && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-10 text-center" style={{ color: "var(--ink-45)" }}>
                  No signups yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ---------- metric card ---------- */

function StatCard({
  icon,
  label,
  value,
  hint,
  accent,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  hint?: string;
  accent?: boolean;
}) {
  return (
    <div
      className="border px-5 py-4"
      style={{
        borderColor: accent ? "var(--brass)" : "var(--ledger-line)",
        background: accent ? "rgba(184,147,74,0.06)" : "transparent",
      }}
    >
      <div className="flex items-center gap-2 text-brass">
        {icon}
        <span className="font-mono text-[0.6rem] uppercase tracking-widest" style={{ color: "var(--ink-45)" }}>
          {label}
        </span>
      </div>
      <div className="mt-3 font-display text-4xl font-semibold tracking-tight text-paper">
        {value}
      </div>
      {hint && (
        <div className="mt-1 font-mono text-[0.62rem] tracking-wide" style={{ color: "var(--ink-45)" }}>
          {hint}
        </div>
      )}
    </div>
  );
}

/* ---------- per-row GHL push ---------- */

function GhlCell({
  creds,
  id,
  pushedAt,
  onPushed,
}: {
  creds: AdminCreds;
  id: number;
  pushedAt: Date | string | null;
  onPushed: () => void;
}) {
  const push = usePushToGhl();
  const alreadyPushed = !!pushedAt;

  if (alreadyPushed && !push.isError) {
    return (
      <span
        className="inline-flex items-center gap-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-brass"
        title={`Pushed ${new Date(pushedAt as string | Date).toLocaleString()}`}
      >
        <Check size={13} /> Pushed
      </span>
    );
  }

  return (
    <span className="inline-flex flex-col items-end gap-1">
      <button
        onClick={() =>
          push.mutate(
            { ...creds, id },
            { onSuccess: () => onPushed() },
          )
        }
        disabled={push.isPending}
        className="inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[0.62rem] uppercase tracking-widest text-brass transition-colors hover:bg-brass hover:text-ink disabled:opacity-50"
        style={{ borderColor: "var(--brass)" }}
      >
        <Send size={12} /> {push.isPending ? "Pushing…" : "Push to GHL"}
      </button>
      {push.isError && (
        <span className="max-w-[13rem] text-right font-mono text-[0.58rem] leading-tight text-brick">
          {(push.error as { message?: string })?.message ?? "Push failed."}
        </span>
      )}
    </span>
  );
}

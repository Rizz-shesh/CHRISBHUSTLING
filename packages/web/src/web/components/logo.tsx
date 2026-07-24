/**
 * Brand logo — Chris B Hustling horizontal roofline lockup.
 */
export function Logo({ className = "", href = "#top" }: { className?: string; href?: string }) {
  return (
    <a
      href={href}
      className={`inline-flex items-center ${className}`}
      aria-label="Chris B Hustling — home"
    >
      <img
        src="/images/logo-horizontal.png"
        alt="Chris B Hustling"
        className="h-11 w-auto md:h-12"
      />
    </a>
  );
}

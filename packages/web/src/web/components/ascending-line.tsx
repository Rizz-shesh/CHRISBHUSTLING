import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";

type Variant = "hero" | "roofline" | "bars";

/**
 * The signature ascending brass line. One motif, three meanings:
 * - hero:     a credit-score-style ascending line chart
 * - roofline: the same line transformed into the roofline of a house
 * - bars:     the same ascent expressed as compounding bars
 * On scroll into view the line draws itself once, left-to-right (pen signing).
 * prefers-reduced-motion => rendered already drawn.
 */
export function AscendingLine({
  variant = "hero",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const reduce = useReducedMotion();
  const draw = reduce ? true : inView;

  const stroke = "var(--brass)";
  const faint = "var(--ledger-line)";

  // shared ascending path points (viewBox 0 0 600 200)
  const linePath = "M0 178 L96 158 L192 168 L288 116 L384 128 L480 70 L600 22";
  const dots = [
    [96, 158],
    [192, 168],
    [288, 116],
    [384, 128],
    [480, 70],
    [600, 22],
  ];

  const transition = { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 200"
      fill="none"
      preserveAspectRatio="none"
      className={className}
      aria-hidden="true"
    >
      {/* faint ledger baseline */}
      <line x1="0" y1="199" x2="600" y2="199" stroke={faint} strokeWidth="1" />

      {variant === "hero" && (
        <>
          {/* faint ruled grid */}
          {[40, 80, 120, 160].map((y) => (
            <line
              key={y}
              x1="0"
              y1={y}
              x2="600"
              y2={y}
              stroke={faint}
              strokeWidth="0.75"
              strokeDasharray="2 6"
              opacity="0.5"
            />
          ))}
          <motion.path
            d={linePath}
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={transition}
          />
          {dots.map(([x, y], i) => (
            <motion.circle
              key={i}
              cx={x}
              cy={y}
              r="4"
              fill="var(--ink)"
              stroke={stroke}
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: draw ? 1 : 0,
                opacity: draw ? 1 : 0,
              }}
              transition={{ delay: reduce ? 0 : 0.9 + i * 0.12, duration: 0.3 }}
              style={{ transformOrigin: `${x}px ${y}px` }}
            />
          ))}
        </>
      )}

      {variant === "roofline" && (
        <>
          {/* the ascending line becomes a pitched roof + house */}
          <motion.path
            d="M20 150 L300 40 L580 150"
            stroke={stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={transition}
          />
          <motion.path
            d="M70 150 L70 190 M530 150 L530 190 M70 190 L530 190"
            stroke={faint}
            strokeWidth="1.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={{ ...transition, delay: reduce ? 0 : 0.6 }}
          />
          {/* door */}
          <motion.rect
            x="270"
            y="150"
            width="60"
            height="40"
            stroke={stroke}
            strokeWidth="1.5"
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: draw ? 1 : 0 }}
            transition={{ delay: reduce ? 0 : 1.4, duration: 0.4 }}
          />
        </>
      )}

      {variant === "bars" && (
        <>
          {[
            [40, 150],
            [140, 120],
            [240, 132],
            [340, 84],
            [440, 92],
            [540, 34],
          ].map(([x, y], i) => (
            <motion.rect
              key={i}
              x={x}
              y={y}
              width="44"
              height={190 - y}
              fill={i >= 4 ? stroke : "var(--ledger-line)"}
              opacity={i >= 4 ? 1 : 0.6}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: draw ? 1 : 0 }}
              transition={{
                delay: reduce ? 0 : i * 0.12,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ transformOrigin: `${x}px 190px` }}
            />
          ))}
          <motion.path
            d="M62 150 L162 120 L262 132 L362 84 L462 92 L562 34"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: draw ? 1 : 0 }}
            transition={{ ...transition, delay: reduce ? 0 : 0.5 }}
          />
        </>
      )}
    </svg>
  );
}

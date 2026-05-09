import Link from "next/link";
import { useMemo, useState } from "react";

import { useHydratedActualPath } from "./useHydratedActualPath";

const SCREENS = [
  { href: "/work/actual", label: "1. First time ever" },
  { href: "/work/actual/onboarding-2", label: "2. Processing" },
  { href: "/work/actual/adr", label: "3. Decisions (repos)" },
  { href: "/work/actual/adr/on-prem", label: "4. ADR — In review" },
  { href: "/work/actual/adr/web-platform", label: "5. ADR — Synced" },
  { href: "/work/actual/adr/agents-runtime", label: "6. ADR — Changes" },
  { href: "/work/actual/adr/design-system", label: "7. ADR — Draft" },
];

function resolveScreenHref(path) {
  const sorted = [...SCREENS].sort((a, b) => b.href.length - a.href.length);
  return sorted.find(
    (s) => path === s.href || path.startsWith(`${s.href}/`)
  )?.href;
}

export default function ScreenSwitcher() {
  const { path } = useHydratedActualPath();
  const [open, setOpen] = useState(false);

  const activeHref = useMemo(() => (path ? resolveScreenHref(path) : undefined), [path]);

  const current = useMemo(() => {
    if (!path) return "Screen switcher";
    const hit = SCREENS.find((s) => s.href === activeHref);
    return hit?.label ?? "Screen switcher";
  }, [path, activeHref]);

  const isActive = (href) => Boolean(path) && href === activeHref;

  return (
    <div className="fixed bottom-4 right-4 z-50 font-inter max-[380px]:left-4 max-[380px]:right-4">
      {open && (
        <div className="mb-2 max-h-[70vh] w-[260px] max-[380px]:w-full overflow-y-auto rounded-xl border border-[#1f2937] bg-[#0f172a] text-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 px-3 py-2">
            <span className="text-typ-helper font-semibold uppercase tracking-[0.18em] text-white/60">
              Prototype
            </span>
            <Link
              href="/"
              className="text-typ-helper text-white/60 hover:text-white"
            >
              ← Portfolio
            </Link>
          </div>
          <ul className="flex flex-col py-1">
            {SCREENS.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className={[
                    "flex items-center justify-between px-3 py-2 text-typ-body",
                    isActive(s.href)
                      ? "bg-white/10 text-white"
                      : "text-white/70 hover:bg-white/5 hover:text-white",
                  ].join(" ")}
                >
                  {s.label}
                  {isActive(s.href) && (
                    <span className="text-typ-helper uppercase tracking-wider text-emerald-300">
                      Now
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex max-w-full items-center gap-2 rounded-full bg-[#0f172a] px-4 py-2.5 text-left text-typ-helper font-medium text-white shadow-lg ring-1 ring-white/10 hover:bg-[#1e293b]"
      >
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#047857] ring-2 ring-[#047857]/30" />
        <span className="truncate">{current}</span>
      </button>
    </div>
  );
}

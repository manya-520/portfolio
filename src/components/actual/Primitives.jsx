import Link from "next/link";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  GitBranchIcon,
  PlusIcon,
} from "./Icons";

export function StatusChip({ children, tone = "pending" }) {
  const styles =
    tone === "running"
      ? "bg-[#0043CE]/10 border-[#0043CE]/25 text-[#0043CE]"
      : tone === "success"
      ? "bg-[#ecfdf5] border-[#d1fae5] text-[#047857]"
      : tone === "warning"
      ? "bg-[#fff7ed] border-[#fed7aa] text-[#c2410c]"
      : "bg-[#eff3f8] border-[#dfe4ed] text-[rgba(107,114,128,0.9)]";
  return (
    <span
      className={`inline-flex h-6 items-center justify-center rounded-lg border px-2 text-typ-body font-medium ${styles}`}
    >
      {children}
    </span>
  );
}

export function Tag({ children }) {
  return (
    <span className="inline-flex h-8 items-center rounded-lg border border-[#e4e4e7] bg-white px-3 text-typ-body font-medium text-[#52525b]">
      {children}
    </span>
  );
}

/** Neutral pill used on repo cards (“Browse by category”). */
export function BrowseCategoryChip({ className = "" }) {
  return (
    <span
      className={[
        "inline-flex max-w-[min(100%,12rem)] shrink-0 items-center truncate rounded-md border border-[#e4e4e7] bg-[#f9fafb] px-2.5 py-1.5 text-typ-body font-medium text-[#0f172a]",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      Browse by category
    </span>
  );
}

export function Dropdown({ label, className = "" }) {
  return (
    <div
      className={`flex h-9 items-center gap-2 rounded-lg border border-[#dfe4ed] bg-white px-3 text-typ-body font-normal text-black ${className}`}
    >
      <span className="flex-1 truncate">{label}</span>
      <ChevronDownIcon size={16} className="text-[#94a3b8]" />
    </div>
  );
}

/** Dashed “generating” region with a light sweep shimmer. */
export function GeneratingStatePanel({ text = "Generating Decisions" }) {
  return (
    <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg border border-dashed border-[#dfe4ed] bg-[#f9fafb] px-3 py-6">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full animate-actual-shimmer bg-gradient-to-r from-transparent via-white/85 to-transparent"
        aria-hidden
      />
      <span className="relative z-[1] text-typ-body font-normal text-[#64748b]">
        {text}
      </span>
    </div>
  );
}

export function RepoCardEmpty({ owner = "actual-software", repo = "on-prem" }) {
  return (
    <div className="flex h-full min-h-[140px] w-full min-w-0 flex-col gap-5 rounded-lg border border-[#dfe4ed] bg-white p-5">
      <div className="flex shrink-0 items-center gap-2">
        <GitBranchIcon size={18} className="text-[#475569]" />
        <p className="truncate text-typ-body font-normal">
          <span className="text-[#64748b]">{owner}/</span>
          <span className="font-semibold text-black">{repo}</span>
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col">
        <GeneratingStatePanel />
      </div>
    </div>
  );
}

export function RepoCardStats({ owner, repo, stats, action }) {
  return (
    <div className="flex h-full min-h-[140px] w-full min-w-0 flex-col gap-5 rounded-lg border border-[#dfe4ed] bg-white p-5">
      <div className="flex shrink-0 items-center gap-2">
        <GitBranchIcon size={18} className="text-[#475569]" />
        <p className="truncate text-typ-body font-normal">
          <span className="text-[#64748b]">{owner}/</span>
          <span className="font-semibold text-black">{repo}</span>
        </p>
      </div>
      <div className="flex min-h-0 flex-1 flex-col justify-center">
        <div className="grid grid-cols-3 gap-4 sm:gap-5">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col gap-1.5">
              <span className="text-typ-body font-semibold tabular-nums tracking-tight text-black">
                {s.value}
              </span>
              <span className="text-typ-body font-normal text-[#64748b]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-auto shrink-0 border-t border-[#f1f5f9] pt-4">{action}</div>
    </div>
  );
}

export function ActionLink({ children, onClick, href }) {
  /** Figma / Carbon-style link blue */
  const className =
    "inline-flex items-center gap-1 whitespace-nowrap text-typ-body font-semibold text-actual-accent underline-offset-2 hover:underline";
  if (href) {
    return (
      <Link href={href} className={className}>
        {children}
        <ArrowRightIcon size={12} className="shrink-0" />
      </Link>
    );
  }
  return (
    <button type="button" onClick={onClick} className={className}>
      {children}
      <ArrowRightIcon size={12} />
    </button>
  );
}

export function PrimaryButton({ children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#0f172a] px-4 text-typ-body font-medium text-white hover:bg-[#1e293b]"
    >
      <PlusIcon size={16} />
      {children}
    </button>
  );
}

export function GhostButton({ children, ...rest }) {
  return (
    <button
      type="button"
      {...rest}
      className="inline-flex h-9 items-center justify-center gap-2 rounded-md border border-[#dfe4ed] bg-white px-3 text-typ-body font-medium text-[#0f172a] hover:bg-[#f8fafc]"
    >
      {children}
    </button>
  );
}

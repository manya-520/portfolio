import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpDown,
  ArrowUpRight,
  Clock,
  GalleryVertical,
  Info,
  ListFilter,
  LoaderCircle,
  Plus,
  Search,
} from "lucide-react";

import { Tag } from "@/components/actual/Primitives";
import { ADRS, adrWorkspaceHref } from "@/data/actualAdrs";
import { cn } from "@/lib/utils";

import ADRDetailPanel from "./ADRDetailPanel";

function ContextSyncBanner({ syncBanner }) {
  const phase = syncBanner?.phase;
  const startedAt = syncBanner?.startedAt;

  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (phase !== "syncing" || typeof startedAt !== "number") return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [phase, startedAt]);

  const seconds = useMemo(() => {
    if (phase !== "syncing" || typeof startedAt !== "number") return 0;
    const s = Math.floor((now - startedAt) / 1000);
    return Math.max(0, Math.min(3, s));
  }, [now, phase, startedAt]);

  if (!phase) return null;

  if (phase === "review") {
    return (
      <div className="w-full rounded-lg bg-[#eaf2ff]">
        <div className="flex w-full items-center gap-2 rounded-lg border border-[#dbeafe] px-4 py-3">
          <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-typ-body font-semibold text-[#0043ce]">
              Review your PR
            </span>
            <span className="text-typ-body font-normal text-black">
              Your pull request is ready. Merge it to update your context files
              with your latest decisions.
            </span>
          </div>
          <div className="flex shrink-0 items-center self-stretch border-l border-[#dfe4ed] pl-4">
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-1.5 text-typ-body font-semibold text-[#0043ce] underline underline-offset-2 hover:text-[#00339a]"
            >
              Review PR
              <ArrowUpRight size={18} className="shrink-0" strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-lg bg-[#eaf2ff]">
      <div className="flex w-full items-center gap-2 rounded-lg border border-[#dbeafe] px-4 py-3">
        <LoaderCircle
          size={16}
          className="shrink-0 text-[#0043ce] animate-spin"
          strokeWidth={2}
          aria-hidden
        />
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-x-2 gap-y-1">
          <span className="text-typ-body font-semibold text-[#0043ce]">
            Syncing in progress
          </span>
          <span className="text-typ-body font-normal text-black">
            Your recent changes to decisions are being processed. Your PR will
            be ready for review shortly.
          </span>
          <Info
            size={16}
            className="shrink-0 text-[#0043ce]"
            strokeWidth={2}
            aria-hidden
          />
        </div>
        <div className="flex h-6 shrink-0 items-center border-l border-[#dfe4ed] pl-4">
          <span className="text-typ-body font-normal text-[#64748b]">
            Started {seconds}s ago
          </span>
        </div>
      </div>
    </div>
  );
}

/**
 * Figma Deck master-detail (`903:6469` region): left ADR cards, top tabs + toolbar,
 * right Policy / Scope / Explanation detail.
 */
export default function ADRWorkspaceView({
  selectedAdrId,
  adr,
  listAdrs,
  repoStats,
  syncBanner,
  resolvedScopePaths,
  scopeEdit,
}) {
  let sidebarAdrs =
    listAdrs?.length > 0 ? listAdrs : ADRS.filter((a) => a.repo === adr?.repo);
  if (!sidebarAdrs.length && adr) sidebarAdrs = [adr];
  const decisionsCount = repoStats?.Decisions ?? sidebarAdrs.length;
  const suggestedCount = repoStats?.Suggested ?? 0;
  const updatesCount = repoStats?.Updates ?? 0;

  const statusChip =
    syncBanner?.phase === "syncing"
      ? {
          dot: "bg-[#0043ce]",
          className: "border-[#dbeafe] bg-[#eaf2ff] text-[#0043ce]",
          label: "Syncing",
        }
      : syncBanner?.phase === "review"
        ? {
            dot: "bg-[#0043ce]",
            className: "border-[#dbeafe] bg-[#eaf2ff] text-[#0043ce]",
            label: "Action required",
          }
        : {
            dot: "bg-[#047857]",
            className: "border-[#bbf7d0] bg-[#ecfdf5] text-[#047857]",
            label: "Context files in sync",
          };

  return (
    <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-6 pb-8 pt-6">
      <header className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-typ-header font-semibold text-actual-welcome">
            Architecture Decision Records
          </h1>
          <span
            className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-0.5 text-typ-body font-semibold ${statusChip.className}`}
          >
            <span className={`h-2 w-2 shrink-0 rounded-full ${statusChip.dot}`} />
            {statusChip.label}
          </span>
        </div>

        <ContextSyncBanner syncBanner={syncBanner} />

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <nav
            role="tablist"
            aria-label="ADR collections"
            className="-mx-6 flex min-h-[44px] min-w-0 flex-1 items-end overflow-x-auto border-b border-[#e2e8f0] px-6 sm:mx-0 sm:px-0 lg:min-h-[48px]"
          >
            {[
              ["Decisions", decisionsCount],
              ["Suggested", suggestedCount],
              ["Updates", updatesCount],
              ["Drafts", 0],
              ["Archived", null],
            ].map(([label, count], i) => {
              const selected = i === 0;
              return (
                <button
                  key={label}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    "-mb-px flex min-h-[44px] min-w-[56px] flex-1 items-center justify-center gap-2 px-3 pb-3 pt-2 text-[11px] font-semibold leading-none tracking-tight transition-colors sm:px-5 lg:min-h-[48px] lg:px-7",
                    "border-b-2",
                    selected
                      ? "border-actual-ink text-actual-ink"
                      : "border-transparent text-actual-muted2 hover:text-actual-ink"
                  )}
                >
                  <span className="truncate">{label}</span>
                  {count != null ? (
                    <span className="inline-flex h-5 min-w-[20px] shrink-0 items-center justify-center rounded-full bg-[#dfe4ed] px-1 text-[10px] font-medium tabular-nums leading-none text-actual-ink">
                      {count}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2 lg:h-10 lg:shrink-0 lg:flex-nowrap lg:items-center">
            <div className="flex h-10 min-w-[180px] flex-1 items-center gap-2 rounded border border-[#dfe4ed] bg-white px-3 lg:max-w-[240px]">
              <Search size={16} className="shrink-0 text-actual-ghost" strokeWidth={2} />
              <input
                type="search"
                placeholder="Search"
                className="min-w-0 flex-1 bg-transparent text-typ-body text-actual-ink placeholder:text-actual-ghost focus:outline-none"
              />
            </div>
            <button
              type="button"
              aria-label="Sort"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#dfe4ed] bg-white text-actual-muted2 hover:bg-[#f9fafb]"
            >
              <ArrowUpDown size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Filter"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#dfe4ed] bg-white text-actual-muted2 hover:bg-[#f9fafb]"
            >
              <ListFilter size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Split view"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded border border-[#dfe4ed] bg-white text-actual-muted2 hover:bg-[#f9fafb]"
            >
              <GalleryVertical size={16} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded bg-actual-ink px-4 text-typ-body font-semibold text-white hover:bg-[#1e293b]"
            >
              <Plus size={16} strokeWidth={2} />
              Create Decision
            </button>
          </div>
        </div>
      </header>

      <div className="flex min-h-[min(720px,75vh)] flex-col gap-6 lg:flex-row lg:items-stretch">
        <aside className="flex w-full shrink-0 flex-col lg:w-[260px] xl:w-[280px]">
          <ul className="flex flex-col gap-3 overflow-y-auto lg:max-h-[calc(100vh-220px)]">
            {sidebarAdrs.map((a) => {
              const selected = a.id === selectedAdrId;
              return (
                <li key={a.id}>
                  <Link
                    href={adrWorkspaceHref(a)}
                    className={cn(
                      "block rounded-lg border bg-white p-4 shadow-actualCard transition-colors",
                      selected
                        ? "border border-[#707A8A] bg-[#f8fafc]"
                        : "border border-[#dfe4ed] hover:border-[#cbd5e1] hover:bg-[#fafafa]"
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      <Tag>{a.category}</Tag>
                      {a.updatesAvailable ? (
                        <span className="rounded border border-[#bfdbfe] bg-[#eff6ff] px-2 py-0.5 text-typ-helper font-semibold text-[#1d4ed8]">
                          Update Available
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 text-typ-body font-semibold leading-snug text-actual-welcome">
                      {a.title}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-typ-body text-actual-muted2">
                      <Clock
                        size={14}
                        className="shrink-0 opacity-80"
                        strokeWidth={2}
                      />
                      {a.activeDaysLabel ?? "Active for —"}
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="min-h-[480px] min-w-0 flex-1">
          {adr ? (
            <ADRDetailPanel
              adr={adr}
              layout="workspace"
              resolvedScopePaths={resolvedScopePaths}
              scopeEdit={scopeEdit}
            />
          ) : (
            <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-[#dfe4ed] bg-[#F9FAFB] p-8 text-center text-typ-body text-actual-muted2">
              Select an ADR from the list.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

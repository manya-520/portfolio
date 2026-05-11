import Link from "next/link";
import {
  ArrowRightIcon,
  ArrowUpRightIcon,
  CircleCheckIcon,
  GitBranchIcon,
  LoaderIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
} from "@/components/actual/Icons";
import {
  BrowseCategoryChip,
  GeneratingStatePanel,
} from "@/components/actual/Primitives";
import { DECISIONS_REPO_ROWS } from "@/data/decisionsRepos";

const REPO_CARD_SHELL =
  "flex h-full min-h-[140px] w-full min-w-0 flex-col gap-5 rounded-lg border border-[#dfe4ed] bg-white p-5";

const railAccentClass =
  "inline-flex shrink-0 items-center gap-1 whitespace-nowrap text-typ-body font-semibold text-actual-accent";

/** Visual footer states (whole card is one `<Link>` — no nested anchors). */
function RepoCardFooterRail({ adrState }) {
  if (!adrState) return null;

  switch (adrState) {
    case "in-review":
      return (
        <span className={railAccentClass}>
          In review
          <ArrowUpRightIcon size={12} className="shrink-0" />
        </span>
      );
    case "synced":
      return (
        <span className="inline-flex shrink-0 items-center gap-2 text-typ-body font-semibold text-[#5A8D6E]">
          <CircleCheckIcon size={14} className="shrink-0 text-[#5A8D6E]" />
          Synced
        </span>
      );
    case "changes":
      return (
        <span className="inline-flex shrink-0 items-center gap-2 text-typ-body font-semibold text-actual-accent">
          <LoaderIcon size={14} className="shrink-0 text-actual-accent" />
          Changes
        </span>
      );
    case "draft":
      return (
        <span className={railAccentClass}>
          Draft
          <ArrowRightIcon size={12} className="shrink-0" />
        </span>
      );
    default:
      return null;
  }
}

function RepoCardLink({ owner, repo, slug, stats, action }) {
  const detailHref = `/work/actual/adr/${slug}`;
  const isProcessing = Boolean(action.processing);

  const header = (
    <div className="flex shrink-0 items-center gap-2">
      <GitBranchIcon size={18} className="shrink-0 text-[#475569]" />
      <p className="min-w-0 truncate text-typ-body font-normal">
        <span className="text-[#64748b]">{owner}/</span>
        <span className="font-semibold text-black">{repo}</span>
      </p>
    </div>
  );

  const body = isProcessing ? (
    <div className="flex min-h-0 flex-1 flex-col">
      <GeneratingStatePanel text={action.text} />
    </div>
  ) : (
    <div className="flex min-h-0 flex-1 flex-col justify-center">
      <div className="grid grid-cols-3 gap-4 sm:gap-5">
        {Object.entries(stats).map(([k, v]) => (
          <div key={k} className="flex min-w-0 flex-col gap-1.5">
            <span className="text-typ-body font-semibold tabular-nums tracking-tight text-black">
              {v ?? "—"}
            </span>
            <span className="truncate text-typ-body font-normal text-[#64748b]">
              {k}
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const footer = !isProcessing ? (
    <div className="mt-auto flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-[#f1f5f9] pt-4">
      <BrowseCategoryChip />
      <RepoCardFooterRail adrState={action.adrState} />
    </div>
  ) : null;

  const cardInteractive =
    "outline-none transition-colors hover:border-[#707A8A] hover:bg-[#F9FAFB] focus-visible:ring-2 focus-visible:ring-actual-accent/35 focus-visible:ring-offset-2";

  return (
    <Link href={detailHref} className={`${REPO_CARD_SHELL} ${cardInteractive}`}>
      {header}
      {body}
      {footer}
    </Link>
  );
}

function AddRepoCard() {
  return (
    <button
      type="button"
      className="group flex h-full min-h-[140px] w-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#dfe4ed] bg-[#f9fafb] p-4 text-[#64748b] transition-colors hover:border-[#707A8A] hover:bg-[#F9FAFB] hover:text-[#0f172a]"
    >
      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#dfe4ed] bg-white text-[#94a3b8] group-hover:text-[#0f172a]">
        <PlusIcon size={20} />
      </span>
      <span className="text-center text-typ-body font-medium">
        Connect another repository
      </span>
      <span className="text-center text-typ-helper text-[#94a3b8]">
        GitHub · GitLab · Bitbucket
      </span>
    </button>
  );
}

export default function DecisionsReposView() {
  return (
    <div className="mx-auto w-full max-w-[1680px] px-6 pb-8 pt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 max-w-2xl">
          <h1 className="text-typ-header font-bold leading-tight text-black">
            Architecture Decision Records
          </h1>
          <p className="mt-2 max-w-xl text-typ-body font-normal leading-snug text-[#64748b]">
            Document and track architectural decisions for your repositories.
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <div className="flex h-10 min-w-[160px] flex-1 items-center gap-2 rounded-lg border border-[#dfe4ed] bg-white px-3 sm:flex-none sm:w-[200px]">
            <SearchIcon size={18} className="shrink-0 text-[#94a3b8]" />
            <input
              type="text"
              placeholder="Search repos"
              className="min-w-0 flex-1 bg-transparent text-typ-body text-[#0f172a] placeholder:text-[#94a3b8] focus:outline-none"
            />
          </div>
          <button
            type="button"
            aria-label="Filters"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#dfe4ed] bg-white hover:bg-[#f8fafc]"
          >
            <Settings2Icon size={18} className="text-[#94a3b8]" />
          </button>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-5 sm:gap-6">
        {DECISIONS_REPO_ROWS.map((row, ri) => (
          <div
            key={ri}
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 xl:grid-cols-3"
          >
            {row.map((cell, ci) => (
              <div key={`${ri}-${ci}`} className="h-full min-h-0 min-w-0">
                {cell.addMore ? <AddRepoCard /> : <RepoCardLink {...cell} />}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

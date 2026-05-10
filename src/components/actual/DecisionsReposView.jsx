import Link from "next/link";
import {
  GitBranchIcon,
  PlusIcon,
  SearchIcon,
  Settings2Icon,
} from "@/components/actual/Icons";
import {
  ActionLink,
  GeneratingStatePanel,
  StatusChip,
  Tag,
} from "@/components/actual/Primitives";
import { DECISIONS_REPO_ROWS } from "@/data/decisionsRepos";

const REPO_CARD_SHELL =
  "flex h-full min-h-[140px] w-full min-w-0 flex-col gap-5 rounded-lg border border-[#dfe4ed] bg-white p-5";

function RepoCardLink({ owner, repo, slug, tag, stats, action }) {
  const detailHref = `/work/actual/adr/${slug}`;
  const isProcessing = action.kind === "processing";

  const header = (
    <div className="flex shrink-0 flex-col gap-3">
      <div className="flex items-center justify-between">
        <Tag>{tag}</Tag>
      </div>
      <div className="flex items-center gap-2">
        <GitBranchIcon size={18} className="shrink-0 text-[#475569]" />
        <p className="min-w-0 truncate text-typ-body font-normal">
          <span className="text-[#64748b]">{owner}/</span>
          <span className="font-semibold text-black">{repo}</span>
        </p>
      </div>
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
      {action.kind === "chip" && (
        <>
          <StatusChip tone={action.tone}>{action.chip}</StatusChip>
          <ActionLink href={detailHref}>{action.cta}</ActionLink>
        </>
      )}
      {action.kind === "alert" && (
        <>
          <span className="inline-flex items-center gap-1.5 text-typ-body font-normal text-[#c2410c]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-[#f97316]" />
            {action.text}
          </span>
          <ActionLink href={detailHref}>{action.cta}</ActionLink>
        </>
      )}
      {action.kind === "syncing" && (
        <span className="inline-flex items-center gap-2 text-typ-body font-normal text-[#64748b]">
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#0043CE]" />
          {action.text}
        </span>
      )}
    </div>
  ) : null;

  if (isProcessing) {
    return (
      <div className={`${REPO_CARD_SHELL}`}>
        {header}
        {body}
      </div>
    );
  }

  return (
    <Link
      href={detailHref}
      className={`${REPO_CARD_SHELL} transition-shadow hover:border-[#cbd5e1] hover:shadow-md`}
    >
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
      className="group flex h-full min-h-[140px] w-full min-w-0 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-[#dfe4ed] bg-[#f9fafb] p-4 text-[#64748b] hover:border-[#0f172a] hover:bg-white hover:text-[#0f172a]"
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
          <h1 className="text-typ-header font-semibold text-black">
            Decisions
          </h1>
          <p className="mt-2 text-typ-body text-[#64748b]">
            Architectural decisions per repository. Open a repo to review the
            latest suggested ADR, status across coding agents, and sync state.
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
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#dfe4ed] bg-white px-3 text-typ-body font-medium text-[#0f172a] hover:bg-[#f8fafc]"
          >
            <Settings2Icon size={16} />
            Filters
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

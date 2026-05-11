import {
  ChevronDownIcon,
  Settings2Icon,
} from "@/components/actual/Icons";
import { StatusChip, Tag } from "@/components/actual/Primitives";
import { ChevronRight, Pencil, Trash2, X } from "lucide-react";

import { cn } from "@/lib/utils";

/** Figma Deck Active ADR (`903:4896`) — label column width for Policy / Scope / Explanation rows. */
const LABEL_COL_W = "w-full shrink-0 sm:w-[240px]";

function sectionSubtitle(title) {
  switch (title) {
    case "Context":
      return "Evidence and triggers for this decision";
    case "Decision":
      return "What we committed to";
    case "Consequences":
      return "Trade-offs and outcomes";
    default:
      return null;
  }
}

/** Workspace layout maps Context/Decision/Consequences → Policy/Scope/Explanation. */
function workspaceHeading(sectionTitle) {
  switch (sectionTitle) {
    case "Context":
      return "Policy";
    case "Decision":
      return "Scope";
    case "Consequences":
      return "Explanation";
    default:
      return sectionTitle;
  }
}

function workspaceSubtitle(sectionTitle) {
  switch (sectionTitle) {
    case "Context":
      return "This will be used by your AI Providers";
    case "Decision":
      return "Paths where this policy applies";
    case "Consequences":
      return "How we came up with this";
    default:
      return null;
  }
}

/* `text-[0.75rem]` not `text-typ-body`: twMerge drops unknown `text-*` when merging with `text-black`. */
const WORKSPACE_ARCHIVE_EDIT_BTN =
  "inline-flex h-10 w-[96px] items-center justify-center gap-1.5 rounded border border-[#d1d9e0] bg-white text-[0.75rem] font-medium leading-none";

const ARCHIVE_EDIT_ICON_PROPS = {
  size: 16,
  strokeWidth: 1.5,
  className: "shrink-0",
  "aria-hidden": true,
};

function WorkspaceArchiveEditButtons({
  onEditScopes,
  onSave,
  onCancel,
  disableEdit,
  editingScopes,
}) {
  return (
    <>
      {!editingScopes ? (
        <button
          type="button"
          className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-[#da1e28] hover:bg-[#fef2f2]`}
        >
          <Trash2 {...ARCHIVE_EDIT_ICON_PROPS} />
          Archive
        </button>
      ) : null}
      {editingScopes ? (
        <>
          <button
            type="button"
            onClick={onCancel}
            className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-black hover:bg-[#f8fafc]`}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onSave}
            className="inline-flex h-10 min-w-[96px] items-center justify-center rounded bg-actual-ink px-4 text-[0.75rem] font-medium leading-none text-white hover:bg-[#1e293b]"
          >
            Save changes
          </button>
        </>
      ) : (
        <button
          type="button"
          disabled={disableEdit}
          onClick={onEditScopes}
          title={
            disableEdit
              ? "This ADR has no editable scope paths in the prototype dataset."
              : "Edit scope paths"
          }
          className={cn(
            `${WORKSPACE_ARCHIVE_EDIT_BTN} text-black hover:bg-[#f8fafc]`,
            disableEdit && "cursor-not-allowed opacity-40 hover:bg-white"
          )}
        >
          <Pencil {...ARCHIVE_EDIT_ICON_PROPS} />
          Edit
        </button>
      )}
    </>
  );
}

/**
 * Figma (`903:6640` region): shell `#F9FAFB`; Policy/Scope/Explanation values sit in white rounded panels;
 * scope paths are neutral chips `#eff3f8` / `#dfe4ed`.
 */
function WorkspaceDetailCard({
  adr,
  detailBadge,
  resolvedScopePaths,
  scopeEdit,
}) {
  const draftPaths =
    scopeEdit?.active && Array.isArray(scopeEdit.draftPaths)
      ? scopeEdit.draftPaths
      : null;
  const pathsDisplayed =
    draftPaths !== null ? draftPaths : resolvedScopePaths ?? [];

  const scopeBackedAdr = Array.isArray(adr.scopePaths);
  const editingScopes = Boolean(scopeEdit?.active);

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-6 rounded-lg border border-[#dfe4ed] bg-[#F9FAFB] p-6 shadow-actualCard">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
          <h2 className="min-w-0 flex-1 text-typ-header font-semibold leading-snug text-actual-welcome">
            {adr.title}
          </h2>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <WorkspaceArchiveEditButtons
              editingScopes={editingScopes}
              disableEdit={!scopeEdit?.canEdit}
              onEditScopes={scopeEdit?.onStartEdit}
              onSave={() => scopeEdit?.onSave?.()}
              onCancel={() => scopeEdit?.onCancel?.()}
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tag>{adr.category}</Tag>
          <span className="inline-flex h-8 items-center rounded-lg border border-[#dbeafe] bg-[#eaf2ff] px-3 text-typ-body font-normal leading-none text-actual-accent">
            {detailBadge}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-6 border-t border-[#dfe4ed] pt-6">
        {adr.sections.map((s) => {
          const heading = workspaceHeading(s.title);
          const subtitle = s.subtitle ?? workspaceSubtitle(s.title);

          const showScopeChips =
            s.title === "Decision" &&
            scopeBackedAdr &&
            (pathsDisplayed.length > 0 || editingScopes);

          return (
            <div
              key={s.title}
              className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-4"
            >
              <div className={`${LABEL_COL_W} flex flex-col gap-2`}>
                <h3 className="text-typ-header font-semibold leading-5 text-actual-welcome">
                  {heading}
                </h3>
                {subtitle ? (
                  <p className="text-typ-helper italic leading-5 text-actual-mute">
                    {subtitle}
                  </p>
                ) : null}
              </div>

              <div className="min-w-0 flex-1">
                {showScopeChips ? (
                  <div className="rounded-lg bg-white p-4">
                    <div className="flex flex-wrap gap-2">
                      {pathsDisplayed.length === 0 && editingScopes ? (
                        <p className="text-typ-body italic text-actual-muted2">
                          No scope paths — Save changes above to keep empty, or
                          Cancel to discard.
                        </p>
                      ) : (
                        pathsDisplayed.map((path) => (
                          <span
                            key={path}
                            className="inline-flex max-w-full items-center gap-1 rounded-lg border border-[#dfe4ed] bg-[#eff3f8] py-1 pl-2 pr-1 font-mono text-typ-body leading-4 tracking-wide text-[#6b7280]"
                          >
                            <span className="min-w-0 truncate">{path}</span>
                            {editingScopes ? (
                              <button
                                type="button"
                                aria-label={`Remove ${path}`}
                                onClick={() =>
                                  scopeEdit?.onRemovePath?.(path)
                                }
                                className="inline-flex shrink-0 rounded p-0.5 text-actual-muted2 hover:bg-[#dfe4ed] hover:text-actual-ink"
                              >
                                <X size={14} strokeWidth={2} aria-hidden />
                              </button>
                            ) : null}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="rounded-lg bg-white p-4">
                    <p className="text-typ-body leading-5 text-[#6b7280] whitespace-pre-line">
                      {s.body}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-y border-[#dfe4ed] py-4">
        <button
          type="button"
          className="flex w-full items-center justify-between gap-3 text-left text-typ-body font-normal text-actual-accent opacity-90 hover:underline"
        >
          <span>View History and Comments</span>
          <ChevronRight
            size={18}
            className="shrink-0 text-actual-accent opacity-80"
            strokeWidth={2}
            aria-hidden
          />
        </button>
      </div>

      {!editingScopes ? (
        <div className="flex justify-end gap-2">
          <WorkspaceArchiveEditButtons
            editingScopes={editingScopes}
            disableEdit={!scopeEdit?.canEdit}
            onEditScopes={scopeEdit?.onStartEdit}
            onSave={() => scopeEdit?.onSave?.()}
            onCancel={() => scopeEdit?.onCancel?.()}
          />
        </div>
      ) : null}
    </div>
  );
}

export default function ADRDetailPanel({
  adr,
  layout = "standalone",
  resolvedScopePaths,
  scopeEdit,
}) {
  if (!adr) return null;

  const isWorkspace = layout === "workspace";

  /** Matches sidebar list (`activeDaysLabel`). */
  const detailBadge =
    adr.activeDaysLabel ?? `Updated ${adr.updatedAt}`;

  if (isWorkspace) {
    return (
      <WorkspaceDetailCard
        adr={adr}
        detailBadge={detailBadge}
        resolvedScopePaths={
          resolvedScopePaths ?? adr.scopePaths ?? []
        }
        scopeEdit={scopeEdit}
      />
    );
  }

  const mainCard = (
    <div className="min-w-0 flex-1 rounded-lg border border-[#dfe4ed] bg-white shadow-actualCard">
      <div className="flex flex-col gap-6 border-b border-[#dfe4ed] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-x-4">
          <h2 className="min-w-0 flex-1 text-typ-header font-semibold leading-snug text-actual-welcome">
            {adr.title}
          </h2>
          <div className="flex shrink-0 flex-wrap items-center gap-2">
            <button
              type="button"
              className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-[#da1e28] hover:bg-[#fef2f2]`}
            >
              Archive
            </button>
            <button
              type="button"
              className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-black hover:bg-[#f8fafc]`}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Tag>{adr.category}</Tag>
          <span className="inline-flex h-8 items-center rounded-lg border border-[#dbeafe] bg-[#eaf2ff] px-3 text-typ-body font-normal leading-none text-actual-accent">
            {detailBadge}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <StatusChip tone={adr.statusTone}>{adr.status}</StatusChip>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-md border border-[#e2e8f0] bg-white px-3 text-typ-body font-medium text-[#0f172a] hover:bg-[#f8fafc]"
          >
            <Settings2Icon size={16} />
            Actions
            <ChevronDownIcon size={14} />
          </button>
          <button
            type="button"
            className="inline-flex h-9 items-center gap-2 rounded-md bg-[#0f172a] px-3 text-typ-body font-medium text-white hover:bg-[#1e293b]"
          >
            {adr.primaryAction}
          </button>
        </div>
      </div>

      <div className="flex flex-col divide-y divide-[#dfe4ed]">
        {adr.sections.map((s) => {
          const subtitle = s.subtitle ?? sectionSubtitle(s.title);

          return (
            <div
              key={s.title}
              className="flex flex-col gap-4 p-6 sm:flex-row sm:gap-4"
            >
              <div className={`${LABEL_COL_W} flex flex-col gap-2`}>
                <h3 className="text-typ-header font-semibold leading-5 text-actual-welcome">
                  {s.title}
                </h3>
                {subtitle ? (
                  <p className="text-typ-helper italic leading-5 text-actual-mute">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <div className="min-w-0 flex-1 rounded-lg px-4 py-2 sm:px-4">
                <p className="text-typ-body leading-5 text-actual-mute whitespace-pre-line">
                  {s.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-[#dfe4ed] px-6 py-4">
        <button
          type="button"
          className="text-typ-body font-normal leading-6 text-actual-accent hover:underline"
        >
          View History and Comments
        </button>
      </div>

      <div className="flex justify-end gap-2 border-t border-[#dfe4ed] px-6 py-4">
        <button
          type="button"
          className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-[#da1e28] hover:bg-[#fef2f2]`}
        >
          Archive
        </button>
        <button
          type="button"
          className={`${WORKSPACE_ARCHIVE_EDIT_BTN} text-black hover:bg-[#f8fafc]`}
        >
          Edit
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
      {mainCard}

      <aside className="flex w-full shrink-0 flex-col gap-6 lg:w-[240px]">
        <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 shadow-actualCard">
          <h3 className="text-typ-helper font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
            Status
          </h3>
          <ol className="mt-3 flex flex-col gap-3">
            {adr.timeline.map((t, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className={[
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    t.done ? "bg-[#047857]" : "bg-[#cbd5e1]",
                  ].join(" ")}
                />
                <div className="min-w-0">
                  <p className="text-typ-body font-medium text-[#0f172a]">
                    {t.label}
                  </p>
                  <p className="text-typ-helper text-[#94a3b8]">{t.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="rounded-lg border border-[#e4e4e7] bg-white p-4 shadow-actualCard">
          <h3 className="text-typ-helper font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
            Coding agents
          </h3>
          <ul className="mt-3 flex flex-col gap-2">
            {adr.agents.map((a) => (
              <li
                key={a.name}
                className="flex items-center justify-between gap-2 rounded-md border border-[#e4e4e7] bg-white px-3 py-2"
              >
                <span className="min-w-0 truncate text-typ-body font-medium text-[#0f172a]">
                  {a.name}
                </span>
                <StatusChip tone={a.tone}>{a.state}</StatusChip>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}

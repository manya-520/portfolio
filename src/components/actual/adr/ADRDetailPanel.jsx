import {
  ChevronDownIcon,
  Settings2Icon,
} from "@/components/actual/Icons";
import { StatusChip, Tag } from "@/components/actual/Primitives";

export default function ADRDetailPanel({ adr }) {
  if (!adr) return null;

  return (
    <div className="flex min-h-[min(632px,70vh)] flex-col rounded-lg border border-[#e4e4e7] bg-white">
      <div className="flex flex-col gap-4 border-b border-[#e4e4e7] p-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:p-6">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Tag>{adr.category}</Tag>
            <Tag>ADR-{adr.id}</Tag>
          </div>
          <h2 className="mt-3 text-typ-header font-semibold text-[#0f172a]">
            {adr.title}
          </h2>
          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-typ-body text-[#64748b]">
            <span>Suggested by {adr.suggestedBy}</span>
            <span className="hidden sm:inline">·</span>
            <span>Updated {adr.updatedAt}</span>
            <span className="hidden sm:inline">·</span>
            <span>{adr.repo}</span>
          </div>
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
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

      <div className="grid flex-1 grid-cols-1 divide-y divide-[#e4e4e7] overflow-hidden lg:grid-cols-[1fr_280px] lg:divide-x lg:divide-y-0">
        <div className="max-h-[55vh] overflow-y-auto p-4 sm:p-6 lg:max-h-none">
          <div className="flex flex-col gap-6">
            {adr.sections.map((s) => (
              <section key={s.title}>
                <h3 className="text-typ-helper font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
                  {s.title}
                </h3>
                <p className="mt-2 whitespace-pre-line text-typ-body text-[#1f2328]">
                  {s.body}
                </p>
              </section>
            ))}
          </div>
        </div>

        <aside className="flex max-h-[45vh] flex-col gap-6 overflow-y-auto p-4 sm:p-6 lg:max-h-none">
          <div>
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
                  <div>
                    <p className="text-typ-body font-medium text-[#0f172a]">
                      {t.label}
                    </p>
                    <p className="text-typ-helper text-[#94a3b8]">
                      {t.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h3 className="text-typ-helper font-semibold uppercase tracking-[0.08em] text-[#94a3b8]">
              Coding agents
            </h3>
            <ul className="mt-3 flex flex-col gap-2">
              {adr.agents.map((a) => (
                <li
                  key={a.name}
                  className="flex items-center justify-between gap-2 rounded-md border border-[#e4e4e7] bg-white px-3 py-2"
                >
                  <span className="text-typ-body font-medium text-[#0f172a]">
                    {a.name}
                  </span>
                  <StatusChip tone={a.tone}>{a.state}</StatusChip>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

import { useState } from "react";
import CodingAgentsModal from "./CodingAgentsModal";
import {
  ArrowUpRightIcon,
  ChevronRightIcon,
  CircleCheckIcon,
  CircleIcon,
  XCloseIcon,
} from "./Icons";

/** Checklist column fixed width */
const RAIL_W = "w-full max-w-[240px] xl:w-[240px]";

const STEPS = [
  {
    key: "agents",
    title: "Add your coding agents",
    description: null,
  },
  {
    key: "members",
    title: "Invite members",
    description: "Invite your team to Actual AI",
  },
  {
    key: "policy",
    title: "Set adoption policy",
    description: null,
  },
];

/**
 * `done` = number of completed steps (0…total). Header shows current step index:
 * e.g. done=0 → 1/3 (on step 1), done=1 → 2/3 (step 1 checked, focus step 2).
 */
export function FinishSetup({
  done = 0,
  total = 3,
  interactive = false,
  onActivateStep,
}) {
  const items = STEPS.slice(0, total);
  const completed = Math.min(Math.max(done, 0), total);
  const stepLabel = completed < total ? completed + 1 : total;

  return (
    <div
      className={`relative overflow-hidden rounded-lg border border-actual-accentBorder bg-white shadow-actualCard ${RAIL_W}`}
    >
      <button
        type="button"
        className="absolute right-2.5 top-2.5 text-actual-ghost transition-colors hover:text-actual-muted2"
        aria-label="Dismiss"
      >
        <XCloseIcon size={16} />
      </button>
      <div className="flex items-baseline gap-2 border-b border-actual-divider px-3 py-3 pr-9">
        <span className="text-typ-body font-semibold text-actual-text">
          Finish setting up
        </span>
        <span className="text-typ-helper tabular-nums text-actual-muted2">
          {stepLabel}/{total}
        </span>
      </div>
      {items.map((it, i) => {
        const isCompleted = i < completed;
        const isCurrent = i === completed && completed < total;
        const isUpcoming = i > completed;
        const clickable = Boolean(interactive && isCurrent && onActivateStep);

        const rowInner = (
          <>
            <span className="mt-0.5 shrink-0">
              {isCompleted ? (
                <CircleCheckIcon size={14} className="text-actual-accent" />
              ) : (
                <CircleIcon
                  size={14}
                  className={
                    isCurrent ? "text-actual-accent" : "text-actual-ghost"
                  }
                />
              )}
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p
                  className={[
                    "text-typ-body leading-snug",
                    isCompleted &&
                      "text-actual-muted2 line-through decoration-actual-muted2",
                    isCurrent && "font-semibold text-actual-text",
                    isUpcoming && "font-normal text-actual-muted2",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {it.title}
                </p>
                {isCurrent ? (
                  <ChevronRightIcon
                    size={16}
                    className="mt-0.5 shrink-0 text-actual-accent"
                    aria-hidden
                  />
                ) : null}
              </div>
              {isCurrent && it.description ? (
                <p className="mt-1 text-typ-body text-actual-muted2">
                  {it.description}
                </p>
              ) : null}
            </div>
          </>
        );

        return (
          <div
            key={it.key}
            className={[
              "border-b border-actual-divider last:border-b-0",
              isCurrent ? "bg-actual-accentSoft" : "",
            ].join(" ")}
          >
            {clickable ? (
              <button
                type="button"
                onClick={() => onActivateStep(it.key)}
                className="flex w-full gap-2.5 px-3 py-3 text-left hover:bg-transparent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-actual-accent/35 focus-visible:ring-inset"
              >
                {rowInner}
              </button>
            ) : (
              <div className="flex gap-2.5 px-3 py-3">{rowInner}</div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function LearnMoreCard() {
  return (
    <div
      className={`rounded-lg border border-actual-accentBorder bg-white p-3 shadow-actualCard ${RAIL_W}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="min-w-0 flex-1 text-typ-body font-semibold text-actual-welcome">
          Learn more about Decisions
        </p>
        <button
          type="button"
          className="inline-flex shrink-0 items-center gap-0.5 text-typ-body font-medium text-actual-accent hover:underline"
        >
          More
          <ArrowUpRightIcon size={12} />
        </button>
      </div>
      <p className="mt-2 text-typ-body text-actual-mute">
        <span className="text-actual-accent">Actual AI</span> extracts, syncs,
        and enforces Architecture Decision Records (ADRs) across your AI coding
        agents so the why behind every technical decision is never lost.
      </p>
    </div>
  );
}

export default function RightRail({ initialDone = 0, interactive = true }) {
  const [done, setDone] = useState(initialDone);
  const [agentsModalOpen, setAgentsModalOpen] = useState(false);

  return (
    <aside
      className={`flex shrink-0 flex-col gap-4 self-start xl:sticky xl:top-[84px] xl:z-10 ${RAIL_W}`}
    >
      <FinishSetup
        done={done}
        interactive={interactive}
        onActivateStep={
          interactive
            ? (stepKey) => {
                if (stepKey === "agents") setAgentsModalOpen(true);
              }
            : undefined
        }
      />
      <LearnMoreCard />
      {interactive ? (
        <CodingAgentsModal
          open={agentsModalOpen}
          onClose={() => setAgentsModalOpen(false)}
          onConfirm={() => {
            setAgentsModalOpen(false);
            setDone((d) => Math.min(d + 1, STEPS.length));
          }}
        />
      ) : null}
    </aside>
  );
}

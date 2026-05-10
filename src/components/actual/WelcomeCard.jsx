import { useEffect, useMemo, useState } from "react";
import { Dropdown, StatusChip } from "./Primitives";
import { LoaderIcon } from "./Icons";

/** Welcome banner art — `public/Group 3.png` */
const WELCOME_BANNER_ART_SRC = encodeURI("/Group 3.png");

const LOOP_MS = 60_000;

/** Parse "Stage N of M" from the status line → fill percent for the strip (33, 67, 100, …). */
function processingProgressPercent(stage) {
  const m = typeof stage === "string" ? stage.match(/Stage\s+(\d+)\s+of\s+(\d+)/i) : null;
  if (!m) return 33;
  const n = Number(m[1]);
  const total = Number(m[2]);
  if (!Number.isFinite(total) || total < 1 || !Number.isFinite(n) || n < 1) return 33;
  return Math.min(100, Math.round((n / total) * 100));
}

function parseCountValue(value) {
  const n = parseInt(String(value ?? "").replace(/,/g, ""), 10);
  return Number.isFinite(n) ? n : 0;
}

function formatCount(n) {
  return Math.max(0, Math.round(n)).toLocaleString("en-US");
}

function easeOutCubic(t) {
  const x = Math.min(1, Math.max(0, t));
  return 1 - (1 - x) ** 3;
}

/** Format loop position (0–1) as an elapsed clock for the status row. */
function formatLoopElapsed(t) {
  const sec = Math.min(59, Math.floor(t * 60));
  return `${sec}s`;
}

const STAGES = [
  {
    key: "discovery",
    label: "Discovery",
    chipTone: "running",
    chip: "Running",
    rows: [{ value: "1,409", caption: "Files found for analysis" }],
  },
  {
    key: "analysis",
    label: "Analysis",
    chipTone: "pending",
    chip: "Pending",
    rows: [
      { value: "0", caption: "Architectural evidence gathered" },
      { value: "0", caption: "Patterns recognized" },
    ],
  },
  {
    key: "generation",
    label: "Generation",
    chipTone: "pending",
    chip: "Pending",
    rows: [{ value: "0", caption: "Decisions Suggested" }],
  },
];

/**
 * Welcome + Decision Processing card — aligned to Figma Deck `903:5385` (Card instance).
 * Order: grey status header → 4px split progress (361:719) → white 3-column body.
 * `animated`: loop all stages over 60s with count-up; honors `prefers-reduced-motion` (static props).
 */
export default function WelcomeCard({
  title = "Welcome to Actual AI",
  description = "We are processing your repositories it can take upto 4 hours to generate decisions. We will email you once your decisions have been generated!",
  stages = STAGES,
  stage = "Stage 1 of 3",
  elapsed = "23s",
  syncStatus = "Repository Sync Complete",
  animated = false,
}) {
  const [t, setT] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const runTimeline = animated && !reduceMotion;

  useEffect(() => {
    if (!runTimeline) return;
    const start = Date.now();
    const id = window.setInterval(() => {
      setT(((Date.now() - start) % LOOP_MS) / LOOP_MS);
    }, 50);
    return () => window.clearInterval(id);
  }, [runTimeline]);

  const targets = useMemo(
    () =>
      stages.map((s) =>
        s.rows.map((row, j) => {
          let v = parseCountValue(row.value);
          if (
            s.key === "generation" &&
            j === 0 &&
            v === 0 &&
            stages.length === 3
          ) {
            v = 6;
          }
          return v;
        })
      ),
    [stages]
  );

  const phaseCount = stages.length;
  const raw = t * phaseCount;
  const activePhase = Math.min(phaseCount - 1, Math.floor(raw));
  const u = Math.min(1, Math.max(0, raw - activePhase));
  const easedU = easeOutCubic(u);

  const displayStages = useMemo(() => {
    if (!runTimeline) return null;
    return stages.map((s, colIdx) => {
      let chipTone = "pending";
      let chip = "Pending";
      if (colIdx < activePhase) {
        chipTone = "success";
        chip = "Complete";
      } else if (colIdx === activePhase) {
        chipTone = "running";
        chip = "Running";
      }

      const rows = s.rows.map((row, rowIdx) => {
        const target = targets[colIdx]?.[rowIdx] ?? 0;
        let n = 0;
        if (colIdx < activePhase) n = target;
        else if (colIdx > activePhase) n = 0;
        else {
          const rowCount = s.rows.length;
          const slice = 1 / rowCount;
          const localT = Math.min(1, Math.max(0, (u - rowIdx * slice) / slice));
          n = target * easeOutCubic(localT);
        }
        return { ...row, value: formatCount(n) };
      });

      return { ...s, chipTone, chip, rows };
    });
  }, [runTimeline, stages, activePhase, u, targets]);

  const stageLabel = runTimeline
    ? `Stage ${activePhase + 1} of ${phaseCount}`
    : stage;
  const elapsedLabel = runTimeline ? formatLoopElapsed(t) : elapsed;
  const progressPct = runTimeline
    ? Math.min(100, Math.round(((activePhase + easedU) / phaseCount) * 100))
    : processingProgressPercent(stage);

  const stagesToRender = displayStages ?? stages;

  return (
    <div className="relative overflow-hidden rounded-lg border border-[#dbeafe] shadow-actualCard">
      {/* Light deck wash (Figma) — not the same as the decision progress brand gradient */}
      <div
        className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-r from-[#EFFBF3] to-[#E8F0FC]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute right-4 top-4 hidden max-w-[min(280px,42%)] select-none md:block"
        aria-hidden
      >
        <img
          src={WELCOME_BANNER_ART_SRC}
          alt=""
          className="ml-auto block h-auto max-h-28 w-auto max-w-full object-contain object-right opacity-[0.92]"
        />
      </div>

      <div className="relative flex flex-col gap-6 p-6">
        <h2 className="text-typ-header font-semibold text-black">
          {title}
        </h2>
        <p className="text-typ-body font-normal text-actual-muted2">
          {description}
        </p>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="flex shrink-0 items-center border-[#e2e8f0] sm:border-r sm:pr-6">
            <Dropdown label="Data pipelines" className="h-9 w-[240px]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="relative h-3 w-3 shrink-0 rounded-full bg-[#047857] ring-2 ring-[#047857]/35" />
            <span className="text-typ-body text-actual-mute">{syncStatus}</span>
          </div>
        </div>

        <div className="flex w-full flex-col overflow-hidden rounded-lg border border-[#dfe4ed] bg-white">
          <div className="border-b border-[#dfe4ed] bg-[#f9fafb]">
            <div className="flex flex-col p-2">
              <div className="flex w-full flex-wrap items-center justify-between gap-4 px-4 py-1.5">
                <span className="text-typ-body font-semibold text-actual-welcome">
                  Decision Processing Status
                </span>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 border-r border-[#dfe4ed] pr-4">
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-[#0043CE] bg-white" />
                    <span className="whitespace-nowrap text-typ-body text-actual-mute">
                      {stageLabel}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-actual-muted2">
                    <LoaderIcon size={16} />
                    <span className="whitespace-nowrap text-typ-body tabular-nums">
                      {elapsedLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress strip — fill tracks "Stage N of M" (e.g. stage 2 → ~67%). */}
          <div
            className="flex h-1 w-full shrink-0"
            role="progressbar"
            aria-valuenow={progressPct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Processing stages progress"
          >
            <div
              className={
                runTimeline
                  ? "min-h-[4px] shrink-0 bg-gradient-to-r from-[#04EF86] to-[#0043CE]"
                  : "min-h-[4px] shrink-0 bg-gradient-to-r from-[#04EF86] to-[#0043CE] transition-[width] duration-300 ease-out"
              }
              style={{ width: `${progressPct}%` }}
            />
            <div
              className={
                runTimeline
                  ? "min-h-[4px] shrink-0 bg-[#dfe4ed]"
                  : "min-h-[4px] shrink-0 bg-[#dfe4ed] transition-[width] duration-300 ease-out"
              }
              style={{ width: `${100 - progressPct}%` }}
            />
          </div>

          <div className="grid grid-cols-1 divide-y divide-[#dfe4ed] bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
            {stagesToRender.map((s) => (
              <div
                key={s.key}
                className="flex items-start justify-between gap-4 px-6 py-4"
              >
                <div className="flex min-w-0 flex-col gap-4">
                  <span className="text-typ-body font-normal text-black">
                    {s.label}
                  </span>
                  <div className="flex flex-col gap-4">
                    {s.rows.map((row) => (
                      <div key={row.caption} className="flex flex-col gap-0">
                        <span className="text-typ-body font-semibold tabular-nums tracking-wide text-black">
                          {row.value}
                        </span>
                        <span className="whitespace-nowrap text-typ-body font-normal text-actual-mute">
                          {row.caption}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="shrink-0 pt-0.5">
                  <StatusChip tone={s.chipTone}>{s.chip}</StatusChip>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

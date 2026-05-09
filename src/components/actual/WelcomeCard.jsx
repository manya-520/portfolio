import { Dropdown, StatusChip } from "./Primitives";
import { LoaderIcon } from "./Icons";

/** Welcome banner art — `public/Group 3.png` */
const WELCOME_BANNER_ART_SRC = encodeURI("/Group 3.png");

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
 */
export default function WelcomeCard({
  title = "Welcome to Actual AI",
  description = "We are processing your repositories it can take upto 4 hours to generate decisions. We will email you once your decisions have been generated!",
  stages = STAGES,
  stage = "Stage 1 of 3",
  elapsed = "23s",
  syncStatus = "Repository Sync Complete",
}) {
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
            <Dropdown label="Repo name" className="h-9 w-[240px]" />
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
                    <span className="h-3 w-3 shrink-0 rounded-full border-2 border-[#2076BB] bg-white" />
                    <span className="whitespace-nowrap text-typ-body text-actual-mute">
                      {stage}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-actual-muted2">
                    <LoaderIcon size={16} />
                    <span className="whitespace-nowrap text-typ-body tabular-nums">
                      {elapsed}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Progress strip between status header and columns */}
          <div
            className="grid h-1 w-full shrink-0 grid-cols-[361fr_719fr]"
            role="progressbar"
            aria-valuenow={33}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Processing stages progress"
          >
            <div className="min-h-[4px] bg-gradient-to-r from-[#04EF86] to-[#2076BB]" />
            <div className="min-h-[4px] bg-[#dfe4ed]" />
          </div>

          <div className="grid grid-cols-1 divide-y divide-[#dfe4ed] bg-white md:grid-cols-3 md:divide-x md:divide-y-0">
            {stages.map((s) => (
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

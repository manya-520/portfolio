const CARDS = [
  {
    key: "team",
    title: "Team Reports",
    count: "06",
    body: "One line explanation of what our feature is.",
  },
  {
    key: "developer",
    title: "Developer Reports",
    count: "06",
    body: "One line explanation of what our feature is.",
  },
  {
    key: "repository",
    title: "Repository Reports",
    count: "06",
    body: "One line explanation of what our feature is.",
  },
];

/** Figma Deck `903:5574` — three summary tiles; uses shared `typ-*` scale. */
export default function FeatureReportCards() {
  return (
    <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
      {CARDS.map((c) => (
        <div
          key={c.key}
          className="flex flex-col gap-4 rounded-lg border border-actual-card bg-white p-6 shadow-actualCard"
        >
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-typ-header font-semibold text-actual-welcome">
              {c.title}
            </h3>
            <span className="shrink-0 text-typ-header font-semibold tabular-nums text-actual-welcome">
              {c.count}
            </span>
          </div>
          <p className="text-typ-body text-actual-mute">{c.body}</p>
        </div>
      ))}
    </section>
  );
}

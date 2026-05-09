/** Repo cards shown on Decisions (/work/actual/adr). Slug = repo name → ADR detail variant. */
export const DECISIONS_REPO_ROWS = [
  [
    {
      owner: "actual-software",
      repo: "on-prem",
      slug: "on-prem",
      tag: "Backend",
      stats: { Decisions: 24, Suggested: 6, Updates: 2 },
      action: {
        kind: "chip",
        chip: "Updates Available",
        tone: "warning",
        cta: "Review",
      },
    },
    {
      owner: "actual-software",
      repo: "web-platform",
      slug: "web-platform",
      tag: "Frontend",
      stats: { Decisions: 18, Suggested: 3, Updates: 0 },
      action: {
        kind: "alert",
        text: "1 conflicting decision",
        cta: "Resolve",
      },
    },
    {
      owner: "actual-software",
      repo: "agents-runtime",
      slug: "agents-runtime",
      tag: "Infra",
      stats: { Decisions: 31, Suggested: 8, Updates: 1 },
      action: {
        kind: "chip",
        chip: "All Synced",
        tone: "success",
        cta: "View",
      },
    },
  ],
  [
    {
      owner: "actual-software",
      repo: "design-system",
      slug: "design-system",
      tag: "Frontend",
      stats: { Decisions: 12, Suggested: 2, Updates: 0 },
      action: {
        kind: "chip",
        chip: "All Synced",
        tone: "success",
        cta: "View",
      },
    },
    {
      owner: "actual-software",
      repo: "billing-service",
      slug: "billing-service",
      tag: "Backend",
      stats: { Decisions: 22, Suggested: 5, Updates: 4 },
      action: { kind: "syncing", text: "Syncing changes…" },
    },
    {
      owner: "actual-software",
      repo: "analytics-pipeline",
      slug: "analytics-pipeline",
      tag: "Data",
      stats: { Decisions: 16, Suggested: 1, Updates: 0 },
      action: {
        kind: "chip",
        chip: "All Synced",
        tone: "success",
        cta: "View",
      },
    },
  ],
  [
    {
      owner: "actual-software",
      repo: "ml-evals",
      slug: "ml-evals",
      tag: "Data",
      stats: { Decisions: null, Suggested: null, Updates: null },
      action: { kind: "processing", text: "Generating Decisions" },
    },
    {
      owner: "actual-software",
      repo: "monorepo",
      slug: "monorepo",
      tag: "Infra",
      stats: { Decisions: 9, Suggested: 4, Updates: 1 },
      action: { kind: "syncing", text: "Syncing changes…" },
    },
    { addMore: true },
  ],
];

/** Which ADR mock to show when opening a repo (matches Figma-style states). */
export const REPO_SLUG_TO_ADR_ID = {
  "on-prem": "0214",
  "web-platform": "0213",
  "agents-runtime": "0212",
  "design-system": "0211",
  "billing-service": "0214",
  "analytics-pipeline": "0213",
  "ml-evals": "0212",
  "monorepo": "0211",
};

export function getDecisionsRepoSlugs() {
  const slugs = [];
  for (const row of DECISIONS_REPO_ROWS) {
    for (const cell of row) {
      if (cell && !cell.addMore && cell.slug) {
        slugs.push(cell.slug);
      }
    }
  }
  return slugs;
}

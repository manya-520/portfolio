/** Repo cards shown on Decisions (/work/actual/adr). Slug = repo name → ADR detail variant. */
export const DECISIONS_REPO_ROWS = [
  [
    {
      owner: "actual-harbor",
      repo: "auth-service",
      slug: "auth-service",
      tag: "Backend",
      stats: { Decisions: 12, Suggested: 4, Updates: 2 },
      action: { adrState: "in-review" },
    },
    {
      owner: "actual-cascade",
      repo: "web-client",
      slug: "web-client",
      tag: "Frontend",
      stats: { Decisions: 41, Suggested: 16, Updates: 5 },
      action: { adrState: "in-review" },
    },
    {
      owner: "actual-ledger",
      repo: "billing-core",
      slug: "billing-core",
      tag: "Backend",
      stats: { Decisions: 8, Suggested: 3, Updates: 1 },
      action: { adrState: "synced" },
    },
  ],
  [
    {
      owner: "actual-software",
      repo: "on-prem",
      slug: "on-prem",
      tag: "Backend",
      stats: { Decisions: 24, Suggested: 6, Updates: 2 },
      action: { adrState: "synced" },
    },
    {
      owner: "actual-forge",
      repo: "build-images",
      slug: "build-images",
      tag: "Infra",
      stats: { Decisions: null, Suggested: null, Updates: null },
      action: { processing: true, text: "Generating Decisions" },
    },
    {
      owner: "actual-stratum",
      repo: "data-pipelines",
      slug: "data-pipelines",
      tag: "Data",
      stats: { Decisions: null, Suggested: null, Updates: null },
      action: { processing: true, text: "Generating Decisions" },
    },
  ],
  [
    {
      owner: "actual-labs",
      repo: "ml-evals",
      slug: "ml-evals",
      tag: "Data",
      stats: { Decisions: null, Suggested: null, Updates: null },
      action: { processing: true, text: "Generating Decisions" },
    },
    {
      owner: "actual-software",
      repo: "design-system",
      slug: "design-system",
      tag: "Frontend",
      stats: { Decisions: null, Suggested: null, Updates: null },
      action: { processing: true, text: "Generating Decisions" },
    },
    { addMore: true },
  ],
];

/** Which ADR mock to show when opening a repo (matches Figma-style states). */
export const REPO_SLUG_TO_ADR_ID = {
  "on-prem": "0214",
  "auth-service": "0214",
  "web-client": "0212",
  "billing-core": "0213",
  "build-images": "0211",
  "data-pipelines": "0212",
  "ml-evals": "0213",
  "design-system": "0211",
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

/** Stats shown on Decisions repo card for a given slug. */
export function getDecisionsRepoStatsBySlug(repoSlug) {
  for (const row of DECISIONS_REPO_ROWS) {
    for (const cell of row) {
      if (cell && !cell.addMore && cell.slug === repoSlug) {
        return cell.stats ?? null;
      }
    }
  }
  return null;
}

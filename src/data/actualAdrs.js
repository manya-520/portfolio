const TIMELINE_PROGRESS = [
  { label: "Suggested", detail: "Based on 8 commits", done: true },
  { label: "Reviewed", detail: "By Manya & Nikhil", done: true },
  { label: "Approved", detail: "Pending team review", done: false },
  { label: "Synced to agents", detail: "Awaiting approval", done: false },
];

const TIMELINE_REVIEWED = [
  { label: "Suggested", detail: "Based on 12 commits", done: true },
  { label: "Reviewed", detail: "By Manya, 2h ago", done: true },
  { label: "Approved", detail: "By Nikhil, 30m ago", done: true },
  { label: "Synced to agents", detail: "Just now", done: true },
];

const TIMELINE_DRAFT = [
  { label: "Suggested", detail: "Based on 3 commits", done: true },
  { label: "Reviewed", detail: "Awaiting review", done: false },
  { label: "Approved", detail: "—", done: false },
  { label: "Synced to agents", detail: "—", done: false },
];

const AGENTS_DEFAULT = [
  { name: "Cursor", state: "In sync", tone: "success" },
  { name: "Copilot", state: "In sync", tone: "success" },
  { name: "Claude Code", state: "Pending", tone: "pending" },
];

const AGENTS_OUTDATED = [
  { name: "Cursor", state: "Updated", tone: "running" },
  { name: "Copilot", state: "Out of date", tone: "warning" },
  { name: "Claude Code", state: "In sync", tone: "success" },
];

/** Last segment of `href` — matches `[repoSlug]` routes */
export function adrSlugFromHref(href) {
  const pathOnly = href.replace(/\?.*/, "");
  const parts = pathOnly.replace(/\/+$/, "").split("/");
  return parts[parts.length - 1] ?? "";
}

/** Workspace sidebar links — disambiguate multiple ADRs per repo with `?id=`. */
export function adrWorkspaceHref(adr) {
  const slug = adr.repo.replace(/^actual-software\//, "");
  return `/work/actual/adr/${slug}?id=${encodeURIComponent(adr.id)}`;
}

export const ADRS = [
  {
    id: "0214",
    category: "Backend",
    title:
      "Move from monolithic auth service to per-tenant identity providers",
    suggestedBy: "Decisions Agent",
    suggestedAt: "2 hours ago",
    updatedAt: "10m ago",
    repo: "actual-software/on-prem",
    status: "In Review",
    statusTone: "running",
    primaryAction: "Approve & Sync",
    href: "/work/actual/adr/on-prem",
    /** Workspace sidebar + detail pill (same string both places). */
    activeDaysLabel: "Active for 16 days",
    scopePaths: [
      "services/auth/**/*",
      "packages/identity/**/*",
      "infra/kms/**/*",
    ],
    sections: [
      {
        title: "Context",
        body: `Auth latency has crossed our 250ms p99 SLO three times this quarter. The team has been discussing per-tenant identity in three RFCs, but no decision has been recorded.\n\nActual AI watched these commits:\n• feat(auth): scaffold tenant directory service\n• chore(auth): remove shared JWT issuer\n• fix(auth): bypass cache for enterprise plans`,
      },
      {
        title: "Decision",
        body: "Adopt per-tenant identity providers for all enterprise plans. The shared JWT issuer remains for self-serve plans. Cursor and Copilot will be told to suggest tenant-aware patterns when working in /services/auth.",
      },
      {
        title: "Consequences",
        body: "+ Brings p99 auth latency under SLO\n+ Enterprise customers can BYOK to their IdP\n− Requires migration playbook for existing self-serve workspaces",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0214-02",
    category: "Security",
    title:
      "Require hardware-backed keys for production signing operations",
    suggestedBy: "Decisions Agent",
    suggestedAt: "1 week ago",
    updatedAt: "3d ago",
    repo: "actual-software/on-prem",
    status: "Synced",
    statusTone: "success",
    primaryAction: "View in repo",
    href: "/work/actual/adr/on-prem",
    activeDaysLabel: "Active for 17 days",
    scopePaths: [
      "infra/kms/**/*",
      "infra/hsm/**/*",
      "services/signing/**/*",
    ],
    sections: [
      {
        title: "Context",
        body: "Teams asked for one signing policy after the last compliance review highlighted divergent practices.",
      },
      {
        title: "Decision",
        body: "Production artifacts must be signed with hardware-backed keys in the approved HSM partition.",
      },
      {
        title: "Consequences",
        body: "+ Stronger non-repudiation\n+ Aligns with SOC2-style controls\n− Higher onboarding friction for new services",
      },
    ],
    timeline: TIMELINE_REVIEWED,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0214-03",
    category: "Backend",
    title:
      "Standardize on protobuf contracts for all north–south API boundaries",
    suggestedBy: "Decisions Agent",
    suggestedAt: "4 days ago",
    updatedAt: "1d ago",
    repo: "actual-software/on-prem",
    status: "In Review",
    statusTone: "running",
    primaryAction: "Approve & Sync",
    href: "/work/actual/adr/on-prem",
    activeDaysLabel: "Active for 18 days",
    scopePaths: [
      "api/**/*",
      "proto/**/*",
      "services/**/*",
    ],
    sections: [
      {
        title: "Context",
        body: "REST payloads drifted between services; codegen and versioning became a recurring review theme.",
      },
      {
        title: "Decision",
        body: "New external-facing APIs ship with versioned protobuf schemas and a published breaking-change policy.",
      },
      {
        title: "Consequences",
        body: "+ Safer evolution of payloads\n+ Better codegen for clients\n− Migration tax on legacy JSON endpoints",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0214-04",
    category: "Infra",
    title:
      "Run stateless workers on spot with bounded checkpoint intervals",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Yesterday",
    updatedAt: "6h ago",
    repo: "actual-software/on-prem",
    status: "Draft",
    statusTone: "pending",
    primaryAction: "Continue draft",
    href: "/work/actual/adr/on-prem",
    activeDaysLabel: "Active for 19 days",
    scopePaths: [
      "infra/terraform/**/*",
      "services/workers/**/*",
      "packages/checkpointing/**/*",
    ],
    sections: [
      {
        title: "Context",
        body: "Batch spend grew faster than interactive workloads; teams want cheaper fleets without silent data loss.",
      },
      {
        title: "Decision",
        body: "Eligible workers move to spot instances with checkpoints at most every five minutes of wall time.",
      },
      {
        title: "Consequences",
        body: "+ Lower run cost\n+ Predictable retry semantics\n− Requires durable checkpoint storage",
      },
    ],
    timeline: TIMELINE_DRAFT,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0213",
    category: "Frontend",
    title: "Standardize on TanStack Query for server state across web surfaces",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Yesterday",
    updatedAt: "2h ago",
    repo: "actual-software/web-platform",
    status: "Synced",
    statusTone: "success",
    primaryAction: "View in repo",
    href: "/work/actual/adr/web-platform",
    activeDaysLabel: "Active for 14 days",
    sections: [
      {
        title: "Context",
        body: "Three different data-fetching patterns appeared in the last 30 PRs. Actual AI noticed inconsistent error handling and stale caches.",
      },
      {
        title: "Decision",
        body: "All new server-state fetches go through TanStack Query. SWR is allowed only behind a feature flag and should be removed by the next release.",
      },
      {
        title: "Consequences",
        body: "+ Single source of truth for cache invalidation\n+ Consistent loading and error states\n− Migration cost on the legacy /admin surface",
      },
    ],
    timeline: TIMELINE_REVIEWED,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0213-02",
    category: "Frontend",
    title:
      "Co-locate design tokens with component packages to prevent drift",
    suggestedBy: "Decisions Agent",
    suggestedAt: "3 days ago",
    updatedAt: "12h ago",
    repo: "actual-software/web-platform",
    status: "In Review",
    statusTone: "running",
    primaryAction: "Approve & Sync",
    href: "/work/actual/adr/web-platform",
    activeDaysLabel: "Active for 15 days",
    sections: [
      {
        title: "Context",
        body: "Three shades of “brand blue” shipped in different packages last sprint.",
      },
      {
        title: "Decision",
        body: "Design tokens live beside the components that consume them; no duplicate token JSON outside those roots.",
      },
      {
        title: "Consequences",
        body: "+ Fewer visual regressions\n+ Clear ownership\n− Requires CI guardrails on copies",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0213-03",
    category: "Accessibility",
    title:
      "Block merges when axe fails on changed routes in CI",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Last week",
    updatedAt: "2d ago",
    repo: "actual-software/web-platform",
    status: "Synced",
    statusTone: "success",
    primaryAction: "View in repo",
    href: "/work/actual/adr/web-platform",
    activeDaysLabel: "Active for 21 days",
    sections: [
      {
        title: "Context",
        body: "Manual audits caught issues too late; regressions slipped through visual QA.",
      },
      {
        title: "Decision",
        body: "PRs touching routed surfaces must pass axe in CI with zero critical violations.",
      },
      {
        title: "Consequences",
        body: "+ Earlier fixes\n+ Shared baseline\n− Flaky tests need tending",
      },
    ],
    timeline: TIMELINE_REVIEWED,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0213-04",
    category: "Frontend",
    title:
      "Prefer CSS layers over !important for third-party style overrides",
    suggestedBy: "Decisions Agent",
    suggestedAt: "5 days ago",
    updatedAt: "1d ago",
    repo: "actual-software/web-platform",
    status: "Draft",
    statusTone: "pending",
    primaryAction: "Continue draft",
    href: "/work/actual/adr/web-platform",
    activeDaysLabel: "Active for 22 days",
    sections: [
      {
        title: "Context",
        body: "Widget embeds fought the host app with escalating specificity arms races.",
      },
      {
        title: "Decision",
        body: "Use cascade layers for vendor vs app styles instead of !important except in documented escapes.",
      },
      {
        title: "Consequences",
        body: "+ Predictable overrides\n+ Easier debugging\n− Requires training on layers",
      },
    ],
    timeline: TIMELINE_DRAFT,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0212",
    category: "Infra",
    title: "All long-running jobs move to Temporal workflows",
    suggestedBy: "Decisions Agent",
    suggestedAt: "3 days ago",
    updatedAt: "1d ago",
    repo: "actual-software/agents-runtime",
    status: "Updates Available",
    statusTone: "warning",
    primaryAction: "Review changes",
    href: "/work/actual/adr/agents-runtime",
    updatesAvailable: true,
    activeDaysLabel: "Active for 23 days",
    sections: [
      {
        title: "Context",
        body: "Job orchestration is split between Sidekiq, BullMQ, and a homegrown scheduler. Three incidents in the last quarter were caused by retries firing twice.",
      },
      {
        title: "Decision",
        body: "Temporal becomes the single workflow engine. Existing Sidekiq jobs will be migrated under a feature flag. New work cannot land on BullMQ.",
      },
      {
        title: "Consequences",
        body: "+ Idempotency by default\n+ Easier on-call (one dashboard)\n− Requires Temporal cluster ops investment",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_OUTDATED,
  },
  {
    id: "0212-02",
    category: "Infra",
    title:
      "Cap retry budgets per workflow ID to stop thundering herds",
    suggestedBy: "Decisions Agent",
    suggestedAt: "2 days ago",
    updatedAt: "8h ago",
    repo: "actual-software/agents-runtime",
    status: "Synced",
    statusTone: "success",
    primaryAction: "View in repo",
    href: "/work/actual/adr/agents-runtime",
    activeDaysLabel: "Active for 24 days",
    sections: [
      {
        title: "Context",
        body: "Incident replay showed identical failures retrying thousands of times across shards.",
      },
      {
        title: "Decision",
        body: "Each workflow ID gets a sliding retry budget; breaches surface as explicit operator tasks.",
      },
      {
        title: "Consequences",
        body: "+ Protects shared queues\n+ Faster blame isolation\n− Requires tuning dashboards",
      },
    ],
    timeline: TIMELINE_REVIEWED,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0212-03",
    category: "Observability",
    title:
      "Attach workflow run IDs to every structured log line",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Yesterday",
    updatedAt: "4h ago",
    repo: "actual-software/agents-runtime",
    status: "Updates Available",
    statusTone: "warning",
    primaryAction: "Review changes",
    href: "/work/actual/adr/agents-runtime",
    updatesAvailable: true,
    activeDaysLabel: "Active for 25 days",
    sections: [
      {
        title: "Context",
        body: "On-call struggled to stitch logs across activities during the last regional degradation.",
      },
      {
        title: "Decision",
        body: "Structured logs must include workflow run ID and activity name on every line emitted inside workers.",
      },
      {
        title: "Consequences",
        body: "+ Faster correlation\n+ Cleaner traces\n− Some legacy printf paths need wrapping",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_OUTDATED,
  },
  {
    id: "0212-04",
    category: "Security",
    title:
      "Deny plaintext secrets in workflow payloads at serialization time",
    suggestedBy: "Decisions Agent",
    suggestedAt: "6 days ago",
    updatedAt: "2d ago",
    repo: "actual-software/agents-runtime",
    status: "In Review",
    statusTone: "running",
    primaryAction: "Approve & Sync",
    href: "/work/actual/adr/agents-runtime",
    activeDaysLabel: "Active for 26 days",
    sections: [
      {
        title: "Context",
        body: "A dry-run nearly persisted an API key inside workflow history.",
      },
      {
        title: "Decision",
        body: "Serialization hooks scan for high-entropy patterns and block persistence unless allow-listed.",
      },
      {
        title: "Consequences",
        body: "+ Fewer accidental leaks\n+ Safer replays\n− False positives need exemptions",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0211",
    category: "Data",
    title: "Embeddings stored in pgvector, not a separate vector DB",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Last week",
    updatedAt: "5d ago",
    repo: "actual-software/design-system",
    status: "Draft",
    statusTone: "pending",
    primaryAction: "Continue draft",
    href: "/work/actual/adr/design-system",
    activeDaysLabel: "Active for 11 days",
    sections: [
      {
        title: "Context",
        body: "Two services started experimenting with vector search using different stores (Pinecone, Qdrant). Engineering noticed cost and ops overhead growing fast.",
      },
      {
        title: "Decision",
        body: "Use Postgres + pgvector for everything under 5M vectors. Revisit when a workload exceeds that threshold for two consecutive months.",
      },
      {
        title: "Consequences",
        body: "+ One database to back up, monitor, patch\n+ Joins between rows and embeddings stay simple\n− Caps us at ~5M vectors per use case before reconsideration",
      },
    ],
    timeline: TIMELINE_DRAFT,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0211-02",
    category: "Frontend",
    title:
      "Ship component APIs as stable slots instead of prop explosion",
    suggestedBy: "Decisions Agent",
    suggestedAt: "4 days ago",
    updatedAt: "1d ago",
    repo: "actual-software/design-system",
    status: "In Review",
    statusTone: "running",
    primaryAction: "Approve & Sync",
    href: "/work/actual/adr/design-system",
    activeDaysLabel: "Active for 12 days",
    sections: [
      {
        title: "Context",
        body: "High-traffic components accrued dozens of optional props with overlapping concerns.",
      },
      {
        title: "Decision",
        body: "New compound components expose named slots with documented contracts instead of growing flat props.",
      },
      {
        title: "Consequences",
        body: "+ Clearer composition\n+ Easier versioning\n− Migration guides for older APIs",
      },
    ],
    timeline: TIMELINE_PROGRESS,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0211-03",
    category: "Documentation",
    title:
      "Require Storybook interaction tests for interactive primitives",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Last week",
    updatedAt: "3d ago",
    repo: "actual-software/design-system",
    status: "Synced",
    statusTone: "success",
    primaryAction: "View in repo",
    href: "/work/actual/adr/design-system",
    activeDaysLabel: "Active for 13 days",
    sections: [
      {
        title: "Context",
        body: "Keyboard regressions shipped because snapshots missed focus behavior.",
      },
      {
        title: "Decision",
        body: "Primitives with focus traps or roving tabindex ship Storybook interaction coverage in CI.",
      },
      {
        title: "Consequences",
        body: "+ Safer a11y releases\n+ Living examples\n− Slightly slower CI",
      },
    ],
    timeline: TIMELINE_REVIEWED,
    agents: AGENTS_DEFAULT,
  },
  {
    id: "0211-04",
    category: "Data",
    title:
      "Version embedding migrations alongside model cards",
    suggestedBy: "Decisions Agent",
    suggestedAt: "Yesterday",
    updatedAt: "10h ago",
    repo: "actual-software/design-system",
    status: "Draft",
    statusTone: "pending",
    primaryAction: "Continue draft",
    href: "/work/actual/adr/design-system",
    activeDaysLabel: "Active for 20 days",
    sections: [
      {
        title: "Context",
        body: "Teams couldn’t tell which schema matched which shipped model in prod.",
      },
      {
        title: "Decision",
        body: "Embedding tables carry an explicit model-card revision that matches the inference bundle.",
      },
      {
        title: "Consequences",
        body: "+ Traceable behavior\n+ Cleaner rollbacks\n− More bookkeeping",
      },
    ],
    timeline: TIMELINE_DRAFT,
    agents: AGENTS_DEFAULT,
  },
];

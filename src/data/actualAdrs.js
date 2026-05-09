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
];

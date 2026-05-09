import ActualLayout from "@/components/actual/ActualLayout";
import {
  ActionLink,
  BrowseCategoryChip,
  RepoCardEmpty,
  RepoCardStats,
  StatusChip,
} from "@/components/actual/Primitives";
import RightRail from "@/components/actual/RightRail";
import WelcomeCard from "@/components/actual/WelcomeCard";

const ACTIVE_REPO_CARDS = [
  {
    key: "solaris",
    kind: "stats",
    variant: "review-pr",
    owner: "actual-solaris",
    repo: "inference-api",
    href: "/work/actual/adr/on-prem",
    stats: [
      { label: "Decisions", value: "67" },
      { label: "Suggested", value: "14" },
      { label: "Updates", value: "9" },
    ],
  },
  {
    key: "apex",
    kind: "stats",
    variant: "in-sync",
    owner: "actual-apex",
    repo: "workflow-engine",
    stats: [
      { label: "Decisions", value: "34" },
      { label: "Suggested", value: "11" },
      { label: "Updates", value: "3" },
    ],
  },
  {
    key: "nebula",
    kind: "empty",
    owner: "actual-nebula",
    repo: "stream-processor",
  },
  {
    key: "orbit",
    kind: "stats",
    variant: "review-pr",
    owner: "actual-orbit",
    repo: "contracts-svc",
    href: "/work/actual/adr/web-platform",
    stats: [
      { label: "Decisions", value: "52" },
      { label: "Suggested", value: "19" },
      { label: "Updates", value: "6" },
    ],
  },
  {
    key: "quartz",
    kind: "stats",
    variant: "in-sync",
    owner: "actual-quartz",
    repo: "ci-metrics",
    stats: [
      { label: "Decisions", value: "21" },
      { label: "Suggested", value: "7" },
      { label: "Updates", value: "2" },
    ],
  },
  {
    key: "vector",
    kind: "empty",
    owner: "actual-vector",
    repo: "edge-cache",
  },
];

export default function ActualHome() {
  return (
    <ActualLayout breadcrumb={["Home"]}>
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-6 pt-6 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6 xl:max-w-[1128px]">
          <WelcomeCard />

          <section>
            <div className="flex items-center justify-between py-1">
              <h3 className="text-typ-body font-semibold text-actual-ink">
                Active Repositories
              </h3>
              <ActionLink href="/work/actual/adr">View All 18</ActionLink>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {ACTIVE_REPO_CARDS.map((c) => (
                <div key={c.key} className="h-full min-h-0 min-w-0">
                  {c.kind === "empty" ? (
                    <RepoCardEmpty owner={c.owner} repo={c.repo} />
                  ) : (
                    <RepoCardStats
                      owner={c.owner}
                      repo={c.repo}
                      stats={c.stats}
                      action={
                        c.variant === "review-pr" ? (
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <BrowseCategoryChip />
                            <ActionLink href={c.href}>Review PR</ActionLink>
                          </div>
                        ) : (
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <BrowseCategoryChip />
                            <StatusChip tone="success">In Sync</StatusChip>
                          </div>
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>

        <RightRail done={0} />
      </div>
    </ActualLayout>
  );
}

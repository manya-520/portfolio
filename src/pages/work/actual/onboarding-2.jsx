import dynamic from "next/dynamic";

import ActualLayout from "@/components/actual/ActualLayout";

const ContributionSection = dynamic(
  () => import("@/components/actual/ContributionSection"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[320px] rounded-lg border border-actual-divider bg-actual-subtle/50"
        aria-hidden
      />
    ),
  }
);
import FeatureReportCards from "@/components/actual/FeatureReportCards";
import { ArrowUpRightIcon } from "@/components/actual/Icons";
import {
  ActionLink,
  BrowseCategoryChip,
  RepoCardEmpty,
  RepoCardStats,
  StatusChip,
} from "@/components/actual/Primitives";
import RightRail from "@/components/actual/RightRail";
import WelcomeCard from "@/components/actual/WelcomeCard";

const STAGES = [
  {
    key: "discovery",
    label: "Discovery",
    chipTone: "success",
    chip: "Complete",
    rows: [{ value: "1,409", caption: "Files found for analysis" }],
  },
  {
    key: "analysis",
    label: "Analysis",
    chipTone: "running",
    chip: "Running",
    rows: [
      { value: "284", caption: "Architectural evidence gathered" },
      { value: "12", caption: "Patterns recognized" },
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

const ACTIVE_REPO_CARDS = [
  {
    key: "harbor",
    kind: "stats",
    variant: "review-pr",
    owner: "actual-harbor",
    repo: "auth-service",
    href: "/work/actual/adr/on-prem",
    stats: [
      { label: "Decisions", value: "12" },
      { label: "Suggested", value: "4" },
      { label: "Updates", value: "2" },
    ],
  },
  {
    key: "cascade",
    kind: "stats",
    variant: "review-pr",
    owner: "actual-cascade",
    repo: "web-client",
    href: "/work/actual/adr/agents-runtime",
    stats: [
      { label: "Decisions", value: "41" },
      { label: "Suggested", value: "16" },
      { label: "Updates", value: "5" },
    ],
  },
  {
    key: "ledger",
    kind: "stats",
    variant: "in-sync",
    owner: "actual-ledger",
    repo: "billing-core",
    stats: [
      { label: "Decisions", value: "8" },
      { label: "Suggested", value: "3" },
      { label: "Updates", value: "1" },
    ],
  },
  {
    key: "nimbus",
    kind: "stats",
    variant: "in-sync",
    owner: "actual-software",
    repo: "on-prem",
    stats: [
      { label: "Decisions", value: "24" },
      { label: "Suggested", value: "6" },
      { label: "Updates", value: "2" },
    ],
  },
  {
    key: "forge",
    kind: "empty",
    owner: "actual-forge",
    repo: "build-images",
  },
  {
    key: "stratum",
    kind: "empty",
    owner: "actual-stratum",
    repo: "data-pipelines",
  },
];

export default function ActualOnboarding2() {
  return (
    <ActualLayout breadcrumb={["Home"]}>
      <div className="mx-auto flex w-full max-w-[1680px] flex-col gap-6 px-6 pt-6 xl:flex-row xl:items-start">
        <div className="flex min-w-0 flex-1 flex-col gap-6 xl:max-w-[1128px]">
          <WelcomeCard
            stages={STAGES}
            syncStatus="Repository Sync Complete"
            animated
          />

          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
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
                            <StatusChip tone="running">
                              <span className="inline-flex items-center gap-1">
                                Review PR
                                <ArrowUpRightIcon size={12} className="shrink-0" />
                              </span>
                            </StatusChip>
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

          <ContributionSection />
          <FeatureReportCards />
        </div>

        <RightRail />
      </div>
    </ActualLayout>
  );
}

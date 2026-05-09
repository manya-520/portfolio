import ActualLayout from "@/components/actual/ActualLayout";
import ADRDetailPanel from "@/components/actual/adr/ADRDetailPanel";
import { ADRS } from "@/data/actualAdrs";
import {
  getDecisionsRepoSlugs,
  REPO_SLUG_TO_ADR_ID,
} from "@/data/decisionsRepos";

export async function getStaticPaths() {
  return {
    paths: getDecisionsRepoSlugs().map((repoSlug) => ({
      params: { repoSlug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const adrId = REPO_SLUG_TO_ADR_ID[params.repoSlug] ?? ADRS[0].id;
  return {
    props: {
      adrId,
    },
  };
}

export default function RepoADRDetail({ adrId }) {
  const adr = ADRS.find((a) => a.id === adrId) ?? ADRS[0];
  const breadcrumb = ["Home", "Decisions", adr.repo];

  return (
    <ActualLayout
      breadcrumb={breadcrumb}
      title={`Decisions · ${adr.repo} · Actual AI`}
    >
      <div className="mx-auto w-full max-w-[1680px] px-6 pb-8 pt-6">
        <ADRDetailPanel adr={adr} />
      </div>
    </ActualLayout>
  );
}

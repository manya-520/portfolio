import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";

import ActualLayout from "@/components/actual/ActualLayout";
import ADRWorkspaceView from "@/components/actual/adr/ADRWorkspaceView";
import { ADRS } from "@/data/actualAdrs";
import {
  fetchScopeOverridesFromApi,
  loadScopeOverrides,
  patchScopeOverrideOnApi,
  persistScopeOverrides,
} from "@/lib/adrScopeStorage";
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
  const repoSlug = params.repoSlug;
  const adrId = REPO_SLUG_TO_ADR_ID[repoSlug] ?? ADRS[0].id;
  return {
    props: {
      adrId,
      repoSlug,
    },
  };
}

export default function RepoADRDetail({ adrId, repoSlug }) {
  const router = useRouter();
  const repo = `actual-software/${repoSlug}`;

  const listAdrs = useMemo(
    () => ADRS.filter((a) => a.repo === repo),
    [repo]
  );

  const defaultAdr = useMemo(
    () =>
      ADRS.find((a) => a.id === adrId) ?? listAdrs[0] ?? ADRS[0],
    [adrId, listAdrs]
  );

  const [queryAdrId, setQueryAdrId] = useState(null);

  useEffect(() => {
    const q = router.query.id;
    if (typeof q !== "string") {
      setQueryAdrId(null);
      return;
    }
    if (!listAdrs.some((a) => a.id === q)) {
      setQueryAdrId(null);
      return;
    }
    setQueryAdrId(q);
  }, [router.query.id, listAdrs]);

  const adr = useMemo(() => {
    if (queryAdrId) {
      const hit = listAdrs.find((a) => a.id === queryAdrId);
      if (hit) return hit;
    }
    return defaultAdr;
  }, [queryAdrId, listAdrs, defaultAdr]);

  const [scopeOverrides, setScopeOverrides] = useState({});
  useEffect(() => {
    setScopeOverrides(loadScopeOverrides());
  }, []);

  const resolvedScopePaths = useMemo(() => {
    const saved = scopeOverrides[adr.id];
    if (saved !== undefined) return saved;
    return adr.scopePaths ?? [];
  }, [adr.id, adr.scopePaths, scopeOverrides]);

  const [scopeDraftPaths, setScopeDraftPaths] = useState(null);

  useEffect(() => {
    setScopeDraftPaths(null);
  }, [adr.id]);

  const scopeEditing = scopeDraftPaths !== null;
  const canEditScopes = Array.isArray(adr.scopePaths);

  const startScopeEdit = () => {
    if (!canEditScopes) return;
    setScopeDraftPaths([...resolvedScopePaths]);
  };

  const removeScopeDraftPath = (path) => {
    setScopeDraftPaths((prev) =>
      prev ? prev.filter((p) => p !== path) : prev
    );
  };

  const saveScopeDraft = async () => {
    if (!scopeDraftPaths) return;
    const next = { ...scopeOverrides, [adr.id]: scopeDraftPaths };
    try {
      await patchScopeOverrideOnApi(adr.id, scopeDraftPaths);
    } catch (e) {
      console.warn("ADR scopes API unavailable; saved locally only.", e);
    }
    setScopeOverrides(next);
    persistScopeOverrides(next);
    setScopeDraftPaths(null);
  };

  const cancelScopeDraft = () => setScopeDraftPaths(null);

  const breadcrumb = ["Home", "Decisions", adr.repo];

  return (
    <ActualLayout
      breadcrumb={breadcrumb}
      title={`Decisions · ${adr.repo} · Actual AI`}
    >
      <ADRWorkspaceView
        selectedAdrId={adr.id}
        adr={adr}
        listAdrs={listAdrs}
        resolvedScopePaths={resolvedScopePaths}
        scopeEdit={{
          active: scopeEditing,
          draftPaths: scopeDraftPaths,
          canEdit: canEditScopes,
          onStartEdit: startScopeEdit,
          onRemovePath: removeScopeDraftPath,
          onSave: saveScopeDraft,
          onCancel: cancelScopeDraft,
        }}
      />
    </ActualLayout>
  );
}

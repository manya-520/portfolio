/** Browser persistence for edited ADR scope paths (prototype until a real API exists). */
export const ADR_SCOPE_STORAGE_KEY = "portfolio-adr-scope-paths";

export function loadScopeOverrides() {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(ADR_SCOPE_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed;
    }
    return {};
  } catch {
    return {};
  }
}

export function persistScopeOverrides(map) {
  if (typeof window === "undefined") return;
  localStorage.setItem(ADR_SCOPE_STORAGE_KEY, JSON.stringify(map));
}

/** GET full override map from Next API (empty object if unavailable). */
export async function fetchScopeOverridesFromApi() {
  try {
    const r = await fetch("/api/adr/scopes");
    if (!r.ok) return null;
    const data = await r.json();
    if (data && typeof data === "object" && !Array.isArray(data)) {
      return data;
    }
    return null;
  } catch {
    return null;
  }
}

/** Persist one ADR's scope paths via Next API. */
export async function patchScopeOverrideOnApi(adrId, paths) {
  const r = await fetch("/api/adr/scopes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ adrId, paths }),
  });
  if (!r.ok) {
    const err = await r.json().catch(() => ({}));
    throw new Error(err.error ?? `ADR scopes API ${r.status}`);
  }
  return r.json();
}

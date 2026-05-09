import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export function normalizeActualPath(asPath) {
  const base = asPath.split("?")[0].split("#")[0];
  if (base.length > 1 && base.endsWith("/")) return base.slice(0, -1);
  return base;
}

/**
 * `router.asPath` can differ between SSR and the first client render during hydration.
 * Defer path-dependent UI (active nav, labels) until after mount so server and client match.
 */
export function useHydratedActualPath() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const path = mounted ? normalizeActualPath(router.asPath) : null;

  return { path, mounted };
}

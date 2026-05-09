import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectADRChanges() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/work/actual/adr/agents-runtime");
  }, [router]);
  return null;
}

import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectADRUpdated() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/work/actual/adr/web-platform");
  }, [router]);
  return null;
}

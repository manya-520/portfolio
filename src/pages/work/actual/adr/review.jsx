import { useRouter } from "next/router";
import { useEffect } from "react";

export default function RedirectADRReview() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/work/actual/adr/design-system");
  }, [router]);
  return null;
}

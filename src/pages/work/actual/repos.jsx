import ActualLayout from "@/components/actual/ActualLayout";
import { useRouter } from "next/router";
import { useEffect } from "react";

/** Legacy route; Decisions lives at /work/actual/adr */
export default function ReposRedirect() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/work/actual/adr");
  }, [router]);

  return (
    <ActualLayout breadcrumb={["Home", "Decisions"]} title="Decisions · Actual AI">
      <div className="flex min-h-[40vh] items-center justify-center text-sm text-[#64748b]">
        Redirecting to Decisions…
      </div>
    </ActualLayout>
  );
}

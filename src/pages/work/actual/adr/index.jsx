import ActualLayout from "@/components/actual/ActualLayout";
import DecisionsReposView from "@/components/actual/DecisionsReposView";

export default function DecisionsIndex() {
  return (
    <ActualLayout
      breadcrumb={["Home", "Decisions"]}
      title="Architecture Decision Records · Actual AI"
    >
      <DecisionsReposView />
    </ActualLayout>
  );
}

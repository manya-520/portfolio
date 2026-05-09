import ActualLayout from "@/components/actual/ActualLayout";
import DecisionsReposView from "@/components/actual/DecisionsReposView";

export default function DecisionsIndex() {
  return (
    <ActualLayout breadcrumb={["Home", "Decisions"]} title="Decisions · Actual AI">
      <DecisionsReposView />
    </ActualLayout>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { CmmCodesManagement } from "@/components/Cmm/deleteCmmCodeCard";
import { CodegenCard } from "@/components/custom/codegen-card";

export const Route = createFileRoute("/cmm")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-dvh w-full flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 place-items-center">
        <CodegenCard prefix="CMM" />
        <CmmCodesManagement />
      </div>
    </div>
  );
}

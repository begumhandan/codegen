import { createFileRoute } from "@tanstack/react-router";
import { CodegenCard } from "@/components/custom/codegen-card";
import { CodeTable } from "@/components/custom/code-table";

export const Route = createFileRoute("/elektriksel_test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-black h-dvh w-full flex items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 md:p-10 ">
        <CodegenCard prefix="ET" />
        <CodeTable prefix="ET" />
      </div>
    </div>
  );
}

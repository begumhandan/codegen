import { createFileRoute } from "@tanstack/react-router";
import { Cmm } from "@/components/cmm";

export const Route = createFileRoute("/cmm")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Cmm />
    </div>
  );
}

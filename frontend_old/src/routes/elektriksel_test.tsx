import { createFileRoute } from "@tanstack/react-router";
import { ElektrikselTest } from "@/components/elektrikselTest";
export const Route = createFileRoute("/elektriksel_test")({
  component: RouteComponent,
});
function RouteComponent() {
  return <ElektrikselTest />;
}

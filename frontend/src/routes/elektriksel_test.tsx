import { createFileRoute } from "@tanstack/react-router";
import { ElektrikselTest } from "@/components/elektrikselTest";
import { Header } from "@/components/layout/header";

export const Route = createFileRoute("/elektriksel_test")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />

      <ElektrikselTest />
    </div>
  );
}

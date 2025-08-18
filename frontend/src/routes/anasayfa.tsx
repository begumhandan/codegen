import { createFileRoute } from "@tanstack/react-router";
import { Anasayfa } from "@/components/anasayfa";

export const Route = createFileRoute("/anasayfa")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Anasayfa />
    </div>
  );
}

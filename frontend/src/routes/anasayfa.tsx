import { createFileRoute } from "@tanstack/react-router";
import { Anasayfa } from "@/components/anasayfa";
import { Header } from "@/components/layout/header";

export const Route = createFileRoute("/anasayfa")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Header />
      <Anasayfa />
    </div>
  );
}

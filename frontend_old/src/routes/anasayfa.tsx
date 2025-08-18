import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/anasayfa")({
  component: () => {
    return <Button variant="default">TEST</Button>;
  },
});

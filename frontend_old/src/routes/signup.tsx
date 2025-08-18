import { createFileRoute } from "@tanstack/react-router";
import { Signup } from "@/components/signup";

export const Route = createFileRoute("/signup")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a
          href=""
          className="flex items-center gap-2 self-center font-medium"
        ></a>
        <Signup />
      </div>
    </div>
  );
}

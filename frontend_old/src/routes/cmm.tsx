import { createFileRoute } from "@tanstack/react-router";
import { Cmm } from "../components/Cmm";

export const Route = createFileRoute("/cmm")({
  component: () => {
    return (
      <div className="w-full p-6">
        <Cmm />
      </div>
    );
  },
});

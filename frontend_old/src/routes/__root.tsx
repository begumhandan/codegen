import { createRootRoute, Outlet } from "@tanstack/react-router";
import { DefaultLayout } from "../layouts/default";

export const Route = createRootRoute({
  component: () => (
    <>
      <DefaultLayout>
        <Outlet />
      </DefaultLayout>
    </>
  ),
});

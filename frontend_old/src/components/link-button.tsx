import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";

type Props = ComponentProps<typeof Button> &
  Pick<ComponentProps<typeof Link>, "to">;

export const LinkButton = ({ to, children, ...props }: Props) => {
  return (
    <Button asChild {...props}>
      <Link to={to}>{children}</Link>
    </Button>
  );
};

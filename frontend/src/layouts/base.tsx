import type { ReactNode } from "react";

import { Toaster } from "@/components/ui/sonner";

interface BaseLayoutProps {
  children: ReactNode;
}

export function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <>
      {children}
      <Toaster />
    </>
  );
}

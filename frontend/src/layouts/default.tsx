import { Header } from "@/components/layout/header";
import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

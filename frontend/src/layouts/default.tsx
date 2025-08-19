import { Header } from "@/components/layout/header";
import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="bg-[#fcfcf8]">
      <Header />
      <main>{children}</main>
    </div>
  );
}

import type { ReactNode } from "react";

interface DefaultLayoutProps {
  children: ReactNode;
}

export function DefaultLayout({ children }: DefaultLayoutProps) {
  return (
    <div className="bg-[#fcfcf8] h-screen overflow-hidden">
      <main>{children}</main>
    </div>
  );
}

import { GoPrevButton } from "@/components/prevbutton";
import { LinkButton } from "./anasayfabutton";

export function Anasayfa() {
  const buttons = [
    {
      href: "/cmm",
      title: "CMM",
      bgColor: "bg-blue-50",
    },
    {
      href: "/elektriksel_test",
      title: "Elektriksel Test",
      bgColor: "bg-green-50",
    },
    {
      href: "/sayfa3",
      title: "Test",
      bgColor: "bg-yellow-50",
    },
    {
      href: "/sayfa4",
      title: "Test",
      bgColor: "bg-red-50",
    },
    {
      href: "/sayfa5",
      title: "Test",
      bgColor: "bg-indigo-50",
    },
    {
      href: "/sayfa6",
      title: "Test",
      bgColor: "bg-pink-50",
    },
    {
      href: "/sayfa7",
      title: "Test",
      bgColor: "bg-teal-50",
    },
    {
      href: "/sayfa8",
      title: "Test",
      bgColor: "bg-orange-50",
    },
    {
      href: "/sayfa9",
      title: "Test",
      bgColor: "bg-gray-50",
    },
  ];

  return (
    <div className="flex h-full">
      <div className="justify-center w-full h-[calc(100vh-64px)] flex items-center p-4">
        <div className="w-full max-w-7xl h-full max-h-screen flex items-center justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 h-full w-full items-center">
            {buttons.map((button, index) => (
              <LinkButton key={index} href={button.href} title={button.title} bgColor={button.bgColor} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

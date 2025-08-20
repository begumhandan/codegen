import type { FC, PropsWithChildren } from "react";
import DropdownMenuUserMenuDemo from "@/components/userprofiles";

export const Header: FC<PropsWithChildren> = () => {
  //   const goNext = useGoNext();
  //   const goPrev = useGoPrev();
  //   const { currentIndex, pages } = useNavigatePages();
  return (
    <div className=" flex justify-start h-27 ">
      <div className="w-full flex justify-end">
        <DropdownMenuUserMenuDemo />

        {/* Left Arrow
      <button
        onClick={goPrev}
        disabled={currentIndex <= 0}
        className="bg-[#f4f2f0] transform-translate z-10 hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center rounded-sm"
      >
        &lt;
      </button>
      {/* Right Arrow */}
        {/* <button
        onClick={goNext}
        disabled={currentIndex >= pages.length - 1}
        className="bg-[#f4f2f0] transform-translate z-10 hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center rounded-sm"
      >
        &gt;
      </button> */}
      </div>
    </div>
  );
};

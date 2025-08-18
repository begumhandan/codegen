import type { FC, PropsWithChildren } from "react";
import { useGoNext } from "../hooks/useGoNext";
import { useGoPrev } from "../hooks/useGoPrev";
import { useNavigatePages } from "../hooks/useNavigatePages";

export const Header: FC<PropsWithChildren> = () => {
  const goNext = useGoNext();
  const goPrev = useGoPrev();
  const { currentIndex, pages } = useNavigatePages();
  return (
    <div className="grid grid-cols-2 gap-2 min-h-11 ">
      {/* Left Arrow */}
      <button
        onClick={goPrev}
        disabled={currentIndex <= 0}
        className=" bg-[#f4f2f0]  transform-translate z-10 hover:shadow-lg transition-shadow border border-gray-200 flex items-center justify-center"
      >
        &lt;
      </button>
      {/* Right Arrow */}
      <button
        onClick={goNext}
        disabled={currentIndex >= pages.length - 1}
        className="bg-[#f4f2f0]  transform-translate z-10 hover:shadow-lg transition-shadow border border-gray-200"
      >
        &gt;
      </button>
    </div>
  );
};

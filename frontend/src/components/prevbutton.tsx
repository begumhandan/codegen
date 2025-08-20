import { useGoPrev } from "@/components/hooks/useGoPrev";
import { useNavigatePages } from "@/components/hooks/useNavigatePages";

export const GoPrevButton = () => {
  const goPrev = useGoPrev();
  const { currentIndex, pages } = useNavigatePages();

  return (
    <div className="flex-none p-3">
      {/* Left Arrow Button */}
      <button
        onClick={goPrev}
        disabled={currentIndex <= 0}
        className={`
          w-20 h-20 
          bg-white 
          border border-gray-300 
          rounded-xl 
          flex items-center justify-center 
          text-gray-600 
          text-lg font-bold
          transition-all duration-200
          ${
            currentIndex <= 0
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-gray-50 hover:border-gray-400 hover:shadow-md active:scale-95"
          }
        `}
        aria-label="Previous page"
      >
        &lt;
      </button>
    </div>
  );
};

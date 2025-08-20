import { useNavigate } from "@tanstack/react-router";
import { useNavigatePages } from "./useNavigatePages";

export const useGoPrev = () => {
  const navigate = useNavigate();
  const { currentIndex } = useNavigatePages();
  const goPrev = () => {
    switch (currentIndex) {
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
      case 11:
        navigate({ to: "/anasayfa" });
        break;
      case 4:
        navigate({ to: "/" });
        break;
      case 3:
        navigate({ to: "/anasayfa" });
        break;
      case 2:
        navigate({ to: "/anasayfa" });
        break;
      default:
        break;
    }
  };
  return goPrev;
};

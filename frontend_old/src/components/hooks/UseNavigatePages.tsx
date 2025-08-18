import { useRouterState } from "@tanstack/react-router";

export const useNavigatePages = () => {
  const { location } = useRouterState();

  const pages = [
    "/",
    "/anasayfa",
    "/Cmm",
    "/elektriksel_test",
    "/signup",
    "/sayfa3",
    "/sayfa4",
    "/sayfa5",
    "/sayfa6",
    "/sayfa7",
    "/sayfa8",
    "/sayfa9",
  ];
  const currentPath = location.pathname;
  const currentIndex = pages.indexOf(currentPath);

  return {
    pages,
    currentPath,
    currentIndex,
  };
};

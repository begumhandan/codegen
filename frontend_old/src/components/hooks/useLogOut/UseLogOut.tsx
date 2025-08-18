import { useNavigate } from "@tanstack/react-router";

export const useLogOut = () => {
  const navigate = useNavigate();
  const logout = () => {
    try {
      localStorage.removeItem("user");

      console.log("çıkış başarılı");
      navigate({ to: "/" });
      return true;
    } catch (error) {
      console.error("çıkış hatası:", error);
      return false;
    }
  };
  return logout;
};

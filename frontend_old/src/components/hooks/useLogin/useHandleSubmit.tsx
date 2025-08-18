import type { FormEvent } from "react";
import { loginUser } from "@/api/user";

export const useHandleSubmit = () => {
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    setIsLoading: (loading: boolean) => void,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;

      const result = await loginUser({ email, password });
      localStorage.setItem("user", JSON.stringify(result.user));

      // Başarılı giriş sonrası yönlendirme
      window.location.href = "/anasayfa";
    } catch (error) {
      console.error("Login error:", error);
      alert("Giriş başarısız! Email veya şifre hatalı.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};

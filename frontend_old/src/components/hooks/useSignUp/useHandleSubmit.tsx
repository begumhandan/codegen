import type { FormEvent } from "react";
import { registerUser } from "@/api/user";

export const useHandleSubmit = () => {
  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>,
    setIsLoading: (loading: boolean) => void,
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Form verilerini işle
      const formData = new FormData(e.currentTarget);
      const email = formData.get("email") as string;
      const password = formData.get("password") as string;
      const role = formData.get("role") as string;

      console.log("Signup data:", { email, password, role });

      const result = await registerUser({ email, password, role });

      console.log("Signup success:", result);
      alert("Kayıt başarılı! Giriş yapabilirsiniz.");

      window.location.href = "/";
    } catch (error) {
      console.error("Signup error:", error);
      alert("Kayıt başarısız! Bu email zaten kullanılıyor olabilir.");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleSubmit };
};

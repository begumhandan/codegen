import { deleteCodes } from "../api/code";
import { useCallback, useState } from "react";
import type { User } from "../types";
import { toast } from "sonner";

export const useDelete = () => {
  const [deletedCode, setDeletedCode] = useState<string>();

  const deleteCode = useCallback(async (code: string) => {
    try {
      const userString = localStorage.getItem("user"); //JWS

      if (!userString) {
        toast.error("Kullanıcı girişi gerekli");
        return;
      }

      const user: User = JSON.parse(userString);
      await deleteCodes(code, user.id);
      setDeletedCode(code);
      toast.success("Kod silindi!");
    } catch (error) {
      console.error("Kod silme hatası:", error);
    }
  }, []);

  return [deletedCode, deleteCode] as const;
};

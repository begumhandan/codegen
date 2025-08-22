import { useCallback, useState } from "react";
import { saveCodes } from "@/api/code";
import { toast } from "sonner";
import type { User } from "@/types";
export const useSave = (): [string | undefined, (code: string) => Promise<void>] => {
  const [savedCode, setSavedCode] = useState<string>();

  const saveCode = useCallback(async (generatedCode: string) => {
    try {
      const userString = localStorage.getItem("user"); //Burası tekrardan düzeltilicek JWS ile

      if (!userString) {
        toast.error("Kullanıcı girişi gerekli");
        return;
      }

      const user: User = JSON.parse(userString);
      await saveCodes(generatedCode, user.id);
      setSavedCode(generatedCode);
      toast.success("Kod başarıyla kaydedildi!");
    } catch (error) {
      if (generatedCode == null) {
        toast.error("Lütfen Kod üretin!");
      }
      console.error("Kod kaydetme hatası:", error);
    }
  }, []);

  return [savedCode, saveCode] as const;
};

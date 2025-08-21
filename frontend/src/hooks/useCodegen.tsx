import { useCallback, useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { toast } from "sonner";

export const useCodegen = () => {
  const [generatedCode, setGeneratedCode] = useState<string>();

  const generateCode = useCallback(async (prefix: string) => {
    try {
      const uniqueCode = createId();
      const prefixedUniqueCode = `${prefix}-${uniqueCode}`;
      setGeneratedCode(prefixedUniqueCode);
      toast("Kod üretildi.");
    } catch (error) {
      toast.error("Kod üretme sırasında bir hata oluştu!");
    }
  }, []);

  return [generatedCode, generateCode] as const;
};

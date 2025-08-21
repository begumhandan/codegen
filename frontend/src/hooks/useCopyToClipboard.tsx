import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

export const useCopyToClipboard = () => {
  const [copiedText, setCopiedText] = useState<string>();

  // İlk mount olduğunda clipboard içeriğini oku
  useEffect(() => {
    navigator.clipboard
      .readText()
      .then((text) => setCopiedText(text))
      .catch(() => setCopiedText(undefined));
  }, []);

  const copyToClipboard = useCallback(async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedText(content);
      toast("Kopyalandı.");
    } catch (error) {
      toast.error("Kopyalama sırasında bir hata oluştu!");
    }
  }, []);

  return [copiedText, copyToClipboard] as const;
};

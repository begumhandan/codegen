import { saveCMM } from "@/api/cmm";

export const useHandleSave = () => {
  const handleSave = async (currentCode: string, currentUser: any, setIsSaving: (saving: boolean) => void) => {
    if (!currentCode) {
      alert("Kaydedilecek kod yok!");
      return;
    }

    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    setIsSaving(true);
    try {
      await saveCMM(currentCode, currentUser.id);
      alert("Kod database'e kaydedildi!");
    } catch (error) {
      console.error("Save error:", error);
      alert("Kod kaydedilemedi!");
    } finally {
      setIsSaving(false);
    }
  };

  return { handleSave };
};

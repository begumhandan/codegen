import { deleteCMM } from "@/api/code";

export const useHandleDeleteFromDB = () => {
  // CMM kodunu databaseden silme
  const handleDeleteFromDB = async (currentCode: string, currentUser: any, setCurrentCode: (code: string) => void) => {
    if (!currentCode) {
      alert("Silinecek kod yok!");
      return;
    }

    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    try {
      await deleteCMM(currentCode, currentUser.id);
      setCurrentCode("");
      alert("Kod database'den silindi!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Bu kodu silme yetkiniz yok veya kod bulunamadı!");
    }
  };

  return { handleDeleteFromDB };
};

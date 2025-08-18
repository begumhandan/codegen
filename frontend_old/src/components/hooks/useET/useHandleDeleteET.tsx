import { deleteET } from "@/api/electrical_testing";

export const useHandleDeleteFromDB = () => {
  //databaseden kod silme
  const handleDeleteFromDB = async (
    currentCode: string,
    currentUser: any,
    setCurrentCode: (code: string) => void,
  ) => {
    currentCode = currentCode.replace("ET-", "");
    if (!currentCode) {
      alert("Silinecek kod yok!");
      return;
    }

    if (!currentUser) {
      alert("Giriş yapmanız gerekiyor!");
      return;
    }

    try {
      await deleteET(currentCode, currentUser.id);
      setCurrentCode("");
      alert("Kod database'den silindi!");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Bu kodu silme yetkiniz yok veya kod bulunamadı!");
    }
  };

  return { handleDeleteFromDB };
};

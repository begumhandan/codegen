export const useHandleClear = () => {
  //input temizle
  const handleClear = (setCurrentCode: (code: string) => void) => {
    setCurrentCode(""); // Input'u temizleme kısmı
    alert("Input temizlendi!"); //mesaj
  };

  return { handleClear };
};

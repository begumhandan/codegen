export const useHandleClear = () => {
  //input temizle
  const handleClear = (setCurrentCode: (code: string) => void) => {
    setCurrentCode(""); // Input'u temizle
    alert("Input temizlendi!");
  };

  return { handleClear };
};

export const useHandleCopy = () => {
  // Kodu kopyala
  const handleCopy = (
    currentCode: string,
    _setCopyMessage: (message: string) => void,
  ) => {
    if (!currentCode) {
      alert("Kopyalanacak kod yok!");
      return;
    }
    navigator.clipboard.writeText(currentCode);
    alert("Kod kopyalandı!");
  };

  return { handleCopy };
};

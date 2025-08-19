import { generateETCodeWithPart } from "@/lib/utils";

//rastgele Elektriksel Test kodu üretme
export const useHandleGenerate = () => {
  const handleGenerate = (currentUser: any, setCurrentCode: (code: string) => void, partCode: string) => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    const newCode = generateETCodeWithPart(currentUser.role, partCode);
    setCurrentCode(newCode.replace("ET-", ""));
  };

  return { handleGenerate };
};

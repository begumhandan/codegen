import { generateCodeWithPart } from "@/libs/utils";

// rastgele Cmm kodu üretme
export const useHandleGenerate = () => {
  const handleGenerate = (currentUser: any, setCurrentCode: (code: string) => void, partCode: string) => {
    if (!currentUser) {
      alert("Lütfen giriş yapın!");
      return;
    }

    const newCode = generateCodeWithPart(currentUser.role, partCode);
    setCurrentCode(newCode.replace("CMM-", ""));
  };

  return { handleGenerate };
};

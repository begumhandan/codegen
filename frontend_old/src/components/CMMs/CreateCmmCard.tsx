import { CopyIcon } from "lucide-react";
import { useEffect, useId, useState } from "react";
import { useHandleClear } from "../hooks/useCmm/useHandleClearCmm";
import { useHandleCopy } from "../hooks/useCmm/useHandleCopyCmm";
import { useHandleGenerate } from "../hooks/useCmm/useHandleGenerateCmm";
import { useHandleSave } from "../hooks/useCmm/useHandleSaveCmm";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

export const CreateCmmCard = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [partCode, _setPartCode] = useState("");
  const [isLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [copyMessage, setCopyMessage] = useState("");

  const { handleGenerate } = useHandleGenerate();
  const { handleSave } = useHandleSave();
  const { handleCopy } = useHandleCopy();
  const { handleClear } = useHandleClear();

  const getFullCode = () => {
    if (!currentCode || currentCode.trim() === "") {
      return "";
    }
    return `CMM-${currentCode}`;
  };

  const handleSaveClick = () => {
    const fullCode = getFullCode();
    if (!fullCode) {
      alert("Kaydedilecek kod yok!");
      return;
    }
    handleSave(fullCode, currentUser, setIsSaving);
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setCurrentUser(parsedUser);
    }
  }, []);

  return (
    <Card className="p-4 w-full max-w-md">
      <CardHeader className="text-black p-0 pb-4">CMM Kod Üret</CardHeader>

      <div className="flex rounded-md shadow-xs relative">
        {/* <div className="bg-[#fdfcf7] inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 text-gray-700 text-sm">
          CMM-
        </div> */}
        <Input
          type="text"
          value="CMM-"
          className="-me-px rounded-e-none shadow-none focus-visible:z-1 w-min"
          disabled
        />
        <Input
          id={id}
          type="text"
          value={currentCode}
          onChange={(e) => setCurrentCode(e.target.value)}
          placeholder="AX2508AD001"
          className="-me-px rounded-none shadow-none focus-visible:z-1"
          disabled
        />
        <Button
          onClick={() => handleCopy(getFullCode(), setCopyMessage)}
          variant="outline"
          size="icon"
          className="rounded-s-none"
          disabled={!currentCode}
        >
          <CopyIcon />
          <div className="sr-only">Copy</div>
        </Button>
        {copyMessage && (
          <div className="absolute -top-8 right-0 bg-black text-white px-2 py-1 rounded text-sm z-10">
            {copyMessage}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Button
          variant="default"
          className="bg-black text-white hover:bg-gray-800"
          onClick={() => handleGenerate(currentUser, setCurrentCode, partCode)}
          disabled={isLoading || !currentUser}
        >
          Üret
        </Button>

        <Button
          variant="outline"
          onClick={handleSaveClick}
          disabled={isLoading || !currentUser || !currentCode}
        >
          {isSaving ? "Kaydediliyor" : "Kaydet"}
        </Button>

        <Button
          variant="outline"
          onClick={() => handleClear(setCurrentCode)}
          disabled={!currentCode}
          className="col-span-2"
        >
          Kodu Temizle
        </Button>
      </div>
    </Card>
  );
};

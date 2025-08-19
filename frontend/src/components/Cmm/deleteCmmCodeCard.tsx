import { useEffect, useId, useState } from "react";
import { useHandleDeleteFromDB } from "../hooks/useCmm/useHandleDeleteFromDb";
import { Button } from "../ui/button";
import { Card, CardHeader } from "../ui/card";
import { Input } from "../ui/input";

export const DeleteCmmCard = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { handleDeleteFromDB } = useHandleDeleteFromDB();

  const getFullCode = () => {
    if (!currentCode || currentCode.trim() === "") {
      return currentCode;
    }
    return currentCode.startsWith("CMM-") ? currentCode : `CMM-${currentCode}`;
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
      <CardHeader className="text-black p-0 pb-4">CMM Kod Sil</CardHeader>

      <Input
        id={id}
        type="text"
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        placeholder="CMM-AX2508AD001"
        className="mb-4"
      />

      <Button
        variant="outline"
        className="bg-red-500 text-white hover:bg-red-600 w-full"
        onClick={() => handleDeleteFromDB(getFullCode(), currentUser, setCurrentCode)}
        disabled={!currentCode}
      >
        Database'den Sil
      </Button>
    </Card>
  );
};

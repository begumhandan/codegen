import { useEffect, useId, useState } from "react";
import { useHandleDeleteFromDB } from "../hooks/useET/useHandleDeleteFromDb";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const DeleteETCard = () => {
  const id = useId();
  const [currentCode, setCurrentCode] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);

  const { handleDeleteFromDB } = useHandleDeleteFromDB();

  const getFullCode = () => {
    if (!currentCode || currentCode.trim() === "") {
      return currentCode;
    }
    return currentCode.startsWith("ET-") ? currentCode : `ET-${currentCode}`;
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
      <CardHeader className="text-black p-0 pb-4">ET Kodu sil</CardHeader>

      <Input
        id={id}
        type="text"
        value={currentCode}
        onChange={(e) => setCurrentCode(e.target.value)}
        placeholder="ET-AX2508AD001"
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

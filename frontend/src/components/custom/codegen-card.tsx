import { useCodegen } from "@/hooks/useCodegen";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";
import { useSave } from "@/hooks/useSave";
import { useEffect, useState } from "react";
import type { User } from "@/types";

type Props = {
  prefix: string;
};

export const CodegenCard = ({ prefix }: Props) => {
  const [_currentUser, setCurrentUser] = useState<User | null>(null);

  const [generatedCode, generateCode] = useCodegen();
  const [_copiedText, copyToClipboard] = useCopyToClipboard();
  const [savedCode, saveCode] = useSave();

  useEffect(() => {
    const userData = localStorage.getItem("user");

    if (userData) {
      try {
        const parsedUser: User = JSON.parse(userData);
        setCurrentUser(parsedUser);
      } catch (err) {
        console.error("Hata:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (savedCode) {
      const refreshEvent = new CustomEvent("refreshCodes");
      window.dispatchEvent(refreshEvent);
    }
  }, [savedCode]);

  return (
    <Card className="h-50 w-100">
      <CardHeader>
        <CardTitle>Kod Üretici</CardTitle>
        <CardDescription>Benzersiz bir kod oluşturun.</CardDescription>
        <CardAction>
          <Button onClick={() => generateCode(prefix)} variant="default">
            Yeni Kod
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="flex shadow-xs">
          <Input
            value={generatedCode || ""}
            className=" rounded-e-none field-sizing-content shadow-none focus-visible:z-1"
            disabled
          />
          <Button
            onClick={() => copyToClipboard(generatedCode!)}
            variant="outline"
            size="icon"
            className="rounded-s-none"
            disabled={!generatedCode}
          >
            <CopyIcon />
            <div className="sr-only">Copy</div>
          </Button>
        </div>
        <CardFooter className="p-2">
          <Button onClick={() => saveCode(generatedCode!)} variant="default" disabled={!generatedCode}>
            Kaydet
          </Button>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

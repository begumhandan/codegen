import { useCodegen } from "@/hooks/useCodegen";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CopyIcon } from "lucide-react";

type Props = {
  prefix: string;
};

export const CodegenCard = ({ prefix }: Props) => {
  const [generatedCode, generateCode] = useCodegen();
  const [_copiedText, copyToClipboard] = useCopyToClipboard();

  return (
    <Card>
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
            value={generatedCode}
            className="rounded-e-none field-sizing-content shadow-none focus-visible:z-1"
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
      </CardContent>
    </Card>
  );
};

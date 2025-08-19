//code örnek=>[rastgele 2 harf]+[Yıl]+[Ay]+[Rolün ilk iki harfi]+[rastgele 2 sayı]

//rastgele 2 harf
export function generateRandomString(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//tarih kısmı=> ([yıl]+[ay])
export function generateDateCode(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${year}${month}`;
}

//rol kısmı
export function generateOperatorCodeFromRole(role: string): string {
  const words = role
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  } else {
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase();
  }
}

//rastgele 2 sayı kısmı
export function generateSequenceNumber(): string {
  return Math.floor(Math.random() * 999 + 1)
    .toString()
    .padStart(3, "0");
}

// kod oluşturma kısmı
export function generateCodeWithPart(role: string, partCode: string): string {
  const dateCode = generateDateCode();
  const operatorCode = generateOperatorCodeFromRole(role);
  const sequenceNumber = generateSequenceNumber();
  const randomPart = generateRandomString(2);

  return `${randomPart.toUpperCase()}${partCode.toUpperCase()}${dateCode}${operatorCode}${sequenceNumber}`;
}

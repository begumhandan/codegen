//role ile prefix oluşturma
export function generatePrefixFromRole(role: string): string {
  const words = role
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase(); //tek kelime ile ilk iki harfini al
  } else {
    return words
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase(); //birden fazla kelime varsa sadece her kelimenin baş harflerini al
  }
}
//random string oluşturma
export function generateRandomString(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

//cmm koduna ekleme
export function generateCMMCode(userRole: string): string {
  const rolePrefix = generatePrefixFromRole(userRole);
  const random = generateRandomString(4);
  return `CMM-${rolePrefix}${random}`;
}

//electrical-testing koduna ekleme
export function generateETCode(userRole: string): string {
  const rolePrefix = generatePrefixFromRole(userRole);
  const random = generateRandomString(4);
  return `ET-${rolePrefix}${random}`;
}

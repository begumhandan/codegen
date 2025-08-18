import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateDateCode(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  return `${year}${month}`;
}

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

export function generateSequenceNumber(): string {
  return Math.floor(Math.random() * 999 + 1)
    .toString()
    .padStart(3, "0");
}
export function generateRandomString(length: number): string {
  let result = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// CMM kod oluşturma (Template literal düzeltildi)
export function generateCmmCodeWithPart(
  role: string,
  partCode: string,
): string {
  const dateCode = generateDateCode();
  const operatorCode = generateOperatorCodeFromRole(role);
  const sequenceNumber = generateSequenceNumber();
  const randomPart = generateRandomString(2);

  return `${randomPart.toUpperCase()}${partCode.toUpperCase()}${dateCode}${operatorCode}${sequenceNumber}`;
}

// ET kod oluşturma (Template literal düzeltildi)
export function generateETCodeWithPart(role: string, partCode: string): string {
  const dateCode = generateDateCode();
  const operatorCode = generateOperatorCodeFromRole(role);
  const sequenceNumber = generateSequenceNumber();
  const randomPart = generateRandomString(2);

  return `${randomPart.toUpperCase()}${partCode.toUpperCase()}${dateCode}${operatorCode}${sequenceNumber}`;
}

// //cmm koduna ekleme
// export function generateOperatorCodeFromRole(userRole: string): string {
//   const rolePrefix = generatePrefixFromRole(userRole);
//   const random = generateRandomString(4);
//   return `CMM-${rolePrefix}${random}`;
// }

//electrical-testing koduna ekleme
// export function generateETCode(userRole: string): string {
//   const rolePrefix = generatePrefixFromRole(userRole);
//   const random = generateRandomString(4);
//   return `ET-${rolePrefix}${random}`;
// }

//role ile prefix oluşturma

// random string oluşturma

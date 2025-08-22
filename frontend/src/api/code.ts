const API_BASE = "http://localhost:3000";
import type { CodeResponse } from "@/types";

//tüm kodları getirme
export async function fetchAllCodesByPrefix(prefix: string): Promise<CodeResponse> {
  const res = await fetch(`${API_BASE}/code/all?prefix=${prefix}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP hatası! durum: ${res.status}`);
  }
  return res.json();
}
//get all user codes by prefix
export async function fetchUserCodesByPrefix(userId: number, prefix: string): Promise<CodeResponse> {
  try {
    const url = `${API_BASE}/code/${userId}?prefix=${prefix}`;

    console.log("Prefix'e göre kodlar getiriliyor:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Kodlar getirilemedi (HTTP ${res.status})`);
    }

    const result = await res.json();
    console.log(`${prefix} kodları başarıyla getirildi:`, result);
    return result;
  } catch (error) {
    console.error("Kod getirme hatası:", error);
    throw error;
  }
}

// kullanıcı idye göre kodlarını getirme
export async function fetchUserCodes(userId: number): Promise<CodeResponse> {
  const res = await fetch(`${API_BASE}/code/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`HTTP hatası! durum: ${res.status}`);
  }

  return res.json();
}

// //cmm üretme
// export async function generateCode(data: GenerateCode): Promise<CodeResponse> {
//   const response = await fetch(`${API_BASE}/code`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(data),
//   });
//   if (!response.ok) {
//     throw new Error("CMM kod üretilemedi.");
//   }
//   return response.json();
// }

// codu kaydetme
export async function saveCodes(code: string, userId: number): Promise<void> {
  console.log("Saving code:", code, "for user:", userId);

  const res = await fetch(`${API_BASE}/code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, user_id: userId }),
  });

  console.log(" Save response status:", res.status);

  if (!res.ok) {
    const errorText = await res.text();
    console.log(" Save error response:", errorText);
    throw new Error("Kod kaydedilemedi");
  }

  console.log(" Code saved successfully");
}

//code silme
export async function deleteCodes(code: string, userId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/code/${code}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "kod silinemedi");
  }
}

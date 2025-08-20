const API_BASE = "http://localhost:3000";
import type { GenerateCMMRequest, CMMResponse } from "@/types";

//cmm getirme
export async function fetchAllCmmCodes(): Promise<CMMResponse> {
  const res = await fetch(`${API_BASE}/cmm`, {
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

//Cmm kullanıcı id kodlarını getirme
export async function fetchCmmCodes(userId: number): Promise<CMMResponse> {
  const res = await fetch(`${API_BASE}/cmm/${userId}`, {
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

//cmm üretme
export async function generateCMM(data: GenerateCMMRequest): Promise<CMMResponse> {
  const response = await fetch(`${API_BASE}/cmm/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("CMM kod üretilemedi.");
  }
  return response.json();
}

//Cmm codu kaydetme
export async function saveCMM(code: string, userId: number): Promise<void> {
  console.log("Saving code:", code, "for user:", userId);

  const res = await fetch(`${API_BASE}/cmm/save`, {
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

//cmm silme
export async function deleteCMM(code: string, userId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/cmm/${code}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "CMM silinemedi");
  }
}

const API_BASE = "http://localhost:3000";
import type { GenerateETRequest, ETResponse } from "../types";

//Elektriksel test kodu üretme
export async function generateET(data: GenerateETRequest): Promise<ETResponse> {
  const response = await fetch(`${API_BASE}/electrical_testing/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error("Electrical testing kod üretilemedi.");
  }
  return response.json();
}

//Elektriksel test eklme
export async function saveET(code: string, userId: number): Promise<void> {
  console.log("Saving code:", code, "for user:", userId);

  const res = await fetch(`${API_BASE}/electrical_testing/save`, {
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

//elektriksel test silme
export async function deleteET(code: string, userId: number): Promise<void> {
  const res = await fetch(`${API_BASE}/electrical_testing/${code}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.error || "Electrical testing silinemedi");
  }
}
//Elektriksel Test kodu kopyalama
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}

const API_BASE = "http://localhost:3000";
export interface GenerateCMMRequest {
  user_id: number;
}

export interface CMMResponse {
  success: boolean;
  code: string;
  process: any;
}
//cmm üretme
export async function generateCMM(
  data: GenerateCMMRequest,
): Promise<CMMResponse> {
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
//kopyalama
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}

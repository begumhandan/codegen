const API_BASE = "http://localhost:3000";
export interface GenerateETRequest {
  user_id: number;
}

export interface ETResponse {
  success: boolean;
  code: string;
  process: any;
}
//electrical-testing code üretme
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

//Electrical test eklme
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

//electrical-testing silme

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
//kopyalama
export function copyToClipboard(text: string): void {
  navigator.clipboard.writeText(text);
}

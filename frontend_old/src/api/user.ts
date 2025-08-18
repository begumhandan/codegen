import type { User } from "../types";

const BASE_URL = "http://localhost:3000";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  user: User;
}

export interface RegisterRequest {
  email: string;
  password: string;
  role: string;
}

// Kullanıcı giriş
export async function loginUser(data: LoginRequest): Promise<LoginResponse> {
  const res = await fetch(`${BASE_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Giriş başarısız");
  }
  return res.json();
}

export async function registerUser(data: RegisterRequest): Promise<User> {
  const res = await fetch(`${BASE_URL}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Kayıt başarısız");
  }
  return res.json();
}

export async function fetchUserProfile(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Kullanıcı bilgileri alınamadı");
  return res.json();
}

// Tüm kullanıcıları getir (admin için)
export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Kullanıcılar yüklenemedi");
  return res.json();
}

// Kullanıcı güncelle
export async function updateUser(
  userId: number,
  data: Partial<User>,
): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Kullanıcı güncellenemedi");
  }
  return res.json();
}

// Kullanıcı sil
export async function deleteUser(userId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/users/${userId}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Kullanıcı silinemedi");
  }
}

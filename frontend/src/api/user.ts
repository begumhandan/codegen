import type { User, LoginRequest, LoginResponse, RegisterRequest } from "../types";

const BASE_URL = "http://localhost:3000";

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

//kullanıcı ekleme
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

//kullanıcıyı Id'ye göre getirme
export async function fetchUserProfile(userId: number): Promise<User> {
  const res = await fetch(`${BASE_URL}/users/${userId}`);
  if (!res.ok) throw new Error("Kullanıcı bilgileri alınamadı");
  return res.json();
}

// Tüm kullanıcıları getir
export async function fetchAllUsers(): Promise<User[]> {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error("Kullanıcılar yüklenemedi");
  return res.json();
}

// Kullanıcı güncelle
export async function updateUser(userId: number, data: Partial<User>): Promise<User> {
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

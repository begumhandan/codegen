export interface User {
  id: number;
  email: string;
  role: string;
  createdAt?: string;
}

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
export interface CmmCode {
  id: string;
  code: string;
  createdBy: string;
  createdAt: string;
  status: "active" | "deleted";
}

export interface GenerateCMMRequest {
  user_id: number;
}
export interface GenerateETRequest {
  user_id: number;
}
export interface CMMResponse {
  success: boolean;
  code: string;
  process: any;
}
export interface ETResponse {
  success: boolean;
  code: string;
  process: any;
}

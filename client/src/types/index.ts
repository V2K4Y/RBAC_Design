export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData {
  username: string;
  email: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
  description?: string;
}

export interface Module {
  id: number;
  name: string;
}

export interface Action {
  id: number;
  name: string;
  description?: string;
}

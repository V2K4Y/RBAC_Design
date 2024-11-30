export interface User {
  id: number;
  username: string;
  email: string;
  roles: string[];
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

export interface ModuleAction {
  id: number;
  name: string;
  moduleActions: {
    id: number;
    name: string;
    moduleActionId: number;
  }[]
}
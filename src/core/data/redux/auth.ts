export interface Role {
  id: number;
  name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
  }
  
  export interface AuthState {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
  }
  
  export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user: User;
    token: string;
  }
  
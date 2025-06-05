
export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    isVerified: boolean;
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  

  export interface SignupRequest {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface SignupResponse {
    message: string;
    user: User;
    tokens: Tokens;
  }
 
  export interface LoginRequest {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    message: string;
    user: User;
    tokens: Tokens;
  }
 
  export interface AuthState {
    user: User | null;
    tokens: Tokens | null;
    isLoading: boolean; 
    error: string | null;
    isAuthenticated: boolean;
  }
 
  export interface AuthError {
    message: string;
    status?: number;
  }
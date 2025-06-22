export interface AuthResponse {
    token: string;
    refreshToken: string;
    user: {
      id: number;
      name: string;
      email: string;
      role: string; // e.g., 'admin' or 'user'
    };
  }
  
  export interface LoginRequest {
    email: string;
    password: string;
  }
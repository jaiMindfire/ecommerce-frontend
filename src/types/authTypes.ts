
export interface UserCredentials {
    email: string;
    password: string;
  }
  
 
  export interface AuthResponse {
    userName: string,
    token: string;
  }
  

  export interface User {
    _id: string;
    email: string;
    username: string;
    role: 'admin' | 'user';
    token: string;
  }
  

  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    error: string | null;
  }
  
  // Input structure for login
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  // Input structure for registration
  export interface RegisterInput {
    email: string;
    username: string;
    password: string;
  }
  
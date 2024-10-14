export interface User {
  cookie: string;
  user: {
    role: string;
    id: number;
    fullName: string;
    image: string;
    email: string;
  };
}

export interface AuthState {
  user: User | null;
  cookie: string | null;
  isAuthenticated: boolean;
}

export interface logInUser {
  email: string;
  password: string;
}

export interface registerUser {
  fullName: string;
  password?: string;
  email: string;
  contactPhone: string;
  address: string;
}

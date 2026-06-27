"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  username: null,
  login: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("auth_user");
    if (stored) setUsername(stored);
  }, []);

  function login(name: string) {
    sessionStorage.setItem("auth_user", name);
    setUsername(name);
  }

  function logout() {
    sessionStorage.removeItem("auth_user");
    setUsername(null);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!username, username, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

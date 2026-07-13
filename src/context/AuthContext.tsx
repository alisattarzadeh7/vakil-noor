"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
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

const AUTH_STORAGE_KEY = "auth_user";
const AUTH_CHANGE_EVENT = "auth-user-change";

function getAuthSnapshot() {
  if (typeof window === "undefined") {
    return null;
  }

  return sessionStorage.getItem(AUTH_STORAGE_KEY);
}

function subscribeToAuthChanges(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(AUTH_CHANGE_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, onStoreChange);
  };
}

function notifyAuthChange() {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const username = useSyncExternalStore(
    subscribeToAuthChanges,
    getAuthSnapshot,
    () => null,
  );

  function login(name: string) {
    sessionStorage.setItem(AUTH_STORAGE_KEY, name);
    notifyAuthChange();
  }

  function logout() {
    sessionStorage.removeItem(AUTH_STORAGE_KEY);
    notifyAuthChange();
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

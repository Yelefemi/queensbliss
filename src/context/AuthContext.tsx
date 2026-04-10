"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { type Address, type AuthUser, verifyToken } from "@/lib/auth";

type AuthContextType = {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  signup: (name: string, email: string, password: string, address: Address) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function restoreUser() {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      const decoded = await verifyToken(token);
      if (decoded) {
        setUser(decoded);
      } else {
        localStorage.removeItem("token");
      }

      setIsLoading(false);
    }

    restoreUser();
  }, []);

  async function signup(name: string, email: string, password: string, address: Address) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, address }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Signup failed");
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Signup failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("token", data.token);
      setUser(data.user);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Login failed";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

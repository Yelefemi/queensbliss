"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { verifyToken } from "@/lib/auth";

interface AuthContextType {
  user: any;
  isLoading: boolean;
  error: string | null;
  signup: (name: string, email: string, password: string, address: any) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        setUser(decoded);
      }
    }
    setIsLoading(false);
  }, []);

  async function signup(name: string, email: string, password: string, address: any) {
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, address }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Signup failed");
      setIsLoading(false);
      throw new Error(data.message);
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsLoading(false);
  }

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      setIsLoading(false);
      throw new Error(data.message);
    }

    localStorage.setItem("token", data.token);
    setUser(data.user);
    setIsLoading(false);
  }

  function logout() {
    localStorage.removeItem("token");
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

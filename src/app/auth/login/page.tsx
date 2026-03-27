"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    try {
      await login(email, password);
      router.push("/checkout");
    } catch (err) {
      // Error is already set in context
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-6 py-12 min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md rounded-lg border border-gray-300 p-8 bg-gray-900">
        <h1 className="mb-2 text-3xl font-bold text-white text-center">Welcome Back</h1>
        <p className="mb-8 text-center text-gray-400">Log in to your account</p>

        {error && (
          <div className="mb-6 rounded bg-red-900 border border-red-500 text-red-200 px-4 py-3 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-semibold text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded border border-gray-400 bg-black text-white px-4 py-2 focus:outline-none focus:border-[#d4af37]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded border border-gray-400 bg-black text-white px-4 py-2 pr-10 focus:outline-none focus:border-[#d4af37]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#d4af37] transition"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z" clipRule="evenodd" />
                    <path d="M15.171 13.576l1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414a1 1 0 00-1.414 1.414z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded bg-[#d4af37] text-black px-4 py-2 font-bold transition hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-[#d4af37] font-bold transition hover:text-white">
              Sign up
            </Link>
          </p>
        </div>

        <div className="mt-4">
          <Link
            href="/"
            className="block text-center text-gray-400 transition hover:text-[#d4af37]"
          >
            ← Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

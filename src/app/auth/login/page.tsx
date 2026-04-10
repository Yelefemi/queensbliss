"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    try {
      await login(email, password);
      router.push("/checkout");
    } catch {}
  };

  return (
    <main className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 text-white sm:px-6 sm:py-12">
      <div className="w-full max-w-md rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
        <p className="text-sm uppercase tracking-[0.35em] text-[#d4af37]">Account Access</p>
        <h1 className="mt-3 text-3xl font-bold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-gray-400">Log in to continue to checkout and manage your orders.</p>

        {error && (
          <div className="mt-6 rounded-[1.2rem] border border-red-500/40 bg-red-950/40 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-white">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-white">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full rounded-full border border-white/10 bg-black px-5 py-3 pr-12 text-white outline-none transition focus:border-[#d4af37]"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400 transition hover:text-[#d4af37]"
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-[#d4af37] px-4 py-3 font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/auth/signup"
            className="font-bold text-[#d4af37] transition hover:text-white"
          >
            Sign up
          </Link>
        </div>

        <div className="mt-4 text-center">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-[#d4af37]"
          >
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}

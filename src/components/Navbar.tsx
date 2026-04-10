"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav
      className="
        fixed top-0 z-50 w-full
        border-b border-white/20
        bg-white/70
        backdrop-blur-md
        shadow-sm
      "
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center">
          <img
            src="/images/queen%20bliss%20logouse.png"
            alt="Queensbliss logo"
            className="h-20 w-auto"
          />
        </Link>

        <ul className="hidden md:flex items-center gap-8 text-sm font-medium">
          <li><Link href="/" className="text-black transition hover:text-[#d4af37]">Home</Link></li>
          <li><Link href="/shop" className="text-black transition hover:text-[#d4af37]">Shop</Link></li>
          <li><Link href="/maintenance" className="text-black transition hover:text-[#d4af37]">Maintenance</Link></li>
          <li><Link href="/Hair-Hub" className="text-black transition hover:text-[#d4af37]">Hair Hub</Link></li>
          <li><Link href="/Stylist" className="text-black transition hover:text-[#d4af37]">Stylist</Link></li>
          <li><Link href="/about" className="text-black transition hover:text-[#d4af37]">About</Link></li>
          <li><Link href="/Contact-Us" className="text-black transition hover:text-[#d4af37]">Contact</Link></li>
        </ul>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 text-sm text-black transition hover:text-[#d4af37]"
              >
                <span>{user.name}</span>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {showUserMenu && (
                <div className="absolute top-full right-0 mt-2 w-48 rounded border border-gray-200 bg-white shadow-lg z-50">
                  <div className="px-4 py-3 border-b border-gray-200">
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <Link
                    href="/checkout"
                    className="block px-4 py-2 text-sm text-black transition hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={() => {
                      logout();
                      setShowUserMenu(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 transition hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="text-sm text-black transition hover:text-[#d4af37] hidden md:inline"
            >
              Login
            </Link>
          )}

          <Link
            href="/Cart"
            className="relative text-black transition hover:text-[#d4af37]"
            title="Shopping Cart"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>

            {cartCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-[#d4af37] rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          <Link
            href="/shop"
            className="rounded-full bg-black px-5 py-2 text-sm text-white transition hover:bg-[#d4af37] hover:text-black hidden md:inline-block"
          >
            Shop Now
          </Link>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            className="md:hidden text-black transition hover:text-[#d4af37]"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {showMobileMenu && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <ul className="flex flex-col text-sm font-medium">
            <li><Link href="/" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Home</Link></li>
            <li><Link href="/shop" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Shop</Link></li>
            <li><Link href="/maintenance" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Maintenance</Link></li>
            <li><Link href="/Hair-Hub" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Hair Hub</Link></li>
            <li><Link href="/Stylist" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Stylist</Link></li>
            <li><Link href="/about" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>About</Link></li>
            <li><Link href="/Contact-Us" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Contact</Link></li>
            {user ? (
              <li><button onClick={() => { logout(); setShowMobileMenu(false); }} className="block w-full px-4 py-3 text-left text-red-600 transition hover:bg-gray-100">Logout</button></li>
            ) : (
              <li><Link href="/auth/login" className="block px-4 py-3 text-black transition hover:bg-gray-100 hover:text-[#d4af37]" onClick={() => setShowMobileMenu(false)}>Login / Sign Up</Link></li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}

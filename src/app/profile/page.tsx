"use client";

import Link from "next/link";
import { useState } from "react";

type Order = {
  id: number;
  date: string;
  total: number;
  status: string;
};

export default function ProfilePage() {
  const [user] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
  });

  const [orders] = useState<Order[]>([
    {
      id: 1001,
      date: "2025-12-01",
      total: 27000,
      status: "Delivered",
    },
    {
      id: 1002,
      date: "2026-01-15",
      total: 15000,
      status: "Processing",
    },
  ]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

      <section className="mb-10">
        <h2 className="mb-3 text-xl font-semibold">Account Information</h2>
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </section>

      <section className="mb-10 rounded-3xl border border-[#d4af37]/30 bg-[#111111] p-6 text-white">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Hair Maintenance Products</h2>
            <p className="mt-2 max-w-2xl text-sm text-gray-300">
              Shop shampoos, conditioners, oils, and wig-care essentials that can be added straight to your cart.
            </p>
          </div>

          <Link
            href="/maintenance"
            className="inline-flex items-center justify-center rounded-full bg-[#d4af37] px-5 py-3 text-sm font-bold text-black transition hover:bg-white"
          >
            Shop Maintenance
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold">Order History</h2>
        {orders.length === 0 ? (
          <p>You have no orders yet.</p>
        ) : (
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Order ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Total</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="border border-gray-300 px-4 py-2">{order.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.date}</td>
                  <td className="border border-gray-300 px-4 py-2">NGN {order.total.toLocaleString()}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </main>
  );
}

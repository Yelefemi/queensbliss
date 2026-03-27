"use client";

import { useState, useRef, FormEvent } from "react";
import emailjs from "@emailjs/browser";

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("");

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          setStatus("Message sent successfully!");
          form.current?.reset();
        },
        () => {
          setStatus("Failed to send message, please try again.");
        }
      );
  };

  return (
    <main className="pt-20 px-6 max-w-3xl mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-center">Contact Us</h1>

      <form ref={form} onSubmit={sendEmail} className="space-y-6">
        <input
          type="text"
          name="user_name"
          placeholder="Your name"
          required
          className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        />

        <input
          type="email"
          name="user_email"
          placeholder="Your email"
          required
          className="w-full rounded border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        />

        <textarea
          name="message"
          placeholder="Your message"
          required
          rows={5}
          className="w-full rounded border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#d4af37]"
        />

        <button
          type="submit"
          className="w-full rounded bg-[#d4af37] px-6 py-3 font-bold text-black hover:bg-[#b5942f] transition"
        >
          Send Message
        </button>

        {status && (
          <p
            className={`text-center font-semibold mt-4 ${
              status.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {status}
          </p>
        )}
      </form>

      <section className="mt-12 text-center text-gray-600">
        <p className="mb-3">Or reach us directly:</p>

        <p className="font-semibold hover:text-[#d4af37] transition cursor-default">
          📞 +234 800 123 4567
        </p>

        <p className="hover:text-[#d4af37] transition cursor-default">
          📧 support@queenblisshair.com
        </p>

        <a
          href="https://wa.me/2348001234567"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block rounded border border-[#d4af37] px-8 py-3 text-[#d4af37] hover:bg-[#d4af37] hover:text-black transition"
        >
          💬 Chat on WhatsApp
        </a>
      </section>
    </main>
  );
}

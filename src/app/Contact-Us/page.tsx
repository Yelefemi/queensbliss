"use client";

import { FormEvent, useState } from "react";

type Status = {
  type: "success" | "error" | "";
  message: string;
};

export default function ContactPage() {
  const [status, setStatus] = useState<Status>({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function sendMessage(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Unable to send message right now.");
      }

      setStatus({
        type: "success",
        message: "Message sent successfully. We will get back to you shortly.",
      });
      form.reset();
    } catch (error) {
      setStatus({
        type: "error",
        message:
          error instanceof Error
            ? error.message
            : "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 text-white sm:px-6 sm:py-12">
      <section className="rounded-[1.8rem] border border-[#d4af37]/35 bg-[linear-gradient(135deg,#050505_0%,#111111_55%,#24190a_100%)] px-5 py-10 shadow-[0_24px_80px_rgba(0,0,0,0.32)] sm:px-8 md:px-10">
        <p className="mb-3 text-[10px] uppercase tracking-[0.24em] text-[#d4af37] sm:text-sm sm:tracking-[0.35em]">
          Contact Us
        </p>
        <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
          Reach the Queen Bliss team directly.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-300 md:text-base">
          Use the form below for product questions, order support, styling enquiries, or partnership conversations.
        </p>
      </section>

      <section className="grid gap-6 py-10 lg:grid-cols-[1.1fr_0.9fr] md:py-14">
        <form
          onSubmit={sendMessage}
          className="rounded-[1.8rem] border border-white/10 bg-[#0d0d0d] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)]"
        >
          <h2 className="text-2xl font-semibold text-white">Send a message</h2>

          <div className="mt-6 grid gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              required
              className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
            />

            <input
              type="email"
              name="email"
              placeholder="Your email"
              required
              className="w-full rounded-full border border-white/10 bg-black px-5 py-3 text-white outline-none transition focus:border-[#d4af37]"
            />

            <textarea
              name="message"
              placeholder="Tell us what you need help with"
              required
              rows={7}
              className="w-full rounded-[1.5rem] border border-white/10 bg-black px-5 py-4 text-white outline-none transition focus:border-[#d4af37]"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 w-full rounded-full bg-[#d4af37] px-6 py-3 font-bold text-black transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {status.message && (
            <p
              className={`mt-4 rounded-[1.2rem] px-4 py-3 text-sm ${
                status.type === "success"
                  ? "border border-emerald-500/40 bg-emerald-950/40 text-emerald-200"
                  : "border border-red-500/40 bg-red-950/40 text-red-200"
              }`}
            >
              {status.message}
            </p>
          )}
        </form>

        <div className="space-y-6">
          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold text-white">Direct contact</h2>
            <div className="mt-5 space-y-4 text-sm text-gray-300">
              <p>Phone: +234 8126608144</p>
              <p>Email: robbiniyanuoluwa@gmail.com</p>
              <p>Location: Lagos, Nigeria</p>
            </div>
          </div>

          <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold text-white">Quick response</h3>
            <p className="mt-3 text-sm leading-7 text-gray-300">
              If your request is urgent, message the team on WhatsApp for faster assistance with product recommendations or order questions.
            </p>
            <a
              href="https://wa.me/2349038829611?text=Hello%20Queen%20Bliss%20team%2C%20I%20need%20assistance%20with..."
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex rounded-full border border-[#d4af37] px-6 py-3 text-sm font-semibold text-[#d4af37] transition hover:bg-[#d4af37] hover:text-black"
            >
              Chat on WhatsApp
            </a>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-gray-300">
              <a
                href="https://instagram.com/queeniyanuoluwaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                Instagram: queeniyanuoluwaofficial
              </a>
              <a
                href="https://tiktok.com/@queenmaryiyanuoluwa"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                TikTok: @queenmaryiyanuoluwa
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

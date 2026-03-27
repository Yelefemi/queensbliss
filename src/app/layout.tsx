import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AuthProvider>
          <CartProvider>
            {/* Fixed glass navbar */}
            <Navbar />

            {/* Offset page content */}
            <main className="pt-20">
              {children}
            </main>

            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

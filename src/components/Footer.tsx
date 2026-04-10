import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          
          {/* Brand */}
          <div>
            <h3 className="mb-4 text-2xl font-bold text-white">
              Queen’s Bliss
            </h3>
            <p className="max-w-sm text-sm text-gray-300">
              Premium wigs and hair collections crafted for students, brides,
              working-class women and luxury lovers.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex gap-12">
            {/* Shop */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Shop</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/shop?category=students" className="transition hover:text-[#d4af37]">
                    Students
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=brides" className="transition hover:text-[#d4af37]">
                    Brides
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=working-class" className="transition hover:text-[#d4af37]">
                    Working Class
                  </Link>
                </li>
                <li>
                  <Link href="/shop?category=luxury" className="transition hover:text-[#d4af37]">
                    Luxury
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="mb-3 font-semibold text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/about" className="transition hover:text-[#d4af37]">
                    About Queen’s Bliss
                  </Link>
                </li>
                <li>
                  <Link href="/Stylist" className="transition hover:text-[#d4af37]">
                    Stylist Hub
                  </Link>
                </li>
                <li>
                  <Link href="/Contact-Us" className="transition hover:text-[#d4af37]">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact & Social */}
          <div>
            <h4 className="mb-3 font-semibold text-white">Contact</h4>
            <address className="not-italic text-sm leading-relaxed text-gray-300">
              Lagos, Nigeria<br />
              Phone: +234 8126608144<br />
              Email: robbiniyanuoluwa@gmail.com
            </address>

            <div className="mt-6 flex flex-wrap gap-4 text-sm">
              <a
                href="https://instagram.com/queeniyanuoluwaofficial"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                Instagram
              </a>
              <a
                href="https://tiktok.com/@queeniyanu"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                TikTok
              </a>
              <a
                href="https://facebook.com/MaryIyanuoluwa"
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-[#d4af37]"
              >
                Facebook
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 border-t border-gray-800 pt-6 text-center text-xs text-gray-400">
          &copy; {new Date().getFullYear()} Queen’s Bliss. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

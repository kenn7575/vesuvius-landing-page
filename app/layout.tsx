import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cafe Vesuvius",
  description: "Lækker mad fra Cafe Vesuvius",
};

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body className={`antialiased`}>
        <header className="relative bg-gray-100 text-black">
          <h1 className="absolute left-1/2 transform -translate-x-1/2 text-2xl p-4 z-20">
            <a href="/" className="hover:italic">
              Cafe Vesuvius
            </a>
          </h1>

          <nav className="relative top-0 left-0 w-full p-4">
            <input type="checkbox" id="menu-toggle" className="hidden peer" />
            <label
              htmlFor="menu-toggle"
              className="block text-right cursor-pointer md:hidden text-xl"
            >
              <span className="peer-checked:hidden">☰</span>
              <span className="hidden peer-checked:inline">✖</span>
            </label>
            <ul className="peer-checked:h-auto peer-checked:overflow-visible h-0 overflow-hidden md:h-auto md:overflow-visible text-right bg-gray-100 md:bg-transparent space-y-2 md:space-y-0">
              <li className="block md:inline">
                <a
                  href="/menu"
                  className="text-sm hover:italic block md:inline md:pr-4"
                >
                  Menu
                </a>
              </li>
              <li className="block md:inline">
                <a
                  href="/reservation"
                  className="text-sm hover:italic block md:inline"
                >
                  Reservation
                </a>
              </li>
            </ul>
          </nav>
        </header>

        {children}
        <footer className="bg-gray-100 px-4 py-8 w-full mt-auto">
          <div className="container mx-auto flex flex-col items-center text-gray-700">
            <p className="text-center font-semibold">Cafe Vesuvius</p>
            <p className="text-center">1234 Gourmet Street, Food City</p>
            <p className="text-center">Phone: +45 123 456 789</p>
            <p className="text-center">Email: info@cafevesuvius.com</p>
            <p className="text-center mt-4">
              &copy; {new Date().getFullYear()} Cafe Vesuvius. All Rights
              Reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}

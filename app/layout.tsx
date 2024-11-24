import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <head>
      <title>Cafe Vesuvius</title>
    </head>
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <header className="bg-orange-950 text-white py-4">
        <nav className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">
            <a href="/" className="hover:underline">Cafe Vesuvius</a>
          </h1>
          <ul className="flex space-x-6">
            <li>
              <a href="/menu" className="text-lg hover:underline">Menu</a>
            </li>
            <li>
              <a href="/reservation" className="text-lg hover:underline">Reservation</a>
            </li>
          </ul>
        </nav>
      </header>
      {children}
    </body>
    </html>
  );
}

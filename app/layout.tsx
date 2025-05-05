import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hangman",
  description: "Hangman тоглоом",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn">
      <body className="min-h-screen bg-[#f0e6ff]">{children}</body>
    </html>
  );
}

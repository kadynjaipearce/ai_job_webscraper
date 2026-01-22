import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
<<<<<<< HEAD
  title: "pleasehireme | AI Job Hunter & Auto-Apply",
  description:
    "AI-powered job scraper that matches your resume, scrapes sources you care about, and auto-applies while you sleep.",
=======
  title: "Work in Progress",
  description: "Why are you looking?",
>>>>>>> main
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} antialiased`}>{children}</body>
    </html>
  );
}

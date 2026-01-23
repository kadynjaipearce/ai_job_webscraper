import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "pleasehireme | AI Job Hunter & Auto-Apply",
  description:
    "AI-powered job scraper that matches your resume, scrapes sources you care about, and auto-applies while you sleep.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-sans antialiased`}>
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#0a0a0a",
              colorTextOnPrimaryBackground: "#ffffff",
              borderRadius: "0.75rem",
            },
            elements: {
              formButtonPrimary:
                "bg-neutral-950 hover:bg-neutral-800 text-white",
              card: "shadow-none",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

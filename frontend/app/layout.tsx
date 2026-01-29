import type { Metadata } from "next";
import { Inter, Lora, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
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
      <body
        className={`${inter.variable} ${lora.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#6366f1",
              colorTextOnPrimaryBackground: "#ffffff",
              borderRadius: "0.75rem",
            },
            elements: {
              formButtonPrimary:
                "bg-indigo-500 hover:bg-indigo-400 text-white",
              card: "shadow-none bg-slate-900 border border-white/10",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}

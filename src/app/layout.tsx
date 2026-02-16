import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-main" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-heading" });

export const metadata: Metadata = {
  title: "Humbat Jamalzadeh | Software Engineer & Backend Specialist",
  description: "Portfolio of Humbat Jamalzadeh - Software Engineer specializing in Flutter, Django, and DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable}`}>
        <div className="bg-glow">
          <div className="glow-1"></div>
          <div className="glow-2"></div>
        </div>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

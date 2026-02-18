import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "Humbat Jamalzadeh | Software Engineer & Backend Specialist",
  description: "Portfolio of Humbat Jamalzadeh - Software Engineer specializing in Flutter, Django, and DevOps.",
};

import { Providers } from "./Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="bg-glow">
            <div className="glow-1"></div>
            <div className="glow-2"></div>
          </div>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}

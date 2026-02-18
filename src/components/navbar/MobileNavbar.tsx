"use client";
import Link from "next/link";

interface MobileNavbarProps {
  isOpen: boolean;
  onToggle: () => void;
  onLogoClick: () => void;
}

export function MobileNavbar({ isOpen, onToggle, onLogoClick }: MobileNavbarProps) {
  return (
    <div className="hidden max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:z-[1000] max-lg:flex max-lg:h-16 max-lg:w-full max-lg:items-center max-lg:justify-between max-lg:border-b max-lg:border-white/5 max-lg:bg-black max-lg:px-6">
      <Link href="/" className="text-[1.2rem] font-black tracking-tight text-white no-underline" onClick={onLogoClick}>
        HJ<span className="text-accent">.</span>
      </Link>
      <button
        className="rounded-xl border border-white/10 bg-transparent px-4 py-1.5 text-[0.85rem] font-semibold text-white transition-all hover:bg-white/5"
        onClick={onToggle}
      >
        {isOpen ? "Close" : "Menu"}
      </button>
    </div>
  );
}

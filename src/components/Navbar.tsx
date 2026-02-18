"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Globe, ChevronDown, Moon, Sun } from "lucide-react";
import { useNavConfig } from "@/hooks/useNavConfig";
import portfolioData from "@/data/portfolio.json";

export default function Navbar() {
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navConfig = useNavConfig(portfolioData);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleToggleLang = () => {
    setLanguage(language === 'en' ? 'az' : 'en');
  };

  return (
    <header className={`fixed inset-x-0 top-0 z-[1000] flex h-[80px] items-center px-8 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${scrolled ? "mt-[15px] h-[70px] w-[90%] left-1/2 -translate-x-1/2 rounded-full border border-border bg-[var(--nav-bg)] px-6 shadow-lg backdrop-blur-[20px]" : ""}`}>
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-text-primary text-background text-[0.9rem] font-[900]">HJ</div>
          <span className="font-heading text-[1.25rem] font-extrabold tracking-[-0.02em] text-text-primary">
            Humbat<span className="text-accent">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-2 rounded-full border border-border bg-white/[0.03] p-1.5 max-lg:hidden">
          {navConfig.filter(s => s.id !== 'personal').map((section) => (
            <div
              key={section.id}
              className="relative"
              onMouseEnter={() => setActiveDropdown(section.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={section.rootPath}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-[0.85rem] font-semibold transition-all hover:bg-accent/5 hover:text-text-primary ${pathname.startsWith(section.rootPath) ? "text-text-primary" : "text-text-secondary"}`}
              >
                <span className="opacity-70">{section.icon}</span>
                <span>{section.title}</span>
                <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${activeDropdown === section.id ? 'rotate-180' : ''}`} />
                {pathname.startsWith(section.rootPath) && (
                  <motion.div layoutId="nav-glow" className="absolute inset-0 z-[-1] rounded-full border border-accent/20 bg-accent/10" />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === section.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute left-1/2 top-[calc(100%+15px)] z-[100] min-w-[240px] -translate-x-1/2 rounded-[20px] border border-border bg-surface p-2 shadow-2xl"
                  >
                    <div className="flex flex-col gap-1">
                      {section.items.map((item) => (
                        <Link key={item.path} href={item.path} className="rounded-[12px] px-4 py-2.5 text-[0.85rem] font-medium text-text-secondary transition-all hover:bg-accent/10 hover:pl-5 hover:text-text-primary">
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-text-secondary transition-all hover:border-accent hover:bg-surface-hover hover:text-text-primary" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button onClick={handleToggleLang} className="flex h-11 items-center gap-2 rounded-xl border border-border px-3.5 text-[0.75rem] font-extrabold text-text-secondary transition-all hover:border-accent hover:bg-surface-hover hover:text-text-primary" title="Change Language">
            <Globe size={18} />
            <span>{language.toUpperCase()}</span>
          </button>

          <Link href="/#contact" className="hidden rounded-full bg-accent px-7 py-3 text-[0.85rem] font-extrabold text-white shadow-[0_8px_20px_rgba(var(--accent-color-rgb),0.2)] transition-all hover:-translate-y-1 hover:bg-text-primary hover:text-background lg:flex">
            {language === 'az' ? 'Əlaqə' : 'Contact'}
          </Link>

          <button
            className="flex h-11 w-11 items-center justify-center text-text-primary lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute left-4 right-4 top-[90px] max-h-[80vh] overflow-y-auto rounded-[24px] border border-border bg-surface p-6 shadow-2xl backdrop-blur-[20px]"
          >
            <div className="flex flex-col gap-6">
              {navConfig.map((section) => (
                <div key={section.id} className="flex flex-col gap-3">
                  <Link href={section.rootPath} className="flex items-center gap-3 text-lg font-extrabold text-text-primary">
                    <span className="text-accent">{section.icon}</span>
                    <span>{section.title}</span>
                  </Link>
                  <div className="flex flex-col gap-2 pl-9">
                    {section.items.map(item => (
                      <Link key={item.path} href={item.path} className="py-2 text-[0.9rem] font-medium text-text-secondary transition-colors hover:text-accent">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <div className="h-[1px] w-full bg-border" />
              <button onClick={toggleTheme} className="flex items-center gap-3 py-2 font-bold text-text-secondary">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button onClick={handleToggleLang} className="flex items-center gap-3 py-2 font-bold text-text-secondary">
                <Globe size={18} />
                <span>{language === 'en' ? 'Azərbaycan dili' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

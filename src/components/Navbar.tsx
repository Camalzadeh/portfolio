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
    // Smoother scroll check
    const handleScroll = () => {
      if (window.scrollY > 20) {
        if (!scrolled) setScrolled(true);
      } else {
        if (scrolled) setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  const handleToggleLang = () => {
    setLanguage(language === 'en' ? 'az' : 'en');
  };

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[1000] flex justify-center pointer-events-none">
        <motion.div
          initial={false}
          animate={{
            width: scrolled ? "90%" : "100%",
            y: scrolled ? 15 : 0,
            height: scrolled ? 70 : 80,
            borderRadius: scrolled ? 100 : 0,
            paddingLeft: scrolled ? "2rem" : "2.5rem",
            paddingRight: scrolled ? "2rem" : "2.5rem",
          }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 30,
            mass: 1
          }}
          className={`pointer-events-auto relative flex items-center justify-between border-b transition-colors duration-500 overflow-visible ${scrolled
              ? "border-white/10 bg-[var(--nav-bg)] shadow-[0_20px_50px_rgba(0,0,0,0.3)] backdrop-blur-[24px]"
              : "border-transparent bg-transparent"
            }`}
        >
          {/* Main Logo */}
          <Link href="/" className="flex items-center gap-3 no-underline group">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-text-primary text-background text-[0.95rem] font-black shadow-lg"
            >
              HJ
            </motion.div>
            <span className="font-heading text-[1.25rem] font-black tracking-tight text-text-primary">
              Humbat<span className="text-accent">.</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="flex items-center gap-1 rounded-full border border-white/5 bg-white/[0.04] p-1.5 backdrop-blur-md max-lg:hidden">
            {navConfig.filter(s => s.id !== 'personal').map((section) => (
              <div
                key={section.id}
                className="relative"
                onMouseEnter={() => setActiveDropdown(section.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  href={section.rootPath}
                  className={`flex items-center gap-2.5 rounded-full px-5 py-2.5 text-[0.8rem] font-bold tracking-tight transition-all duration-300 hover:text-text-primary ${pathname.startsWith(section.rootPath) ? "text-text-primary" : "text-text-secondary"}`}
                >
                  <span className="opacity-50">{section.icon}</span>
                  <span>{section.title}</span>
                  <ChevronDown size={14} className={`opacity-40 transition-transform duration-300 ${activeDropdown === section.id ? 'rotate-180' : ''}`} />

                  {pathname.startsWith(section.rootPath) && (
                    <motion.div
                      layoutId="active-nav-bg"
                      className="absolute inset-0 z-[-1] rounded-full border border-accent/20 bg-accent/10"
                    />
                  )}
                </Link>

                <AnimatePresence>
                  {activeDropdown === section.id && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-1/2 top-[calc(100%+12px)] z-[2000] min-w-[240px] -translate-x-1/2 rounded-[24px] border border-white/10 bg-surface/90 p-2 shadow-2xl backdrop-blur-3xl"
                    >
                      <div className="flex flex-col gap-1">
                        {section.items.map((item) => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`flex items-center rounded-[16px] px-5 py-3 text-[0.85rem] font-semibold transition-all hover:bg-accent/10 hover:pl-6 hover:text-accent ${pathname === item.path ? 'bg-accent/5 text-accent' : 'text-text-secondary'}`}
                          >
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

          {/* Action Center */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-text-secondary transition-all hover:border-accent/40 hover:bg-surface-hover hover:text-text-primary group/theme"
            >
              {theme === 'dark' ? <Sun size={20} className="group-hover/theme:rotate-90 transition-transform duration-500" /> : <Moon size={20} className="group-hover/theme:-rotate-12 transition-transform duration-500" />}
            </button>

            <button
              onClick={handleToggleLang}
              className="flex h-11 items-center gap-2 rounded-xl border border-white/5 bg-white/5 px-4 text-[0.7rem] font-black uppercase tracking-widest text-text-secondary transition-all hover:border-accent/40 hover:bg-surface-hover hover:text-text-primary"
            >
              <Globe size={16} className="opacity-60" />
              <span>{language}</span>
            </button>

            <Link
              href="/#contact"
              className="hidden h-11 items-center rounded-full bg-accent px-7 text-[0.8rem] font-black uppercase tracking-widest text-black shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 hover:bg-white lg:flex"
            >
              {language === 'az' ? 'Əlaqə' : 'Connect'}
            </Link>

            <button
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/5 bg-white/5 text-text-primary lg:hidden transition-all active:scale-90"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Mobile Menu Backdrop */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[1900] bg-black/40 backdrop-blur-md lg:hidden"
            />
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-x-4 top-[95px] z-[2000] max-h-[80vh] overflow-y-auto rounded-[32px] border border-white/10 bg-surface/90 p-8 shadow-2xl backdrop-blur-3xl lg:hidden"
            >
              <div className="flex flex-col gap-8">
                {navConfig.map((section) => (
                  <div key={section.id} className="flex flex-col gap-4">
                    <p className="text-[0.65rem] font-black uppercase tracking-[4px] text-accent/60">{section.title}</p>
                    <div className="flex flex-col gap-2">
                      <Link
                        href={section.rootPath}
                        className={`rounded-2xl px-5 py-4 text-[1rem] font-bold transition-all active:scale-95 ${pathname === section.rootPath ? 'bg-accent text-black' : 'bg-white/5 text-text-primary'}`}
                      >
                        {section.title}
                      </Link>
                      <div className="ml-4 flex flex-col gap-2 border-l border-white/10 pl-4">
                        {section.items.map(item => (
                          <Link
                            key={item.path}
                            href={item.path}
                            className={`py-2.5 text-[0.9rem] font-semibold transition-colors ${pathname === item.path ? 'text-accent' : 'text-text-secondary'}`}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button onClick={toggleTheme} className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 py-6 text-text-secondary active:bg-accent active:text-black">
                    {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
                    <span className="text-[0.6rem] font-black uppercase tracking-widest">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                  </button>
                  <button onClick={handleToggleLang} className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-white/5 py-6 text-text-secondary active:bg-accent active:text-black">
                    <Globe size={24} />
                    <span className="text-[0.6rem] font-black uppercase tracking-widest">{language}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

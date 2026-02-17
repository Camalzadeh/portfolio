"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { Menu, X, Globe, ChevronDown, User, GraduationCap, Briefcase, Layers, Moon, Sun } from "lucide-react";
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
    <header className={`navbar-header ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-container">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <div className="logo-box">HJ</div>
          <span className="logo-text">Humbat<span>.</span></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          {navConfig.filter(s => s.id !== 'personal').map((section) => (
            <div
              key={section.id}
              className="nav-item-wrapper"
              onMouseEnter={() => setActiveDropdown(section.id)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href={section.rootPath}
                className={`nav-link ${pathname.startsWith(section.rootPath) ? "active" : ""}`}
              >
                <span className="link-icon">{section.icon}</span>
                <span className="link-text">{section.title}</span>
                <ChevronDown size={14} className={`chevron ${activeDropdown === section.id ? 'open' : ''}`} />
                {pathname.startsWith(section.rootPath) && (
                  <motion.div layoutId="nav-glow" className="nav-glow" />
                )}
              </Link>

              <AnimatePresence>
                {activeDropdown === section.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="dropdown-menu"
                  >
                    <div className="dropdown-inner">
                      {section.items.map((item) => (
                        <Link key={item.path} href={item.path} className="dropdown-link">
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
        <div className="nav-actions">
          <button onClick={toggleTheme} className="action-btn theme-toggle" title="Toggle Theme">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button onClick={handleToggleLang} className="action-btn lang-switcher" title="Change Language">
            <Globe size={18} />
            <span>{language.toUpperCase()}</span>
          </button>

          <Link href="/#contact" className="contact-btn desktop-only">
            {language === 'az' ? 'Əlaqə' : 'Contact'}
          </Link>

          <button
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
            className="mobile-menu"
          >
            <div className="mobile-menu-content">
              {navConfig.map((section) => (
                <div key={section.id} className="mobile-section">
                  <Link href={section.rootPath} className="mobile-link section-head">
                    {section.icon} <span>{section.title}</span>
                  </Link>
                  <div className="mobile-sub-items">
                    {section.items.map(item => (
                      <Link key={item.path} href={item.path} className="mobile-sub-link">
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <hr className="mobile-divider" />
              <button onClick={toggleTheme} className="mobile-link">
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
              <button onClick={handleToggleLang} className="mobile-link">
                <Globe size={18} />
                <span>{language === 'en' ? 'Azərbaycan dili' : 'English'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .navbar-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          z-index: 1000;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 0 2rem;
          display: flex;
          align-items: center;
        }

        .navbar-header.scrolled {
          height: 70px;
          background: var(--nav-bg);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid var(--border-color);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
          margin-top: 15px;
          margin-left: 5%;
          margin-right: 5%;
          border-radius: 100px;
          padding: 0 1.5rem;
          width: 90%;
        }

        .nav-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .nav-logo {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .logo-box {
          width: 38px;
          height: 38px;
          background: var(--text-primary);
          color: var(--bg-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          border-radius: 10px;
          font-size: 0.9rem;
        }

        .logo-text {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          letter-spacing: -0.02em;
        }

        .logo-text span {
          color: var(--accent-color);
        }

        .desktop-nav {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.03);
          padding: 6px;
          border-radius: 100px;
          border: 1px solid var(--border-color);
        }

        .nav-item-wrapper {
          position: relative;
        }

        .nav-link {
          position: relative;
          padding: 0.6rem 1.2rem;
          display: flex;
          align-items: center;
          gap: 8px;
          color: var(--text-secondary);
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 100px;
          transition: all 0.3s;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(var(--accent-color-rgb), 0.05);
        }

        .nav-link.active {
          color: var(--text-primary);
        }

        .chevron {
          opacity: 0.5;
          transition: transform 0.3s;
        }
        .chevron.open { transform: rotate(180deg); }

        .dropdown-menu {
          position: absolute;
          top: calc(100% + 15px);
          left: 50%;
          transform: translateX(-50%);
          min-width: 240px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 8px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.3);
          z-index: 100;
        }

        .dropdown-inner {
           display: flex;
           flex-direction: column;
           gap: 4px;
        }

        .dropdown-link {
          padding: 10px 16px;
          border-radius: 12px;
          font-size: 0.85rem;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all 0.2s;
        }

        .dropdown-link:hover {
          background: rgba(var(--accent-color-rgb), 0.1);
          color: var(--text-primary);
          padding-left: 20px;
        }

        .nav-glow {
          position: absolute;
          inset: 0;
          background: rgba(var(--accent-color-rgb), 0.1);
          border-radius: 100px;
          border: 1px solid rgba(var(--accent-color-rgb), 0.2);
          z-index: -1;
        }

        .nav-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .action-btn {
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          transition: all 0.3s;
        }

        .action-btn:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
          border-color: var(--accent-color);
        }

        .lang-switcher {
          width: auto;
          padding: 0 0.8rem;
          gap: 8px;
          font-size: 0.75rem;
          font-weight: 800;
        }

        .contact-btn {
          background: var(--accent-color);
          color: #fff !important;
          padding: 0.8rem 1.8rem;
          border-radius: 100px;
          font-size: 0.85rem;
          font-weight: 800;
          transition: all 0.3s;
          box-shadow: 0 8px 20px rgba(var(--accent-color-rgb), 0.2);
        }

        .contact-btn:hover {
          transform: translateY(-2px);
          background: var(--foreground);
          color: var(--background) !important;
        }

        .mobile-toggle {
          display: none;
          color: var(--text-primary);
        }

        .mobile-menu {
          position: absolute;
          top: 90px;
          left: 1rem;
          right: 1rem;
          background: var(--surface-color);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border-color);
          border-radius: 24px;
          padding: 1.5rem;
          max-height: 80vh;
          overflow-y: auto;
        }

        .mobile-section {
           margin-bottom: 1.5rem;
        }

        .section-head {
           font-size: 1.1rem;
           font-weight: 800;
           color: var(--text-primary);
           margin-bottom: 0.5rem;
        }

        .mobile-sub-items {
           display: flex;
           flex-direction: column;
           padding-left: 2rem;
           gap: 0.5rem;
        }

        .mobile-sub-link {
           font-size: 0.9rem;
           color: var(--text-secondary);
           padding: 0.5rem 0;
        }

        .mobile-link {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
          border-radius: 12px;
        }

        .mobile-divider {
          border: none;
          border-top: 1px solid var(--border-color);
          margin: 1rem 0;
        }

        @media (max-width: 1024px) {
          .desktop-nav, .desktop-only {
            display: none;
          }
          .mobile-toggle {
            display: flex;
          }
        }
      `}</style>
    </header>
  );
}

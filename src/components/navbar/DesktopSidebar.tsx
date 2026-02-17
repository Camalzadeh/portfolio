"use client";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Mail, User, Moon, Sun, Languages } from "lucide-react";
import { NavButton } from "../NavButton";
import { NavSection } from "@/types/nav";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

interface DesktopSidebarProps {
  navConfig: NavSection[];
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  expanded: string | null;
  onNavClick: (id: string, path: string) => void;
  pathname: string;
  onSubItemClick: () => void;
  personalData: { email: string; github: string };
}

export function DesktopSidebar({
  navConfig,
  isCollapsed,
  onToggleCollapse,
  expanded,
  onNavClick,
  pathname,
  onSubItemClick,
  personalData
}: DesktopSidebarProps) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside className={`sidebar-nav ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-top">
        <Link href="/" className="sidebar-logo">
          <div className="logo-box">HJ</div>
          {!isCollapsed && <span className="logo-label">Portfolio</span>}
        </Link>
        <button className="collapse-btn" onClick={onToggleCollapse}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="sidebar-menu">
        {navConfig.map((nav) => (
          <NavButton
            key={nav.id}
            nav={nav}
            isCollapsed={isCollapsed}
            isExpanded={expanded === nav.id}
            isActive={pathname === nav.rootPath || (nav.rootPath !== '/' && pathname.startsWith(nav.rootPath))}
            onToggle={() => onNavClick(nav.id, nav.rootPath)}
          >
            {nav.items.map((item) => (
              <Link key={item.path} href={item.path} className="sub-item" onClick={onSubItemClick}>
                <div className="sub-dot" />
                <span>{item.name}</span>
              </Link>
            ))}
          </NavButton>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="footer-controls">
            <button className="control-btn" onClick={() => setLanguage(language === 'en' ? 'az' : 'en')}>
              <Languages size={18} />
              <span>{language === 'en' ? 'AZ' : 'EN'}</span>
            </button>
            <button className="control-btn" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        )}
        <div className="footer-contact">
          <div className="contact-links">
            <Link href={`mailto:${personalData.email}`}><Mail size={16} /></Link>
            <Link href={personalData.github} target="_blank"><User size={16} /></Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sidebar-nav {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 300px;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          padding: 2.5rem 1.5rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidebar-nav.collapsed {
          width: 90px;
          padding: 2.5rem 0.5rem;
          align-items: center;
        }

        .sidebar-top {
          margin-bottom: 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          padding: 0 0.5rem;
        }

        .sidebar-nav.collapsed .sidebar-top {
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 3rem;
          padding: 0;
        }

        .sidebar-logo { display: flex; align-items: center; gap: 12px; text-decoration: none; }

        .logo-box {
          width: 44px;
          height: 44px;
          background: var(--accent-color);
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          border-radius: 14px;
          font-size: 1rem;
          flex-shrink: 0;
          box-shadow: 0 0 25px rgba(45, 212, 191, 0.25);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .logo-label {
          color: var(--text-primary);
          font-weight: 800;
          letter-spacing: 0.5px;
          font-size: 1.1rem;
          white-space: nowrap;
        }

        .collapse-btn {
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          width: 30px;
          height: 30px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .collapse-btn:hover { background: var(--surface-hover); color: var(--text-primary); transform: scale(1.1); }

        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
          width: 100%;
        }

        :global(.menu-group) { width: 100%; }

        :global(.menu-header) {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1rem;
          color: var(--text-secondary);
          cursor: pointer;
          border-radius: 16px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          user-select: none;
          width: 100%;
          position: relative;
          background: transparent;
        }

        .sidebar-nav.collapsed :global(.menu-header) {
          padding: 0;
          border-radius: 50%;
          width: 54px;
          height: 54px;
          margin: 0 auto;
          justify-content: center;
        }

        :global(.menu-header:hover) {
          background: var(--surface-hover);
          color: var(--text-primary);
        }

        :global(.menu-header.active) {
          background: var(--surface-color);
          color: var(--text-primary);
        }

        :global(.group-left) {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          white-space: nowrap;
          overflow: hidden;
          flex: 1;
        }

        :global(.item-title) {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        :global(.expand-arrow) {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: 10px;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .footer-controls {
          display: flex;
          gap: 10px;
        }

        .control-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 0.6rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          transition: all 0.2s;
        }

        .control-btn:hover {
          background: var(--surface-hover);
          color: var(--text-primary);
          border-color: var(--accent-color);
        }

        .contact-links { display: flex; gap: 12px; }

        .contact-links a {
          width: 44px;
          height: 44px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .contact-links a:hover {
          background: var(--accent-color);
          color: #000;
          transform: translateY(-4px);
          box-shadow: 0 10px 20px rgba(var(--accent-color-rgb), 0.3);
          border-color: transparent;
        }

        :global(.sub-item) {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 0.85rem 1rem;
          border-radius: 14px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          white-space: nowrap;
          overflow: hidden;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          margin-bottom: 4px;
        }

        :global(.sub-item:hover) {
          color: var(--text-primary);
          background: var(--surface-hover);
          transform: translateX(5px);
        }

        :global(.sub-dot) {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--border-color);
          transition: all 0.3s;
        }

        :global(.sub-item:hover .sub-dot) {
          background: var(--accent-color);
          box-shadow: 0 0 10px var(--accent-glow);
        }
      `}</style>
    </aside>
  );
}

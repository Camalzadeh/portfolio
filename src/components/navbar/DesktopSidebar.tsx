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
    <aside className={`fixed left-0 top-0 z-[1000] flex h-screen flex-col border-r border-border bg-[var(--sidebar-bg)] p-10 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${isCollapsed ? 'w-[90px] items-center px-2 py-10' : 'w-[300px] px-6'}`}>
      <div className={`mb-16 flex w-full items-center justify-between px-2 ${isCollapsed ? 'mb-12 flex-col gap-8 px-0' : ''}`}>
        <Link href="/" className="flex items-center gap-3 no-underline">
          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-[14px] bg-accent text-[1rem] font-black text-black shadow-[0_0_25px_rgba(45,212,191,0.25)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
            HJ
          </div>
          {!isCollapsed && <span className="whitespace-nowrap font-heading text-[1.1rem] font-extrabold tracking-[0.5px] text-text-primary">Portfolio</span>}
        </Link>
        <button className="flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border border-border bg-surface-color text-text-secondary transition-all duration-200 hover:scale-110 hover:bg-surface-hover hover:text-text-primary" onClick={onToggleCollapse}>
          {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      <nav className="flex w-full flex-1 flex-col gap-3">
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
              <Link
                key={item.path}
                href={item.path}
                className="group flex items-center gap-3 overflow-hidden whitespace-nowrap rounded-[14px] border border-border bg-surface-color p-[0.85rem_1rem] text-[0.8rem] font-semibold text-text-secondary no-underline transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:translate-x-1 hover:bg-surface-hover hover:text-text-primary"
                onClick={onSubItemClick}
              >
                <div className="h-[5px] w-[5px] flex-shrink-0 rounded-full bg-border transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_10px_var(--accent-glow)]" />
                <span>{item.name}</span>
              </Link>
            ))}
          </NavButton>
        ))}
      </nav>

      <div className="mt-auto flex w-full flex-col gap-6 border-t border-border pt-8">
        {!isCollapsed && (
          <div className="flex gap-2.5">
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-color p-[0.6rem] text-[0.75rem] font-bold text-text-secondary transition-all duration-200 hover:border-accent hover:bg-surface-hover hover:text-text-primary" onClick={() => setLanguage(language === 'en' ? 'az' : 'en')}>
              <Languages size={18} />
              <span>{language === 'en' ? 'AZ' : 'EN'}</span>
            </button>
            <button className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-surface-color p-[0.6rem] text-[0.75rem] font-bold text-text-secondary transition-all duration-200 hover:border-accent hover:bg-surface-hover hover:text-text-primary" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        )}
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <Link href={`mailto:${personalData.email}`} className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-color text-text-secondary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-transparent hover:bg-accent hover:text-black hover:shadow-[0_10px_20px_rgba(45,212,191,0.3)]">
              <Mail size={16} />
            </Link>
            <Link href={personalData.github} target="_blank" className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-color text-text-secondary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-transparent hover:bg-accent hover:text-black hover:shadow-[0_10px_20px_rgba(45,212,191,0.3)]">
              <User size={16} />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

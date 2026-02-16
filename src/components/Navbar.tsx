"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Layers, Home, User, Mail, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import data from "@/data/portfolio.json";

export default function Navbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleExpand = (id: string) => {
    if (isCollapsed) setIsCollapsed(false); // Auto-expand sidebar if opening menu
    setExpanded(expanded === id ? null : id);
  };

  const navConfig = [
    {
      id: "experience",
      title: "Experience",
      icon: <Briefcase size={20} />,
      rootPath: "/experience",
      items: data.pillars.experience.items.map(i => ({ name: i.title, path: `/experience/${i.id}` }))
    },
    {
      id: "academic",
      title: "Academic",
      icon: <GraduationCap size={20} />,
      rootPath: "/academic",
      items: data.pillars.academic.categories.flatMap(c => c.items.map(i => ({ name: i.title, path: `/academic#${i.id}` })))
    },
    {
      id: "projects",
      title: "Projects",
      icon: <Layers size={20} />,
      rootPath: "/projects",
      items: data.pillars.projects.items.map(i => ({ name: i.title, path: `/projects/${i.id}` }))
    }
  ];

  // Dynamic style injection for body padding
  useEffect(() => {
    document.body.style.paddingLeft = isCollapsed ? '100px' : '280px';
    // Handle mobile
    if (window.innerWidth <= 1024) {
      document.body.style.paddingLeft = '0';
    }
    const handleResize = () => {
      if (window.innerWidth <= 1024) document.body.style.paddingLeft = '0';
      else document.body.style.paddingLeft = isCollapsed ? '100px' : '280px';
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isCollapsed]);

  return (
    <>
      {/* Sidebar - Desktop Only */}
      <aside className={`sidebar-nav ${isCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-top">
          <Link href="/" className="sidebar-logo">
            <div className="logo-box">HJ</div>
            {!isCollapsed && <span className="logo-label">Portfolio</span>}
          </Link>
          <button
            className="collapse-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
          </button>
        </div>

        <nav className="sidebar-menu">
          <Link href="/" className={`menu-root ${pathname === '/' ? 'active' : ''}`} title="Home">
            <Home size={20} />
            {!isCollapsed && <span>Home</span>}
          </Link>

          {navConfig.map((nav) => {
            const isRootActive = pathname.startsWith(nav.rootPath);
            const isExpanded = expanded === nav.id;

            return (
              <div key={nav.id} className="menu-group">
                <div
                  className={`menu-header ${isRootActive ? 'active' : ''}`}
                  onClick={() => toggleExpand(nav.id)}
                  title={nav.title}
                >
                  <div className="group-left">
                    {nav.icon}
                    {!isCollapsed && <span>{nav.title}</span>}
                  </div>
                  {!isCollapsed && (
                    <button className="expand-toggle">
                      {isExpanded ? <Minus size={14} /> : <Plus size={14} />}
                    </button>
                  )}
                </div>

                <AnimatePresence>
                  {isExpanded && !isCollapsed && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="menu-sub"
                    >
                      <Link href={nav.rootPath} className="sub-item all-link">
                        View Overview
                      </Link>
                      {nav.items.slice(0, 6).map((item) => (
                        <Link key={item.path} href={item.path} className="sub-item">
                          {item.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="sidebar-footer">
            <div className="footer-contact">
              <p className="contact-label">Get in touch</p>
              <div className="contact-links">
                <Link href={`mailto:${data.personal.email}`}><Mail size={16} /></Link>
                <Link href={data.personal.github} target="_blank"><User size={16} /></Link>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Mobile Top Nav */}
      <div className="mobile-nav">
        <Link href="/" className="mobile-logo">HJ.</Link>
        <button className="mobile-menu-btn">Menu</button>
      </div>

      <style jsx>{`
        a { text-decoration: none !important; }

        .sidebar-nav {
          position: fixed;
          left: 0;
          top: 0;
          height: 100vh;
          width: 280px;
          background: #050505;
          border-right: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          flex-direction: column;
          z-index: 1000;
          padding: 2rem;
          transition: width 0.3s ease;
        }

        .sidebar-nav.collapsed {
          width: 100px;
          padding: 2rem 1.5rem;
          align-items: center;
        }

        .sidebar-top {
          margin-bottom: 3rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
        }

        .sidebar-nav.collapsed .sidebar-top {
          flex-direction: column;
          gap: 2rem;
          margin-bottom: 2rem;
        }

        .sidebar-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
          color: inherit;
        }

        .logo-box {
          width: 36px;
          height: 36px;
          background: #fff;
          color: #000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 900;
          border-radius: 8px;
          font-size: 0.8rem;
          flex-shrink: 0;
        }

        .logo-label {
          color: #fff;
          font-weight: 700;
          letter-spacing: 1px;
          font-size: 0.9rem;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .collapse-btn {
          background: rgba(255,255,255,0.05);
          border: none;
          color: #64748b;
          width: 24px;
          height: 24px;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s;
        }

        .collapse-btn:hover {
          background: rgba(255,255,255,0.1);
          color: #fff;
        }

        .sidebar-menu {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          width: 100%;
        }

        .menu-root {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0.8rem 1rem;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.9rem;
          font-weight: 600;
          border-radius: 12px;
          transition: all 0.2s;
          cursor: pointer;
          border: 1px solid transparent;
        }

        .sidebar-nav.collapsed .menu-root {
          justify-content: center;
          padding: 0.8rem;
        }

        .menu-root:hover, .menu-root.active {
          background: rgba(255, 255, 255, 0.08); /* Proper button look */
          color: #fff;
          border-color: rgba(255,255,255,0.05);
        }

        .menu-group {
          display: flex;
          flex-direction: column;
          width: 100%;
        }

        .menu-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.8rem 1rem;
          color: #94a3b8;
          cursor: pointer;
          border-radius: 12px;
          transition: all 0.2s;
          user-select: none;
          border: 1px solid transparent;
        }

        .sidebar-nav.collapsed .menu-header {
          justify-content: center;
          padding: 0.8rem;
        }

        .menu-header:hover {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
        }

        .menu-header.active {
          color: var(--accent-color);
          background: rgba(45, 212, 191, 0.08);
          border-color: rgba(45, 212, 191, 0.1);
        }

        .group-left {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 0.9rem;
          font-weight: 600;
        }

        .expand-toggle {
          background: none;
          border: none;
          color: inherit;
          padding: 0;
          opacity: 0.5;
        }

        /* Sub-menu Styling: "The beautiful button look" */
        .menu-sub {
          padding-left: 0.8rem; /* Less indentation, more structure */
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 6px;
          overflow: hidden;
          position: relative;
        }

        .menu-sub:before {
          content: '';
          position: absolute;
          left: 1.5rem;
          top: 0;
          bottom: 0;
          width: 1px;
          background: rgba(255,255,255,0.05);
          display: none; /* Removed vertical line for cleaner button look */
        }

        .sub-item {
          display: block;
          color: #94a3b8;
          text-decoration: none;
          font-size: 0.8rem;
          padding: 0.7rem 1rem; /* More distinct button padding */
          border-radius: 8px;
          transition: all 0.2s;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          background: rgba(255,255,255,0.02); /* Default subtle background */
          border: 1px solid transparent;
          margin-left: 0.5rem;
        }

        .sub-item:hover {
          background: rgba(255, 255, 255, 0.08); /* Brighter hover */
          color: #fff;
          transform: translateX(4px); /* Subtle interaction */
          border-color: rgba(255,255,255,0.05);
        }

        .all-link {
          font-weight: 700;
          color: var(--accent-color); /* Highlight color */
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.5px;
          background: rgba(45, 212, 191, 0.05); /* Tinted background */
          border-color: rgba(45, 212, 191, 0.1);
          text-align: center;
          margin-bottom: 2px;
        }

        .all-link:hover {
          background: rgba(45, 212, 191, 0.15);
          color: #fff;
        }

        .sidebar-footer {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          width: 100%;
        }

        .contact-label {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #475569;
          margin-bottom: 1rem;
        }

        .contact-links {
          display: flex;
          gap: 12px;
        }

        .contact-links a {
          width: 32px;
          height: 32px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #94a3b8;
          transition: all 0.2s;
          text-decoration: none;
        }

        .contact-links a:hover {
          background: #fff;
          color: #000;
        }

        .mobile-nav {
           display: none;
        }

        @media (max-width: 1024px) {
           .sidebar-nav { display: none; }
           .mobile-nav {
              display: flex;
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              height: 60px;
              background: #000;
              border-bottom: 1px solid rgba(255,255,255,0.1);
              z-index: 1000;
              align-items: center;
              justify-content: space-between;
              padding: 0 1.5rem;
           }
           .mobile-logo { color: #fff; font-weight: 900; text-decoration: none; }
           .mobile-menu-btn { background: none; border: 1px solid rgba(255,255,255,0.2); color: #fff; padding: 4px 12px; border-radius: 8px; font-size: 0.8rem; }
        }
      `}</style>
    </>
  );
}

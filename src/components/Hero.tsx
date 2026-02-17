"use client";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero container" style={{ paddingTop: '120px', paddingBottom: '100px' }}>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="badge-premium"
      >
        <span>L2 CS Student @ UFAZ</span>
        <span className="divider">|</span>
        <span className="accent-text">Software Engineer</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="hero-title"
      >
        Humbat <br /> <span className="text-gradient">Jamalzadeh</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="hero-subtitle"
      >
        Expert in <strong>Flutter & Django</strong>. Shipped 4+ production apps at Graph Company.
        Focused on building scalable ecosystems and high-performance backend infrastructures.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="hero-pillars"
      >
        <Link href="/experience" className="pillar-link">
          <div className="pillar-content">
            <div className="icon-box"><Briefcase size={20} /></div>
            <div>
              <p className="pillar-label">Execution</p>
              <h4>Experience</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>

        <Link href="/academic" className="pillar-link">
          <div className="pillar-content">
            <div className="icon-box"><GraduationCap size={20} /></div>
            <div>
              <p className="pillar-label">Foundations</p>
              <h4>Academic</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>

        <Link href="/projects" className="pillar-link">
          <div className="pillar-content">
            <div className="icon-box"><Zap size={20} /></div>
            <div>
              <p className="pillar-label">Innovation</p>
              <h4>Projects</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>
      </motion.div>

      <style jsx>{`
        .badge-premium {
          display: inline-flex;
          align-items: center;
          padding: 8px 16px;
          background: var(--surface-hover);
          border: 1px solid var(--border-color);
          border-radius: 100px;
          font-size: 0.75rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 2rem;
        }
        .divider { margin: 0 12px; opacity: 0.2; }
        .accent-text { color: var(--accent-color); }

        .hero-pillars {
          display: flex;
          gap: 1.5rem;
          margin-top: 4rem;
          width: 100%;
          max-width: 900px;
        }

        .pillar-link {
          flex: 1;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          padding: 1.5rem;
          text-decoration: none;
          color: var(--text-primary);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }

        .pillar-link:hover {
          background: var(--surface-hover);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        }

        .pillar-link::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 4px;
          background: var(--accent-color);
          opacity: 0;
          transition: 0.3s;
        }
        .pillar-link:hover::before { opacity: 1; }

        .pillar-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
        }

        .icon-box {
          width: 44px;
          height: 44px;
          background: rgba(var(--accent-color-rgb), 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-color);
        }

        .pillar-label {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 800;
          opacity: 0.6;
        }

        .pillar-content h4 {
          margin: 4px 0 0 0;
          font-size: 1.15rem;
          font-weight: 800;
        }

        .pillar-arrow {
          opacity: 0.3;
          transition: 0.3s;
          color: var(--text-secondary);
        }

        .pillar-link:hover .pillar-arrow {
          opacity: 1;
          color: var(--accent-color);
          transform: translateX(4px);
        }

        @media (max-width: 992px) {
          .hero-pillars { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}

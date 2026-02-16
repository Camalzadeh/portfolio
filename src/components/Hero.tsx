"use client";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, GraduationCap, Zap } from "lucide-react";
import Link from "next/link";
import data from "@/data/portfolio.json";

export default function Hero() {
  return (
    <section className="hero container">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="badge"
      >
        <span>L2 CS Student @ UFAZ</span>
        <span style={{ margin: '0 10px', opacity: 0.3 }}>|</span>
        <span style={{ color: 'var(--accent-color)' }}>Software Engineer</span>
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
            <Briefcase size={20} />
            <div>
              <p className="pillar-label">Execution</p>
              <h4>Experience</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>

        <Link href="/academic" className="pillar-link">
          <div className="pillar-content">
            <GraduationCap size={20} />
            <div>
              <p className="pillar-label">Foundations</p>
              <h4>Academic</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>

        <Link href="/projects" className="pillar-link">
          <div className="pillar-content">
            <Zap size={20} />
            <div>
              <p className="pillar-label">Innovation</p>
              <h4>Projects</h4>
            </div>
          </div>
          <ChevronRight size={18} className="pillar-arrow" />
        </Link>
      </motion.div>

      <style jsx>{`
        .hero-pillars {
          display: flex;
          gap: 1.5rem;
          margin-top: 4rem;
          width: 100%;
          max-width: 900px;
        }

        .pillar-link {
          flex: 1;
          background: rgba(255, 255, 255, 0.05); /* Increased opacity for button feel */
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px; /* Slightly squarer for button look */
          padding: 1.5rem;
          text-decoration: none;
          color: #fff;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1); /* subtle depth */
        }

        .pillar-link:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-color);
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
        }

        .pillar-content {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          text-align: left;
        }

        .pillar-label {
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: var(--text-secondary);
          margin: 0;
          font-weight: 700;
        }

        .pillar-content h4 {
          margin: 4px 0 0 0;
          font-size: 1.1rem;
          font-weight: 700;
        }

        .pillar-arrow {
          opacity: 0.5;
          transition: transform 0.2s ease;
          background: rgba(255,255,255,0.1); /* Circle bg for arrow */
          padding: 4px;
          border-radius: 50%;
          width: 28px;
          height: 28px;
        }

        .pillar-link:hover .pillar-arrow {
          transform: translateX(5px);
          opacity: 1;
          color: #000;
          background: var(--accent-color); /* Highlight arrow on hover */
        }

        @media (max-width: 992px) {
          .hero-pillars { flex-direction: column; }
        }
      `}</style>
    </section>
  );
}

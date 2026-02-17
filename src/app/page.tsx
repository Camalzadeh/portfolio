"use client";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Linkedin, Mail, ArrowRight, Github } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <Hero />

      {/* Short Dynamic Bio - Identity Section */}
      <section id="identity" className="container identity-section">
        <div className="grid grid-cols-12 items-center">
          <div className="col-span-7 bio-content">
            <span className="section-label">Identity</span>
            <h2 className="section-title">Bridging AI & <span className="text-gradient">Real-world</span> Engineering.</h2>
            <p className="bio-text">
              Specializing in high-performance architectures, I bridge the gap between complex software engineering and intelligent systems. Shipped 4+ production-scale apps with Flutter & Django.
            </p>
            <div className="btn-group">
              <Link href="/projects" className="btn-primary">
                View Portfolio <ArrowRight size={20} />
              </Link>
              <a href="mailto:h.jamalov@ufaz.az" className="btn-secondary">
                Contact Me
              </a>
            </div>
          </div>

          <div className="col-span-5 relative stats-card-wrapper">
            <motion.div
              className="card stats-card"
              initial={{ rotate: 2 }}
              whileInView={{ rotate: 0 }}
            >
              <div className="stats-inner">
                <h3 className="stats-header">Quick Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <p className="stat-label">GPA Score</p>
                    <p className="stat-value">98 / 100</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">Apps Shipped</p>
                    <p className="stat-value">4+ Production Apps</p>
                  </div>
                  <div className="stat-item">
                    <p className="stat-label">Research Citations</p>
                    <p className="stat-value">IEEE Published</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Skills />

      <footer id="contact" className="container main-footer">
        <div className="footer-content">
          <div className="footer-nav">
            <Link href="/experience" className="footer-btn">Experience</Link>
            <Link href="/academic" className="footer-btn">Academic</Link>
            <Link href="/projects" className="footer-btn">Projects</Link>
          </div>

          <div className="footer-socials">
            <a href="https://linkedin.com" className="icon-btn" target="_blank"><Linkedin size={18} /></a>
            <a href="https://github.com" className="icon-btn" target="_blank"><Github size={18} /></a>
            <a href="mailto:h.jamalov@ufaz.az" className="icon-btn"><Mail size={18} /></a>
          </div>
        </div>
        <p className="copyright">
          © 2026 Humbat Jamalzadeh. Built with precision and Next.js.
        </p>
      </footer>

      <style jsx>{`
        /* Bio Section Styles */
        .identity-section { padding: 80px 0; }
        .items-center { align-items: center; }
        .col-span-7 { grid-column: span 7; }
        .col-span-5 { grid-column: span 5; }
        .relative { position: relative; }

        .bio-content { padding-right: 2rem; }
        .bio-text {
          font-size: 1.25rem;
          color: var(--text-secondary);
          line-height: 1.8;
          margin-bottom: 2.5rem;
        }

        .btn-group { display: flex; gap: 1rem; }

        /* Stats Card */
        .stats-card {
          border-left: 4px solid var(--accent-color);
          background: var(--surface-color); 
          padding: 0;
          border: 1px solid var(--border-color);
          border-radius: 24px;
        }

        .stats-inner { padding: 2rem; }
        .stats-header { margin-bottom: 1.5rem; font-size: 1.2rem; font-weight: 800; }
        .stats-grid { display: flex; flex-direction: column; gap: 1.5rem; }
        .stat-label { font-size: 0.7rem; opacity: 0.6; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; font-weight: 800; }
        .stat-value { font-size: 1.25rem; font-weight: 800; color: var(--text-primary); }

        /* Footer Styles */
        .main-footer {
          padding: 80px 0;
          border-top: 1px solid var(--border-color);
          margin-top: 100px;
        }

        .footer-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
        }

        .footer-nav { display: flex; gap: 1rem; }

        .footer-btn {
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 0.9rem 1.8rem;
          border-radius: 14px;
          font-weight: 700;
          font-size: 0.9rem;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .footer-btn:hover {
          background: var(--accent-color);
          color: #000;
          transform: translateY(-4px);
          border-color: transparent;
        }

        .footer-socials { display: flex; gap: 1rem; }

        .icon-btn {
          width: 48px;
          height: 48px;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .icon-btn:hover {
          background: var(--surface-hover);
          color: var(--accent-color);
          border-color: var(--accent-color);
          transform: translateY(-4px) scale(1.1);
        }

        .copyright {
          margin-top: 3rem;
          text-align: center;
          color: var(--text-secondary);
          font-size: 0.85rem;
          opacity: 0.5;
        }

        @media (max-width: 768px) {
          .col-span-7, .col-span-5 { grid-column: span 12; }
          .bio-content { padding-right: 0; margin-bottom: 3rem; }
          .footer-content { flex-direction: column; align-items: center; }
          .footer-nav { flex-direction: column; width: 100%; }
          .footer-btn { text-align: center; }
        }
      `}</style>
    </main>
  );
}

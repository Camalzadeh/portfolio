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

      {/* Short Dynamic Bio */}
      <section className="container">
        <div className="grid grid-cols-12" style={{ alignItems: 'center' }}>
          <div style={{ gridColumn: 'span 7' }}>
            <span className="section-label">Identity</span>
            <h2 className="section-title">Bridging AI & <span className="text-gradient">Real-world</span> Engineering.</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
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

          <div style={{ gridColumn: 'span 5', position: 'relative' }}>
            <motion.div
              className="card"
              initial={{ rotate: 2 }}
              whileInView={{ rotate: 0 }}
              style={{ borderLeft: '4px solid var(--accent-color)' }}
            >
              <div style={{ padding: '1rem' }}>
                <h3 style={{ marginBottom: '1rem' }}>Quick Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>GPA Score</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 800 }}>98 / 100</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Apps Shipped</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 800 }}>4+ Production Apps</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.75rem', opacity: 0.5 }}>Research Citations</p>
                    <p style={{ fontSize: '1.25rem', fontWeight: 800 }}>IEEE Published</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Skills />

      <footer className="container" style={{ padding: '80px 0', borderTop: '1px solid var(--glass-border)', marginTop: '100px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link href="/experience" className="nav-link">Experience</Link>
            <Link href="/academic" className="nav-link">Academic</Link>
            <Link href="/projects" className="nav-link">Projects</Link>
          </div>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://linkedin.com" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><Linkedin size={18} /></a>
            <a href="https://github.com" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><Github size={18} /></a>
            <a href="mailto:h.jamalov@ufaz.az" className="btn-secondary" style={{ padding: '0.5rem 1rem' }}><Mail size={18} /></a>
          </div>
        </div>
        <p style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          © 2026 Humbat Jamalzadeh. Built with precision and Next.js.
        </p>
      </footer>
    </main>
  );
}

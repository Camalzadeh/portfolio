"use client";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CategorySection from "@/components/CategorySection";
import Skills from "@/components/Skills";
import data from "@/data/portfolio.json";
import { Github, Linkedin, Mail, ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />

      {/* Short Story / Intro */}
      <section id="about" className="container" style={{ paddingTop: '100px', paddingBottom: '50px' }}>
        <div className="grid grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="section-label">Profile</span>
            <h2 className="section-title">My Journey So Far</h2>
            <p className="hero-subtitle" style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'left', maxWidth: '100%' }}>
              From winning math challenges at ADA to presenting AI research at international conferences.
              I believe in fast-track learning and building systems that matter.
              Currently at UFAZ, maintaining a 98% GPA while architecting real-world applications.
            </p>
            <div className="btn-group">
              <a href="https://linkedin.com" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Linkedin size={18} /> View Detailed CV
              </a>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <motion.div
              initial={{ rotate: -5, opacity: 0 }}
              whileInView={{ rotate: 0, opacity: 1 }}
              className="card"
              style={{ padding: '3rem', borderLeft: '5px solid var(--accent-color)', background: 'linear-gradient(to bottom right, rgba(255,255,255,0.05), transparent)' }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Core Tenets</h3>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                  Fast-Track Skill Acquisition
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                  Data-Driven AI Research
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-color)' }} />
                  Full-Cycle Software Engineering
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections from JSON */}
      {data.categories.map((category) => (
        <CategorySection key={category.id} category={category} />
      ))}

      <Skills />

      <footer className="footer container" style={{ marginTop: '150px', borderTop: '1px solid var(--glass-border)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4rem' }}>
          <div>
            <h2 className="text-gradient" style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.5rem' }}>Humbat Jamalov</h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: '300px', fontSize: '1rem' }}>
              Building the future of AI accessibility and software engineering.
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem' }}>
            <div>
              <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Portal Discovery</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {data.categories.slice(0, 4).map(cat => (
                  <a key={cat.id} href={`#${cat.id}`} className="nav-link" style={{ fontSize: '0.9rem' }}>{cat.title}</a>
                ))}
              </div>
            </div>

            <div>
              <h4 style={{ color: '#fff', marginBottom: '1.5rem', fontWeight: 600 }}>Connectivity</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="mailto:h.jamalov@ufaz.az" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Mail size={18} /> h.jamalov@ufaz.az
                </a>
                <a href="https://linkedin.com" className="nav-link" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Linkedin size={18} /> LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: '80px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          <p>© {new Date().getFullYear()} Humbat Jamalov. Deep-Extracted Portfolio Engine.</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <span style={{ fontSize: '0.7rem', padding: '4px 8px', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>VERSION 2.0_MASTER_DETAIL</span>
            <ExternalLink size={14} />
          </div>
        </div>
      </footer>
    </main>
  );
}

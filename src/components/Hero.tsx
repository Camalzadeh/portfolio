"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail, ExternalLink } from "lucide-react";

export default function Hero() {
    return (
        <section className="hero container" style={{ paddingTop: '180px', paddingBottom: '100px' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="badge"
            >
                <span style={{ marginRight: '8px' }}>🚀</span>
                Available for AI Research & Software Roles
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-title"
            >
                Humbat <br /> Jamalov
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-subtitle"
                style={{ maxWidth: '700px' }}
            >
                AI Researcher & Software Engineer at UFAZ.
                Top 1% Computer Science student focused on <span className="text-gradient" style={{ fontWeight: 700 }}>AI for Accessibility</span> and Robust Backend Systems.
                Medalist in ICPC and National Math Competitions.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="btn-group"
            >
                <a href="#research" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Explore Research <ArrowRight size={18} />
                </a>
                <a href="mailto:h.jamalov@ufaz.az" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> Contact Me
                </a>
            </motion.div>
        </section>
    );
}

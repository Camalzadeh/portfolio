"use client";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";

export default function Hero() {
    return (
        <section className="hero container">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="badge"
            >
                Available for AI & Software Roles
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="hero-title"
            >
                Humbat Jamalov
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="hero-subtitle"
            >
                AI Researcher & Software Engineer at UFAZ.
                Top 1% Computer Science student focused on AI for Accessibility and Robust Backend Systems.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="btn-group"
            >
                <a href="#achievements" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    Explore Achievements <ArrowRight size={18} />
                </a>
                <a href="mailto:humbat.jamalov@example.com" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mail size={18} /> Contact Me
                </a>
            </motion.div>
        </section>
    );
}

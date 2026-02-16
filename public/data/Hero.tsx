"use client";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="hero">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="badge"
            >
                Available for new opportunities
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
                Top 1% Computer Science student focused on AI for Accessibility and Backend Systems.
            </motion.p>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                style={{ display: 'flex', gap: '1rem' }}
            >
                <a href="#projects" className="btn-primary">View Projects</a>
                <a href="#contact" className="btn-secondary">Get in Touch</a>
            </motion.div>
        </section>
    );
}

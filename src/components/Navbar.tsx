"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/portfolio.json";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [activeHash, setActiveHash] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            // Update active hash based on scroll position
            const sections = data.categories.map(cat => cat.id);
            for (const id of sections) {
                const el = document.getElementById(id);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 100 && rect.bottom >= 100) {
                        setActiveHash(`#${id}`);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[rgba(5,5,5,0.8)] backdrop-blur-md border-b border-glass-border py-4' : 'bg-transparent py-6'}`}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a href="#" className="text-gradient" style={{ fontWeight: 800, fontSize: '1.5rem', fontFamily: 'var(--font-heading)' }}>HJ.</a>

                <div style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', padding: '10px 0' }} className="no-scrollbar">
                    {data.categories.map((cat) => (
                        <a
                            key={cat.id}
                            href={`#${cat.id}`}
                            className={`nav-link ${activeHash === `#${cat.id}` ? 'active' : ''}`}
                            style={{
                                fontSize: '0.85rem',
                                fontWeight: 600,
                                color: activeHash === `#${cat.id}` ? 'var(--accent-color)' : 'var(--text-secondary)',
                                whiteSpace: 'nowrap',
                                position: 'relative',
                                padding: '5px 10px'
                            }}
                        >
                            {cat.title}
                            {activeHash === `#${cat.id}` && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute bottom-[-10px] left-0 right-0 h-[2px] bg-accent-color"
                                />
                            )}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}

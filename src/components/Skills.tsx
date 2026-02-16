"use client";
import { motion } from "framer-motion";
import data from "@/data/portfolio.json";
import { Code, Server, Cpu, Layers } from "lucide-react";

export default function Skills() {
    const skills = data.skills as any;

    return (
        <section id="skills" className="container">
            <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
                <span className="section-label">Capabilities</span>
                <h2 className="section-title">Technical Expertise</h2>
            </header>

            <div className="grid grid-cols-12" style={{ gap: '2rem' }}>
                {/* Languages */}
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{ gridColumn: 'span 4' }}
                    className="card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(45, 212, 191, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--accent-color)' }}>
                            <Code size={24} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem' }}>Languages</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {skills.Languages?.map((skill: string) => (
                            <span key={skill} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* Frameworks */}
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{ gridColumn: 'span 4' }}
                    className="card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(129, 140, 248, 0.1)', padding: '10px', borderRadius: '12px', color: 'var(--secondary-color)' }}>
                            <Layers size={24} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem' }}>Frameworks</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {skills.Frameworks?.map((skill: string) => (
                            <span key={skill} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>

                {/* DevOps/Tools */}
                <motion.div
                    whileHover={{ y: -5 }}
                    style={{ gridColumn: 'span 4' }}
                    className="card"
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                        <div style={{ background: 'rgba(248, 113, 113, 0.1)', padding: '10px', borderRadius: '12px', color: '#f87171' }}>
                            <Server size={24} />
                        </div>
                        <h4 style={{ fontSize: '1.2rem' }}>Infrastructure</h4>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                        {skills["DevOps/Tools"]?.map((skill: string) => (
                            <span key={skill} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.4rem 0.8rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

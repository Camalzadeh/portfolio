"use client";
import { motion } from "framer-motion";
import data from "@/data/portfolio.json";

export default function Skills() {
    const skills = data.skills as any;

    return (
        <section id="skills" className="container" style={{ background: 'var(--surface-color)', borderRadius: '40px', padding: '80px 60px', marginTop: '100px' }}>
            <div className="grid grid-2">
                <div>
                    <span className="section-label">Expertise</span>
                    <h2 className="section-title" style={{ marginBottom: '1.5rem' }}>Technical Arsenal</h2>
                    <p className="card-text" style={{ maxWidth: '400px', fontSize: '1.1rem' }}>
                        A comprehensive set of tools and technologies I use to build scalable, AI-driven solutions.
                    </p>

                    <div style={{ marginTop: '3rem' }}>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Specializations</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {skills.Specializations?.map((spec: string) => (
                                <span key={spec} style={{ background: 'var(--accent-glow)', color: 'var(--accent-color)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>
                                    {spec}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid" style={{ gap: '3rem' }}>
                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--accent-color)' }}>Languages & Core</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {skills.Languages?.map((skill: string) => (
                                <span key={skill} style={{ border: '1px solid var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--secondary-color)' }}>Frameworks & Ecosystem</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {skills.Frameworks?.map((skill: string) => (
                                <span key={skill} style={{ background: 'rgba(255,255,255,0.03)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>DevOps & Tools</h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                            {skills["DevOps/Tools"]?.map((skill: string) => (
                                <span key={skill} style={{ border: '1px dashed var(--glass-border)', padding: '0.5rem 1rem', borderRadius: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

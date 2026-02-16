"use client";
import { motion } from "framer-motion";
import data from "@/data/portfolio.json";
import { Award, Code, GraduationCap, Zap } from "lucide-react";

const iconMap: any = {
    "Competitive Programming": <Code className="text-accent-color" />,
    "Research": <Zap className="text-accent-color" />,
    "Academics": <GraduationCap className="text-accent-color" />,
    "default": <Award className="text-accent-color" />
};

export default function Achievements() {
    return (
        <section id="achievements" className="container">
            <span className="section-label">Milestones</span>
            <h2 className="section-title">Key Achievements</h2>

            <div className="grid grid-3">
                {data.achievements.map((item, index) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="card"
                    >
                        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
                                {iconMap[item.category] || iconMap.default}
                            </div>
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>{item.date}</span>
                        </div>
                        <h3 className="card-title" style={{ fontSize: '1.25rem' }}>{item.title}</h3>
                        <p className="card-text">{item.award || item.description}</p>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

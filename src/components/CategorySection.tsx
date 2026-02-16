"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, MapPin, ExternalLink, ShieldCheck, Trophy, Award, Briefcase, GraduationCap, Code, Sigma, RefreshCcw, Users, Zap } from "lucide-react";

const icons: any = {
    Zap: <Zap />,
    Code: <Code />,
    Briefcase: <Briefcase />,
    GraduationCap: <GraduationCap />,
    Users: <Users />,
    RefreshCcw: <RefreshCcw />,
    Sigma: <Sigma />,
    Trophy: <Trophy />,
    Award: <Award />
};

interface Item {
    title: string;
    role?: string;
    award?: string;
    organization?: string;
    date: string;
    description: string;
    full_detail?: string;
    path?: string;
    result?: string;
}

interface Category {
    id: string;
    title: string;
    icon: string;
    summary: string;
    items: Item[];
}

export default function CategorySection({ category }: { category: Category }) {
    const [selectedItem, setSelectedItem] = useState<Item | null>(category.items[0]);

    return (
        <section id={category.id} className="container" style={{ paddingTop: '100px', paddingBottom: '100px' }}>
            <div style={{ marginBottom: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '1rem' }}>
                    <div style={{ background: 'var(--accent-glow)', padding: '12px', borderRadius: '12px', color: 'var(--accent-color)' }}>
                        {icons[category.icon] || <Award />}
                    </div>
                    <span className="section-label" style={{ margin: 0 }}>{category.title}</span>
                </div>
                <h2 className="section-title" style={{ marginBottom: '1rem' }}>{category.title} Discovery</h2>
                <p className="card-text" style={{ fontSize: '1.2rem', maxWidth: '700px' }}>{category.summary}</p>
            </div>

            <div className="discovery-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem', height: '600px' }}>
                {/* Master List */}
                <div className="discovery-list no-scrollbar" style={{ overflowY: 'auto', paddingRight: '1rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {category.items.map((item, idx) => (
                            <motion.div
                                key={idx}
                                onClick={() => setSelectedItem(item)}
                                className={`card discovery-item ${selectedItem?.title === item.title ? 'active' : ''}`}
                                style={{
                                    cursor: 'pointer',
                                    padding: '1.25rem',
                                    border: selectedItem?.title === item.title ? '1px solid var(--accent-color)' : '1px solid var(--glass-border)',
                                    background: selectedItem?.title === item.title ? 'rgba(var(--accent-color-rgb), 0.05)' : 'rgba(255,255,255,0.03)'
                                }}
                                whileHover={{ x: 5 }}
                            >
                                <div style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent-color)', textTransform: 'uppercase' }}>
                                        {item.award || item.role || item.result || 'Achievement'}
                                    </span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.date}</span>
                                </div>
                                <h4 style={{ fontSize: '1.1rem', color: '#fff' }}>{item.title}</h4>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Detail Preview */}
                <div className="discovery-preview" style={{ position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        {selectedItem && (
                            <motion.div
                                key={selectedItem.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="card"
                                style={{ height: '100%', position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', flexDirection: 'column' }}
                            >
                                <div style={{ padding: '2.5rem', flex: 1, overflowY: 'auto' }} className="no-scrollbar">
                                    <div style={{ marginBottom: '2rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                                            <ShieldCheck size={20} className="text-accent-color" />
                                            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Detailed Profile</span>
                                        </div>
                                        <h3 style={{ fontSize: '2.2rem', lineHeight: '1.2', marginBottom: '1rem' }}>{selectedItem.title}</h3>
                                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                                            <div>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Organization</p>
                                                <p style={{ fontWeight: 600 }}>{selectedItem.organization || 'Independent'}</p>
                                            </div>
                                            <div>
                                                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>Date / Duration</p>
                                                <p style={{ fontWeight: 600 }}>{selectedItem.date}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginBottom: '2.5rem' }}>
                                        <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: 'var(--text-secondary)' }}>
                                            {selectedItem.full_detail || selectedItem.description}
                                        </p>
                                    </div>

                                    <div style={{ marginTop: 'auto', padding: '1.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
                                            <FileText size={16} className="text-secondary-color" />
                                            <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>VERIFIED SOURCE</span>
                                        </div>
                                        <code style={{ fontSize: '0.75rem', color: 'var(--accent-color)', wordBreak: 'break-all' }}>
                                            {selectedItem.path || 'Self-Reported'}
                                        </code>
                                    </div>
                                </div>

                                <div style={{ padding: '1.5rem 2.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '1rem' }}>
                                    <button className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                        View Media <ExternalLink size={16} style={{ marginLeft: '8px' }} />
                                    </button>
                                    <button className="btn-secondary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.9rem' }}>
                                        Contact Reference
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
}

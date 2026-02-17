"use client";
import { useState } from "react";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function ExperiencePage() {
    const { t } = useLanguage();
    const expData = data.experience as any;
    const experiences = [...expData.items].sort((a: any, b: any) => (b.sort_date || '').localeCompare(a.sort_date || ''));
    const [selectedItem, setSelectedItem] = useState<any>(experiences[0] || null);

    return (
        <main className="container page-header">
            <header className="page-title-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="title-group"
                >
                    <span className="page-category">{t('nav.experience')}</span>
                    <h1 className="section-title">
                        {t('experience.title_main')} <span className="text-accent">{t('experience.title_sub')}</span>
                    </h1>
                </motion.div>
            </header>

            <div className="pillar-layout">
                <div className="content-segment">
                    <div className="items-grid">
                        {experiences.map((item: any, idx: number) => (
                            <ItemCard
                                key={item.id}
                                item={item}
                                index={idx}
                                isSelected={selectedItem?.id === item.id}
                                onSelect={setSelectedItem}
                                isLast={idx === experiences.length - 1}
                            />
                        ))}
                    </div>
                </div>

                <aside className="preview-sticky">
                    <IntegratedPreview item={selectedItem} />
                </aside>
            </div>

            <style jsx>{`
                .page-title-section { margin-bottom: 5rem; }
                .page-category {
                    display: inline-block;
                    padding: 8px 16px;
                    background: rgba(var(--accent-color-rgb), 0.1);
                    color: var(--accent-color);
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(var(--accent-color-rgb), 0.2);
                }
                .text-accent { color: var(--accent-color); }
                
                .pillar-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 4rem;
                    align-items: start;
                }

                .preview-sticky {
                    position: sticky;
                    top: 120px;
                    height: calc(100vh - 160px);
                    min-height: 700px;
                }

                @media (max-width: 1200px) {
                    .pillar-layout { grid-template-columns: 1fr; }
                    .preview-sticky { position: relative; top: 0; min-height: unset; height: auto; }
                }
            `}</style>
        </main>
    );
}

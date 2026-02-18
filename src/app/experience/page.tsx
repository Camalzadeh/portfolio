"use client";
import { useState } from "react";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import { motion, AnimatePresence } from "framer-motion";
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

            <div className="academic-experience-layout">
                {/* Left Side: Timeline */}
                <div className="timeline-column">
                    <section className="category-section">
                        <div className="category-header">
                            <h2 className="category-title">{t('experience.title_main')}</h2>
                            <div className="category-line" />
                        </div>
                        <div className="timeline-items">
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
                    </section>
                </div>

                {/* Right Side: Preview */}
                <aside className="preview-column">
                    <div className="preview-fixed-wrapper">
                        <div className="preview-inner-centered">
                            <IntegratedPreview item={selectedItem} />
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .page-title-section {
                    margin-bottom: 6rem;
                    position: relative;
                }
                .page-category {
                    display: inline-block;
                    padding: 12px 28px;
                    background: rgba(var(--accent-color-rgb), 0.1);
                    color: var(--accent-color);
                    border-radius: 100px;
                    font-size: 0.85rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 4px;
                    margin-bottom: 2rem;
                    border: 1px solid rgba(var(--accent-color-rgb), 0.2);
                    backdrop-filter: blur(10px);
                }
                .text-accent { color: var(--accent-color); }
                
                .academic-experience-layout {
                    display: grid;
                    grid-template-columns: 1fr 2fr;
                    gap: 5rem;
                    align-items: start;
                    position: relative;
                    max-width: 100%;
                }

                .timeline-column {
                    display: flex;
                    flex-direction: column;
                    gap: 6rem;
                    padding-bottom: 15rem;
                    position: relative;
                    padding-right: 2rem;
                }

                .category-section {
                    position: relative;
                }

                .category-header {
                    margin-bottom: 4rem;
                    display: flex;
                    align-items: center;
                    gap: 2.5rem;
                }

                .category-title {
                    font-size: 1rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--accent-color);
                    letter-spacing: 5px;
                    white-space: nowrap;
                    opacity: 0.9;
                }

                .category-line {
                    flex: 1;
                    height: 2px;
                    background: linear-gradient(90deg, rgba(var(--accent-color-rgb), 0.4), transparent);
                    border-radius: 2px;
                }

                .timeline-items {
                    display: flex;
                    flex-direction: column;
                }

                .preview-column {
                    position: sticky;
                    top: 130px;
                    height: calc(100vh - 180px);
                    min-width: 800px;
                }

                .preview-fixed-wrapper {
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: flex-start;
                    justify-content: center;
                    background: rgba(255,255,255,0.02);
                    border-radius: 40px;
                    padding: 10px;
                    border: 1px solid var(--border-color);
                }

                .preview-inner-centered {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                }

                @media (max-width: 1600px) {
                    .preview-column { min-width: 700px; }
                    .academic-experience-layout { grid-template-columns: 1fr 1.5fr; gap: 4rem; }
                }

                @media (max-width: 1400px) {
                    .preview-column { min-width: 600px; }
                }

                @media (max-width: 1200px) {
                    .academic-experience-layout {
                        grid-template-columns: 1fr;
                    }
                    .preview-column {
                        position: relative;
                        top: 0;
                        height: auto;
                        order: -1;
                        margin-bottom: 4rem;
                        min-width: unset;
                    }
                    .preview-fixed-wrapper {
                        height: 700px;
                        border-radius: 32px;
                    }
                    .timeline-column {
                        padding-bottom: 5rem;
                        padding-right: 0;
                    }
                }

                @media (max-width: 768px) {
                    .page-title-section { margin-bottom: 4rem; }
                    .preview-fixed-wrapper { height: 550px; }
                    .timeline-column { gap: 4rem; }
                    .category-header { margin-bottom: 3rem; }
                }
            `}</style>
        </main>
    );
}

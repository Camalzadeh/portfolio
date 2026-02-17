"use client";
import { useState } from "react";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function AcademicPage() {
    const { t } = useLanguage();
    const academicData = data.academic as any;
    const allItems = academicData.categories.flatMap((c: any) => c.items);
    const [selectedItem, setSelectedItem] = useState<any>(allItems[0] || null);

    return (
        <main className="container page-header">
            <header className="page-title-section">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="title-group"
                >
                    <span className="page-category">{t('nav.academic')}</span>
                    <h1 className="section-title">
                        {t('academic.title_main')} <span className="text-accent">{t('academic.title_sub')}</span>
                    </h1>
                </motion.div>
            </header>

            <div className="pillar-layout">
                <div className="content-segment">
                    {academicData.categories.map((category: any) => (
                        <section key={category.id} className="category-block" id={category.id}>
                            <h2 className="category-label">{category.title}</h2>
                            <div className="items-grid">
                                {category.items.map((item: any, idx: number) => (
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        index={idx}
                                        isSelected={selectedItem?.id === item.id}
                                        onSelect={setSelectedItem}
                                        isLast={idx === category.items.length - 1}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                <aside className="preview-sticky">
                    <IntegratedPreview item={selectedItem} />
                </aside>
            </div>

            <style jsx>{`
                .page-title-section {
                    margin-bottom: 5rem;
                }
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

                .content-segment {
                    display: flex;
                    flex-direction: column;
                    gap: 6rem;
                }

                .category-label {
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    color: var(--text-secondary);
                    letter-spacing: 4px;
                    margin-bottom: 3rem;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                }

                .category-label::after {
                    content: '';
                    flex: 1;
                    height: 1px;
                    background: linear-gradient(90deg, var(--border-color), transparent);
                }

                .preview-sticky {
                    position: sticky;
                    top: 120px;
                    height: calc(100vh - 160px);
                    min-height: 700px;
                    z-index: 50;
                }

                @media (max-width: 1200px) {
                    .pillar-layout {
                        grid-template-columns: 1fr;
                    }
                    .preview-sticky {
                        position: relative;
                        top: 0;
                        height: auto;
                        min-height: unset;
                    }
                }
            `}</style>
        </main>
    );
}

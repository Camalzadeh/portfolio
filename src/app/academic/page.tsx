"use client";
import { useState } from "react";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import { motion } from "framer-motion";

export default function AcademicPage() {
    const academicData = data.pillars.academic as any;
    const allAcademicItems = academicData.categories
        .flatMap((cat: any) => cat.items)
        .sort((a: any, b: any) => b.sort_date.localeCompare(a.sort_date));

    const [selectedItem, setSelectedItem] = useState<any>(allAcademicItems[0] || null);

    return (
        <main className="container page-header">
            <header style={{ marginBottom: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="header-pill"
                >
                    Academic Pillar
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-title"
                >
                    Foundations & <span style={{ color: 'var(--acad-color)' }}>Research</span>
                </motion.h1>
            </header>

            <div className="pillar-layout">
                <div className="timeline-segment">
                    {allAcademicItems.map((item: any, idx: number) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={idx}
                            isSelected={selectedItem?.id === item.id}
                            onSelect={setSelectedItem}
                        />
                    ))}
                </div>

                <aside className="preview-sticky">
                    <IntegratedPreview item={selectedItem} />
                </aside>
            </div>

            <style jsx>{`
                .header-pill {
                    display: inline-block;
                    padding: 6px 16px;
                    background: rgba(255,255,255,0.05);
                    border: 1px solid rgba(255,255,255,0.1);
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 800;
                    text-transform: uppercase;
                    letter-spacing: 2px;
                    color: var(--acad-color);
                    margin-bottom: 1.5rem;
                }

                .timeline-segment {
                    display: flex;
                    flex-direction: column;
                }
            `}</style>
        </main>
    );
}

"use client";
import { useState } from "react";
import data from "@/data/portfolio.json";
import ItemCard from "@/components/ItemCard";
import IntegratedPreview from "@/components/IntegratedPreview";
import { motion } from "framer-motion";

export default function ExperiencePage() {
    const expData = data.pillars.experience as any;
    const experiences = [...expData.items].sort((a: any, b: any) => b.sort_date.localeCompare(a.sort_date));

    const [selectedItem, setSelectedItem] = useState<any>(experiences[0] || null);

    return (
        <main className="container page-header">
            <header style={{ marginBottom: '4rem' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="header-pill"
                >
                    Professional Journey
                </motion.div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="section-title"
                >
                    Engineering <span className="text-gradient">Excellence</span>
                </motion.h1>
            </header>

            <div className="pillar-layout">
                {/* Left: Timeline */}
                <div className="timeline-segment">
                    {experiences.map((item: any, idx: number) => (
                        <ItemCard
                            key={item.id}
                            item={item}
                            index={idx}
                            isSelected={selectedItem?.id === item.id}
                            onSelect={setSelectedItem}
                        />
                    ))}
                </div>

                {/* Right: Sticky Preview */}
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
          color: var(--accent-color);
          margin-bottom: 1.5rem;
        }

        .timeline-segment {
          display: flex;
          flex-direction: column;
        }

        @media (max-width: 1200px) {
           .timeline-segment { max-width: 800px; margin: 0 auto; }
        }
      `}</style>
        </main>
    );
}

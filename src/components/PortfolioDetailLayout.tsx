"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "./ItemCard";
import IntegratedPreview from "./IntegratedPreview";

interface Item {
    id: string;
    title: string;
    date: any;
    description: string;
    organization?: string;
    [key: string]: any;
}

interface Category {
    id: string;
    title: string;
    items: Item[];
}

interface PortfolioDetailLayoutProps {
    titleMain: string;
    titleSub: string;
    categoryLabel: string;
    categories: Category[];
    initialSelectedItem?: Item | null;
}

export default function PortfolioDetailLayout({
    titleMain,
    titleSub,
    categoryLabel,
    categories,
    initialSelectedItem
}: PortfolioDetailLayoutProps) {
    const defaultItem = categories[0]?.items[0] || null;
    const [selectedItem, setSelectedItem] = useState<Item | null>(initialSelectedItem || defaultItem);

    return (
        <main className="container pb-20 pt-20">
            {/* Page Header */}
            <header className="relative mb-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col"
                >
                    <span className="mb-6 inline-block self-start rounded-full border border-accent/20 bg-accent/5 px-6 py-2 text-[0.8rem] font-black uppercase tracking-[4px] text-accent backdrop-blur-md">
                        {categoryLabel}
                    </span>
                    <h1 className="text-clamp-title font-heading font-bold leading-[1.1] tracking-tight text-text-primary">
                        {titleMain} <span className="text-accent">{titleSub}</span>
                    </h1>
                </motion.div>
            </header>

            <div className="relative flex flex-col gap-12 lg:grid lg:grid-cols-[minmax(400px,1fr)_1.5fr] lg:gap-16 xl:grid-cols-[minmax(450px,1fr)_2fr] xl:gap-24">

                {/* Left Column: List/Timeline */}
                <div className="flex flex-col gap-20 pb-40">
                    {categories.map((category, cIdx) => (
                        <section key={category.id} className="relative">
                            {/* Category Header (Only if multiple categories or explicit) */}
                            {categories.length > 1 && (
                                <div className="mb-12 flex items-center gap-8">
                                    <h2 className="whitespace-nowrap text-[0.9rem] font-black uppercase tracking-[5px] text-accent opacity-80">
                                        {category.title}
                                    </h2>
                                    <div className="h-[1px] flex-1 bg-gradient-to-r from-accent/30 to-transparent" />
                                </div>
                            )}

                            <div className="flex flex-col gap-4">
                                {category.items.map((item, idx) => (
                                    <ItemCard
                                        key={item.id}
                                        item={item}
                                        index={idx}
                                        colorIndex={cIdx}
                                        isSelected={selectedItem?.id === item.id}
                                        onSelect={setSelectedItem}
                                    />
                                ))}
                            </div>
                        </section>
                    ))}
                </div>

                {/* Right Column: Dynamic Preview Section */}
                <aside className="sticky top-[110px] h-[calc(100vh-160px)] min-h-[500px] w-full max-lg:relative max-lg:top-0 max-lg:order-first max-lg:h-[600px] max-md:h-[500px] max-lg:mb-12">
                    <motion.div
                        layout
                        className="relative h-full w-full overflow-hidden rounded-[32px] border border-border bg-surface-color/50 shadow-2xl backdrop-blur-2xl"
                    >
                        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-none" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={selectedItem?.id}
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.02 }}
                                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                className="h-full w-full"
                            >
                                <IntegratedPreview item={selectedItem} />
                            </motion.div>
                        </AnimatePresence>
                    </motion.div>

                    {/* Background decoration */}
                    <div className="absolute -right-20 -top-20 z-[-1] h-96 w-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none" />
                </aside>
            </div>
        </main>
    );
}

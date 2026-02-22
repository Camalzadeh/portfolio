import React, { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ItemCard from "./ItemCard";
import IntegratedPreview from "./IntegratedPreview";
import { Search, X, ChevronRight, Terminal, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import data from "@/data/portfolio.json";
import { useLanguage } from "@/context/LanguageContext";

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

function PortfolioDetailContent({
    titleMain,
    titleSub,
    categoryLabel,
    categories,
    initialSelectedItem
}: PortfolioDetailLayoutProps) {
    const portfolio = data as any;
    const { t } = useLanguage();
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get initial item from categories based on URL id
    const defaultItem = useMemo(() => {
        const urlId = searchParams.get('id');
        if (urlId) {
            for (const cat of categories) {
                const item = cat.items.find(i => i.id === urlId);
                if (item) return item;
            }
        }
        return initialSelectedItem || categories[0]?.items[0] || null;
    }, [categories, searchParams, initialSelectedItem]);

    const [selectedItem, setSelectedItem] = useState<Item | null>(defaultItem);
    const [selectedTag, setSelectedTag] = useState<any>(null);

    // Update URL when item changes
    useEffect(() => {
        if (selectedItem) {
            const params = new URLSearchParams(window.location.search);
            if (params.get('id') !== selectedItem.id) {
                params.set('id', selectedItem.id);
                router.replace(`${window.location.pathname}?${params.toString()}`, { scroll: false });
            }
        }
    }, [selectedItem, router]);

    // Memoize all items to search through for the explorer
    const allItems = useMemo(() => {
        const experience = (portfolio.experience?.items || []).map((i: any) => ({ ...i, category: 'experience' }));
        const projects = (portfolio.projects?.items || []).map((i: any) => ({ ...i, category: 'projects' }));

        const academicItems = (portfolio.academic?.categories || []).flatMap((c: any) =>
            (c.items || []).map((i: any) => {
                const pathParts = i.path?.split('/') || [];
                const catSubtype = pathParts[2] || 'university';
                return { ...i, category: 'academic', catSubtype };
            })
        );

        return [...experience, ...projects, ...academicItems];
    }, [portfolio]);

    const matchingItems = useMemo(() => {
        if (!selectedTag) return [];
        return allItems.filter((item: any) => item.tagIds?.includes(selectedTag.id));
    }, [selectedTag, allItems]);

    const getItemUrl = (item: any) => {
        if (item.category === 'academic') {
            return `/academic/${item.catSubtype}?id=${item.id}`;
        }
        return `/${item.category}?id=${item.id}`;
    };

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

            <div className="relative flex flex-col gap-12 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 xl:grid-cols-[1.2fr_0.8fr] xl:gap-24">

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
                                        onTagClick={setSelectedTag}
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

            {/* TAG EXPLORER OVERLAY */}
            <AnimatePresence>
                {selectedTag && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTag(null)}
                            className="fixed inset-0 z-[1001] bg-background/80 backdrop-blur-md cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: '100%' }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: '100%' }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 z-[1002] flex max-h-[85vh] flex-col overflow-hidden bg-surface border-t border-white/10 rounded-t-[40px] shadow-[0_-20px_100px_rgba(0,0,0,0.5)] md:bottom-12 md:left-1/2 md:right-auto md:w-[90%] md:max-w-2xl md:-translate-x-1/2 md:rounded-[40px] md:border"
                        >
                            <div className="relative shrink-0 p-6 md:p-8 md:pb-6">
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-5">
                                        <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-[18px] bg-accent/10 p-3 border border-accent/20 shadow-[0_10px_30px_rgba(var(--accent-color-rgb),0.2)]">
                                            {selectedTag.path ? (
                                                <img src={`/${selectedTag.path}`} alt="" className="h-full w-full object-contain" />
                                            ) : (
                                                <Search size={22} className="text-accent" />
                                            )}
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 mb-1">
                                                <span className="text-[0.6rem] font-black uppercase tracking-[3px] text-accent/80">{selectedTag.type || 'Skill'}</span>
                                                <div className="h-1 w-1 rounded-full bg-white/20" />
                                                <span className="text-[0.6rem] font-black uppercase tracking-[3px] text-text-secondary opacity-60">{matchingItems.length} {t('skills.matching_results')}</span>
                                            </div>
                                            <h3 className="font-heading text-2xl md:text-3xl font-black text-text-primary tracking-tighter">{selectedTag.name}</h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setSelectedTag(null)}
                                        className="rounded-full bg-white/5 p-2.5 text-text-secondary transition-all hover:bg-white/10 hover:text-white hover:rotate-90"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="mt-6 h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                            </div>

                            <div className="flex-1 overflow-y-auto px-6 pb-12 md:px-12 scrollbar-none">
                                <div className="space-y-4">
                                    {matchingItems.length > 0 ? (
                                        matchingItems.map((item: any, i: number) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                key={item.id}
                                            >
                                                <Link
                                                    href={getItemUrl(item)}
                                                    onClick={() => setSelectedTag(null)}
                                                    className="group flex items-center justify-between rounded-[28px] border border-white/5 bg-white/[0.02] p-5 md:p-6 transition-all duration-500 hover:scale-[1.02] hover:border-accent/30 hover:bg-accent/[0.03] active:scale-[0.98]"
                                                >
                                                    <div className="flex flex-col gap-2 pr-6">
                                                        <div className="flex items-center gap-3">
                                                            <div className="rounded-full bg-accent/10 px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-accent">
                                                                {item.category}
                                                            </div>
                                                            {item.catSubtype && (
                                                                <span className="text-[0.65rem] font-bold text-text-secondary opacity-40 uppercase tracking-widest">{item.catSubtype}</span>
                                                            )}
                                                        </div>
                                                        <h4 className="text-xl font-bold text-text-primary transition-colors group-hover:text-accent line-clamp-1">{item.title}</h4>
                                                    </div>
                                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/5 text-text-secondary group-hover:bg-accent group-hover:text-black transition-all shadow-sm">
                                                        <ChevronRight size={20} />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="flex flex-col items-center justify-center py-20 opacity-30">
                                            <Terminal size={48} className="mb-6" />
                                            <p className="font-heading text-lg font-bold uppercase tracking-[4px]">{t('skills.no_items')}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="h-2 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}

export default function PortfolioDetailLayout(props: PortfolioDetailLayoutProps) {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-full items-center justify-center bg-background">
                <div className="flex flex-col items-center gap-6">
                    <Loader2 className="h-12 w-12 animate-spin text-accent/20" />
                    <p className="text-[0.7rem] font-black uppercase tracking-[4px] text-text-secondary opacity-40">Initialising Vault</p>
                </div>
            </div>
        }>
            <PortfolioDetailContent {...props} />
        </Suspense>
    );
}

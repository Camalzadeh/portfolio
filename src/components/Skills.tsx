"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/portfolio.json";
import tagsData from "@/data/tags.json";
import { Code, Server, Layers, Database, Palette, Terminal, Search, ChevronRight, X, Award, Book, Building2, Cpu, Brain } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

/**
 * Maps icon slugs from JSON to Lucide components
 */
const IconResolver = ({ name, size = 20 }: { name: string, size?: number }) => {
    switch (name.toLowerCase()) {
        case 'code': return <Code size={size} />;
        case 'layers': return <Layers size={size} />;
        case 'database': return <Database size={size} />;
        case 'server': return <Server size={size} />;
        case 'palette': return <Palette size={size} />;
        case 'terminal': return <Terminal size={size} />;
        case 'award': return <Award size={size} />;
        case 'book': return <Book size={size} />;
        case 'building': return <Building2 size={size} />;
        case 'cpu': return <Cpu size={size} />;
        case 'brain': return <Brain size={size} />;
        default: return <Terminal size={size} />;
    }
};

export default function Skills() {
    const portfolio = data as any;
    const skillCategories = (tagsData as any).skillCategories || [];
    const { t } = useLanguage();
    const [selectedTag, setSelectedTag] = useState<any>(null);

    // Memoize all items to search through
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
        <section id="skills" className="container py-24 px-6 sm:px-12 relative">
            <header className="mb-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center"
                >
                    <span className="mb-6 inline-block rounded-full border border-accent/20 bg-accent/5 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[4px] text-accent shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.1)]">{t('skills.badge')}</span>
                    <h2 className="font-heading text-5xl font-black leading-tight text-text-primary md:text-6xl lg:text-7xl">{t('skills.title')}</h2>
                    <p className="mt-6 text-text-secondary max-w-2xl text-lg font-medium opacity-80 leading-relaxed">{t('skills.subtitle')}</p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {skillCategories.map((category: any, idx: number) => (
                    <SkillCard
                        key={category.id}
                        title={category.name}
                        icon={<IconResolver name={category.icon} />}
                        items={category.tags}
                        color={category.color}
                        delay={idx * 0.05}
                        selectedTagId={selectedTag?.id}
                        onTagClick={(tag) => setSelectedTag(selectedTag?.id === tag.id ? null : tag)}
                    />
                ))}
            </div>

            {/* QUICK EXPLORER OVERLAY - ULTRA PREMIUM REDESIGN */}
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
                            {/* Header Section */}
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

                            {/* Scrollable Content */}
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
                                                    className="group flex items-center justify-between rounded-[28px] border border-white/5 bg-white/[0.02] p-5 md:p-6 transition-all duration-500 hover:scale-[1.02] hover:border-accent/30 hover:bg-accent/[0.03] active:scale-[0.98]"
                                                >
                                                    <div className="flex flex-col gap-2 overflow-hidden pr-6">
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

                            {/* Footer Accent */}
                            <div className="h-2 w-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}

function SkillCard({ title, icon, items, color, delay, selectedTagId, onTagClick }: { title: string, icon: any, items: any[], color: string, delay: number, selectedTagId?: string, onTagClick: (tag: any) => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="group relative flex h-full flex-col rounded-[40px] border border-border bg-surface-color/40 p-8 sm:p-10 transition-all duration-700 hover:bg-surface-color/60 backdrop-blur-3xl overflow-hidden"
        >
            <div className="mb-10 flex items-center justify-between">
                <div
                    className="flex h-16 w-16 items-center justify-center rounded-[22px] transition-all duration-500 group-hover:scale-110 shadow-lg group-hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                >
                    {icon}
                </div>
                <div className="h-1 w-10 rounded-full bg-border transition-all group-hover:w-16 group-hover:bg-accent/40" />
            </div>

            <h4 className="mb-10 font-heading text-3xl font-black text-text-primary tracking-tighter">{title}</h4>

            <div className="flex flex-wrap gap-3">
                {items?.map((tag: any) => (
                    <button
                        key={tag.id}
                        onClick={() => onTagClick(tag)}
                        className={`group/tag relative flex items-center gap-2.5 rounded-[16px] border-2 px-4 py-2 transition-all duration-500 active:scale-95 ${selectedTagId === tag.id ? 'border-accent bg-accent/10 text-accent shadow-[0_0_25px_rgba(var(--accent-color-rgb),0.25)]' : 'border-border bg-white/[0.02] hover:border-accent/40 hover:bg-accent/5 hover:text-white'}`}
                    >
                        {tag.path && (
                            <img
                                src={`/${tag.path}`}
                                alt=""
                                className={`h-3.5 w-3.5 object-contain transition-all duration-500 ${selectedTagId === tag.id ? 'scale-110 opacity-100' : 'opacity-50 grayscale group-hover/tag:grayscale-0 group-hover/tag:opacity-100 group-hover/tag:scale-110'}`}
                            />
                        )}
                        <span className={`text-[0.7rem] font-bold uppercase tracking-wider transition-all duration-500 ${selectedTagId === tag.id ? 'text-accent' : 'text-text-secondary group-hover/tag:text-white'}`}>{tag.name}</span>

                        {/* Count Badge */}
                        {(tag.count > 0) && (
                            <div className={`flex h-4.5 min-w-[18px] items-center justify-center rounded-full px-1 text-[0.55rem] font-black transition-all ${selectedTagId === tag.id ? 'bg-accent text-black' : 'bg-white/10 text-text-secondary group-hover/tag:bg-accent/20 group-hover/tag:text-accent'}`}>
                                {tag.count}
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Premium Decorative elements */}
            <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-accent/5 blur-3xl transition-opacity duration-700 opacity-0 group-hover:opacity-100" />
        </motion.div>
    );
}

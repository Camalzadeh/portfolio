"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import data from "@/data/portfolio.json";
import { Code, Server, Layers, Database, Palette, Terminal, Search, ChevronRight, X, Award, Book, Building2, Cpu, Brain } from "lucide-react";
import Link from "next/link";

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
    const skillCategories = portfolio.skillCategories || [];
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
        <section id="skills" className="container py-24 relative">
            <header className="mb-16">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                >
                    <span className="mb-4 inline-block self-start rounded-full border border-accent/20 bg-accent/5 px-5 py-1.5 text-[0.6rem] font-black uppercase tracking-[3px] text-accent">Capabilities</span>
                    <h2 className="font-heading text-4xl font-black leading-tight text-text-primary md:text-5xl">Technical <span className="text-accent underline underline-offset-8 decoration-accent/20">Toolbox</span></h2>
                    <p className="mt-4 text-text-secondary max-w-xl text-sm font-medium">Click any technology to instantly explore related projects and experiences across my entire portfolio.</p>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

            {/* QUICK EXPLORER OVERLAY */}
            <AnimatePresence>
                {selectedTag && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedTag(null)}
                            className="fixed inset-0 z-50 bg-background/90 backdrop-blur-md cursor-pointer"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 100, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 100, scale: 0.9 }}
                            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] w-[95vw] max-w-2xl bg-surface border border-accent/20 rounded-[40px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] overflow-hidden p-8 md:p-10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent border border-accent/20 shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.1)]">
                                        {selectedTag.path ? (
                                            <img src={`/${selectedTag.path}`} alt="" className="h-7 w-7 object-contain" />
                                        ) : (
                                            <Search size={28} />
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-heading text-2xl font-black text-text-primary tracking-tight">{selectedTag.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                                            <p className="text-[0.65rem] font-black text-text-secondary uppercase tracking-[3px]">
                                                {matchingItems.length} matching result{matchingItems.length === 1 ? '' : 's'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className="p-3 rounded-full bg-border/5 hover:bg-border/10 text-text-secondary transition-colors"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="max-h-[45vh] overflow-y-auto pr-3 scrollbar-none space-y-4">
                                {matchingItems.length > 0 ? (
                                    matchingItems.map((item, i) => (
                                        <Link
                                            key={item.id}
                                            href={getItemUrl(item)}
                                            className="group flex items-center justify-between p-5 rounded-[24px] border border-border/40 bg-border/5 hover:border-accent/40 hover:bg-accent/5 transition-all duration-500 hover:scale-[1.02]"
                                        >
                                            <div className="flex flex-col gap-1.5 overflow-hidden">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-[0.6rem] font-black uppercase tracking-[2px] text-accent/60 group-hover:text-accent">
                                                        {item.category}
                                                    </span>
                                                    {item.catSubtype && (
                                                        <>
                                                            <div className="h-1 w-1 rounded-full bg-border/20" />
                                                            <span className="text-[0.6rem] font-black uppercase tracking-[2px] text-text-secondary/40 whitespace-nowrap">
                                                                {item.catSubtype || item.type}
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                                <h4 className="text-[1rem] font-bold text-text-primary truncate transition-colors group-hover:text-text-primary">{item.title}</h4>
                                            </div>
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-border/10 text-text-secondary group-hover:bg-accent group-hover:text-background transition-all shadow-sm">
                                                <ChevronRight size={18} />
                                            </div>
                                        </Link>
                                    ))
                                ) : (
                                    <div className="text-center py-16 opacity-50">
                                        <Terminal size={40} className="mx-auto mb-4 text-text-secondary" />
                                        <p className="text-text-secondary font-medium tracking-tight">No active projects linked to this tag yet.</p>
                                    </div>
                                )}
                            </div>

                            <div className="mt-8 pt-8 border-t border-border/50 text-center">
                                <p className="text-[0.65rem] font-black text-text-secondary uppercase tracking-[4px] opacity-40">System Explorer v2.1</p>
                            </div>
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
            className="group relative flex h-full flex-col rounded-[32px] border border-border bg-surface/30 p-10 transition-all duration-700 hover:bg-surface/50 backdrop-blur-2xl overflow-hidden"
        >
            <div className="mb-10 flex items-center justify-between">
                <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 shadow-lg"
                    style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                >
                    {icon}
                </div>
                <div className="h-[1px] flex-1 translate-x-6 bg-gradient-to-r from-transparent via-border/50 to-transparent opacity-30" />
            </div>

            <h4 className="mb-8 font-heading text-2xl font-black text-text-primary tracking-tight">{title}</h4>

            <div className="flex flex-wrap gap-2.5">
                {items?.map((tag: any) => (
                    <button
                        key={tag.id}
                        onClick={() => onTagClick(tag)}
                        className={`flex items-center gap-2.5 rounded-2xl border-2 px-4 py-2 transition-all duration-300 group/tag relative overflow-hidden ${selectedTagId === tag.id ? 'border-accent bg-accent/10 text-accent shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.2)]' : 'border-border/50 bg-border/5 hover:border-accent/40 hover:bg-accent/5 hover:text-accent'}`}
                    >
                        {tag.path && (
                            <img
                                src={`/${tag.path}`}
                                alt=""
                                className={`h-4 w-4 object-contain transition-all duration-500 ${selectedTagId === tag.id ? 'scale-110 opacity-100' : 'opacity-40 grayscale group-hover/tag:grayscale-0 group-hover/tag:opacity-100 group-hover/tag:scale-110'}`}
                            />
                        )}
                        <span className={`text-[0.75rem] font-black uppercase tracking-wider ${selectedTagId === tag.id ? 'text-accent' : 'text-text-secondary group-hover/tag:text-accent'}`}>{tag.name}</span>
                    </button>
                ))}
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-border to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
            <div className="absolute -bottom-1 left-1/2 h-4 w-1/3 -translate-x-1/2 blur-lg opacity-0 transition-all duration-700 group-hover:opacity-40" style={{ backgroundColor: color }} />
        </motion.div>
    );
}

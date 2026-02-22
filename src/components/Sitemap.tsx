"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { NavSection } from "@/types/nav";
import { Network } from "lucide-react";

interface SitemapProps {
    sections: NavSection[];
}

export default function Sitemap({ sections }: SitemapProps) {
    const { t } = useLanguage();

    return (
        <section id="sitemap" className="container relative py-20 px-6 sm:px-12">
            <div className="flex flex-col items-center mb-12">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent mb-4">
                    <Network size={20} />
                </div>
                <h2 className="font-heading text-2xl font-black text-text-primary tracking-tight">
                    {t('sitemap.badge')}
                </h2>
            </div>

            <div className="relative mx-auto max-w-5xl">
                {/* Horizontal connection line for desktop */}
                <div className="absolute top-[22px] left-[10%] right-[10%] hidden h-[1px] bg-gradient-to-r from-transparent via-border to-transparent lg:block" />

                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
                    {sections.map((section, idx) => (
                        <div key={section.id} className="relative flex flex-col items-center">
                            {/* Node point */}
                            <div className="z-10 mb-6 flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface shadow-xl">
                                <div className="h-2 w-2 rounded-full bg-accent shadow-[0_0_10px_var(--accent-color)]" />
                            </div>

                            <h3 className="mb-6 text-[0.7rem] font-black uppercase tracking-[3px] text-accent/80">
                                {section.title}
                            </h3>

                            <div className="flex flex-col items-center gap-3">
                                {section.items.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.path}
                                        className="text-[0.8rem] font-medium text-text-secondary transition-all hover:text-white hover:scale-105"
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

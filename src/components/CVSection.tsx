"use client";
import React from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Globe } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import cvConfig from "@/data/cv_config.json";

export default function CVSection() {
    const { t } = useLanguage();

    return (
        <section id="resume" className="container py-24 px-6 sm:px-12">
            <div className="relative overflow-hidden rounded-[48px] border border-border bg-surface/30 p-8 md:p-16 lg:p-20 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                {/* Background Decorative Elements */}
                <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-accent/10 blur-[120px]" />
                <div className="absolute -bottom-24 -left-24 -z-10 h-64 w-64 rounded-full bg-secondary/10 blur-[100px]" />

                <div className="text-center md:text-left mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="max-w-2xl">
                            <span className="mb-6 inline-block rounded-full bg-accent/10 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[4px] text-accent">
                                {t('cv.badge')}
                            </span>
                            <h2 className="mb-6 font-heading text-4xl font-black leading-tight text-text-primary md:text-5xl lg:text-6xl">
                                {t('cv.title')}
                            </h2>
                            <p className="text-lg leading-relaxed text-text-secondary md:text-xl">
                                {t('cv.description')}
                            </p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <CVCard
                        lang="English"
                        fileName={cvConfig.en}
                        badge="International"
                        icon={<Globe size={20} className="text-secondary" />}
                        downloadLabel={t('cv.download')}
                        viewLabel={t('cv.view')}
                    />
                    <CVCard
                        lang="Azərbaycanca"
                        fileName={cvConfig.az}
                        badge="Local"
                        icon={<FileText size={20} className="text-accent" />}
                        downloadLabel={t('cv.download')}
                        viewLabel={t('cv.view')}
                    />
                </div>
            </div>
        </section>
    );
}

function CVCard({ lang, fileName, badge, icon, downloadLabel, viewLabel }: { lang: string, fileName: string, badge: string, icon: any, downloadLabel: string, viewLabel: string }) {
    const cvPath = `/cv/${fileName}`;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative overflow-hidden rounded-[32px] border border-border bg-surface-color/40 p-8 transition-all duration-500 hover:bg-surface-color/60 hover:border-accent/40"
        >
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-background border border-border shadow-xl group-hover:scale-110 transition-transform duration-500">
                        {icon}
                    </div>
                    <div>
                        <h3 className="font-heading text-xl font-bold text-text-primary">{lang}</h3>
                        <p className="text-[0.65rem] font-black uppercase tracking-widest text-text-secondary opacity-60">{badge}</p>
                    </div>
                </div>
                <div className="hidden sm:block">
                    <FileText size={40} className="text-text-primary/10 -rotate-12 group-hover:rotate-0 transition-transform duration-700" />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <a
                    href={cvPath}
                    download={fileName}
                    className="group relative flex flex-1 items-center justify-center gap-3 rounded-2xl bg-accent px-6 py-4 text-[0.7rem] font-black uppercase tracking-[2px] text-black transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] active:scale-95 border border-white/20 shadow-xl"
                >
                    {downloadLabel}
                    <Download size={16} />
                </a>
                <a
                    href={cvPath}
                    target="_blank"
                    className="group relative flex flex-1 items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-4 text-[0.7rem] font-black uppercase tracking-[2px] text-text-primary backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/10 hover:border-accent/30 active:scale-95 shadow-lg"
                >
                    {viewLabel}
                    <Eye size={16} />
                </a>
            </div>

            {/* Decorative corner glow */}
            <div className="absolute -bottom-10 -right-10 h-20 w-20 bg-accent/10 blur-2xl group-hover:bg-accent/20 transition-colors" />
        </motion.div>
    );
}

"use client";
import React from "react";
import Link from "next/link";
import { Linkedin, Github, Mail, ExternalLink, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import socials from "@/data/socials.json";

export default function Footer() {
    const { t } = useLanguage();

    return (
        <footer id="contact" className="container mt-32 border-t border-border py-24">
            <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
                <div className="flex flex-col gap-6 max-lg:items-center">
                    <div
                        className="flex h-12 w-12 items-center justify-center rounded-[16px] text-lg font-black text-white shadow-[0_10px_30px_rgba(var(--accent-color-rgb),0.2)]"
                        style={{ background: 'var(--logo-gradient)' }}
                    >
                        HJ
                    </div>
                    <p className="max-w-xs text-center text-sm font-bold leading-relaxed text-text-secondary lg:text-left transition-colors hover:text-text-primary">
                        {t('footer.tagline')}
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <FooterNavButton href="/experience" label={t('nav.experience')} />
                    <FooterNavButton href="/academic" label={t('nav.academic')} />
                    <FooterNavButton href="/projects" label={t('nav.projects')} />
                </div>

                <div className="flex gap-4">
                    <SocialButton href={socials.linkedin} icon={<Linkedin size={20} />} />
                    <SocialButton href={socials.github} icon={<Github size={20} />} />
                    <SocialButton href={`mailto:${socials.email}`} icon={<Mail size={20} />} />
                </div>
            </div>

            <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 text-xs font-bold text-text-secondary opacity-50 lg:flex-row">
                <p>{t('footer.copyright')}</p>
                <p className="flex items-center gap-2 group cursor-default transition-opacity hover:opacity-100">
                    {t('footer.built_with')}
                    <ExternalLink size={12} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </p>
            </div>
        </footer>
    );
}

function FooterNavButton({ href, label }: { href: string, label: string }) {
    return (
        <Link
            href={href}
            className="group relative flex items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-4 text-[0.7rem] font-black uppercase tracking-[2px] text-text-secondary transition-all duration-500 hover:-translate-y-1.5 hover:scale-105 hover:border-accent/40 hover:bg-white/10 hover:text-text-primary hover:shadow-lg backdrop-blur-xl active:scale-95"
        >
            {label}
        </Link>
    );
}

function SocialButton({ href, icon }: { href: string, icon: any }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="group relative flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-text-secondary transition-all duration-500 hover:-translate-y-1.5 hover:scale-110 hover:border-accent/40 hover:bg-white/10 hover:text-accent hover:shadow-lg backdrop-blur-xl active:scale-95"
        >
            {icon}
        </Link>
    );
}

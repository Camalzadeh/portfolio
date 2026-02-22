"use client";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import CVSection from "@/components/CVSection";
import { Linkedin, Mail, ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import data from "@/data/portfolio.json";
import { useNavConfig } from "@/hooks/useNavConfig";
import Sitemap from "@/components/Sitemap";

export default function Home() {
  const { t } = useLanguage();
  const navSections = useNavConfig(data);

  return (
    <main className="relative">
      <Hero />

      {/* Identity Section */}
      <section id="identity" className="container relative py-20 md:py-32 px-6 sm:px-12">
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="mb-6 inline-block rounded-full bg-accent/10 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[4px] text-accent">{t('identity.badge')}</span>
            <h2 className="mb-8 font-heading text-4xl font-black leading-[1.1] text-text-primary sm:text-5xl md:text-6xl">
              {t('identity.heading')}
            </h2>
            <p className="mb-12 text-lg leading-relaxed text-text-secondary sm:text-xl md:text-2xl">
              {t('identity.description')}
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-6">
              <Link href="/projects" className="group relative pointer-events-auto">
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center gap-4 rounded-2xl bg-accent px-10 py-5 text-sm font-black uppercase tracking-[2.5px] text-black shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] active:scale-95 border border-white/20">
                  {t('identity.cta_portfolio')} <ArrowRight size={20} className="transition-transform group-hover:translate-x-1.5" />
                </div>
              </Link>

              <a href="mailto:humbet9996@gmail.com" className="group relative pointer-events-auto">
                <div className="flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-5 text-sm font-black uppercase tracking-[2.5px] text-text-primary backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/10 hover:border-accent/30 active:scale-95 shadow-lg">
                  {t('identity.cta_touch')} <Mail size={20} />
                </div>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:col-span-5"
          >
            <div className="relative rounded-[40px] border border-border bg-surface/40 p-8 md:p-10 shadow-2xl backdrop-blur-2xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-10 flex items-center justify-between border-b border-border pb-8">
                <h3 className="font-heading text-2xl font-black">{t('identity.vitals_title')}</h3>
                <div className="rounded-full bg-accent/20 px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-accent">{t('identity.vitals_status')}</div>
              </div>

              <div className="flex flex-col gap-10">
                <StatItem label={t('identity.stat_academic_label')} value={t('identity.stat_academic_value')} sub={t('identity.stat_academic_sub')} />
                <StatItem label={t('identity.stat_impact_label')} value={t('identity.stat_impact_value')} sub={t('identity.stat_impact_sub')} />
                <StatItem label={t('identity.stat_research_label')} value={t('identity.stat_research_value')} sub={t('identity.stat_research_sub')} />
              </div>

              {/* Bottom Decoration */}
              <div className="absolute -bottom-1 -left-1 -right-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <CVSection />
      <Skills />

      <Sitemap sections={navSections} />
    </main>
  );
}

function StatItem({ label, value, sub }: { label: string, value: string, sub: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-[0.65rem] font-black uppercase tracking-[2.5px] text-text-secondary opacity-60">{label}</p>
      <div className="flex items-baseline gap-3">
        <p className="font-heading text-2xl font-black text-text-primary">{value}</p>
        <span className="text-[0.65rem] font-bold text-accent opacity-80">{sub}</span>
      </div>
    </div>
  );
}

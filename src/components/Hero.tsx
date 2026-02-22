"use client";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, GraduationCap, Zap, ArrowDown } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-[120px] pb-[80px] md:pt-[160px] md:pb-[120px]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-color-rgb),0.1)_0%,transparent_70%)] blur-[120px] animate-pulse" />
      <div className="absolute top-[20%] right-[-10%] -z-10 h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(var(--secondary-color-rgb),0.07)_0%,transparent_70%)] blur-[100px]" />

      <div className="container relative z-10 px-6 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-3 rounded-full border border-accent/10 bg-accent/5 px-6 py-2.5 backdrop-blur-xl shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.1)]"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_15px_var(--accent-color)]" />
          <span className="text-[0.65rem] font-bold uppercase tracking-[4px] text-text-primary/90">
            {t('hero.badge')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1.4fr_1fr] items-center">
          <div className="relative">
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-[12vw] font-black leading-[0.9] tracking-tight text-text-primary sm:text-7xl md:text-8xl xl:text-9xl"
            >
              <span className="block">{t('hero.firstName')}</span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'var(--heading-gradient)' }}
              >
                {t('hero.lastName')}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 max-w-2xl text-lg leading-relaxed text-text-secondary sm:text-xl md:text-2xl"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row flex-wrap gap-6"
            >
              {/* Primary Action Button */}
              <Link href="/projects" className="group relative pointer-events-auto">
                <div className="absolute inset-0 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative flex items-center justify-center gap-4 rounded-2xl bg-accent px-10 py-5 text-sm font-black uppercase tracking-[2.5px] text-black shadow-xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] active:scale-95 border border-white/20">
                  {t('hero.cta_projects')}
                  <ChevronRight size={18} className="transition-transform duration-500 group-hover:translate-x-1.5" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>

              {/* Secondary Action Button (Glassmorphic) */}
              <Link href="#identity" className="group relative pointer-events-auto">
                <div className="flex items-center justify-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-5 text-sm font-black uppercase tracking-[2.5px] text-text-primary backdrop-blur-3xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] hover:bg-white/10 hover:border-accent/30 active:scale-95 shadow-lg">
                  {t('hero.cta_more')}
                  <ArrowDown size={18} className="animate-bounce" />
                </div>
              </Link>
            </motion.div>

            {/* Decorative line */}
            <div className="absolute -left-12 top-1/2 hidden h-[200px] w-[1px] -translate-y-1/2 bg-gradient-to-b from-transparent via-accent/30 to-transparent xl:block" />
          </div>

          <motion.div
            initial={{ opacity: 0, rotateY: 15, x: 20 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden perspective-1000 lg:block"
          >
            <div className="relative transform-gpu transition-all duration-700 hover:rotate-x-2 hover:rotate-y-[-3deg] hover:scale-[1.02]">
              <div className="absolute -inset-1 rounded-[44px] bg-gradient-to-r from-accent/40 to-secondary/40 opacity-20 blur-2xl" />
              <div className="relative rounded-[36px] border border-border bg-surface-color/40 p-10 backdrop-blur-3xl shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-accent shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.2)]">
                    <Zap size={28} />
                  </div>
                  <div className="text-right">
                    <p className="text-[0.65rem] font-bold uppercase tracking-widest text-text-secondary opacity-60">{t('hero.status_label')}</p>
                    <p className="text-sm font-black text-accent">{t('hero.status_value')}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-10">
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.7rem] font-black uppercase tracking-[2px] text-text-secondary/70">{t('hero.stats_apps')}</p>
                    <p className="font-heading text-5xl font-black text-text-primary tracking-tighter">04<span className="text-accent">+</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.7rem] font-black uppercase tracking-[2px] text-text-secondary/70">{t('hero.stats_years')}</p>
                    <p className="font-heading text-5xl font-black text-text-primary tracking-tighter">03<span className="text-accent">+</span></p>
                  </div>
                  <div className="flex flex-col gap-2 pt-4 border-t border-border">
                    <p className="text-[0.7rem] font-black uppercase tracking-[2px] text-text-secondary/70">{t('hero.stats_tech')}</p>
                    <div className="flex flex-wrap gap-2 text-[0.7rem] font-black text-accent">
                      <span className="px-2 py-1 rounded-md bg-accent/10">FLUTTER</span>
                      <span className="px-2 py-1 rounded-md bg-accent/10">DJANGO</span>
                      <span className="px-2 py-1 rounded-md bg-accent/10">POSTGRES</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

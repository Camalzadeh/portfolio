"use client";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, GraduationCap, Zap, ArrowDown } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-[140px] pb-[100px]">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-1/2 -z-10 h-[1000px] w-[1000px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(var(--accent-color-rgb),0.08)_0%,transparent_70%)] blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] -z-10 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle,rgba(var(--secondary-color-rgb),0.05)_0%,transparent_70%)] blur-[100px]" />

      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-5 py-2 backdrop-blur-md"
        >
          <div className="h-2 w-2 animate-pulse rounded-full bg-accent shadow-[0_0_10px_var(--accent-color)]" />
          <span className="text-[0.7rem] font-black uppercase tracking-[3px] text-text-primary/80">
            L2 CS Student @ UFAZ <span className="mx-2 opacity-20">|</span> <span className="text-accent">Software Engineer</span>
          </span>
        </motion.div>

        <div className="grid grid-cols-1 gap-16 xl:grid-cols-[1.4fr_1fr]">
          <div>
            <motion.h1
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading text-6xl font-black leading-[1] tracking-tight text-text-primary md:text-8xl xl:text-9xl"
            >
              Humbat <br />
              <span className="bg-gradient-to-r from-white via-white to-accent bg-clip-text text-transparent">
                Jamalzadeh
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-10 max-w-2xl text-xl leading-relaxed text-text-secondary md:text-2xl"
            >
              Expert in <strong className="text-text-primary">Flutter & Django</strong>. Shipped 4+ production apps at Graph Company.
              Crafting high-performance backend infrastructures and seamless cross-platform ecosystems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 flex flex-wrap gap-6"
            >
              <Link href="/projects" className="group flex items-center gap-3 rounded-2xl bg-accent px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(var(--accent-color-rgb),0.3)]">
                Explore Projects <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link href="#identity" className="flex items-center gap-3 rounded-2xl border border-border bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-text-primary backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/10">
                Learn More <ArrowDown size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotateY: 20, x: 20 }}
            animate={{ opacity: 1, rotateY: 0, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden perspective-1000 xl:block"
          >
            <div className="relative transform-gpu transition-transform duration-700 hover:rotate-x-2 hover:rotate-y-[-5deg]">
              <div className="absolute -inset-1 rounded-[40px] bg-gradient-to-r from-accent/50 to-transparent opacity-20 blur-2xl" />
              <div className="relative rounded-[32px] border border-white/10 bg-surface/40 p-12 backdrop-blur-3xl">
                <div className="mb-12 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Zap size={24} />
                  </div>
                  <div className="text-right">
                    <p className="text-[0.6rem] font-black uppercase tracking-widest text-text-secondary opacity-50">Current Status</p>
                    <p className="text-sm font-bold text-accent">Available for Projects</p>
                  </div>
                </div>

                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.6rem] font-black uppercase tracking-[2px] text-text-secondary">Production Apps</p>
                    <p className="font-heading text-4xl font-black text-text-primary">04<span className="text-accent">+</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.6rem] font-black uppercase tracking-[2px] text-text-secondary">Years of Dev</p>
                    <p className="font-heading text-4xl font-black text-text-primary">03<span className="text-accent">+</span></p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <p className="text-[0.6rem] font-black uppercase tracking-[2px] text-text-secondary">Tech Stack</p>
                    <div className="flex flex-wrap gap-2 text-[0.7rem] font-bold text-accent">
                      <span>FLUTTER</span> <span>•</span> <span>DJANGO</span> <span>•</span> <span>POSTGRES</span>
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

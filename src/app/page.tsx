"use client";
import Hero from "@/components/Hero";
import Skills from "@/components/Skills";
import { Linkedin, Mail, ArrowRight, Github, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <Hero />

      {/* Identity Section */}
      <section id="identity" className="container relative py-32">
        <div className="absolute top-0 right-0 -z-10 h-64 w-64 rounded-full bg-accent/5 blur-3xl" />

        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <span className="mb-6 inline-block rounded-full bg-accent/10 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[4px] text-accent">Identity</span>
            <h2 className="mb-8 font-heading text-5xl font-black leading-[1.1] text-text-primary md:text-6xl">
              Bridging AI & <span className="text-accent underline underline-offset-[12px] decoration-accent/20">Real-world</span> Engineering.
            </h2>
            <p className="mb-12 text-xl leading-relaxed text-text-secondary md:text-2xl">
              Specializing in high-performance architectures, I bridge the gap between complex software engineering and intelligent systems. Shipped 4+ production-scale apps with Flutter & Django.
            </p>
            <div className="flex flex-wrap gap-6">
              <Link href="/projects" className="group flex items-center gap-3 rounded-2xl bg-accent px-10 py-5 text-sm font-black uppercase tracking-widest text-black transition-all hover:-translate-y-1 hover:bg-white hover:shadow-2xl">
                View Portfolio <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <a href="mailto:h.jamalov@ufaz.az" className="flex items-center gap-3 rounded-2xl border border-border bg-white/5 px-10 py-5 text-sm font-black uppercase tracking-widest text-text-primary backdrop-blur-xl transition-all hover:-translate-y-1 hover:bg-white/10">
                Get in Touch <Mail size={20} />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative lg:col-span-5"
          >
            <div className="relative rounded-[40px] border border-border bg-surface/40 p-10 shadow-2xl backdrop-blur-2xl transition-transform duration-500 hover:scale-[1.02]">
              <div className="mb-10 flex items-center justify-between border-b border-border pb-8">
                <h3 className="font-heading text-2xl font-black">Core Vitals</h3>
                <div className="rounded-full bg-accent/20 px-3 py-1 text-[0.6rem] font-black uppercase tracking-widest text-accent">Active</div>
              </div>

              <div className="flex flex-col gap-10">
                <StatItem label="Academic Excellence" value="98 / 100 GPA" sub="UFAZ University" />
                <StatItem label="Industrial Impact" value="4+ Apps Shipped" sub="Graph Company" />
                <StatItem label="Research Status" value="IEEE Published" sub="AI & Robotics" />
              </div>

              {/* Bottom Decoration */}
              <div className="absolute -bottom-1 -left-1 -right-1 h-[2px] rounded-full bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      <Skills />

      {/* Footer / Connect Section */}
      <footer id="contact" className="container mt-32 border-t border-border py-24">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="flex flex-col gap-6 max-lg:items-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-[14px] bg-accent text-lg font-black text-black">HJ</div>
            <p className="max-w-xs text-center text-sm font-bold leading-relaxed text-text-secondary lg:text-left">
              Building the next generation of intelligent software ecosystems.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <FooterNavButton href="/experience" label="Experience" />
            <FooterNavButton href="/academic" label="Academic" />
            <FooterNavButton href="/projects" label="Projects" />
          </div>

          <div className="flex gap-4">
            <SocialButton href="https://linkedin.com/in/humbat-jamalzadeh" icon={<Linkedin size={20} />} />
            <SocialButton href="https://github.com/humbatjamalzadeh" icon={<Github size={20} />} />
            <SocialButton href="mailto:h.jamalov@ufaz.az" icon={<Mail size={20} />} />
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 text-xs font-bold text-text-secondary opacity-50 lg:flex-row">
          <p>© 2026 Humbat Jamalzadeh. All rights reserved.</p>
          <p className="flex items-center gap-2">Built with Next.js & Tailwind <ExternalLink size={12} /></p>
        </div>
      </footer>
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

function FooterNavButton({ href, label }: { href: string, label: string }) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-border bg-surface/50 px-8 py-3.5 text-[0.75rem] font-black uppercase tracking-widest text-text-secondary transition-all hover:-translate-y-1 hover:border-accent hover:bg-accent hover:text-black"
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
      className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-surface/50 text-text-secondary transition-all hover:-translate-y-1 hover:scale-110 hover:border-accent hover:text-accent"
    >
      {icon}
    </Link>
  );
}

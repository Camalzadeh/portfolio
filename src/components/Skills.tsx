"use client";
import { motion } from "framer-motion";
import data from "@/data/portfolio.json";
import { Code, Server, Layers, Globe, Cpu } from "lucide-react";

export default function Skills() {
    const skills = data.skills as any;

    return (
        <section id="skills" className="container py-32">
            <header className="mb-20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col"
                >
                    <span className="mb-6 inline-block self-start rounded-full border border-accent/20 bg-accent/5 px-6 py-2 text-[0.7rem] font-black uppercase tracking-[4px] text-accent">Capabilities</span>
                    <h2 className="font-heading text-5xl font-black leading-tight text-text-primary md:text-6xl">Technical <span className="text-accent underline underline-offset-[12px] decoration-accent/30">Expertise</span></h2>
                </motion.div>
            </header>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {/* Languages */}
                <SkillCard
                    title="Languages"
                    icon={<Code size={24} />}
                    items={skills.Languages}
                    color="#2dd4bf"
                    delay={0.1}
                />

                {/* Frameworks */}
                <SkillCard
                    title="Frameworks"
                    icon={<Layers size={24} />}
                    items={skills.Frameworks}
                    color="#818cf8"
                    delay={0.2}
                />

                {/* Infrastructure */}
                <SkillCard
                    title="Infrastructure"
                    icon={<Server size={24} />}
                    items={skills["DevOps/Tools"]}
                    color="#fb7185"
                    delay={0.3}
                />
            </div>
        </section>
    );
}

function SkillCard({ title, icon, items, color, delay }: { title: string, icon: any, items: string[], color: string, delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            whileHover={{ y: -8 }}
            className="group relative flex h-full flex-col rounded-[32px] border border-border bg-surface/40 p-10 transition-all duration-500 hover:bg-surface/60 hover:shadow-2xl backdrop-blur-xl"
        >
            <div className="mb-10 flex items-center justify-between">
                <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110"
                    style={{ background: `${color}15`, color }}
                >
                    {icon}
                </div>
                <div className="h-[1px] flex-1 translate-x-4 bg-gradient-to-r from-transparent via-border to-transparent opacity-30" />
            </div>

            <h4 className="mb-8 font-heading text-2xl font-black text-text-primary">{title}</h4>

            <div className="flex flex-wrap gap-2.5">
                {items?.map((skill: string) => (
                    <span
                        key={skill}
                        className="rounded-xl border border-white/5 bg-white/5 px-4 py-2 text-[0.8rem] font-bold text-text-secondary transition-all duration-300 hover:border-accent/40 hover:bg-accent/10 hover:text-accent"
                    >
                        {skill}
                    </span>
                ))}
            </div>

            {/* Subtle bottom accent */}
            <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 rounded-full transition-all duration-500 group-hover:w-1/3" style={{ backgroundColor: color }} />
        </motion.div>
    );
}

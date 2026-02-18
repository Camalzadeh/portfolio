"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { NavSection, NavItem } from "@/types/nav";

interface MobileMenuProps {
    isOpen: boolean;
    navConfig: NavSection[];
    onClose: () => void;
}

export function MobileMenu({ isOpen, navConfig, onClose }: MobileMenuProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.95 }}
                    className="fixed inset-x-4 top-[80px] z-[2000] flex max-h-[80vh] flex-col gap-8 overflow-y-auto rounded-[32px] border border-border bg-surface/80 p-8 shadow-2xl backdrop-blur-3xl lg:hidden"
                >
                    {navConfig.map(nav => (
                        <div key={nav.id} className="flex flex-col gap-4">
                            <p className="text-[0.7rem] font-black uppercase tracking-[3px] text-accent opacity-60">{nav.title}</p>
                            <div className="flex flex-col gap-2">
                                {nav.items.map((item: NavItem) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className="rounded-xl border border-white/5 bg-white/5 px-4 py-3 text-sm font-bold text-text-primary transition-all active:scale-95 active:bg-accent active:text-black"
                                        onClick={onClose}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {nav.rootPath !== '/' && (
                                    <Link
                                        href={nav.rootPath}
                                        className="mt-2 text-center text-xs font-black uppercase tracking-widest text-accent underline underline-offset-4"
                                        onClick={onClose}
                                    >
                                        View All {nav.title}
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

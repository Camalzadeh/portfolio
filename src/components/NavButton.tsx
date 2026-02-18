"use client";
import { Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavSection } from "@/types/nav";

interface NavButtonProps {
    nav: NavSection;
    isCollapsed: boolean;
    isExpanded: boolean;
    isActive: boolean;
    onToggle: () => void;
    children?: React.ReactNode;
}

export function NavButton({ nav, isCollapsed, isExpanded, isActive, onToggle, children }: NavButtonProps) {
    return (
        <div className="relative w-full">
            <button
                className={`group flex w-full items-center justify-between rounded-2xl p-[0.8rem_1rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-surface-hover ${isActive ? 'bg-surface-color text-text-primary' : 'text-text-secondary'} ${isCollapsed ? 'mx-auto h-[54px] w-[54px] justify-center rounded-full p-0' : ''}`}
                onClick={onToggle}
            >
                <div className={`flex items-center gap-3 font-bold ${isCollapsed ? 'p-0 gap-0' : ''}`}>
                    <div className={`flex h-[38px] w-[38px] items-center justify-center rounded-[10px] bg-surface-hover transition-all duration-300 ${isActive ? 'bg-accent text-black shadow-[0_0_15px_var(--accent-glow)]' : ''}`}>
                        {nav.icon}
                    </div>
                    {!isCollapsed && <span className="text-[0.9rem] tracking-tight">{nav.title}</span>}
                </div>
                {!isCollapsed && (
                    <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className={`flex h-4 items-center justify-center text-text-secondary opacity-50 transition-opacity duration-300 group-hover:opacity-100 group-hover:text-accent ${isExpanded ? 'opacity-100 text-accent' : ''}`}
                    >
                        <Plus size={16} />
                    </motion.div>
                )}
                {isActive && !isCollapsed && (
                    <div className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-[0_4px_4px_0] bg-accent shadow-[0_0_15px_var(--accent-glow)]" />
                )}
            </button>

            <AnimatePresence>
                {isExpanded && !isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="ml-[19px] mt-1 flex flex-col gap-1 overflow-hidden border-l border-border py-2 pl-3"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

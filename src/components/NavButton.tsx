"use client";
import Link from "next/link";
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
        <div className="menu-group">
            <button
                className={`menu-header ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
                onClick={onToggle}
            >
                <div className="group-left">
                    <div className={`icon-wrapper ${isActive ? 'active' : ''}`}>
                        {nav.icon}
                    </div>
                    {!isCollapsed && <span className="item-title">{nav.title}</span>}
                </div>
                {!isCollapsed && (
                    <motion.div
                        animate={{ rotate: isExpanded ? 45 : 0 }}
                        className="expand-arrow"
                    >
                        <Plus size={16} />
                    </motion.div>
                )}
                {isActive && <div className="active-glow" />}
            </button>

            <AnimatePresence>
                {isExpanded && !isCollapsed && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="menu-sub"
                    >
                        {children}
                    </motion.div>
                )}
            </AnimatePresence>
            <style jsx>{`
                .menu-group {
                    width: 100%;
                    position: relative;
                }

                .icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    border-radius: 10px;
                    background: var(--surface-hover);
                    transition: all 0.3s;
                }

                .icon-wrapper.active {
                    background: var(--accent-color);
                    color: #000;
                    box-shadow: 0 0 15px var(--accent-glow);
                }

                .item-title {
                    font-size: 0.9rem;
                    font-weight: 700;
                    letter-spacing: -0.01em;
                }

                .expand-arrow {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    color: var(--text-secondary);
                    opacity: 0.5;
                    transition: all 0.3s;
                }

                .menu-header:hover .expand-arrow,
                .menu-header.expanded .expand-arrow {
                    opacity: 1;
                    color: var(--accent-color);
                }

                .menu-sub {
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                    padding: 8px 0 8px 12px;
                    margin-left: 19px;
                    border-left: 1px solid var(--border-color);
                }

                .active-glow {
                    position: absolute;
                    left: 0;
                    top: 50%;
                    transform: translateY(-50%);
                    width: 4px;
                    height: 20px;
                    background: var(--accent-color);
                    border-radius: 0 4px 4px 0;
                    box-shadow: 0 0 15px var(--accent-glow);
                }
            `}</style>
        </div>
    );
}

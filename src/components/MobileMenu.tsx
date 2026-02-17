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
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="mobile-menu-overlay"
                >
                    {navConfig.map(nav => (
                        <div key={nav.id} className="mobile-group">
                            <p className="mobile-group-title">{nav.title}</p>
                            <div className="mobile-items">
                                {nav.items.map((item: NavItem) => (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className="mobile-item"
                                        onClick={onClose}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                                {nav.rootPath !== '/' && (
                                    <Link
                                        href={nav.rootPath}
                                        className="mobile-item view-all"
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

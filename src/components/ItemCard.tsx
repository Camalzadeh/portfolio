"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Award, User, Star, Clock, MapPin, ChevronRight, Calendar } from "lucide-react";

interface MediaItem {
  type: string;
  url_text?: string | null;
  title: string;
  path?: string | null;
}

interface Tag {
  id: string;
  name: string;
  path: string | null;
}

interface Item {
  id: string;
  title: string;
  role?: string;
  position?: string;
  award?: string;
  organization?: string;
  score?: string;
  duration?: string;
  place?: string;
  date: string | { year: number | null; month: number | null; day: number | null };
  description: string;
  media?: MediaItem[];
  tagIds?: string[];
  tags?: Tag[];
}

interface ItemCardProps {
  item: Item;
  index: number;
  colorIndex?: number;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
}

export default function ItemCard({ item, index, colorIndex, isSelected, onSelect }: ItemCardProps) {
  // Ultra-vibrant luxury color palette
  const colors = [
    { primary: "rgb(20, 184, 166)", glow: "rgba(20, 184, 166, 0.4)", bg: "rgba(20, 184, 166, 0.03)" }, // Teal
    { primary: "rgb(99, 102, 241)", glow: "rgba(99, 102, 241, 0.4)", bg: "rgba(99, 102, 241, 0.03)" }, // Indigo
    { primary: "rgb(244, 63, 94)", glow: "rgba(244, 63, 94, 0.4)", bg: "rgba(244, 63, 94, 0.03)" }, // Rose
    { primary: "rgb(245, 158, 11)", glow: "rgba(245, 158, 11, 0.4)", bg: "rgba(245, 158, 11, 0.03)" }, // Amber
  ];

  const themeColor = colors[(colorIndex !== undefined ? colorIndex : index) % colors.length];

  const metaFields = [
    { label: "Organization", value: item.organization, icon: <Briefcase size={12} /> },
    { label: "Role", value: item.role || item.position, icon: <User size={12} /> },
    { label: "Performance", value: item.score, icon: <Star size={12} /> },
    { label: "Award", value: item.award, icon: <Award size={12} /> },
    { label: "Timeline", value: item.duration, icon: <Clock size={12} /> },
    { label: "Location", value: item.place, icon: <MapPin size={12} /> },
  ].filter(f => f.value);

  const displayDate = typeof item.date === 'string' ? item.date : (item.date.year || 'Current');

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.3) }}
      className="group relative mb-6 cursor-pointer outline-none last:mb-0"
      onClick={() => onSelect(item)}
      style={{ '--card-accent': themeColor.primary } as any}
    >
      {/* 0. Enhanced Selection Glow */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            layoutId="card-glow"
            className="absolute -inset-[3px] rounded-[24px] bg-[var(--card-accent)]/20 blur-[6px] transition-opacity"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className={`relative flex flex-col overflow-hidden rounded-[22px] border-2 transition-all duration-500 ${isSelected ? 'border-[var(--card-accent)] bg-surface shadow-2xl scale-[1.02] z-10' : 'border-border/60 bg-surface/40 hover:border-border hover:bg-surface/60 backdrop-blur-md'}`}>

        {/* Subtle dynamic background gradient */}
        {isSelected && (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--card-accent)]/5 via-transparent to-[var(--card-accent)]/5 pointer-events-none" />
        )}

        <div className="flex h-full">
          {/* Side Accent Pillar */}
          <div className={`w-[5px] flex-shrink-0 transition-all duration-500 ${isSelected ? 'bg-[var(--card-accent)] shadow-[0_0_15px_var(--card-accent)]' : 'bg-border opacity-30 group-hover:opacity-60'}`} />

          <div className="flex-1 p-6 md:p-8 lg:p-9">
            <header className="mb-6 flex items-center justify-between">
              <div className={`flex items-center gap-2 rounded-full border-2 px-3 py-1.5 text-[0.65rem] font-black uppercase tracking-[2px] ${isSelected ? 'border-[var(--card-accent)]/40 bg-[var(--card-accent)]/15 text-[var(--card-accent)] shadow-sm' : 'border-border/40 bg-border/5 text-text-secondary'}`}>
                <Calendar size={12} className="opacity-70" />
                {displayDate}
              </div>

              {isSelected && (
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] font-bold text-[var(--card-accent)] uppercase tracking-widest animate-pulse">Live View</span>
                  <div className="h-2 w-2 rounded-full bg-[var(--card-accent)] shadow-[0_0_10px_var(--card-accent)]" />
                </div>
              )}
            </header>

            <h3 className={`mb-4 font-heading text-xl font-black leading-tight tracking-tight transition-all duration-300 md:text-2xl ${isSelected ? 'text-text-primary translate-x-1' : 'text-text-primary/90 group-hover:text-text-primary'}`}>
              {item.title}
            </h3>

            {/* Tags System - HIGH VISIBILITY */}
            {item.tags && item.tags.length > 0 && (
              <div className="mb-6 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <div
                    key={tag.id}
                    className={`flex items-center gap-2 rounded-xl border px-3 py-1.5 transition-all duration-300 ${isSelected ? 'border-[var(--card-accent)]/30 bg-[var(--card-accent)]/10 text-[var(--card-accent)]' : 'border-border bg-surface/80 text-text-secondary hover:border-text-secondary/30 shadow-sm'}`}
                  >
                    {tag.path ? (
                      <img src={`/${tag.path}`} alt="" className={`h-4 w-4 object-contain transition-opacity ${isSelected ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`} />
                    ) : (
                      <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-[var(--card-accent)]' : 'bg-text-secondary/40'}`} />
                    )}
                    <span className="text-[0.7rem] font-black uppercase tracking-wider">{tag.name}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Metadata Detail Grid - Professional Spacing */}
            <div className={`mb-8 grid grid-cols-1 gap-y-4 gap-x-8 transition-all duration-500 sm:grid-cols-2 ${isSelected ? 'opacity-100' : 'opacity-60 grayscale-[0.5] group-hover:grayscale-0'}`}>
              {metaFields.map((field, i) => (
                <div key={i} className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 text-text-secondary/50">
                    <div className={`p-1 rounded-md bg-border/10 transition-colors ${isSelected ? 'text-[var(--card-accent)]' : ''}`}>
                      {field.icon}
                    </div>
                    <span className="text-[0.55rem] font-black uppercase tracking-[3px]">{field.label}</span>
                  </div>
                  <span className="text-[0.85rem] font-bold text-text-primary leading-snug pl-1">{field.value}</span>
                </div>
              ))}
            </div>

            {/* Description - High Readability */}
            <p className={`text-[0.9rem] font-medium leading-[1.8] transition-colors duration-500 ${isSelected ? 'text-text-secondary/90' : 'text-text-secondary/70 group-hover:text-text-secondary'}`}>
              {item.description}
            </p>

            <footer className={`mt-10 flex items-center justify-between border-t border-border/60 pt-6 transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
              <div className="text-[0.65rem] font-black uppercase tracking-[2px] text-text-secondary/50 flex items-center gap-2">
                <div className={`h-1.5 w-1.5 rounded-full ${isSelected ? 'bg-[var(--card-accent)]' : 'bg-text-secondary/30'}`} />
                {item.media?.length || 0} Professional Assets
              </div>
              <div className={`flex items-center gap-2 text-[0.7rem] font-black uppercase tracking-[3px] transition-all ${isSelected ? 'text-[var(--card-accent)] scale-110' : 'text-text-secondary'}`}>
                {isSelected ? 'OPENING' : 'EXPLORE'}
                <ChevronRight size={14} className={`${isSelected ? 'translate-x-1 animate-pulse' : ''}`} />
              </div>
            </footer>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

"use client";
import { motion } from "framer-motion";
import { Briefcase, Award, User, Star, Clock, MapPin, Layers, ChevronRight } from "lucide-react";

const hexToRgb = (hex: string) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r}, ${g}, ${b}`;
};

interface MediaItem {
  type: string;
  url_text?: string | null;
  title: string;
  path?: string | null;
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
}

interface ItemCardProps {
  item: Item;
  index: number;
  colorIndex?: number;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
}

export default function ItemCard({ item, index, colorIndex, isSelected, onSelect }: ItemCardProps) {
  const colors = [
    { primary: "#2dd4bf", glow: "rgba(45, 212, 191, 0.5)" }, // Cyan - Innovator
    { primary: "#818cf8", glow: "rgba(129, 140, 248, 0.5)" }, // Indigo - Academic
    { primary: "#fb7185", glow: "rgba(251, 113, 133, 0.5)" }, // Rose - Project
    { primary: "#fbbf24", glow: "rgba(251, 191, 36, 0.5)" },  // Amber - Achievement
  ];

  const themeColor = colors[(colorIndex !== undefined ? colorIndex : index) % colors.length];
  const cardAccentRgb = hexToRgb(themeColor.primary);

  const metaFields = [
    { label: "Organization", value: item.organization, icon: <Briefcase size={12} /> },
    { label: "Role", value: item.role || item.position, icon: <User size={12} /> },
    { label: "Award", value: item.award, icon: <Award size={12} /> },
    { label: "Score", value: item.score, icon: <Star size={12} /> },
    { label: "Duration", value: item.duration, icon: <Clock size={12} /> },
    { label: "Location", value: item.place, icon: <MapPin size={12} /> },
  ].filter(f => f.value);

  const displayDate = typeof item.date === 'string' ? item.date : (item.date.year || '');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.01 }}
      className={`group relative mb-4 cursor-pointer transition-all duration-500 last:mb-0`}
      onClick={() => onSelect(item)}
      style={{
        '--card-accent': themeColor.primary,
        '--card-glow': themeColor.glow,
        '--card-accent-rgb': cardAccentRgb
      } as any}
    >
      {/* Selection Ring */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            layoutId="selection-ring"
            className="absolute -inset-[2px] rounded-[22px] bg-gradient-to-r from-[var(--card-accent)] to-transparent opacity-50 blur-sm"
          />
        )}
      </AnimatePresence>

      <div className={`relative flex flex-col overflow-hidden rounded-[20px] border transition-all duration-400 ${isSelected ? 'border-[var(--card-accent)] bg-surface shadow-[0_20px_60px_rgba(0,0,0,0.4)]' : 'border-border bg-surface/40 hover:bg-surface/60 backdrop-blur-xl'}`}>

        <div className="flex">
          {/* Accent vertical line */}
          <div className={`w-1.5 flex-shrink-0 transition-all duration-500 ${isSelected ? 'bg-[var(--card-accent)]' : 'bg-border group-hover:bg-[var(--card-accent)] group-hover:opacity-40'}`} />

          <div className="flex-1 p-6 md:p-8">
            <header className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-[var(--card-accent)]/20 bg-[var(--card-accent)]/5 px-4 py-1 text-[0.65rem] font-black uppercase tracking-widest text-[var(--card-accent)]">
                  {displayDate}
                </span>
              </div>
              {isSelected && <div className="h-2 w-2 animate-pulse rounded-full bg-[var(--card-accent)] shadow-[0_0_10px_var(--card-accent)]" />}
            </header>

            <h3 className={`mb-4 text-xl font-bold leading-tight tracking-tight transition-colors md:text-2xl ${isSelected ? 'text-text-primary' : 'text-text-primary/90 group-hover:text-text-primary'}`}>
              {item.title}
            </h3>

            {/* Meta Grid Selection-Dependent */}
            <div className={`mb-6 grid grid-cols-2 gap-4 transition-all duration-500 ${isSelected ? 'opacity-100 max-h-[500px]' : 'opacity-60 grayscale group-hover:grayscale-0'}`}>
              {metaFields.map((field, i) => (
                <div key={i} className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[var(--card-accent)]">
                    {field.icon}
                    <span className="text-[0.55rem] font-bold uppercase tracking-widest opacity-60">{field.label}</span>
                  </div>
                  <span className="text-sm font-bold text-text-primary line-clamp-1">{field.value}</span>
                </div>
              ))}
            </div>

            <p className={`line-clamp-3 text-base leading-relaxed transition-opacity duration-500 ${isSelected ? 'text-text-secondary opacity-100' : 'text-text-secondary opacity-70 group-hover:opacity-100'}`}>
              {item.description}
            </p>

            <footer className={`mt-8 flex items-center justify-between border-t border-border pt-6 transition-all duration-500 ${isSelected ? 'opacity-100' : 'opacity-40 group-hover:opacity-100'}`}>
              <div className="flex items-center gap-2 text-[0.7rem] font-bold text-text-secondary uppercase tracking-widest">
                <Layers size={14} className="text-[var(--card-accent)]" />
                {item.media?.length || 0} Assets
              </div>
              <div className="flex items-center gap-1 text-[0.7rem] font-black uppercase tracking-widest text-[var(--card-accent)] transition-transform group-hover:translate-x-1">
                {isSelected ? 'Viewing Now' : 'Click to Explore'}
                <ChevronRight size={14} />
              </div>
            </footer>
          </div>
        </div>

        {/* Dynamic Glow Background */}
        <div className={`absolute -right-20 -top-20 z-0 h-64 w-64 rounded-full bg-[var(--card-accent)] blur-[100px] pointer-events-none transition-opacity duration-1000 ${isSelected ? 'opacity-10' : 'opacity-0 group-hover:opacity-5'}`} />
      </div>
    </motion.div>
  );
}

import { AnimatePresence } from "framer-motion";

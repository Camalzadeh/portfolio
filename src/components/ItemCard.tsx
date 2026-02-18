"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Award, User, Star, Clock, MapPin, Layers, ChevronRight, Calendar } from "lucide-react";

/**
 * Premium Utility: Hex to RGB Converter
 */
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
  // Ultra-refined luxury color palette
  const colors = [
    { primary: "#2dd4bf", secondary: "#14b8a6", accent: "#ccfbf1" }, // Emerald Aurora
    { primary: "#818cf8", secondary: "#6366f1", accent: "#e0e7ff" }, // Indigo Twilight
    { primary: "#fb7185", secondary: "#f43f5e", accent: "#ffe4e6" }, // Rose Petal
    { primary: "#fbbf24", secondary: "#f59e0b", accent: "#fef3c7" }, // Amber Ember
  ];

  const themeColor = colors[(colorIndex !== undefined ? colorIndex : index) % colors.length];
  const cardAccentRgb = hexToRgb(themeColor.primary);

  const metaFields = [
    { label: "Organization", value: item.organization, icon: <Briefcase size={14} /> },
    { label: "Role", value: item.role || item.position, icon: <User size={14} /> },
    { label: "Performance", value: item.score, icon: <Star size={14} /> },
    { label: "Recognition", value: item.award, icon: <Award size={14} /> },
    { label: "Timeline", value: item.duration, icon: <Clock size={14} /> },
    { label: "Global", value: item.place, icon: <MapPin size={14} /> },
  ].filter(f => f.value);

  const displayDate = typeof item.date === 'string' ? item.date : (item.date.year || 'Current');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.05, 0.3), ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4, scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      className="group relative mb-6 cursor-pointer outline-none last:mb-0"
      onClick={() => onSelect(item)}
      style={{
        '--card-accent': themeColor.primary,
        '--card-accent-rgb': cardAccentRgb
      } as any}
    >
      {/* 0. Refraction selection ring */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            layoutId="card-selection-glow"
            className="absolute -inset-[3px] rounded-[30px] bg-gradient-to-br from-[var(--card-accent)] via-[var(--card-accent)]/20 to-transparent opacity-60 blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>

      <div className={`relative flex flex-col overflow-hidden rounded-[28px] border transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isSelected ? 'border-[var(--card-accent)]/60 bg-surface shadow-[0_40px_80px_rgba(0,0,0,0.5),0_0_20px_rgba(var(--card-accent-rgb),0.1)]' : 'border-white/10 bg-surface/30 hover:border-white/20 hover:bg-surface/50 backdrop-blur-3xl'}`}>

        {/* 1. Dynamic Top Border Shine */}
        <div className={`absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--card-accent)]/50 to-transparent transition-opacity duration-700 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-30'}`} />

        <div className="flex h-full">
          {/* 2. Side Accent Line */}
          <div className="relative w-[6px] overflow-hidden">
            <div className={`absolute inset-0 bg-gradient-to-b from-[var(--card-accent)] to-transparent transition-all duration-700 ${isSelected ? 'opacity-100' : 'opacity-20 group-hover:opacity-60'}`} />
            {isSelected && (
              <motion.div
                animate={{ y: ["0%", "200%", "0%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-100%] left-0 right-0 h-1/2 bg-white/40 blur-sm"
              />
            )}
          </div>

          <div className="flex-1 p-8 md:p-10">
            {/* 3. Header Section */}
            <header className="mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-[0.65rem] font-black uppercase tracking-[2.5px] transition-all duration-500 ${isSelected ? 'border-[var(--card-accent)]/30 bg-[var(--card-accent)]/10 text-[var(--card-accent)]' : 'border-white/5 bg-white/5 text-text-secondary group-hover:text-text-primary'}`}>
                  <Calendar size={12} className="opacity-70" />
                  {displayDate}
                </div>
              </div>

              {isSelected && (
                <div className="relative flex h-3 w-3 items-center justify-center">
                  <div className="absolute h-full w-full animate-ping rounded-full bg-[var(--card-accent)] opacity-40" />
                  <div className="h-1.5 w-1.5 rounded-full bg-[var(--card-accent)] shadow-[0_0_12px_var(--card-accent)]" />
                </div>
              )}
            </header>

            {/* 4. Title & Description */}
            <h3 className={`mb-5 font-heading text-2xl font-black leading-tight tracking-tight transition-all duration-500 md:text-3xl ${isSelected ? 'translate-x-1 text-text-primary' : 'text-text-primary/80 group-hover:text-text-primary'}`}>
              {item.title}
            </h3>

            {/* 5. Luxury Meta Information Grid */}
            <div className={`mb-10 grid grid-cols-1 gap-6 overflow-hidden transition-all duration-700 sm:grid-cols-2 ${isSelected ? 'opacity-100' : 'opacity-40 grayscale group-hover:grayscale-0 group-hover:opacity-80'}`}>
              {metaFields.map((field, i) => (
                <div key={i} className="group/meta flex items-center gap-4">
                  <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border transition-all duration-500 ${isSelected ? 'border-[var(--card-accent)]/20 bg-[var(--card-accent)]/5 text-[var(--card-accent)] shadow-lg shadow-[var(--card-accent)]/10' : 'border-white/5 bg-white/5 text-text-secondary group-hover/meta:border-white/20 group-hover/meta:bg-white/10'}`}>
                    {field.icon}
                  </div>
                  <div className="flex flex-col gap-0.5 overflow-hidden">
                    <span className="text-[0.6rem] font-black uppercase tracking-widest text-text-secondary/60">{field.label}</span>
                    <span className="truncate text-[0.85rem] font-bold text-text-primary">{field.value}</span>
                  </div>
                </div>
              ))}
            </div>

            <p className={`line-clamp-3 text-[1rem] leading-relaxed transition-all duration-700 ${isSelected ? 'text-text-secondary' : 'text-text-secondary/60 group-hover:text-text-secondary'}`}>
              {item.description}
            </p>

            {/* 6. Refined Footer */}
            <footer className={`mt-10 flex items-center justify-between border-t transition-all duration-700 ${isSelected ? 'border-white/10 pt-8 opacity-100' : 'border-transparent pt-0 opacity-0 group-hover:border-white/5 group-hover:pt-8 group-hover:opacity-100'}`}>
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  {[...Array(Math.min(item.media?.length || 0, 3))].map((_, i) => (
                    <div key={i} className={`h-6 w-6 rounded-full border-2 border-surface bg-[var(--card-accent)]/20 transition-transform hover:z-20 hover:scale-125 hover:bg-[var(--card-accent)]`} />
                  ))}
                </div>
                <span className="text-[0.65rem] font-black uppercase tracking-widest text-text-secondary/70">
                  {item.media?.length || 0} Assets
                </span>
              </div>
              <div className="flex items-center gap-2 text-[0.65rem] font-black uppercase tracking-[2px] text-accent transition-all duration-300 hover:gap-4">
                {isSelected ? 'Viewing Project' : 'Explore Portfolio'}
                <ChevronRight size={14} className="transition-transform group-hover:translate-x-1" />
              </div>
            </footer>
          </div>
        </div>

        {/* 7. Advanced Background Refraction/Glow */}
        <div className={`absolute -right-32 -top-32 h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(var(--card-accent-rgb),0.15)_0%,transparent_70%)] opacity-0 blur-[80px] transition-opacity duration-1000 ${isSelected ? 'opacity-100' : 'group-hover:opacity-40'}`} />

        {/* Subtle noise/texture overlay for premium look */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>
    </motion.div>
  );
}

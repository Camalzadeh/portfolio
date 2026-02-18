"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ShieldCheck, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface DetailsPanelProps {
  selectedItem: any;
  displayData: any;
}

export function DetailsPanel({ selectedItem, displayData }: DetailsPanelProps) {
  const { t } = useLanguage();
  return (
    <AnimatePresence mode="wait">
      {selectedItem && (
        <motion.div
          key={selectedItem.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mt-16 rounded-[24px] border border-border bg-surface-color p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] backdrop-blur-[20px]"
        >
          <div className="mb-8 flex items-center justify-between border-b border-border pb-6">
            <h2 className="m-0 flex items-center gap-3 text-[1.25rem] font-black text-text-primary">
              <Info size={20} /> {t('academic.insight')}
            </h2>
            <span className="flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1.5 text-[0.65rem] font-extrabold uppercase tracking-widest text-accent">
              <ShieldCheck size={14} /> {t('academic.verified')}
            </span>
          </div>

          <div className="flex flex-col">
            <div className="mb-10 text-[1rem] leading-relaxed text-text-secondary">
              <p>{displayData.full_detail || displayData.description}</p>
            </div>

            {displayData.metadata && (
              <div className="grid grid-cols-2 gap-6">
                {Object.entries(displayData.metadata).map(([k, v]: [string, any]) => (
                  <div key={k} className="flex flex-col gap-1.5">
                    <span className="text-[0.6rem] font-extrabold uppercase tracking-widest text-text-secondary opacity-60">{k}</span>
                    <span className="flex items-center gap-1.5 text-[0.9rem] font-bold text-text-primary">{String(v)}</span>
                  </div>
                ))}
                <div className="flex flex-col gap-1.5">
                  <span className="text-[0.6rem] font-extrabold uppercase tracking-widest text-text-secondary opacity-60">{t('academic.location')}</span>
                  <span className="flex items-center gap-1.5 text-[0.9rem] font-bold text-text-primary">
                    <MapPin size={12} /> {displayData.organization}
                  </span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

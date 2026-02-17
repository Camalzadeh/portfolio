"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Info, ShieldCheck, MapPin } from "lucide-react";

interface DetailsPanelProps {
  selectedItem: any;
  displayData: any;
}

import { useLanguage } from "@/context/LanguageContext";

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
          className="item-details-panel"
        >
          <div className="details-header">
            <h2 className="details-title">
              <Info size={20} /> {t('academic.insight')}
            </h2>
            <span className="verify-badge">
              <ShieldCheck size={14} /> {t('academic.verified')}
            </span>
          </div>

          <div className="details-main">
            <div className="desc-box">
              <p>{displayData.full_detail || displayData.description}</p>
            </div>

            {displayData.metadata && (
              <div className="metadata-grid">
                {Object.entries(displayData.metadata).map(([k, v]: [string, any]) => (
                  <div key={k} className="meta-cell">
                    <span className="cell-label">{k}</span>
                    <span className="cell-val">{String(v)}</span>
                  </div>
                ))}
                <div className="meta-cell">
                  <span className="cell-label">{t('academic.location')}</span>
                  <span className="cell-val"><MapPin size={12} /> {displayData.organization}</span>
                </div>
              </div>
            )}
          </div>
          <style jsx>{`
            .item-details-panel {
              margin-top: 4rem;
              background: var(--surface-color);
              border: 1px solid var(--border-color);
              border-radius: 24px;
              padding: 2.5rem;
              backdrop-filter: blur(20px);
              box-shadow: 0 20px 50px rgba(0,0,0,0.1);
            }

            .details-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
              margin-bottom: 2rem;
              padding-bottom: 1.5rem;
              border-bottom: 1px solid var(--border-color);
            }

            .details-title {
              display: flex;
              align-items: center;
              gap: 12px;
              font-size: 1.25rem;
              font-weight: 900;
              color: var(--text-primary);
              margin: 0;
            }

            .verify-badge {
              display: flex;
              align-items: center;
              gap: 6px;
              font-size: 0.65rem;
              font-weight: 800;
              background: rgba(var(--accent-color-rgb), 0.1);
              color: var(--accent-color);
              padding: 6px 12px;
              border-radius: 100px;
              text-transform: uppercase;
              letter-spacing: 1px;
            }

            .desc-box p {
              font-size: 1rem;
              line-height: 1.8;
              color: var(--text-secondary);
              margin-bottom: 2.5rem;
            }

            .metadata-grid {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 1.5rem;
            }

            .meta-cell {
              display: flex;
              flex-direction: column;
              gap: 6px;
            }

            .cell-label {
              font-size: 0.6rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              color: var(--text-secondary);
              opacity: 0.6;
            }

            .cell-val {
              font-size: 0.9rem;
              font-weight: 700;
              color: var(--text-primary);
              display: flex;
              align-items: center;
              gap: 6px;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

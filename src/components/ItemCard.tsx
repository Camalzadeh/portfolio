"use client";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Briefcase, GraduationCap, Award } from "lucide-react";

interface MediaItem {
  type: string;
  url_text?: string | null;
  title: string;
}

interface Item {
  id: string;
  title: string;
  role?: string;
  award?: string;
  organization?: string;
  date: string;
  description: string;
  media?: MediaItem[];
}

interface ItemCardProps {
  item: Item;
  index: number;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
  isLast?: boolean;
}

export default function ItemCard({ item, index, isSelected, onSelect, isLast }: ItemCardProps) {
  return (
    <motion.div
      id={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`timeline-item ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="timeline-rail">
        <div className="rail-line" style={{ display: isLast ? 'none' : 'block' }} />
        <div className="rail-dot">
          <div className="dot-inner" />
        </div>
      </div>

      <div className="item-content-wrapper">
        <div className="item-header">
          <span className="item-date">{item.date}</span>
          {item.award && <Award size={14} className="award-icon" />}
        </div>

        <h3 className="item-title">{item.title}</h3>

        {item.organization && (
          <div className="item-org">
            {item.role && <span className="item-role">{item.role} @ </span>}
            <span>{item.organization}</span>
          </div>
        )}

        <p className="item-desc">{item.description}</p>

        <div className="item-footer">
          {item.media && item.media.length > 0 && (
            <div className="proof-pill">
              <FileText size={12} />
              <span>{item.media.length} Proofs</span>
            </div>
          )}
          <div className="item-action">
            <ChevronRight size={18} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .timeline-item {
          display: flex;
          gap: 2rem;
          cursor: pointer;
          position: relative;
          padding-bottom: 3rem;
        }

        .timeline-rail {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          width: 24px;
          flex-shrink: 0;
        }

        .rail-line {
          position: absolute;
          top: 24px;
          bottom: -3rem;
          width: 2px;
          background: linear-gradient(180deg, var(--border-color) 0%, transparent 100%);
          opacity: 0.5;
        }

        .timeline-item.selected .rail-line {
          background: linear-gradient(180deg, var(--accent-color) 0%, var(--border-color) 100%);
          opacity: 0.8;
        }

        .rail-dot {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid var(--border-color);
          background: var(--background);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .dot-inner {
          width: 8px;
          height: 8px;
          background: var(--border-color);
          border-radius: 50%;
          transition: all 0.3s;
        }

        .timeline-item.selected .rail-dot {
          border-color: var(--accent-color);
          box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.4);
          transform: scale(1.1);
        }

        .timeline-item.selected .dot-inner {
          background: var(--accent-color);
          transform: scale(1.2);
        }

        .item-content-wrapper {
          flex: 1;
          padding: 1.75rem;
          background: var(--surface-color);
          border: 1px solid var(--border-color);
          border-radius: 20px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          top: -8px;
        }

        .timeline-item:hover .item-content-wrapper {
          background: var(--surface-hover);
          transform: translateX(10px);
          border-color: rgba(var(--accent-color-rgb), 0.3);
        }

        .timeline-item.selected .item-content-wrapper {
          background: rgba(var(--accent-color-rgb), 0.03);
          border-color: var(--accent-color);
          box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 0.75rem;
        }

        .item-date {
          font-size: 0.75rem;
          font-weight: 800;
          color: var(--accent-color);
          letter-spacing: 1px;
        }

        .award-icon { color: #f59e0b; }

        .item-title {
          font-size: 1.25rem;
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }

        .item-org {
           font-size: 0.9rem;
           color: var(--text-secondary);
           font-weight: 600;
           margin-bottom: 1.25rem;
        }

        .item-role { color: var(--text-primary); font-weight: 800; }

        .item-desc {
          font-size: 0.9rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          opacity: 0.8;
        }

        .item-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .proof-pill {
           display: flex;
           align-items: center;
           gap: 6px;
           background: rgba(255,255,255,0.03);
           padding: 6px 12px;
           border-radius: 100px;
           font-size: 0.7rem;
           font-weight: 800;
           color: var(--text-secondary);
           border: 1px solid var(--border-color);
        }

        .item-action {
           color: var(--accent-color);
           transition: transform 0.3s;
           opacity: 0.4;
        }

        .timeline-item:hover .item-action {
           transform: translateX(5px);
           opacity: 1;
        }
      `}</style>
    </motion.div>
  );
}

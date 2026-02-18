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
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ scale: 1.02, x: 10 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      className={`timeline-entry ${isSelected ? 'is-active' : ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="entry-rail">
        <div className="rail-node">
          <div className="node-ring" />
          <div className="node-content">
            {item.award ? <Award size={16} /> : (item.role ? <Briefcase size={16} /> : <GraduationCap size={16} />)}
          </div>
        </div>
        {!isLast && <div className="rail-line-segment" />}
      </div>

      <div className="entry-card-container">
        <div className="entry-card">
          <div className="entry-header">
            <span className="entry-date">{item.date}</span>
            {item.award && <div className="entry-badge premium">Achievement</div>}
          </div>

          <h3 className="entry-title">{item.title}</h3>

          <div className="entry-meta">
            {item.organization && (
              <>
                {item.role && <span className="entry-role-text">{item.role}</span>}
                <span className="entry-sep">/</span>
                <span className="entry-org-name">{item.organization}</span>
              </>
            )}
          </div>

          <p className="entry-description">{item.description}</p>

          <footer className="entry-footer">
            {item.media && item.media.length > 0 && (
              <div className="entry-resources">
                <FileText size={14} />
                <span>{item.media.length} Resources</span>
              </div>
            )}
            <div className="entry-cta">
              <span>{isSelected ? 'Viewing' : 'Explore'}</span>
              <ChevronRight size={16} />
            </div>
          </footer>

          <div className="entry-glow-overlay" />
        </div>
      </div>

      <style jsx>{`
        .timeline-entry {
          display: flex;
          gap: 3rem;
          cursor: pointer;
          position: relative;
          padding-bottom: 4rem;
          user-select: none;
          outline: none;
        }

        /* Rail / Timeline Styles */
        .entry-rail {
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
          flex-shrink: 0;
        }

        .rail-node {
          width: 60px;
          height: 60px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 5;
        }

        .node-ring {
          position: absolute;
          inset: 0;
          border-radius: 20px;
          background: var(--surface-hover);
          border: 2px solid var(--border-color);
          transform: rotate(45deg);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .node-content {
          position: relative;
          z-index: 2;
          color: var(--text-secondary);
          transition: all 0.5s;
        }

        .rail-line-segment {
          position: absolute;
          top: 60px;
          bottom: -4rem;
          width: 2px;
          background: linear-gradient(180deg, var(--border-color) 0%, transparent 100%);
          opacity: 0.4;
        }

        /* Active Entry State */
        .timeline-entry.is-active .node-ring {
          background: var(--accent-color);
          border-color: var(--accent-color);
          transform: rotate(45deg) scale(1.15);
          box-shadow: 
            0 0 30px rgba(var(--accent-color-rgb), 0.4),
            inset 0 0 10px rgba(255,255,255,0.3);
        }

        .timeline-entry.is-active .node-content {
          color: #000;
          transform: scale(1.1);
        }

        .timeline-entry.is-active .rail-line-segment {
          background: linear-gradient(180deg, var(--accent-color) 0%, var(--border-color) 80%);
          opacity: 1;
          width: 3px;
        }

        /* Card Styles */
        .entry-card-container {
          flex: 1;
          perspective: 1000px;
        }

        .entry-card {
          background: rgba(var(--surface-color-rgb), 0.6);
          border: 1px solid var(--border-color);
          border-radius: 32px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          backdrop-filter: blur(20px);
        }

        .entry-glow-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at top right, rgba(var(--accent-color-rgb), 0.1), transparent 70%);
          opacity: 0;
          transition: opacity 0.5s;
          pointer-events: none;
        }

        .timeline-entry:hover .entry-card {
          background: rgba(var(--surface-hover-rgb), 0.8);
          border-color: rgba(var(--accent-color-rgb), 0.3);
          box-shadow: 0 40px 80px rgba(0,0,0,0.3);
        }

        .timeline-entry.is-active .entry-card {
          border-color: var(--accent-color);
          background: rgba(var(--accent-color-rgb), 0.05);
          box-shadow: 
            0 50px 100px rgba(0,0,0,0.4),
            0 0 0 1px rgba(var(--accent-color-rgb), 0.2);
        }

        .timeline-entry.is-active .entry-glow-overlay {
          opacity: 1;
        }

        /* Typography & Content */
        .entry-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.25rem;
        }

        .entry-date {
          font-size: 0.8rem;
          font-weight: 800;
          color: var(--accent-color);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .entry-badge {
          background: #facc15;
          color: #000;
          font-size: 0.65rem;
          font-weight: 900;
          padding: 5px 12px;
          border-radius: 8px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .entry-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1.1;
          margin-bottom: 1rem;
          letter-spacing: -0.02em;
        }

        .entry-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.05rem;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          font-weight: 600;
        }

        .entry-role-text { color: var(--text-primary); font-weight: 800; }
        .entry-sep { opacity: 0.2; font-weight: 300; }

        .entry-description {
          font-size: 1rem;
          line-height: 1.7;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
          opacity: 0.85;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .entry-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid var(--border-color);
        }

        .entry-resources {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 800;
          color: var(--text-secondary);
          opacity: 0.6;
        }

        .entry-cta {
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent-color);
          font-size: 0.9rem;
          font-weight: 900;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @media (max-width: 768px) {
          .timeline-entry { gap: 1.5rem; padding-bottom: 3rem; }
          .entry-rail { width: 40px; }
          .rail-node { width: 40px; height: 40px; }
          .entry-card { padding: 1.5rem; }
          .entry-title { font-size: 1.4rem; }
        }
      `}</style>
    </motion.div>
  );
}

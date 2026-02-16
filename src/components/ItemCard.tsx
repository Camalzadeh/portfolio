"use client";
import { motion } from "framer-motion";
import { Calendar, ExternalLink, FileText, ChevronRight } from "lucide-react";

interface MediaItem {
  type: 'pdf' | 'image' | 'external';
  url: string;
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
  full_detail?: string;
  media?: MediaItem[];
}

interface ItemCardProps {
  item: Item;
  index: number;
  isSelected?: boolean;
  onSelect: (item: Item) => void;
}

export default function ItemCard({ item, index, isSelected, onSelect }: ItemCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className={`timeline-node ${isSelected ? 'is-selected' : ''}`}
      onClick={() => onSelect(item)}
    >
      <div className="node-marker">
        <div className="marker-core" />
        <div className="marker-line" />
      </div>

      <div className="node-content">
        <header className="node-header">
          <div className="node-meta">
            <span className="node-date">{item.date}</span>
            <h3 className="node-title">{item.title}</h3>
          </div>
          <ChevronRight size={18} className="node-arrow" />
        </header>

        <div className="node-body">
          <p className="node-role">{item.role || item.award} <span className="node-org">@ {item.organization}</span></p>
          <p className="node-desc">{item.description}</p>
        </div>

        {item.media && (
          <footer className="node-footer">
            <span className="evidence-tag">
              <FileText size={12} /> {item.media.length} Evidence{item.media.length > 1 ? 's' : ''}
            </span>
          </footer>
        )}
      </div>

      <style jsx>{`
        .timeline-node {
          position: relative;
          display: flex;
          gap: 3rem;
          cursor: pointer;
          padding: 1.5rem;
          border-radius: 20px;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          margin-bottom: 1rem;
        }

        .timeline-node:hover {
          background: rgba(255, 255, 255, 0.03);
          transform: translateX(10px);
        }

        .timeline-node.is-selected {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .node-marker {
          width: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 0.5rem;
        }

        .marker-core {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #334155;
          border: 2px solid transparent;
          transition: all 0.3s;
          box-shadow: 0 0 0 0 rgba(45, 212, 191, 0);
        }

        .timeline-node:hover .marker-core,
        .timeline-node.is-selected .marker-core {
          background: var(--accent-color);
          box-shadow: 0 0 15px var(--accent-glow);
          transform: scale(1.3);
        }

        .marker-line {
          width: 1px;
          flex: 1;
          background: linear-gradient(to bottom, rgba(255,255,255,0.1) 0%, transparent 100%);
          margin-top: 10px;
        }

        .node-content {
          flex: 1;
        }

        .node-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 0.75rem;
        }

        .node-date {
          font-size: 0.75rem;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.5px;
          text-transform: uppercase;
        }

        .node-title {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 4px 0 0 0;
          letter-spacing: -0.02em;
        }

        .node-arrow {
          color: #475569;
          transition: transform 0.3s;
        }

        .timeline-node:hover .node-arrow {
          transform: translateX(5px);
          color: #fff;
        }

        .node-role {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--accent-color);
          margin-bottom: 0.5rem;
        }

        .node-org {
          color: #64748b;
          font-weight: 500;
        }

        .node-desc {
          font-size: 1rem;
          line-height: 1.6;
          color: #94a3b8;
        }

        .node-footer {
          margin-top: 1rem;
        }

        .evidence-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          font-weight: 800;
          color: #475569;
          background: rgba(255,255,255,0.03);
          padding: 4px 10px;
          border-radius: 6px;
          text-transform: uppercase;
        }

        @media (max-width: 768px) {
          .timeline-node { gap: 1.5rem; padding: 1rem; }
          .node-title { font-size: 1.2rem; }
        }
      `}</style>
    </motion.div>
  );
}

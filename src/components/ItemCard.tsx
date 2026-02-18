"use client";
import { motion } from "framer-motion";
import { FileText, ChevronRight, Briefcase, GraduationCap, Award, User, Star, Clock, MapPin, Layers } from "lucide-react";

interface MediaItem {
  type: string;
  url_text?: string | null;
  title: string;
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
  isSelected?: boolean;
  onSelect: (item: Item) => void;
  isLast?: boolean;
}

export default function ItemCard({ item, index, isSelected, onSelect, isLast }: ItemCardProps) {
  // Dynamic color palette for variety
  const colors = [
    { primary: "#2dd4bf", secondary: "#14b8a6", glow: "rgba(45, 212, 191, 0.2)" }, // Cyan
    { primary: "#818cf8", secondary: "#6366f1", glow: "rgba(129, 140, 248, 0.2)" }, // Indigo
    { primary: "#fb7185", secondary: "#f43f5e", glow: "rgba(251, 113, 133, 0.2)" }, // Rose
    { primary: "#fbbf24", secondary: "#f59e0b", glow: "rgba(251, 191, 36, 0.2)" },  // Amber
  ];

  const color = colors[index % colors.length];

  const metaFields = [
    { label: "Organization", value: item.organization, icon: <Briefcase size={12} /> },
    { label: "Role/Position", value: item.role || item.position, icon: <User size={12} /> },
    { label: "Award", value: item.award, icon: <Award size={12} /> },
    { label: "Score", value: item.score, icon: <Star size={12} /> },
    { label: "Duration", value: item.duration, icon: <Clock size={12} /> },
    { label: "Location", value: item.place, icon: <MapPin size={12} /> },
  ];

  return (
    <motion.div
      id={item.id}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
      className={`luxury-card-wrapper ${isSelected ? 'active' : ''}`}
      onClick={() => onSelect(item)}
      style={{ '--card-accent': color.primary, '--card-glow': color.glow } as any}
    >
      <div className="card-glass-base">
        {/* Colorful Gradient Bar */}
        <div className="accent-bar" />

        <div className="card-content">
          <header className="card-header">
            <div className="date-tag">
              {typeof item.date === 'string' ? item.date : item.date.year}
            </div>
            {isSelected && <div className="status-dot-active" />}
          </header>

          <h3 className="card-title">{item.title}</h3>

          <div className="meta-compact-grid">
            {metaFields.map((field, i) => (
              <div key={i} className={`meta-item ${!field.value ? 'empty' : 'filled'}`}>
                <span className="meta-icon">{field.icon}</span>
                <div className="meta-info">
                  <span className="meta-label">{field.label}</span>
                  <span className="meta-value">{field.value || "---"}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="card-description">{item.description}</p>

          <footer className="card-footer">
            {item.media && item.media.length > 0 && (
              <div className="media-counter">
                <Layers size={12} />
                <span>{item.media.length} Assets</span>
              </div>
            )}
            <div className="card-action">
              {isSelected ? 'Viewing Project' : 'Click to Explore'}
            </div>
          </footer>
        </div>

        {/* Background glow effects */}
        <div className="dynamic-glow" />
      </div>

      <style jsx>{`
        .luxury-card-wrapper {
          cursor: pointer;
          position: relative;
          margin-bottom: 2rem;
          transition: all 0.5s ease;
        }

        .card-glass-base {
          background: rgba(15, 15, 20, 0.7);
          backdrop-filter: blur(25px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          overflow: hidden;
          position: relative;
          display: flex;
          box-shadow: 0 10px 40px rgba(0,0,0,0.3);
          transition: all 0.4s;
        }

        .luxury-card-wrapper.active .card-glass-base {
          border-color: var(--card-accent);
          background: rgba(var(--surface-color-rgb), 0.85);
          box-shadow: 0 20px 60px rgba(0,0,0,0.5);
          transform: scale(1.02);
        }

        .accent-bar {
          width: 5px;
          background: linear-gradient(180deg, var(--card-accent), transparent);
          flex-shrink: 0;
          opacity: 0.6;
        }

        .luxury-card-wrapper.active .accent-bar {
          opacity: 1;
          width: 6px;
        }

        .card-content {
          padding: 1.5rem;
          flex: 1;
          z-index: 2;
        }

        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .date-tag {
          font-size: 0.7rem;
          font-weight: 900;
          color: var(--card-accent);
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: rgba(var(--card-accent), 0.1);
          padding: 4px 10px;
          border-radius: 6px;
        }

        .status-dot-active {
          width: 8px;
          height: 8px;
          background: var(--card-accent);
          border-radius: 50%;
          box-shadow: 0 0 10px var(--card-accent);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
          100% { opacity: 0.5; transform: scale(1); }
        }

        .card-title {
          font-size: 1.15rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .meta-compact-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0.6rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          gap: 10px;
          padding: 8px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.03);
          transition: all 0.3s;
        }

        .meta-item.filled {
          background: rgba(255, 255, 255, 0.04);
        }

        .meta-item.empty {
          opacity: 0.3;
          background: transparent;
        }

        .meta-icon {
          color: var(--card-accent);
          opacity: 0.7;
          display: flex;
          align-items: center;
        }

        .meta-info {
          display: flex;
          flex-direction: column;
        }

        .meta-label {
          font-size: 0.55rem;
          text-transform: uppercase;
          font-weight: 800;
          color: var(--text-secondary);
          letter-spacing: 0.5px;
        }

        .meta-value {
          font-size: 0.75rem;
          font-weight: 700;
          color: rgba(255,255,255,0.9);
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .card-description {
          font-size: 0.8rem;
          line-height: 1.6;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
          opacity: 0.8;
          word-break: break-word;
        }

        .card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }

        .media-counter {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          color: var(--text-secondary);
        }

        .card-action {
          font-size: 0.65rem;
          font-weight: 900;
          text-transform: uppercase;
          color: var(--card-accent);
          letter-spacing: 1px;
        }

        .dynamic-glow {
          position: absolute;
          top: -20%;
          right: -20%;
          width: 50%;
          height: 50%;
          background: var(--card-glow);
          filter: blur(60px);
          border-radius: 50%;
          z-index: 1;
          opacity: 0.2;
          pointer-events: none;
        }

        .luxury-card-wrapper.active .dynamic-glow {
          opacity: 0.5;
          width: 70%;
          height: 70%;
        }

        @media (max-width: 768px) {
          .meta-compact-grid { grid-template-columns: 1fr; }
          .card-title { font-size: 1rem; }
        }
      `}</style>
    </motion.div>
  );
}

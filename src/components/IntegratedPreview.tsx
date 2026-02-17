"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Layout, Play, Pause } from "lucide-react";
import { MediaStage } from "./preview/MediaStage";
import { useLanguage } from "@/context/LanguageContext";
import { PortfolioItem } from "@/types/portfolio";
import { fetchPortfolioItem } from "@/utils/portfolio";

interface IntegratedPreviewProps {
  item: {
    title: string;
    data_folder?: string;
  } | null;
}

export default function IntegratedPreview({ item }: IntegratedPreviewProps) {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fullItem, setFullItem] = useState<PortfolioItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCurrentIndex(0);
    setFullItem(null);

    if (item?.data_folder) {
      fetchPortfolioItem(item.data_folder).then(data => {
        if (data) setFullItem(data);
      });
    }
  }, [item]);

  const media = fullItem?.media || [];
  const totalMedia = media.length;

  const next = () => setCurrentIndex((prev) => (prev + 1) % totalMedia);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + totalMedia) % totalMedia);

  // Auto-slideshow logic
  useEffect(() => {
    if (isPlaying && totalMedia > 1) {
      timerRef.current = setInterval(() => {
        next();
      }, 5000); // 5 seconds interval
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalMedia, currentIndex]);

  if (!item) {
    return (
      <div className="preview-empty">
        <div className="empty-state">
          <Layout size={40} className="empty-icon" />
          <p>{t('academic.select')}</p>
        </div>
        <style jsx>{`
          .preview-empty {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: var(--surface-color);
            color: var(--text-secondary);
            border-radius: 32px;
            text-align: center;
            min-height: 600px;
            border: 1px solid var(--border-color);
            position: relative;
            overflow: hidden;
          }
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
            z-index: 2;
          }
          .empty-icon { opacity: 0.1; }
        `}</style>
      </div>
    );
  }

  const currentMedia = media[currentIndex] || null;

  return (
    <div className="preview-container no-select">
      <div className="preview-header-minimal">
        <div className="header-left">
          <div className="line-dec" />
          <span>{fullItem?.title || item.title}</span>
        </div>
        {totalMedia > 1 && (
          <button
            className={`play-pause-btn ${isPlaying ? 'active' : ''}`}
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
        )}
      </div>

      <div className="viewer-container">
        <MediaStage
          currentMedia={currentMedia}
          itemTitle={fullItem?.title || item.title}
          onImageClick={() => { }}
        />

        {totalMedia > 1 && (
          <div className="stage-controls">
            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="nav-btn">
              <ChevronLeft size={20} />
            </button>
            <div className="nav-indicator">
              {media.map((_, i) => (
                <div
                  key={i}
                  className={`dot ${i === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="nav-btn">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>

      <style jsx>{`
        .preview-container {
          height: 100%;
          background: var(--surface-color);
          border-radius: 32px;
          overflow: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.2);
          border: 1px solid var(--border-color);
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .no-select { user-select: none; }

        .preview-header-minimal {
           padding: 1.5rem 2rem;
           display: flex;
           align-items: center;
           justify-content: space-between;
           gap: 12px;
           background: var(--surface-color);
           border-bottom: 1px solid var(--border-color);
           z-index: 20;
        }

        .header-left {
           display: flex;
           align-items: center;
           gap: 12px;
           font-size: 0.65rem;
           font-weight: 800;
           letter-spacing: 2px;
           color: var(--text-secondary);
           text-transform: uppercase;
        }

        .play-pause-btn {
           width: 32px;
           height: 32px;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           background: rgba(var(--accent-color-rgb), 0.1);
           color: var(--accent-color);
           transition: all 0.3s;
        }
        .play-pause-btn:hover { background: var(--accent-color); color: #000; scale: 1.1; }
        .play-pause-btn.active { box-shadow: 0 0 15px rgba(var(--accent-color-rgb), 0.3); }

        .line-dec { width: 20px; height: 1px; background: var(--accent-color); }

        .viewer-container {
          flex: 1;
          width: 100%;
          position: relative;
          background: #000;
          display: flex;
          flex-direction: column;
          min-height: 500px;
        }

        .stage-controls {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(20px);
          padding: 10px 24px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 30;
          box-shadow: 0 20px 40px rgba(0,0,0,0.5);
        }

        .nav-btn {
          color: #fff;
          opacity: 0.5;
          transition: all 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover { opacity: 1; transform: scale(1.2); color: var(--accent-color); }

        .nav-indicator { display: flex; gap: 6px; align-items: center; }
        .dot { 
          width: 6px; 
          height: 6px; 
          background: rgba(255,255,255,0.2); 
          border-radius: 50%; 
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .dot:hover { background: rgba(255,255,255,0.5); transform: scale(1.5); }
        .dot.active { 
          width: 24px; 
          border-radius: 10px; 
          background: var(--accent-color); 
          box-shadow: 0 0 10px var(--accent-color);
        }

        @media (max-width: 768px) {
           .viewer-container { min-height: 450px; }
           .stage-controls { bottom: 1.5rem; padding: 8px 20px; gap: 1rem; }
        }
      `}</style>
    </div>
  );
}

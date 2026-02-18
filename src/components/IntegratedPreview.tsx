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
      <div className="viewer-container">
        <MediaStage
          currentMedia={currentMedia}
          itemTitle={fullItem?.title || item.title}
          onImageClick={() => { }}
        />

        {totalMedia > 1 && (
          <div className="stage-controls">
            <button
              className={`play-pause-btn ${isPlaying ? 'active' : ''}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="nav-divider" />

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
          min-width: 100%;
          background: rgba(var(--surface-color-rgb), 0.5);
          border-radius: 40px;
          overflow: hidden;
          box-shadow: 
            0 40px 100px rgba(0,0,0,0.5),
            0 0 0 1px var(--border-color);
          display: flex;
          flex-direction: column;
          position: relative;
          backdrop-filter: blur(30px);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .no-select { user-select: none; }

        .viewer-container {
          flex: 1;
          width: 100%;
          position: relative;
          background: #000;
          display: grid;
          grid-template-columns: 1fr;
          grid-template-rows: 1fr;
          min-height: 600px;
          overflow: hidden;
        }

        .stage-controls {
          position: absolute;
          bottom: 2.5rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          background: rgba(10, 10, 10, 0.85);
          backdrop-filter: blur(40px);
          padding: 10px 24px;
          border-radius: 100px;
          border: 1px solid rgba(255,255,255,0.1);
          z-index: 30;
          box-shadow: 0 40px 80px rgba(0,0,0,0.7);
        }

        .nav-divider {
           width: 1px;
           height: 24px;
           background: rgba(255,255,255,0.1);
           margin: 0 8px;
        }

        .play-pause-btn {
           width: 44px;
           height: 44px;
           border-radius: 50%;
           display: flex;
           align-items: center;
           justify-content: center;
           background: rgba(var(--accent-color-rgb), 0.1);
           color: var(--accent-color);
           transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
           border: 1px solid rgba(var(--accent-color-rgb), 0.2);
        }
        .play-pause-btn:hover { 
          background: var(--accent-color); 
          color: #000; 
          transform: scale(1.1);
        }
        .play-pause-btn.active { 
          box-shadow: 0 0 20px rgba(var(--accent-color-rgb), 0.3);
          background: var(--accent-color);
          color: #000;
          border-color: var(--accent-color);
        }

        .nav-btn {
          color: #fff;
          opacity: 0.6;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .nav-btn:hover { opacity: 1; transform: scale(1.3); color: var(--accent-color); }

        .nav-indicator { display: flex; gap: 8px; align-items: center; }
        .dot { 
          width: 8px; 
          height: 8px; 
          background: rgba(255,255,255,0.15); 
          border-radius: 50%; 
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .dot:hover { background: rgba(255,255,255,0.4); transform: scale(1.4); }
        .dot.active { 
          width: 24px; 
          border-radius: 10px; 
          background: var(--accent-color); 
          box-shadow: 0 0 15px var(--accent-color);
        }

        @media (max-width: 768px) {
           .viewer-container { min-height: 400px; }
           .stage-controls { bottom: 2rem; padding: 8px 18px; gap: 1rem; }
           .play-pause-btn { width: 36px; height: 36px; }
        }
      `}</style>
    </div>
  );
}

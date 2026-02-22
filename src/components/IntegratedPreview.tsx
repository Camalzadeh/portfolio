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
    path?: string;
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

    const folderPath = item?.path || item?.data_folder;
    if (folderPath) {
      fetchPortfolioItem(folderPath).then(data => {
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
      <div className="relative flex h-full min-h-[500px] flex-col items-center justify-center overflow-hidden rounded-[32px] border border-border bg-surface-color/50 text-center">
        <div className="relative z-[2] flex flex-col items-center gap-8 p-12">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-accent/10 text-accent/20">
            <Layout size={32} />
          </div>
          <div>
            <p className="text-[0.7rem] font-black uppercase tracking-[4px] text-text-secondary opacity-40">{t('academic.select')}</p>
          </div>
        </div>
      </div>
    );
  }

  const currentMedia = media[currentIndex] || null;

  return (
    <div className="relative flex h-full min-w-full select-none flex-col overflow-hidden rounded-[40px] bg-[rgba(var(--surface-color-rgb),0.5)] shadow-[0_40px_100px_rgba(0,0,0,0.5),0_0_0_1px_var(--border-color)] transition-transform duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] backdrop-blur-[30px]">
      <div className="relative grid flex-1 min-h-[600px] grid-cols-1 grid-rows-1 overflow-hidden bg-black max-sm:min-h-[400px]">
        <MediaStage
          currentMedia={currentMedia}
          itemTitle={fullItem?.title || item.title}
          onImageClick={() => { }}
        />

        {totalMedia > 1 && (
          <div className="absolute bottom-[2.5rem] left-1/2 z-[30] flex translate-x-[-50%] items-center gap-[1.5rem] rounded-full border border-white/10 bg-[rgba(10,10,10,0.85)] p-[10px_24px] shadow-[0_40px_80px_rgba(0,0,0,0.7)] backdrop-blur-[40px] max-sm:bottom-[2rem] max-sm:gap-4 max-sm:px-4 max-sm:py-2">
            <button
              className={`flex h-[44px] w-[44px] items-center justify-center rounded-full border transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110 hover:bg-[var(--accent-color)] hover:text-black hover:border-[var(--accent-color)] max-sm:h-[36px] max-sm:w-[36px] ${isPlaying ? 'bg-[var(--accent-color)] text-black border-[var(--accent-color)] shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.3)]' : 'bg-[rgba(var(--accent-color-rgb),0.1)] text-[var(--accent-color)] border-[rgba(var(--accent-color-rgb),0.2)]'}`}
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? "Pause Slideshow" : "Resume Slideshow"}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>

            <div className="mx-[8px] h-[24px] w-[1px] bg-white/10" />

            <button onClick={(e) => { e.stopPropagation(); prev(); }} className="flex items-center justify-center text-white opacity-60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:text-[var(--accent-color)] hover:opacity-100">
              <ChevronLeft size={20} />
            </button>
            <div className="flex items-center gap-[8px]">
              {media.map((_, i) => (
                <div
                  key={i}
                  className={`cursor-pointer transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-150 hover:bg-white/40 ${i === currentIndex ? 'h-[8px] w-[24px] rounded-[10px] bg-[var(--accent-color)] shadow-[0_0_15px_var(--accent-color)]' : 'h-[8px] w-[8px] rounded-full bg-white/15'}`}
                  onClick={() => setCurrentIndex(i)}
                />
              ))}
            </div>
            <button onClick={(e) => { e.stopPropagation(); next(); }} className="flex items-center justify-center text-white opacity-60 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-125 hover:text-[var(--accent-color)] hover:opacity-100">
              <ChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

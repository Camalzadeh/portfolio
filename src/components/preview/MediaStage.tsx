"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface MediaItem {
  type: string;
  url_text?: string | null;
  title: string;
  path?: string | null;
}

interface MediaStageProps {
  currentMedia: MediaItem | null;
  itemTitle: string;
  onImageClick: () => void;
}

export function MediaStage({ currentMedia, itemTitle, onImageClick }: MediaStageProps) {
  const { t } = useLanguage();

  const getMediaUrl = () => {
    if (!currentMedia) return "";
    return currentMedia.path
      ? (currentMedia.path.startsWith('http') ? currentMedia.path : `/${currentMedia.path}`)
      : (currentMedia.url_text || "");
  };

  const mediaUrl = getMediaUrl();
  const isLocal = !mediaUrl.startsWith('http');

  // Google Viewer only for actual public URLs
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(mediaUrl)}&embedded=true`;

  return (
    <AnimatePresence mode="wait">
      {currentMedia ? (
        <motion.div
          key={`${itemTitle}-${mediaUrl}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="relative h-full w-full overflow-hidden bg-black"
        >
          <div className="relative h-full w-full bg-black p-0" onContextMenu={(e) => e.preventDefault()}>

            {/* 1. PDF GÖSTƏRİCİ - Tam ekran dəstəyi ilə */}
            {currentMedia.type === 'pdf' && (
              <div className="absolute inset-0 z-10 flex h-full w-full select-none flex-col overflow-hidden bg-white">
                <div className="pointer-events-none absolute right-8 top-6 z-25 flex items-center gap-[10px] rounded-full border border-white/10 bg-black/85 px-[16px] py-[8px] text-[0.7rem] font-extrabold uppercase tracking-widest text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)] backdrop-blur-[20px]">
                  <ShieldCheck size={12} /> Secure View
                </div>
                <iframe
                  src={isLocal ? `${mediaUrl}#view=FitH&toolbar=0&navpanes=0` : googleViewerUrl}
                  className="pointer-events-auto h-full w-full flex-1 border-none bg-white"
                  title={currentMedia.title}
                />
              </div>
            )}

            {/* 2. ŞƏKİL GÖSTƏRİCİ */}
            {currentMedia.type === 'image' && (
              <div className="absolute inset-0 z-5 block h-full w-full overflow-x-hidden overflow-y-auto bg-black p-8 scroll-smooth" onClick={onImageClick}>
                <div className="pointer-events-none fixed inset-0 z-[1] bg-cover bg-center opacity-80 blur-[120px] brightness-[0.1]" style={{ backgroundImage: `url(${encodeURI(mediaUrl)})` }} />
                <div className="relative z-[2] flex w-full flex-col items-center">
                  <img src={encodeURI(mediaUrl)} alt={currentMedia.title} className="h-auto w-full max-w-full rounded-2xl border border-white/5 object-contain shadow-[0_50px_100px_rgba(0,0,0,0.8)]" />
                </div>
              </div>
            )}

            {/* 3. DİGƏR FORMATLAR (HARİCİ) */}
            {currentMedia.type !== 'pdf' && currentMedia.type !== 'image' && (
              <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_center,_#111_0%,_#000_100%)] p-8">
                <div className="w-full max-w-[500px] rounded-[40px] border border-accent/10 bg-[rgba(var(--surface-color-rgb),0.3)] p-[5rem_3rem] text-center shadow-[0_40px_100px_rgba(0,0,0,0.7)] backdrop-blur-[40px]">
                  <ExternalLink size={64} className="mb-10 text-accent drop-shadow-[0_0_20px_rgba(var(--accent-color-rgb),0.4)]" />
                  <h3 className="mb-12 text-[1.8rem] font-extrabold tracking-[-0.01em] text-white">{t('preview.external_title')}</h3>
                  <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 rounded-[20px] bg-accent px-12 py-5 text-[0.85rem] font-black uppercase tracking-[2px] text-black shadow-[0_10px_30px_rgba(var(--accent-color-rgb),0.2)] transition-all hover:-translate-y-1 hover:bg-white hover:shadow-[0_20px_40px_rgba(var(--accent-color-rgb),0.4)]">
                    {t('preview.external_btn')} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

          </div>
        </motion.div>
      ) : (
        <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-black text-center">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6">
            <div className="text-white/10">
              <ExternalLink size={48} />
            </div>
            <p className="text-[1.2rem] font-extrabold uppercase tracking-[3px] text-white/10">{t('preview.no_media')}</p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
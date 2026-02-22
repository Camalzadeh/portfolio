"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ShieldCheck, Loader2, Maximize2, FileText, Image as ImageIcon, ChevronRight } from "lucide-react";
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
  const [isLoading, setIsLoading] = useState(true);

  const getMediaUrl = () => {
    if (!currentMedia) return "";
    return currentMedia.path
      ? (currentMedia.path.startsWith('http') ? currentMedia.path : `/${currentMedia.path}`)
      : (currentMedia.url_text || "");
  };

  const mediaUrl = getMediaUrl();
  const isLocal = !mediaUrl.startsWith('http');
  const googleViewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(mediaUrl)}&embedded=true`;

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#050505]">
      {/* Background Ambience */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,rgba(45,212,191,0.03)_0%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 z-[1] opacity-[0.03] mix-blend-overlay [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <AnimatePresence mode="wait">
        {currentMedia ? (
          <motion.div
            key={`${itemTitle}-${mediaUrl}`}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.01 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 h-full w-full"
          >
            <div className="relative h-full w-full bg-black/40" onContextMenu={(e) => e.preventDefault()}>

              {/* Media Loader removed for instant feedback */}

              {/* 1. PDF / Document Viewer WITH PROTECTION */}
              {currentMedia.type === 'pdf' && (
                <div className="absolute inset-0 z-10 flex h-full w-full flex-col bg-white overflow-hidden select-none">
                  {/* Protection Overlays */}
                  <div className="pointer-events-none absolute right-10 top-8 z-[40] flex items-center gap-3 rounded-full border border-white/10 bg-black/80 px-6 py-2.5 text-[0.65rem] font-black uppercase tracking-[3px] text-white shadow-2xl backdrop-blur-3xl">
                    <ShieldCheck size={14} className="text-accent" />
                    <span>Protected Document</span>
                  </div>

                  {/* Anti-Download Blockers (Blocks top bar icons in many viewers) */}
                  <div className="absolute top-0 right-0 z-[35] h-16 w-48 transition-all bg-transparent" title="Download Restricted" />
                  <div className="absolute top-0 left-0 right-0 z-[35] h-1 transition-all bg-transparent" />

                  <div className="absolute left-10 top-8 z-[40] flex items-center gap-3 rounded-xl bg-black/20 p-2 backdrop-blur-md">
                    <FileText size={16} className="text-white/40" />
                  </div>

                  <iframe
                    src={isLocal ? `${mediaUrl}#view=FitH&toolbar=0&navpanes=0&scrollbar=0&statusbar=0&messages=0` : googleViewerUrl}
                    className="h-full w-full border-none transition-opacity duration-1000 select-none"
                    title={currentMedia.title}
                    onLoad={() => setIsLoading(false)}
                    style={{ pointerEvents: 'auto' }}
                  />

                  {/* Internal Guard: Invisible layer to prevent drag/drop or easy selection */}
                  <div className="absolute inset-0 z-[30] pointer-events-none bg-transparent" onContextMenu={(e) => e.preventDefault()} />

                  {/* Subtle edge shadows for depth */}
                  <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)] z-20" />
                </div>
              )}

              {/* 2. Enhanced Image Showcase */}
              {currentMedia.type === 'image' && (
                <div
                  className="absolute inset-0 z-5 h-full w-full overflow-y-auto overflow-x-hidden p-8 scrollbar-none md:p-16"
                  onClick={onImageClick}
                >
                  <div className="fixed inset-0 z-[1] bg-cover bg-center transition-all duration-1000" style={{ backgroundImage: `url(${encodeURI(mediaUrl)})`, filter: 'blur(100px) brightness(0.15)' }} />

                  <div className="relative z-[2] flex min-h-full w-full flex-col items-center justify-center py-10">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="group/img relative max-w-full"
                    >
                      <img
                        src={encodeURI(mediaUrl)}
                        alt={currentMedia.title}
                        onLoad={() => setIsLoading(false)}
                        className="h-auto w-full max-w-[1200px] rounded-[32px] border border-white/5 object-contain shadow-[0_80px_160px_rgba(0,0,0,0.8),0_0_40px_rgba(var(--accent-color-rgb),0.05)] transition-all duration-700 hover:scale-[1.01]"
                      />
                      <div className="absolute right-8 bottom-8 rounded-full bg-black/60 p-4 text-white opacity-0 blur-sm transition-all group-hover/img:opacity-100 group-hover/img:translate-y-[-10px] group-hover/img:blur-0">
                        <Maximize2 size={24} />
                      </div>
                    </motion.div>

                    <div className="mt-12 text-center opacity-60 transition-all hover:opacity-100">
                      <h4 className="font-heading text-lg font-black tracking-tight text-white mb-2">{currentMedia.title}</h4>
                      <div className="flex items-center justify-center gap-2 text-[0.6rem] font-bold uppercase tracking-widest text-accent">
                        <ImageIcon size={10} />
                        High Resolution Capture
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. External & Advanced Connect */}
              {currentMedia.type !== 'pdf' && currentMedia.type !== 'image' && (
                <div className="flex h-full w-full items-center justify-center p-8 lg:p-20">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-[600px] overflow-hidden rounded-[48px] border border-white/10 bg-surface/40 p-16 text-center shadow-2xl backdrop-blur-3xl"
                  >
                    <div className="mb-12 flex justify-center">
                      <div className="relative">
                        <ExternalLink size={80} className="text-accent drop-shadow-[0_0_30px_rgba(var(--accent-color-rgb),0.4)]" />
                        <div className="absolute inset-0 animate-pulse text-accent/20 blur-2xl">
                          <ExternalLink size={80} />
                        </div>
                      </div>
                    </div>

                    <h3 className="mb-8 font-heading text-4xl font-black tracking-tight text-white">{t('preview.external_title')}</h3>
                    <div className="mb-12 flex flex-col items-center gap-4">
                      <p className="max-w-[320px] text-lg font-medium leading-relaxed text-text-secondary">
                        {t('preview.external_desc')}
                      </p>
                      <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 border border-white/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-text-secondary opacity-60">
                          {mediaUrl ? `Verified Source: ${new URL(mediaUrl).hostname}` : "Secure Verification Required"}
                        </span>
                      </div>
                    </div>

                    <a
                      href={mediaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={() => setIsLoading(true)}
                      onMouseLeave={() => setIsLoading(false)}
                      className="group inline-flex items-center gap-4 rounded-3xl bg-accent px-14 py-6 text-[0.9rem] font-black uppercase tracking-[3px] text-black shadow-[0_20px_40px_rgba(var(--accent-color-rgb),0.3)] transition-all hover:-translate-y-2 hover:bg-white hover:shadow-[0_30px_60px_rgba(var(--accent-color-rgb),0.5)] active:scale-95"
                    >
                      {t('preview.external_btn')}
                      <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </a>
                  </motion.div>
                </div>
              )}

            </div>
          </motion.div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center bg-[#050505] text-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center gap-10"
            >
              <div className="relative">
                <FileText size={80} className="text-white/[0.03]" />
                <div className="absolute inset-0 animate-pulse bg-white/[0.01] blur-3xl fill-white" />
              </div>
              <p className="max-w-[200px] text-[0.8rem] font-black uppercase tracking-[6px] text-white/5 leading-relaxed">
                Vault <br /> Waiting for Input
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, FileText, FileSearch, ShieldCheck } from "lucide-react";
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
          className="viewer-stage"
        >
          <div className="stage-inner" onContextMenu={(e) => e.preventDefault()}>

            {/* 1. PDF GÖSTƏRİCİ - Tam ekran dəstəyi ilə */}
            {currentMedia.type === 'pdf' && (
              <div className="doc-wrapper">
                <div className="secure-badge">
                  <ShieldCheck size={12} /> Secure View
                </div>
                <iframe
                  src={isLocal ? `${mediaUrl}#view=FitH&toolbar=0&navpanes=0` : googleViewerUrl}
                  className="media-frame"
                  title={currentMedia.title}
                />
              </div>
            )}

            {/* 2. ŞƏKİL GÖSTƏRİCİ */}
            {currentMedia.type === 'image' && (
              <div className="image-stage" onClick={onImageClick}>
                <div className="image-bg-blur" style={{ backgroundImage: `url(${encodeURI(mediaUrl)})` }} />
                <div className="image-wrapper">
                  <img src={encodeURI(mediaUrl)} alt={currentMedia.title} className="main-image" />
                </div>
              </div>
            )}

            {/* 3. DİGƏR FORMATLAR (HARİCİ) */}
            {currentMedia.type !== 'pdf' && currentMedia.type !== 'image' && (
              <div className="external-node">
                <div className="ext-box">
                  <ExternalLink size={64} className="icon-glow" />
                  <h3>{t('preview.external_title')}</h3>
                  <a href={mediaUrl} target="_blank" rel="noopener noreferrer" className="ext-btn">
                    {t('preview.external_btn')} <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            )}

          </div>

          <style jsx>{`
            .viewer-stage {
              width: 100%;
              height: 100%;
              position: relative;
              background: #000;
              overflow: hidden;
            }

            .stage-inner {
              width: 100%;
              height: 100%;
              position: relative;
              background: #000;
              padding: 0;
            }

            /* PDF & DOCS */
            .doc-wrapper {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              background: #fff;
              display: flex;
              flex-direction: column;
              user-select: none;
            }

            .media-frame {
              width: 100%;
              flex: 1;
              border: none;
              background: #fff;
              pointer-events: auto;
            }

            /* Block dragging on iframe */
            .doc-wrapper::after {
              content: '';
              position: absolute;
              inset: 0;
              background: transparent;
              pointer-events: none;
              z-index: 10;
            }

            .secure-badge {
               position: absolute;
               top: 1.5rem;
               right: 2rem;
               background: rgba(0,0,0,0.85);
               backdrop-filter: blur(20px);
               color: #fff;
               padding: 8px 16px;
               border-radius: 100px;
               font-size: 0.7rem;
               font-weight: 800;
               display: flex;
               align-items: center;
               gap: 10px;
               z-index: 25;
               pointer-events: none;
               letter-spacing: 1px;
               border: 1px solid rgba(255,255,255,0.1);
               box-shadow: 0 10px 30px rgba(0,0,0,0.5);
            }

            /* IMAGE STYLING - PERFECT FIT + SCROLL */
            .image-stage {
               position: absolute;
               inset: 0;
               width: 100%;
               height: 100%;
               overflow-y: auto !important;
               overflow-x: hidden;
               background: #000;
               padding: 2rem;
               z-index: 5;
               display: block;
               scroll-behavior: smooth;
            }

            /* FORCE VISIBLE SCROLLBARS */
            .image-stage::-webkit-scrollbar {
              width: 10px !important;
              display: block !important;
            }
            .image-stage::-webkit-scrollbar-track {
              background: rgba(0,0,0,0.8) !important;
            }
            .image-stage::-webkit-scrollbar-thumb {
              background: var(--accent-color) !important;
              border-radius: 10px;
            }

            .image-bg-blur {
               position: fixed;
               inset: 0;
               background-size: cover;
               background-position: center;
               filter: blur(120px) brightness(0.1);
               opacity: 0.8;
               z-index: 1;
               pointer-events: none;
            }

            .image-wrapper {
               position: relative;
               z-index: 2;
               width: 100%;
               display: flex;
               flex-direction: column;
               align-items: center;
            }

            .main-image {
               width: 100%;
               max-width: 100%;
               height: auto;
               border-radius: 16px;
               box-shadow: 0 50px 100px rgba(0,0,0,0.8);
               user-drag: none;
               -webkit-user-drag: none;
               border: 1px solid rgba(255,255,255,0.05);
               object-fit: contain;
            }

            /* PDF Protection & Full Stretch */
            .doc-wrapper {
              position: absolute;
              inset: 0;
              width: 100%;
              height: 100%;
              background: #fff;
              display: flex;
              flex-direction: column;
              user-select: none;
              overflow: hidden;
              z-index: 10;
            }

            /* Block dragging but allow iframe interactions */
            .doc-wrapper::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 60px; /* Protect header */
              z-index: 15;
              pointer-events: none;
            }

            /* Non-blocking overlay for clicks, but stops some context menu items */
            .doc-wrapper::before {
              content: '';
              position: absolute;
              inset: 0;
              z-index: 5;
              pointer-events: none;
              box-shadow: inset 0 0 100px rgba(0,0,0,0.1);
            }

            /* EXTERNAL LINK STYLING */
            .external-node { 
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: radial-gradient(circle at center, #111 0%, #000 100%);
              padding: 2rem;
            }
            .ext-box {
              max-width: 500px;
              width: 100%;
              text-align: center;
              padding: 5rem 3rem;
              background: rgba(var(--surface-color-rgb), 0.3);
              backdrop-filter: blur(40px);
              border-radius: 40px;
              border: 1px solid rgba(var(--accent-color-rgb), 0.1);
              box-shadow: 0 40px 100px rgba(0,0,0,0.7);
            }
            .icon-glow { 
              color: var(--accent-color); 
              filter: drop-shadow(0 0 20px rgba(var(--accent-color-rgb), 0.4)); 
              margin-bottom: 2.5rem; 
            }
            .ext-box h3 { color: #fff; margin-bottom: 3rem; font-size: 1.8rem; font-weight: 800; letter-spacing: -0.01em; }
            
            .ext-btn {
               background: var(--accent-color);
               color: #000;
               padding: 1.25rem 3rem;
               border-radius: 20px;
               font-weight: 900;
               text-decoration: none;
               display: inline-flex;
               align-items: center;
               gap: 12px;
               text-transform: uppercase;
               letter-spacing: 2px;
               transition: all 0.4s;
               box-shadow: 0 10px 30px rgba(var(--accent-color-rgb), 0.2);
            }
            .ext-btn:hover { background: #fff; transform: translateY(-5px); box-shadow: 0 20px 40px rgba(var(--accent-color-rgb), 0.4); }

            /* NO MEDIA */
            .no-media-state {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 2.5rem;
              color: rgba(var(--accent-color-rgb), 0.05);
              height: 100%;
              width: 100%;
              justify-content: center;
              background: #000;
              text-align: center;
            }
            .no-media-state p {
              font-size: 1.2rem;
              font-weight: 800;
              letter-spacing: 3px;
              text-transform: uppercase;
              color: rgba(255,255,255,0.1);
            }
          `}</style>
        </motion.div>
      ) : (
        <div className="no-media-state">
          <FileText size={48} />
          <p>{t('preview.no_media')}</p>
        </div>
      )}
    </AnimatePresence>
  );
}
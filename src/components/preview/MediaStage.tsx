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

  const handleMhtmlOpen = () => {
    window.open(mediaUrl, '_blank');
  };

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

            {/* 2. MHTML GÖSTƏRİCİ */}
            {currentMedia.type === 'mhtml' && (
              <div className="mhtml-preview-container">
                <div className="mhtml-card">
                  <div className="mhtml-header">
                    <FileSearch size={64} className="mhtml-icon" />
                    <span className="file-type-badge">MHTML ARCHIVE</span>
                    <h3>{currentMedia.title}</h3>
                    <p>This document is optimized for a full-page view to maintain formatting and interactivity.</p>
                  </div>

                  <button onClick={handleMhtmlOpen} className="premium-btn">
                    <ExternalLink size={18} />
                    <span>Open Full Document</span>
                  </button>
                  <p className="no-download-hint">No download required. Direct browser preview.</p>
                </div>
              </div>
            )}

            {/* 3. ŞƏKİL GÖSTƏRİCİ */}
            {currentMedia.type === 'image' && (
              <div className="image-stage" onClick={onImageClick}>
                <div className="image-bg-blur" style={{ backgroundImage: `url(${encodeURI(mediaUrl)})` }} />
                <div className="image-wrapper">
                  <img src={encodeURI(mediaUrl)} alt={currentMedia.title} className="main-image" />
                </div>
              </div>
            )}

            {/* 4. DİGƏR FORMATLAR */}
            {currentMedia.type !== 'pdf' && currentMedia.type !== 'mhtml' && currentMedia.type !== 'image' && (
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
              display: flex;
              flex-direction: column;
              background: #000;
              border-radius: 0;
              overflow: hidden;
              flex: 1;
              min-height: 0;
            }

            .stage-inner {
              flex: 1;
              width: 100%;
              height: 100%;
              display: flex;
              flex-direction: column;
              position: relative;
              min-height: 0;
            }

            /* PDF & DOCS */
            .doc-wrapper {
              width: 100%;
              height: 100%;
              min-height: 600px;
              background: #fff;
              position: relative;
              display: flex;
              flex-direction: column;
            }

            .media-frame {
              width: 100%;
              flex: 1;
              border: none;
              background: #fff;
            }

            .secure-badge {
               position: absolute;
               top: 1rem;
               right: 1.5rem;
               background: rgba(0,0,0,0.8);
               backdrop-filter: blur(10px);
               color: #fff;
               padding: 6px 12px;
               border-radius: 6px;
               font-size: 0.6rem;
               font-weight: 800;
               display: flex;
               align-items: center;
               gap: 8px;
               z-index: 20;
               pointer-events: none;
               letter-spacing: 1px;
            }

            /* MHTML STYLING */
            .mhtml-preview-container {
               width: 100%;
               height: 100%;
               display: flex;
               align-items: center;
               justify-content: center;
               padding: 2rem;
               background: #0a0a0a;
            }

            .mhtml-card {
               max-width: 400px;
               width: 100%;
               background: #0a0a0a;
               padding: 3rem 2rem;
               border-radius: 24px;
               text-align: center;
            }

            .mhtml-icon {
               color: #facc15;
               margin-bottom: 1.5rem;
               filter: drop-shadow(0 0 20px rgba(250, 204, 21, 0.4));
            }

            .file-type-badge {
               display: inline-block;
               padding: 4px 10px;
               background: rgba(250, 204, 21, 0.1);
               color: #facc15;
               border-radius: 4px;
               font-size: 0.6rem;
               font-weight: 900;
               letter-spacing: 1px;
               margin-bottom: 1rem;
            }

            .mhtml-header h3 { color: #fff; font-size: 1.2rem; font-weight: 800; margin-bottom: 1rem; }
            .mhtml-header p { color: #666; font-size: 0.8rem; line-height: 1.5; margin-bottom: 2rem; }

            .premium-btn {
               background: #facc15;
               color: #000;
               border: none;
               padding: 0.8rem 1.5rem;
               border-radius: 10px;
               font-weight: 800;
               display: flex;
               align-items: center;
               justify-content: center;
               gap: 10px;
               width: 100%;
               cursor: pointer;
               transition: all 0.3s;
            }

            .premium-btn:hover { background: #fff; transform: translateY(-2px); box-shadow: 0 10px 20px rgba(250, 204, 21, 0.2); }

            .no-download-hint {
               display: block;
               margin-top: 1rem;
               font-size: 0.65rem;
               color: #444;
               font-weight: 600;
            }

            /* IMAGE STYLING */
            .image-stage {
               width: 100%;
               height: 100%;
               position: relative;
               cursor: crosshair;
               overflow: hidden;
               display: flex;
               align-items: center;
               justify-content: center;
            }

            .image-bg-blur {
               position: absolute;
               inset: -20px;
               background-size: cover;
               background-position: center;
               filter: blur(50px) brightness(0.2);
               opacity: 0.5;
               z-index: 1;
            }

            .image-wrapper {
               position: relative;
               z-index: 2;
               width: 95%;
               height: 95%;
               display: flex;
               align-items: center;
               justify-content: center;
            }

            .main-image {
               max-width: 100%;
               max-height: 100%;
               object-fit: contain;
               border-radius: 8px;
               box-shadow: 0 40px 100px rgba(0,0,0,0.9);
            }

            .external-node { text-align: center; padding: 2.5rem; color: #fff; }
            .icon-glow { color: #facc15; filter: drop-shadow(0 0 15px rgba(250, 204, 21, 0.3)); margin-bottom: 2rem; }
            .ext-box h3 { margin-bottom: 2rem; font-size: 1.25rem; font-weight: 800; }
            .ext-btn {
               background: #facc15;
               color: #000;
               padding: 12px 24px;
               border-radius: 8px;
               font-weight: 800;
               text-decoration: none;
               display: inline-flex;
               align-items: center;
               gap: 8px;
            }

            /* NO MEDIA */
            .no-media-state {
              display: flex;
              flex-direction: column;
              align-items: center;
              gap: 1.5rem;
              color: rgba(255,255,255,0.1);
              height: 100%;
              width: 100%;
              justify-content: center;
              background: #000;
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
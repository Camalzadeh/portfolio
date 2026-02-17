"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Download } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  type?: 'image' | 'pdf' | 'mhtml' | 'external';
}

export function ZoomModal({ isOpen, onClose, url, type = 'image' }: ZoomModalProps) {
  const { t } = useLanguage();
  const isDoc = type === 'pdf' || type === 'mhtml';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="zoom-overlay"
          onClick={onClose}
        >
          <div className="zoom-toolbar">
            <div className="toolbar-left">
              {isDoc && <span className="doc-badge">{type.toUpperCase()} PREVIEW</span>}
            </div>
            <div className="toolbar-right">
              <button className="close-zoom" onClick={onClose}><X size={20} /></button>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className={`zoom-content ${isDoc ? 'is-doc' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isDoc ? (
              <iframe src={url} className="zoom-iframe" title="Document Preview" />
            ) : (
              <img src={url} alt="Zoomed View" className="zoom-image" />
            )}
          </motion.div>

          <style jsx>{`
            .zoom-overlay {
              position: fixed;
              inset: 0;
              background: rgba(10, 10, 12, 0.98);
              backdrop-filter: blur(20px);
              z-index: 5000;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              padding: 6rem 2rem 2rem;
            }

            .zoom-toolbar {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              height: 80px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              padding: 0 2rem;
              background: linear-gradient(to bottom, rgba(0,0,0,0.5), transparent);
              z-index: 10;
            }

            .toolbar-right {
              display: flex;
              gap: 1rem;
              align-items: center;
            }

            .toolbar-btn, .close-zoom {
              background: rgba(255,255,255,0.05);
              border: 1px solid rgba(255,255,255,0.1);
              color: #fff;
              width: 44px;
              height: 44px;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              cursor: pointer;
              transition: all 0.3s;
              text-decoration: none;
            }

            .toolbar-btn:hover { background: var(--accent-color); color: #000; border-color: transparent; transform: translateY(-2px); }
            .close-zoom:hover { background: #ff4757; color: #fff; transform: rotate(90deg); }

            .doc-badge {
              background: var(--accent-color);
              color: #000;
              padding: 4px 12px;
              border-radius: 6px;
              font-size: 0.7rem;
              font-weight: 900;
              letter-spacing: 1px;
            }

            .zoom-content {
              position: relative;
              width: 100%;
              max-width: 1200px;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;
              z-index: 5;
            }

            .zoom-content.is-doc {
              max-width: 1400px;
            }

            .zoom-image {
              max-width: 100%;
              max-height: 100%;
              object-fit: contain;
              border-radius: 12px;
              box-shadow: 0 30px 60px rgba(0,0,0,0.5);
              background: #fff;
            }

            .zoom-iframe {
              width: 100%;
              height: 100%;
              border: none;
              border-radius: 12px;
              background: #fff;
              box-shadow: 0 30px 60px rgba(0,0,0,0.5);
            }

            @media (max-width: 768px) {
              .zoom-overlay { padding: 5rem 1rem 1rem; }
              .zoom-toolbar { height: 60px; padding: 0 1rem; }
              .zoom-content { height: calc(100% - 20px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

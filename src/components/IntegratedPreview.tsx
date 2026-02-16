"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, ExternalLink, ChevronLeft, ChevronRight, Maximize2, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface MediaItem {
    type: 'pdf' | 'image' | 'external';
    url: string;
    title: string;
}

interface IntegratedPreviewProps {
    item: {
        title: string;
        organization?: string;
        media?: MediaItem[];
        full_detail?: string;
    } | null;
}

export default function IntegratedPreview({ item }: IntegratedPreviewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!item) {
        return (
            <div className="preview-empty">
                <div className="empty-state">
                    <div className="pulse-circle" />
                    <p>Select an achievement to view verification</p>
                </div>
                <style jsx>{`
          .preview-empty {
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.01);
            color: #475569;
            text-align: center;
          }
          .empty-state {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1.5rem;
          }
          .pulse-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            border: 2px solid rgba(255,255,255,0.05);
            position: relative;
          }
          .pulse-circle::after {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 50%;
            border: 2px solid var(--accent-color);
            opacity: 0.3;
            animation: pulse-out 2s infinite;
          }
          @keyframes pulse-out {
            0% { transform: scale(1); opacity: 0.5; }
            100% { transform: scale(1.5); opacity: 0; }
          }
        `}</style>
            </div>
        );
    }

    const media = item.media || [];
    const currentMedia = media[currentIndex];
    const totalMedia = media.length;

    const next = () => setCurrentIndex((prev) => (prev + 1) % totalMedia);
    const prev = () => setCurrentIndex((prev) => (prev - 1 + totalMedia) % totalMedia);

    return (
        <div className="preview-wrapper">
            <div className="preview-top">
                <div className="top-info">
                    <span className="verify-label"><ShieldCheck size={12} /> Verified Evidence</span>
                    <h3>{item.title}</h3>
                    <p className="org-label">{item.organization}</p>
                </div>
            </div>

            <div className="view-window">
                <AnimatePresence mode="wait">
                    {totalMedia > 0 ? (
                        <motion.div
                            key={`${item.title}-${currentIndex}`}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="viewer-main"
                        >
                            {currentMedia.type === 'pdf' ? (
                                <iframe
                                    src={`/${currentMedia.url}#toolbar=0&navpanes=0`}
                                    className="pdf-iframe"
                                    title={currentMedia.title}
                                />
                            ) : currentMedia.type === 'image' ? (
                                <img src={`/${currentMedia.url}`} alt={currentMedia.title} className="image-node" />
                            ) : (
                                <div className="external-node">
                                    <div className="ext-box">
                                        <ExternalLink size={32} />
                                        <p>Full Verification Portal</p>
                                        <a href={currentMedia.url} target="_blank" className="ext-btn">Open Link Externally</a>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ) : (
                        <div className="no-media">
                            <p>No media proof attached for this item.</p>
                        </div>
                    )}
                </AnimatePresence>

                {totalMedia > 1 && (
                    <div className="view-nav">
                        <button onClick={prev}><ChevronLeft size={20} /></button>
                        <span className="nav-counter">{currentIndex + 1} / {totalMedia}</span>
                        <button onClick={next}><ChevronRight size={20} /></button>
                    </div>
                )}
            </div>

            <div className="preview-details">
                <div className="detail-head">Details & Context</div>
                <p className="detail-text">{item.full_detail || "Detailed documentation is being reviewed for this entry."}</p>
            </div>

            <style jsx>{`
        .preview-wrapper {
          height: 100%;
          display: flex;
          flex-direction: column;
          background: #000;
          color: #fff;
        }

        .preview-top {
          padding: 1.5rem;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.05);
        }

        .verify-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--accent-color);
          margin-bottom: 0.5rem;
        }

        .preview-top h3 {
          font-size: 1.1rem;
          margin: 0;
          line-height: 1.3;
        }

        .org-label {
          font-size: 0.8rem;
          color: #64748b;
          margin-top: 4px;
        }

        .view-window {
          flex: 1;
          background: #000;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .viewer-main {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pdf-iframe {
          width: 100%;
          height: 100%;
          border: none;
        }

        .image-node {
          max-width: 90%;
          max-height: 90%;
          object-fit: contain;
          border-radius: 8px;
        }

        .external-node {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.02);
        }

        .ext-box {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .ext-btn {
          background: var(--accent-color);
          color: #000;
          padding: 0.6rem 1.2rem;
          border-radius: 8px;
          font-weight: 700;
          font-size: 0.8rem;
          text-decoration: none;
        }

        .view-nav {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0,0,0,0.8);
          backdrop-filter: blur(10px);
          padding: 0.4rem 1rem;
          border-radius: 100px;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          border: 1px solid rgba(255,255,255,0.1);
        }

        .view-nav button {
          background: none;
          border: none;
          color: #fff;
          cursor: pointer;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .view-nav button:hover { opacity: 1; }

        .nav-counter { font-size: 0.75rem; font-weight: 700; color: #94a3b8; }

        .preview-details {
          padding: 1.5rem;
          background: rgba(255,255,255,0.02);
          border-top: 1px solid rgba(255,255,255,0.05);
        }

        .detail-head {
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          color: #475569;
          letter-spacing: 1px;
          margin-bottom: 0.75rem;
        }

        .detail-text {
          font-size: 0.85rem;
          line-height: 1.6;
          color: #94a3b8;
        }
      `}</style>
        </div>
    );
}

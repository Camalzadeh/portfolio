"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface ZoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  type?: 'image' | 'pdf' | 'mhtml' | 'external';
}

export function ZoomModal({ isOpen, onClose, url, type = 'image' }: ZoomModalProps) {
  const isDoc = type === 'pdf' || type === 'mhtml';

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[5000] flex flex-col items-center justify-center bg-[#0a0a0c]/98 p-6 pt-24 backdrop-blur-[20px] max-md:p-4 max-md:pt-20"
          onClick={onClose}
        >
          <div className="absolute inset-x-0 top-0 z-[10] flex h-20 items-center justify-between bg-gradient-to-b from-black/50 to-transparent px-8 max-md:h-[60px] max-md:px-4">
            <div className="flex items-center">
              {isDoc && (
                <span className="rounded-md bg-accent px-3 py-1 text-[0.7rem] font-black uppercase tracking-widest text-black">
                  {type.toUpperCase()} PREVIEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-4">
              <button
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white transition-all duration-300 hover:rotate-90 hover:bg-[#ff4757]"
                onClick={onClose}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className={`relative z-[5] flex h-full w-full items-center justify-center ${isDoc ? 'max-w-[1400px]' : 'max-w-[1200px]'}`}
            onClick={(e) => e.stopPropagation()}
          >
            {isDoc ? (
              <iframe src={url} className="h-full w-full rounded-xl border-none bg-white shadow-[0_30px_60px_rgba(0,0,0,0.5)]" title="Document Preview" />
            ) : (
              <img src={url} alt="Zoomed View" className="h-full w-full rounded-xl bg-white object-contain shadow-[0_30px_60px_rgba(0,0,0,0.5)]" />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

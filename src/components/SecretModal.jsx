import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles } from 'lucide-react';
import { siteContent } from '../data/content';

export default function SecretModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-rosewood-950/40 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
            className="relative w-full max-w-md bg-ivory-50 border border-blush-300/70 rounded-2xl p-6 sm:p-8 shadow-paper-lg z-10 overflow-hidden"
          >
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blush-200 via-rosewood-400 to-lavenderdust-300" />

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 text-rosewood-500 hover:text-rosewood-900 rounded-full hover:bg-blush-100 transition-colors"
              aria-label="Close note"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Icon */}
            <div className="flex items-center gap-2 mb-4 text-rosewood-600">
              <span className="p-2 rounded-full bg-blush-100/80 border border-blush-200">
                <Sparkles className="w-4 h-4 text-rosewood-600" />
              </span>
              <span className="text-xs uppercase tracking-widest font-sans font-semibold text-rosewood-700">
                {siteContent.secret.title}
              </span>
            </div>

            {/* Secret Content */}
            <div className="space-y-3 font-serif text-rosewood-900 leading-relaxed text-base sm:text-lg">
              {siteContent.secret.lines.map((line, idx) => (
                <p
                  key={idx}
                  className={idx === siteContent.secret.lines.length - 1 ? "font-medium text-rosewood-800 italic pt-2" : ""}
                >
                  {line}
                </p>
              ))}
            </div>

            {/* Signature / seal accent */}
            <div className="mt-6 pt-4 border-t border-blush-200/60 flex items-center justify-between">
              <span className="text-xs font-handwriting text-2xl text-rosewood-600">
                a little quiet thought
              </span>
              <button
                onClick={onClose}
                className="px-4 py-1.5 rounded-full text-xs font-sans font-medium text-rosewood-700 hover:bg-blush-100 transition-colors border border-blush-200"
              >
                Close
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

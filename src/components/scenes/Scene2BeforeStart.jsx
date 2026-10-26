import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Smile, ArrowRight, CornerDownRight } from 'lucide-react';
import { siteContent } from '../../data/content';

export default function Scene2BeforeStart({ onNext }) {
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleSelect = (option) => {
    setSelectedChoice(option);
  };

  const handleProceed = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      onNext();
    }, 400);
  };

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl mx-auto card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm text-center"
      >
        {/* Subtle decorative stamp */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blush-100/80 border border-blush-200/80 text-rosewood-700 text-xs font-sans font-medium mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-rosewood-500" />
          <span>Quick Note</span>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mb-6">
          {siteContent.scene2.heading}
        </h2>

        {/* Content Paragraphs */}
        <div className="space-y-3.5 text-rosewood-800/90 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
          {siteContent.scene2.paragraphs.map((p, idx) => (
            <p key={idx} className={idx === siteContent.scene2.paragraphs.length - 1 ? "italic text-rosewood-600 font-medium" : ""}>
              {p}
            </p>
          ))}
        </div>

        {/* Choice Buttons */}
        {!selectedChoice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-6"
          >
            {siteContent.scene2.options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleSelect(option)}
                className="w-full sm:w-auto min-w-[150px] px-6 py-3 rounded-full border border-rosewood-400/50 bg-white hover:bg-blush-50 text-rosewood-800 hover:text-rosewood-900 font-sans text-sm font-medium transition-all duration-200 hover:shadow-md transform active:scale-95"
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* Selected Response Box */}
        <AnimatePresence>
          {selectedChoice && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-6 pt-6 border-t border-blush-200/80"
            >
              <div className="bg-blush-100/60 rounded-xl p-4 sm:p-5 border border-blush-200 mb-6 max-w-md mx-auto">
                <p className="font-handwriting text-2xl sm:text-3xl text-rosewood-800 leading-snug">
                  "{selectedChoice.response}"
                </p>
              </div>

              <button
                onClick={handleProceed}
                disabled={isTransitioning}
                className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 font-sans text-sm font-medium shadow-md transition-all transform active:scale-95"
              >
                <span>{siteContent.scene2.continueButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

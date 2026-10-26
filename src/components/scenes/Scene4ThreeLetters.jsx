import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Check, X, ArrowRight, ArrowLeft } from 'lucide-react';
import { siteContent } from '../../data/content';

export default function Scene4ThreeLetters({ onNext, onPrev }) {
  const [activeLetterId, setActiveLetterId] = useState(null);
  const [readLetters, setReadLetters] = useState(new Set());

  const letters = siteContent.scene4.letters;

  const handleOpenLetter = (letter) => {
    setActiveLetterId(letter.id);
    setReadLetters((prev) => new Set([...prev, letter.id]));
  };

  const handleCloseLetter = () => {
    setActiveLetterId(null);
  };

  const activeLetter = letters.find((l) => l.id === activeLetterId);
  const allRead = letters.every((l) => readLetters.has(l.id));

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Scene Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10 max-w-lg"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-rosewood-600">
          Unfolded Notes
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mt-2 mb-3">
          {siteContent.scene4.heading}
        </h2>
        <p className="text-xs sm:text-sm text-rosewood-600 font-sans">
          {siteContent.scene4.subheading}
        </p>
      </motion.div>

      {/* Three Envelope Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mb-10">
        {letters.map((letter, idx) => {
          const isRead = readLetters.has(letter.id);

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              onClick={() => handleOpenLetter(letter)}
              className="cursor-pointer group relative bg-white/90 card-paper rounded-2xl p-6 sm:p-7 shadow-paper border border-blush-300/60 hover:border-rosewood-400/80 transition-all duration-300 flex flex-col justify-between"
            >
              {/* Envelope flap visual decoration */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blush-200 via-rosewood-400/70 to-blush-200 rounded-t-2xl" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[11px] uppercase tracking-wider font-sans font-semibold text-rosewood-600">
                    {letter.subtitle}
                  </span>
                  {isRead ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-sans text-rosewood-600 bg-blush-100/80 px-2 py-0.5 rounded-full border border-blush-200">
                      <Check className="w-3 h-3" />
                      <span>Read</span>
                    </span>
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-rosewood-500 animate-pulse" />
                  )}
                </div>

                <h3 className="font-serif text-xl sm:text-2xl text-rosewood-900 font-medium mb-3 group-hover:text-rosewood-700 transition-colors">
                  {letter.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-rosewood-700/80 line-clamp-2 leading-relaxed">
                  {letter.preview}
                </p>
              </div>

              {/* Envelope Bottom Button Accent */}
              <div className="mt-6 pt-4 border-t border-blush-200/50 flex items-center justify-between text-xs font-sans font-medium text-rosewood-600 group-hover:text-rosewood-900">
                <span>Open Letter</span>
                <span className="w-7 h-7 rounded-full bg-blush-100 group-hover:bg-rosewood-600 group-hover:text-ivory-50 transition-colors flex items-center justify-center">
                  <Mail className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Progress status & Proceed button */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 w-full max-w-4xl px-2">
        <button
          onClick={onPrev}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans font-medium text-rosewood-600 hover:text-rosewood-900 transition-colors py-2 px-3 rounded-lg hover:bg-blush-100/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back</span>
        </button>

        <p className="text-xs text-rosewood-600/80 font-sans">
          {readLetters.size} of {letters.length} letters opened
        </p>

        <button
          onClick={onNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 text-xs uppercase tracking-wider font-sans font-medium shadow-sm transition-all transform active:scale-95"
        >
          <span>Continue</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Modal: Opened Unfolded Letter */}
      <AnimatePresence>
        {activeLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCloseLetter}
              className="absolute inset-0 bg-rosewood-950/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", duration: 0.55, bounce: 0.15 }}
              className="relative w-full max-w-xl bg-[#FAF7F2] card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/80 z-10 max-h-[85vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                onClick={handleCloseLetter}
                className="absolute top-5 right-5 p-2 text-rosewood-500 hover:text-rosewood-900 rounded-full hover:bg-blush-100 transition-colors"
                aria-label="Close letter"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Letter Header */}
              <div className="text-center pb-6 border-b border-blush-200/80 mb-6">
                <span className="text-[11px] uppercase tracking-[0.2em] font-sans font-semibold text-rosewood-600">
                  {activeLetter.subtitle}
                </span>
                <h3 className="font-serif text-3xl sm:text-4xl text-rosewood-900 font-normal mt-1">
                  {activeLetter.title}
                </h3>
              </div>

              {/* Letter Body Paragraphs */}
              <div className="space-y-4 font-serif text-lg sm:text-xl text-rosewood-900 leading-relaxed">
                {activeLetter.paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Letter Sign-off */}
              <div className="mt-8 pt-6 border-t border-blush-200/60 flex items-center justify-between">
                <span className="font-handwriting text-2xl text-rosewood-700">
                  for zey
                </span>
                <button
                  onClick={handleCloseLetter}
                  className="px-5 py-2 rounded-full text-xs font-sans font-medium text-rosewood-700 bg-blush-100 hover:bg-blush-200/80 transition-colors"
                >
                  Done Reading
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { siteContent } from '../../data/content';

export default function Scene3SomethingAboutYou({ onNext, onPrev }) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const cards = siteContent.scene3.cards;

  const handleNext = () => {
    if (currentIdx < cards.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      onNext();
    }
  };

  const handlePrevCard = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    } else {
      onPrev();
    }
  };

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrevCard();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIdx]);

  const activeCard = cards[currentIdx];

  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12">
      {/* Header section */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 max-w-lg"
      >
        <span className="text-xs uppercase tracking-[0.2em] font-sans font-medium text-rosewood-600">
          Reflections
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mt-2">
          {siteContent.scene3.heading}
        </h2>
      </motion.div>

      {/* Main Single Card Showcase - Generous Screen Space, Cinematic Pacing */}
      <div className="relative w-full max-w-xl min-h-[280px] sm:min-h-[300px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: -20 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="w-full card-paper rounded-2xl sm:rounded-3xl p-8 sm:p-14 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm text-center relative flex flex-col items-center justify-center"
          >
            {/* Card Index Pill */}
            <div className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-blush-100 text-rosewood-600 text-xs font-mono font-medium mb-6">
              <span>{activeCard.number}</span>
              <span className="opacity-40">/</span>
              <span>0{cards.length}</span>
            </div>

            {/* Message Body */}
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-rosewood-900 font-normal leading-relaxed max-w-md mx-auto">
              "{activeCard.text}"
            </p>

            {/* Subtle decorative bottom line */}
            <div className="w-12 h-[1px] bg-rosewood-300/60 mt-8" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls & Progress Dots */}
      <div className="w-full max-w-xl mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
        {/* Back Button */}
        <button
          onClick={handlePrevCard}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-sans font-medium text-rosewood-600 hover:text-rosewood-900 transition-colors py-2 px-3 rounded-lg hover:bg-blush-100/60"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{currentIdx === 0 ? "Previous Section" : "Back"}</span>
        </button>

        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIdx(i)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                i === currentIdx
                  ? 'w-7 bg-rosewood-600'
                  : 'w-2 bg-blush-300 hover:bg-blush-400'
              }`}
              title={`Jump to message ${i + 1}`}
              aria-label={`Jump to message ${i + 1}`}
            />
          ))}
        </div>

        {/* Next / Proceed Button */}
        <button
          onClick={handleNext}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 text-xs uppercase tracking-wider font-sans font-medium shadow-sm transition-all transform active:scale-95"
        >
          <span>{currentIdx === cards.length - 1 ? "Next Section" : "Next Thought"}</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

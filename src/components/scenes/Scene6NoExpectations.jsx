import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, Feather } from 'lucide-react';
import { siteContent } from '../../data/content';

export default function Scene6NoExpectations({ onNext, onPrev }) {
  return (
    <div className="relative min-h-[85vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl mx-auto card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm"
      >
        {/* Subtle decorative feather icon */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blush-100 text-rosewood-600 mb-4 border border-blush-200">
          <Feather className="w-4 h-4 stroke-[1.8]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mb-8">
          {siteContent.scene6.heading}
        </h2>

        {/* Reassuring Paragraphs */}
        <div className="space-y-4 text-rosewood-800/90 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto text-center sm:text-left">
          {siteContent.scene6.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 * idx + 0.2, duration: 0.6 }}
              className={
                idx === 4
                  ? "font-serif text-rosewood-900 font-medium text-base sm:text-lg italic text-center py-1"
                  : ""
              }
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Navigation */}
        <div className="mt-10 pt-6 border-t border-blush-200/60 flex items-center justify-between">
          <button
            onClick={onPrev}
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-rosewood-600 hover:text-rosewood-900 transition-colors py-2 px-3 rounded-lg hover:bg-blush-100/60"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          <button
            onClick={onNext}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 text-sm font-sans font-medium shadow-md transition-all transform active:scale-95"
          >
            <span>Can I ask something?</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

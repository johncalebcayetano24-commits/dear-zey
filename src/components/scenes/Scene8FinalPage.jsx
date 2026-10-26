import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Heart, Feather } from 'lucide-react';
import { siteContent } from '../../data/content';
import SecretTrigger from '../SecretTrigger';

export default function Scene8FinalPage({ onRestart, onTriggerSecret }) {
  const content = siteContent.scene8;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-xl mx-auto card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm"
      >
        {/* Subtle decorative wax seal accent */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full wax-seal flex items-center justify-center text-ivory-50 shadow-wax">
          <Feather className="w-4 h-4 stroke-[1.8]" />
        </div>

        {/* Small Heading */}
        <p className="text-xs uppercase tracking-[0.25em] text-rosewood-600 font-sans font-semibold mb-3 mt-3">
          {content.subheading}
        </p>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mb-8">
          Dear Zey
        </h2>

        {/* Main Content Paragraphs */}
        <div className="space-y-4 text-rosewood-800/90 font-serif text-base sm:text-lg leading-relaxed max-w-md mx-auto text-center sm:text-left">
          {content.paragraphs.map((p, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + idx * 0.15, duration: 0.6 }}
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Handwritten sign-off */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-10 pt-6 border-t border-blush-200/70 text-right sm:pr-4"
        >
          <p className="font-handwriting text-2xl sm:text-3xl text-rosewood-700">
            {content.closing}
          </p>
        </motion.div>

        {/* Footer Dedication with Secret Trigger */}
        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-rosewood-500 font-sans">
          <span>{content.footer}</span>
          <SecretTrigger onTrigger={onTriggerSecret} />
        </div>

        {/* Replay Button */}
        <div className="mt-8">
          <button
            onClick={onRestart}
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-white hover:bg-blush-50 text-rosewood-800 hover:text-rosewood-900 border border-rosewood-400/40 text-xs uppercase tracking-wider font-sans font-medium shadow-sm transition-all transform active:scale-95"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{content.buttonText}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

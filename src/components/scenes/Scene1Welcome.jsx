import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Sparkles, ArrowRight } from 'lucide-react';
import { siteContent } from '../../data/content';
import { useMusic } from '../../context/MusicContext';
import SecretTrigger from '../SecretTrigger';

export default function Scene1Welcome({ onNext, onTriggerSecret }) {
  const { startMusic } = useMusic();
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    // User interaction starts the music seamlessly
    startMusic();
    setTimeout(() => {
      onNext();
    }, 900);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.22,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      {/* Decorative Top Accent with Secret Star */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex items-center justify-center gap-2 mb-6"
      >
        <span className="w-8 h-[1px] bg-rosewood-300/60" />
        <SecretTrigger onTrigger={onTriggerSecret} />
        <span className="w-8 h-[1px] bg-rosewood-300/60" />
      </motion.div>

      {/* Main Letter Presentation Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{
          opacity: 1,
          scale: isOpening ? 1.03 : 1,
          y: 0,
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-xl mx-auto card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm"
      >
        {/* Subtle decorative wax seal visual in corner */}
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full wax-seal flex items-center justify-center text-ivory-50 shadow-wax">
          <Mail className="w-4 h-4 stroke-[1.8]" />
        </div>

        {/* Small subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-xs sm:text-sm uppercase tracking-[0.22em] text-rosewood-600/90 font-sans font-medium mb-3 mt-2"
        >
          {siteContent.scene1.subheading}
        </motion.p>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.8 }}
          className="font-serif text-4xl sm:text-5xl md:text-6xl text-rosewood-900 font-normal tracking-tight mb-8"
        >
          {siteContent.scene1.title}
        </motion.h1>

        {/* Animated letter lines */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-3.5 text-rosewood-800/90 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-10"
        >
          {siteContent.scene1.lines.map((line, idx) => (
            <motion.p
              key={idx}
              variants={lineVariants}
              className={
                idx === siteContent.scene1.lines.length - 1
                  ? "font-handwriting text-2xl sm:text-3xl text-rosewood-700 pt-2"
                  : ""
              }
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* Primary Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <button
            onClick={handleOpen}
            disabled={isOpening}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 font-sans text-sm sm:text-base font-medium shadow-md hover:shadow-lg transition-all duration-300 transform active:scale-95 disabled:opacity-80"
          >
            <span>{siteContent.scene1.buttonText}</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />

            {/* Glowing button rim */}
            <span className="absolute inset-0 rounded-full border border-white/25 pointer-events-none" />
          </button>
        </motion.div>

        {/* Soft bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.8, duration: 0.6 }}
          className="text-[11px] sm:text-xs text-rosewood-500 font-sans mt-6"
        >
          Best viewed with sound turned on.
        </motion.p>
      </motion.div>
    </div>
  );
}

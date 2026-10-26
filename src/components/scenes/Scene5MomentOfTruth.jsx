import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { siteContent } from '../../data/content';

export default function Scene5MomentOfTruth({ onNext, onPrev }) {
  // Reveal steps:
  // 0: prelude line 1
  // 1: prelude line 2
  // 2: prelude line 3
  // 3: prelude line 4
  // 4: brief pause / suspense glow
  // 5: Confession: "I like you, Zey."
  // 6: postlude lines
  // 7: fully revealed with continue button
  const [step, setStep] = useState(0);

  useEffect(() => {
    let timer;
    if (step < 4) {
      timer = setTimeout(() => {
        setStep((prev) => prev + 1);
      }, 1400);
    } else if (step === 4) {
      // Pause before big confession
      timer = setTimeout(() => {
        setStep(5);
      }, 1600);
    } else if (step === 5) {
      // After confession, wait before showing postlude
      timer = setTimeout(() => {
        setStep(6);
      }, 2000);
    } else if (step === 6) {
      timer = setTimeout(() => {
        setStep(7);
      }, 1500);
    }
    return () => clearTimeout(timer);
  }, [step]);

  const handleSkipAnimation = () => {
    setStep(7);
  };

  const prelude = siteContent.scene5.prelude;
  const confession = siteContent.scene5.confession;
  const postlude = siteContent.scene5.postlude;

  return (
    <div className="relative min-h-[95vh] flex flex-col items-center justify-center px-4 sm:px-6 py-16 text-center">
      {/* Intimate Backlight Glow Effect */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
        <motion.div
          initial={{ opacity: 0.2, scale: 0.8 }}
          animate={{
            opacity: step >= 5 ? 0.75 : 0.3,
            scale: step >= 5 ? 1.2 : 0.9,
          }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="w-[380px] sm:w-[580px] h-[380px] sm:h-[580px] rounded-full bg-gradient-to-tr from-blush-200/40 via-rosewood-400/20 to-lavenderdust-300/30 blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl mx-auto">
        {/* Prelude Sequential Lines */}
        <div className="space-y-4 mb-10 min-h-[140px] flex flex-col items-center justify-center">
          {prelude.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 12 }}
              animate={{
                opacity: step >= idx ? 1 : 0,
                y: step >= idx ? 0 : 12,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`font-serif text-lg sm:text-2xl text-rosewood-800/90 font-light ${
                step < idx ? 'hidden' : 'block'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* The Moment: Large Confession Reveal */}
        {step >= 5 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="my-10 py-6 px-4 relative"
          >
            {/* Subtle luminous halo under the confession */}
            <div className="absolute inset-0 bg-radial from-blush-200/30 to-transparent blur-xl pointer-events-none" />

            <h1 className="relative font-serif text-4xl sm:text-6xl md:text-7xl text-rosewood-900 font-normal tracking-tight leading-tight">
              {confession}
            </h1>

            {/* Elegant understated vector accent line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px" }}
              transition={{ delay: 0.4, duration: 1 }}
              className="h-[1.5px] bg-rosewood-400 mx-auto mt-6"
            />
          </motion.div>
        )}

        {/* Postlude Sincere Reflections */}
        {step >= 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="space-y-3.5 text-rosewood-800/90 font-sans text-sm sm:text-base leading-relaxed max-w-lg mx-auto mt-8"
          >
            {postlude.map((line, idx) => (
              <motion.p
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.18, duration: 0.7 }}
                className={
                  idx === postlude.length - 1
                    ? "font-handwriting text-2xl sm:text-3xl text-rosewood-700 pt-3"
                    : ""
                }
              >
                {line}
              </motion.p>
            ))}
          </motion.div>
        )}

        {/* Controls / Proceed button */}
        <div className="mt-14 flex items-center justify-center gap-4">
          {step < 7 ? (
            <button
              onClick={handleSkipAnimation}
              className="text-[11px] uppercase tracking-wider font-sans text-rosewood-400 hover:text-rosewood-700 transition-colors py-1.5 px-3 rounded hover:bg-blush-100/50"
            >
              Reveal All
            </button>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4"
            >
              <button
                onClick={onPrev}
                className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-rosewood-600 hover:text-rosewood-900 transition-colors py-2 px-3 rounded-lg hover:bg-blush-100/60"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                onClick={onNext}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 text-sm font-sans font-medium shadow-md hover:shadow-lg transition-all transform active:scale-95"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

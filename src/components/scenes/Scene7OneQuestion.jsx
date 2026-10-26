import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { siteContent } from '../../data/content';

export default function Scene7OneQuestion({ onNext, onPrev }) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelect = (option) => {
    setSelectedOption(option);

    if (option.celebrate) {
      // Trigger delicate rose-tinted confetti without any emojis
      const end = Date.now() + 1.8 * 1000;
      const colors = ['#E8B4B8', '#C28285', '#F7DFE1', '#DDD0E6', '#FDFCF9'];

      (function frame() {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: colors,
          shapes: ['circle'],
          ticks: 200,
          gravity: 0.8,
          scalar: 0.9,
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: colors,
          shapes: ['circle'],
          ticks: 200,
          gravity: 0.8,
          scalar: 0.9,
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    }
  };

  const prelude = siteContent.scene7.prelude;
  const question = siteContent.scene7.question;
  const options = siteContent.scene7.options;

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 py-12 text-center">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-xl mx-auto card-paper rounded-2xl sm:rounded-3xl p-7 sm:p-12 shadow-paper-lg border border-blush-300/50 backdrop-blur-sm"
      >
        {/* Subtle decorative heart outline */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-blush-100 text-rosewood-600 mb-4 border border-blush-200">
          <Heart className="w-4 h-4 stroke-[1.8]" />
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-rosewood-900 font-normal tracking-tight mb-6">
          {siteContent.scene7.heading}
        </h2>

        {/* Prelude lines */}
        <div className="space-y-2 text-rosewood-800/90 font-sans text-sm sm:text-base leading-relaxed max-w-md mx-auto mb-8">
          {prelude.map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>

        {/* The Question in Elegant Emphasis */}
        <div className="bg-blush-50/70 border border-blush-200/80 rounded-2xl p-5 sm:p-6 mb-8 max-w-md mx-auto">
          <p className="font-serif text-xl sm:text-2xl text-rosewood-900 font-normal leading-snug">
            "{question}"
          </p>
        </div>

        {/* Three Fair & Functional Choice Buttons */}
        {!selectedOption ? (
          <div className="flex flex-col gap-3 max-w-md mx-auto">
            {options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleSelect(opt)}
                className="w-full py-3.5 px-6 rounded-xl border border-blush-300/80 bg-white hover:bg-blush-50 text-rosewood-900 font-sans text-sm sm:text-base font-medium shadow-sm hover:shadow transition-all duration-200 flex items-center justify-center transform active:scale-[0.98]"
              >
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-4 pt-6 border-t border-blush-200/80"
            >
              <div className="bg-white/80 rounded-2xl p-6 border border-blush-200 text-center mb-8 max-w-md mx-auto shadow-sm">
                <div className="space-y-3 font-serif text-lg sm:text-xl text-rosewood-900 leading-relaxed">
                  {selectedOption.responses.map((resp, i) => (
                    <p
                      key={i}
                      className={
                        i === selectedOption.responses.length - 1
                          ? "font-handwriting text-2xl sm:text-3xl text-rosewood-700 pt-2"
                          : ""
                      }
                    >
                      {resp}
                    </p>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => setSelectedOption(null)}
                  className="text-xs uppercase tracking-wider font-sans text-rosewood-500 hover:text-rosewood-800 transition-colors py-2 px-3"
                >
                  Choose differently
                </button>

                <button
                  onClick={onNext}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 text-sm font-sans font-medium shadow-md transition-all transform active:scale-95"
                >
                  <span>One Last Page</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        {/* Back navigation when not chosen yet */}
        {!selectedOption && (
          <div className="mt-8 pt-4 border-t border-blush-200/60 flex items-center justify-start">
            <button
              onClick={onPrev}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider font-sans font-medium text-rosewood-600 hover:text-rosewood-900 transition-colors py-2 px-3 rounded-lg hover:bg-blush-100/60"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back</span>
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}

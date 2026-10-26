import React from 'react';
import { motion } from 'framer-motion';

export default function SecretTrigger({ onTrigger }) {
  return (
    <motion.button
      whileHover={{ scale: 1.25, rotate: 45 }}
      whileTap={{ scale: 0.9 }}
      onClick={onTrigger}
      title="A small secret detail..."
      aria-label="Secret interaction"
      className="inline-flex items-center justify-center p-2 text-rosewood-400 hover:text-rosewood-700 transition-colors opacity-60 hover:opacity-100 cursor-pointer focus:outline-none"
    >
      {/* Delicate geometric 8-point starlight SVG */}
      <svg
        viewBox="0 0 24 24"
        className="w-4 h-4 fill-current drop-shadow-sm"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12 1L13.8 8.2L21 10L13.8 11.8L12 19L10.2 11.8L3 10L10.2 8.2L12 1Z" />
        <path d="M12 6L13 11L18 12L13 13L12 18L11 13L6 12L11 11L12 6Z" opacity="0.6" />
      </svg>
    </motion.button>
  );
}

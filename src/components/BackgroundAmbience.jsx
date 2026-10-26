import React, { useMemo } from 'react';

export default function BackgroundAmbience({ intimate = false }) {
  // Generate random stable sparkle positions
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: `${(i * 19 + 7) % 94}%`,
      top: `${(i * 23 + 11) % 92}%`,
      size: (i % 3) + 2,
      duration: 4 + (i % 5) * 1.5,
      delay: (i % 4) * 0.8,
      opacity: 0.25 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* Dynamic ambient radial lighting */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          intimate ? 'intimate-glow opacity-90' : 'ambient-glow opacity-80'
        }`}
      />

      {/* Secondary soft warm glow blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] rounded-full bg-blush-200/30 blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[50vw] h-[50vw] max-w-[550px] max-h-[550px] rounded-full bg-lavenderdust-200/25 blur-3xl animate-[pulseGlow_6s_ease-in-out_infinite_1s]" />

      {/* Subtle fine paper texture */}
      <div className="absolute inset-0 paper-texture opacity-30 mix-blend-multiply" />

      {/* Delicate floating SVG starlight sparkles (strictly geometric/vector, NO emojis) */}
      {sparkles.map((sparkle) => (
        <svg
          key={sparkle.id}
          viewBox="0 0 24 24"
          className="absolute text-rosewood-400"
          style={{
            left: sparkle.left,
            top: sparkle.top,
            width: `${sparkle.size * 4}px`,
            height: `${sparkle.size * 4}px`,
            opacity: sparkle.opacity,
            animation: `float ${sparkle.duration}s ease-in-out infinite ${sparkle.delay}s, pulseGlow ${sparkle.duration * 0.8}s ease-in-out infinite ${sparkle.delay}s`,
          }}
          fill="currentColor"
        >
          {/* Elegant four-pointed star vector */}
          <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
        </svg>
      ))}
    </div>
  );
}

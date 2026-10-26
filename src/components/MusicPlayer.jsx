import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Music, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';
import { useMusic } from '../context/MusicContext';
import { siteContent } from '../data/content';

export default function MusicPlayer() {
  const {
    isPlaying,
    isMuted,
    hasError,
    isCardExpanded,
    setIsCardExpanded,
    togglePlay,
    toggleMute,
    containerId,
  } = useMusic();

  return (
    <div className="fixed bottom-4 right-4 z-40 max-w-[calc(100vw-2rem)] select-none">
      {/* Persistent YouTube Player Container - always rendered to keep IFrame instance intact */}
      <div
        className={`overflow-hidden transition-all duration-300 rounded-xl border border-blush-300/40 shadow-paper-lg bg-ivory-50/95 backdrop-blur-md ${
          isCardExpanded ? 'w-72 sm:w-80' : 'w-auto'
        }`}
      >
        {/* Header / Collapse Toggle Bar */}
        <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-blush-200/60 bg-white/70">
          <div className="flex items-center gap-2 text-rosewood-800">
            <span className="p-1 rounded-full bg-blush-100 text-rosewood-600">
              <Music className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold tracking-wide font-sans text-rosewood-900">
                Romantic Soundtrack
              </span>
              {/* Animated Equalizer Bars */}
              {isPlaying && (
                <div className="flex items-end gap-0.5 h-3 ml-1" aria-hidden="true">
                  <span className="w-0.5 bg-rosewood-500 rounded-full animate-[pulseGlow_0.8s_ease-in-out_infinite] h-2"></span>
                  <span className="w-0.5 bg-rosewood-600 rounded-full animate-[pulseGlow_1.1s_ease-in-out_infinite_0.2s] h-3"></span>
                  <span className="w-0.5 bg-rosewood-500 rounded-full animate-[pulseGlow_0.9s_ease-in-out_infinite_0.4s] h-1.5"></span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsCardExpanded(!isCardExpanded)}
              className="p-1 text-rosewood-600 hover:text-rosewood-900 hover:bg-blush-100 rounded-md transition-colors"
              title={isCardExpanded ? "Minimize music card" : "Expand music card"}
              aria-label={isCardExpanded ? "Minimize music card" : "Expand music card"}
            >
              {isCardExpanded ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className={isCardExpanded ? 'p-3.5' : 'p-2 flex items-center gap-2'}>
          {/* YouTube IFrame Wrapper: strictly compliant, visible, styled tastefully */}
          <div
            className={`transition-all duration-300 rounded-lg overflow-hidden bg-rosewood-950/5 border border-blush-200/50 ${
              isCardExpanded
                ? 'w-full h-36 relative mb-3 flex items-center justify-center'
                : 'w-0 h-0 opacity-0 pointer-events-none absolute'
            }`}
          >
            <div id={containerId} className="w-full h-full" />
          </div>

          {/* Titles & Description */}
          {isCardExpanded ? (
            <div className="space-y-1 mb-3">
              <p className="text-xs font-medium text-rosewood-900 font-serif tracking-wide text-base leading-snug">
                {siteContent.music.title}
              </p>
              <p className="text-[11px] text-rosewood-600 font-sans italic leading-relaxed">
                {siteContent.music.subtext}
              </p>
            </div>
          ) : null}

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              {/* Play / Pause Button */}
              <button
                onClick={togglePlay}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-rosewood-600 hover:bg-rosewood-700 text-ivory-50 shadow-sm transition-all transform active:scale-95"
                title={isPlaying ? "Pause music" : "Play music"}
                aria-label={isPlaying ? "Pause music" : "Play music"}
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5" />
                ) : (
                  <Play className="w-3.5 h-3.5 ml-0.5" />
                )}
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all ${
                  isMuted
                    ? 'border-rosewood-400 bg-blush-100 text-rosewood-700'
                    : 'border-blush-300 hover:bg-blush-50 text-rosewood-700'
                }`}
                title={isMuted ? "Unmute music" : "Mute music"}
                aria-label={isMuted ? "Unmute music" : "Mute music"}
              >
                {isMuted ? (
                  <VolumeX className="w-3.5 h-3.5" />
                ) : (
                  <Volume2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* External link fallback */}
            <a
              href={siteContent.music.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] font-sans text-rosewood-600 hover:text-rosewood-900 transition-colors py-1 px-2 rounded hover:bg-blush-100/60"
              title="Open video on YouTube"
            >
              <span>Listen on YouTube</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Graceful notification if embed is blocked or having issues */}
          {hasError && isCardExpanded && (
            <div className="mt-2 text-[10px] text-rosewood-600/80 bg-blush-50 p-1.5 rounded border border-blush-200">
              Playback blocked by browser? You can use the "Listen on YouTube" button above.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

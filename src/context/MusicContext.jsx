import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { siteContent } from '../data/content';

const MusicContext = createContext(null);

export function MusicProvider({ children }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(true);
  const [volume, setVolumeState] = useState(70);

  const playerRef = useRef(null);
  const containerId = 'youtube-music-player-container';

  useEffect(() => {
    // Check if YouTube API script is already inserted
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    const initPlayer = () => {
      if (!window.YT || !window.YT.Player) return;

      try {
        playerRef.current = new window.YT.Player(containerId, {
          height: '140',
          width: '240',
          videoId: siteContent.music.videoId,
          playerVars: {
            autoplay: 0,
            controls: 1,
            modestbranding: 1,
            rel: 0,
            loop: 1,
            playlist: siteContent.music.videoId,
            playsinline: 1,
            origin: window.location.origin,
          },
          events: {
            onReady: (event) => {
              setIsReady(true);
              try {
                event.target.setVolume(70);
              } catch {
                // ignore
              }
            },
            onStateChange: (event) => {
              // 1: PLAYING, 2: PAUSED, 0: ENDED, 3: BUFFERING
              if (event.data === window.YT.PlayerState.PLAYING) {
                setIsPlaying(true);
                setHasStarted(true);
              } else if (
                event.data === window.YT.PlayerState.PAUSED ||
                event.data === window.YT.PlayerState.ENDED
              ) {
                setIsPlaying(false);
              }
            },
            onError: (err) => {
              console.warn('YouTube Player notice:', err);
              setHasError(true);
            },
          },
        });
      } catch (err) {
        console.warn('Could not initialize YouTube player:', err);
        setHasError(true);
      }
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      // Keep player intact during lifetime of app
    };
  }, []);

  const startMusic = () => {
    if (playerRef.current && typeof playerRef.current.playVideo === 'function') {
      try {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume);
        playerRef.current.playVideo();
        setIsPlaying(true);
        setIsMuted(false);
        setHasStarted(true);
      } catch (err) {
        console.warn('Failed to start music:', err);
        setHasError(true);
      }
    }
  };

  const togglePlay = () => {
    if (!playerRef.current || typeof playerRef.current.getPlayerState !== 'function') {
      return;
    }
    try {
      const state = playerRef.current.getPlayerState();
      if (state === window.YT?.PlayerState?.PLAYING) {
        playerRef.current.pauseVideo();
        setIsPlaying(false);
      } else {
        playerRef.current.playVideo();
        setIsPlaying(true);
        setHasStarted(true);
      }
    } catch {
      // ignore
    }
  };

  const toggleMute = () => {
    if (!playerRef.current || typeof playerRef.current.isMuted !== 'function') {
      return;
    }
    try {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    } catch {
      // ignore
    }
  };

  const setVolume = (val) => {
    setVolumeState(val);
    if (playerRef.current && typeof playerRef.current.setVolume === 'function') {
      try {
        playerRef.current.setVolume(val);
        if (val === 0) {
          setIsMuted(true);
        } else if (isMuted) {
          playerRef.current.unMute();
          setIsMuted(false);
        }
      } catch {
        // ignore
      }
    }
  };

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isMuted,
        isReady,
        hasError,
        hasStarted,
        isCardExpanded,
        setIsCardExpanded,
        volume,
        startMusic,
        togglePlay,
        toggleMute,
        setVolume,
        containerId,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}

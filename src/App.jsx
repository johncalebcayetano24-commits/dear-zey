import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { MusicProvider } from './context/MusicContext';
import BackgroundAmbience from './components/BackgroundAmbience';
import MusicPlayer from './components/MusicPlayer';
import SecretModal from './components/SecretModal';
import SecretTrigger from './components/SecretTrigger';

// Scenes
import Scene1Welcome from './components/scenes/Scene1Welcome';
import Scene2BeforeStart from './components/scenes/Scene2BeforeStart';
import Scene3SomethingAboutYou from './components/scenes/Scene3SomethingAboutYou';
import Scene4ThreeLetters from './components/scenes/Scene4ThreeLetters';
import Scene5MomentOfTruth from './components/scenes/Scene5MomentOfTruth';
import Scene6NoExpectations from './components/scenes/Scene6NoExpectations';
import Scene7OneQuestion from './components/scenes/Scene7OneQuestion';
import Scene8FinalPage from './components/scenes/Scene8FinalPage';

export default function App() {
  const [currentScene, setCurrentScene] = useState(1);
  const [isSecretOpen, setIsSecretOpen] = useState(false);

  const goToNextScene = () => {
    setCurrentScene((prev) => Math.min(prev + 1, 8));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevScene = () => {
    setCurrentScene((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestart = () => {
    setCurrentScene(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sceneVariants = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -15, transition: { duration: 0.4 } },
  };

  return (
    <MusicProvider>
      <div className="relative min-h-screen flex flex-col justify-between selection:bg-blush-200 selection:text-rosewood-900">
        {/* Dynamic ambient lighting & fine paper grain */}
        <BackgroundAmbience intimate={currentScene === 5} />

        {/* Minimalist Top Navigation Header (shows on scene 2+) */}
        {currentScene > 1 && (
          <header className="sticky top-0 z-30 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-blush-200/40 bg-ivory-100/80 backdrop-blur-md transition-all">
            <button
              onClick={() => setCurrentScene(1)}
              className="font-serif text-xl sm:text-2xl text-rosewood-900 font-normal hover:text-rosewood-700 transition-colors"
            >
              Dear Zey
            </button>

            {/* Subtle Chapter Progress Dots */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
                <button
                  key={s}
                  onClick={() => setCurrentScene(s)}
                  className={`h-1.5 transition-all duration-300 rounded-full ${
                    s === currentScene
                      ? 'w-6 bg-rosewood-600'
                      : s < currentScene
                      ? 'w-2 bg-rosewood-300 hover:bg-rosewood-400'
                      : 'w-2 bg-blush-200'
                  }`}
                  title={`Go to Scene ${s}`}
                  aria-label={`Go to Scene ${s}`}
                />
              ))}
            </div>

            {/* Secret star trigger in header */}
            <SecretTrigger onTrigger={() => setIsSecretOpen(true)} />
          </header>
        )}

        {/* Main Interactive Stage */}
        <main className="relative z-10 flex-1 flex flex-col justify-center max-w-5xl mx-auto w-full px-4 sm:px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              variants={sceneVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="w-full"
            >
              {currentScene === 1 && (
                <Scene1Welcome
                  onNext={goToNextScene}
                  onTriggerSecret={() => setIsSecretOpen(true)}
                />
              )}
              {currentScene === 2 && (
                <Scene2BeforeStart onNext={goToNextScene} />
              )}
              {currentScene === 3 && (
                <Scene3SomethingAboutYou
                  onNext={goToNextScene}
                  onPrev={goToPrevScene}
                />
              )}
              {currentScene === 4 && (
                <Scene4ThreeLetters
                  onNext={goToNextScene}
                  onPrev={goToPrevScene}
                />
              )}
              {currentScene === 5 && (
                <Scene5MomentOfTruth
                  onNext={goToNextScene}
                  onPrev={goToPrevScene}
                />
              )}
              {currentScene === 6 && (
                <Scene6NoExpectations
                  onNext={goToNextScene}
                  onPrev={goToPrevScene}
                />
              )}
              {currentScene === 7 && (
                <Scene7OneQuestion
                  onNext={goToNextScene}
                  onPrev={goToPrevScene}
                />
              )}
              {currentScene === 8 && (
                <Scene8FinalPage
                  onRestart={handleRestart}
                  onTriggerSecret={() => setIsSecretOpen(true)}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Dedicated YouTube Player Card Widget */}
        <MusicPlayer />

        {/* Secret Easter Egg Modal */}
        <SecretModal
          isOpen={isSecretOpen}
          onClose={() => setIsSecretOpen(false)}
        />
      </div>
    </MusicProvider>
  );
}

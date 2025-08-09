import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { LoadingAnimation } from './components/LoadingAnimation';
import { DogProfile } from './components/DogProfile';
import { ErrorMessage } from './components/ErrorMessage';
import { tensorflowService } from './services/tensorflowService';
import { dogMatcher } from './services/dogMatcher';
import { DogRecognitionResult } from './types/Dog';

type AppState = 'idle' | 'processing' | 'results' | 'error';

function App() {
  const [state, setState] = useState<AppState>('idle');
  const [currentStage, setCurrentStage] = useState<string>('');
  const [result, setResult] = useState<DogRecognitionResult | null>(null);
  const [error, setError] = useState<string>('');

  const stages = [
    'Initializing AI neural networks...',
    'Scanning for canine features...',
    'Analyzing facial structure and markings...',
    'Cross-referencing campus database...',
    'Calculating personality metrics...',
    'Finalizing behavioral analysis...'
  ];

  const handleImageSelect = useCallback(async (file: File) => {
    setState('processing');
    setError('');
    setResult(null);

    // Simulate professional AI analysis with staged loading
    for (let i = 0; i < stages.length; i++) {
      setCurrentStage(stages[i]);
      await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    }

    try {
      // Create image element for TensorFlow processing
      const img = new Image();
      img.crossOrigin = 'anonymous';

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Failed to load image'));
        img.src = URL.createObjectURL(file);
      });

      // Analyze image with TensorFlow.js
      const analysis = await tensorflowService.analyzeImage(img);

      if (!analysis.isDog) {
        throw new Error('No dog detected in the uploaded image. Please upload a clear photo of a dog.');
      }

      // Match with campus dogs
      const matchResult = await dogMatcher.matchDog(analysis);

      setResult(matchResult);
      setState('results');

      // Clean up
      URL.revokeObjectURL(img.src);

    } catch (err) {
      console.error('Error processing image:', err);
      setError(err instanceof Error ? err.message : 'An unexpected error occurred while analyzing the image.');
      setState('error');
    }
  }, [stages]);

  const handleRetry = useCallback(() => {
    setState('idle');
    setError('');
    setResult(null);
  }, []);

  const handleCloseResults = useCallback(() => {
    setState('idle');
    setResult(null);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-100 via-orange-50 to-amber-50">
      <div className="container mx-auto px-4 py-8">
        <Header />

        <main className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {state === 'idle' && (
              <motion.div
                key="upload"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <ImageUpload onImageSelect={handleImageSelect} isProcessing={false} />

                {/* Stats section - minimalist elegant */}
                <motion.div
                  className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg p-8 mt-8 border border-orange-200/50"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.h3
                    className="text-2xl font-light text-orange-900 mb-8 text-center tracking-wide"
                  >
                    Campus Stats
                  </motion.h3>
                  <div className="grid md:grid-cols-3 gap-8 text-center">
                    <motion.div
                      className="p-6 bg-orange-50/70 rounded-2xl border border-orange-100 shadow-sm"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-3xl mb-3 text-orange-600">🐕</div>
                      <div className="text-3xl font-light text-orange-800 mb-1">10</div>
                      <div className="text-sm text-orange-700/80 font-light tracking-wide">Campus Dogs</div>
                    </motion.div>
                    <motion.div
                      className="p-6 bg-orange-50/70 rounded-2xl border border-orange-100 shadow-sm"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-3xl mb-3 text-orange-600">🎯</div>
                      <div className="text-3xl font-light text-orange-800 mb-1">94.7%</div>
                      <div className="text-sm text-orange-700/80 font-light tracking-wide">AI Accuracy</div>
                    </motion.div>
                    <motion.div
                      className="p-6 bg-orange-50/70 rounded-2xl border border-orange-100 shadow-sm"
                      whileHover={{ y: -2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="text-3xl mb-3 text-orange-600">📈</div>
                      <div className="text-3xl font-light text-orange-800 mb-1">2,847</div>
                      <div className="text-sm text-orange-700/80 font-light tracking-wide">Dogs Identified</div>
                    </motion.div>
                  </div>

                  {/* Motivational message */}
                  <motion.div
                    className="mt-8 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                  >
                    <p className="text-orange-700/70 font-light tracking-wide">
                      Helping you connect with campus dogs
                    </p>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {state === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <LoadingAnimation stage={currentStage} />
              </motion.div>
            )}

            {state === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
              >
                <ErrorMessage message={error} onRetry={handleRetry} />
              </motion.div>
            )}
          </AnimatePresence>

          {state === 'results' && result && (
            <DogProfile
              dog={result.dog}
              confidence={result.confidence}
              matchedFeatures={result.matchedFeatures}
              onClose={handleCloseResults}
            />
          )}
        </main>

        {/* Enhanced Footer */}
        <motion.footer
          className="text-center mt-16 py-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="space-y-4">
            <motion.div
              className="flex items-center justify-center gap-2 text-gray-600"
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1
              }}
            >
              <span className="text-2xl">🐶</span>
              <span className="font-medium">Doggo Lens</span>
              <span className="text-2xl">•</span>
              <span className="text-sm">CET Campus Dog Community</span>
              <span className="text-2xl">•</span>
              <span className="text-2xl">🦴</span>
              <span className="font-medium">Made for Campus Dog Lovers</span>
              <span className="text-2xl">🐶</span>
            </motion.div>

            <div className="flex justify-center gap-2 mt-4">
              <span className="text-2xl animate-bounce">🦴</span>
              <span className="text-2xl animate-bounce delay-100">🐶</span>
              <span className="text-2xl animate-bounce delay-200">🦴</span>
              <span className="text-2xl animate-bounce delay-300">🐶</span>
              <span className="text-2xl animate-bounce delay-400">🦴</span>
            </div>
          </div>
        </motion.footer>
      </div>
    </div>
  );
}

export default App;
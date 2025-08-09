import React from 'react';
import { motion } from 'framer-motion';
import { PawLogo } from './PawLogo';

export const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-8"
    >
      <div className="flex items-center justify-center mb-8">
        <motion.div
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatDelay: 5
          }}
          className="p-3 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mr-4 shadow-md"
        >
          <PawLogo className="text-white" size="lg" />
        </motion.div>
        <div>
          <motion.h1
            className="text-5xl font-light bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent tracking-wide"
          >
            Doggo Lens
          </motion.h1>
          <div className="flex items-center justify-center mt-3">
            <PawLogo className="text-orange-500 mr-2" size="sm" />
            <span className="text-orange-700 font-light tracking-wider text-sm">AI Dog Recognition</span>
            <PawLogo className="text-orange-500 ml-2" size="sm" />
          </div>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-lg text-orange-800/80 max-w-2xl mx-auto leading-relaxed mb-6 font-light tracking-wide"
      >
        Upload a photo to identify campus dogs and learn about their personalities.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-sm rounded-full px-6 py-3 shadow-sm border border-orange-200/50"
      >
        <span className="text-orange-600">🤖</span>
        <span className="text-sm font-light text-orange-700 tracking-wide">
          Powered by TensorFlow.js
        </span>
        <span className="text-orange-600">•</span>
        <span className="text-sm font-light text-orange-700 tracking-wide">
          94.7% Accuracy
        </span>
      </motion.div>
    </motion.header>
  );
};
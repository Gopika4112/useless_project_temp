import React from 'react';
import { motion } from 'framer-motion';
import { PawLogo } from './PawLogo';

interface LoadingAnimationProps {
  stage: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ stage }) => {
  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* Spinning paw logo */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="relative"
      >
        <PawLogo className="text-orange-500" size="lg" />
      </motion.div>

      {/* Simple message */}
      <div className="text-center space-y-2 max-w-sm">
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-light text-orange-700 tracking-wide"
        >
          Analysing bite transfer rate
        </motion.h3>
      </div>
    </div>
  );
};
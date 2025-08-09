import React from 'react';
import { motion } from 'framer-motion';

interface LoadingAnimationProps {
  stage: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ stage }) => {
  const stages = [
    'Initializing AI neural networks...',
    'Scanning for canine features...',
    'Analyzing facial structure and markings...',
    'Cross-referencing campus database...',
    'Calculating personality metrics...',
    'Finalizing behavioral analysis...'
  ];

  const currentStageIndex = stages.indexOf(stage);

  return (
    <div className="flex flex-col items-center space-y-6 py-8">
      {/* Main loading spinner */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="absolute inset-2 w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full"
        />
      </div>

      {/* Paw prints animation */}
      <div className="flex space-x-2">
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2
            }}
            className="w-3 h-3 bg-orange-500 rounded-full"
          />
        ))}
      </div>

      {/* Stage text */}
      <div className="text-center space-y-2 max-w-sm">
        <motion.h3
          key={stage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-semibold text-gray-900"
        >
          AI Analysis in Progress
        </motion.h3>
        
        <motion.p
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-gray-600 text-sm"
        >
          {stage}
        </motion.p>

        {/* Progress bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <motion.div
            animate={{ width: `${((currentStageIndex + 1) / stages.length) * 100}%` }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-orange-500 to-blue-500 h-2 rounded-full"
          />
        </div>
      </div>

      {/* Scientific-looking data */}
      <div className="bg-gray-50 rounded-lg p-4 font-mono text-xs text-gray-600 max-w-sm">
        <div className="flex justify-between mb-1">
          <span>Neural activation:</span>
          <span className="text-green-600">98.7%</span>
        </div>
        <div className="flex justify-between mb-1">
          <span>Feature vectors:</span>
          <span className="text-blue-600">2,847</span>
        </div>
        <div className="flex justify-between">
          <span>Processing time:</span>
          <motion.span 
            key={Math.random()}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="text-orange-600"
          >
            {(Math.random() * 3 + 1).toFixed(2)}s
          </motion.span>
        </div>
      </div>
    </div>
  );
};
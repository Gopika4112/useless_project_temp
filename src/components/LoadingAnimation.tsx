import React from 'react';
import { motion } from 'framer-motion';
import { PawLogo } from './PawLogo';

interface LoadingAnimationProps {
  stage: string;
}

export const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ stage }) => {
  const funMessages = [
    "Sniffing out the perfect match...",
    "Calculating tail wag frequency...",
    "Analyzing treat preferences...",
    "Measuring belly rub tolerance...",
    "Scanning for good boy/girl energy...",
    "Detecting frisbee enthusiasm levels...",
    "Evaluating squirrel chase potential...",
    "Processing adorable factor...",
    "Checking campus social network...",
    "Analyzing bite transfer rate...",
    "Measuring friendship compatibility...",
    "Scanning for tennis ball obsession..."
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % funMessages.length);
    }, 2000); // Change message every 2 seconds

    return () => clearInterval(interval);
  }, [funMessages.length]);

  return (
    <div className="flex flex-col items-center space-y-8 py-12 max-w-md mx-auto">
      {/* Enhanced spinning paw logo with glow effect */}
      <motion.div
        className="relative flex items-center justify-center"
      >
        {/* Glowing background */}
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="absolute w-24 h-24 bg-orange-400 rounded-full blur-xl"
        />
        
        {/* Spinning paw logo */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative z-10"
        >
          <PawLogo className="text-orange-500 drop-shadow-lg" size="lg" />
        </motion.div>
      </motion.div>

      {/* Animated rotating messages */}
      <div className="text-center space-y-4 min-h-[80px] flex flex-col justify-center">
        <motion.h3
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.9 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-xl font-medium text-orange-700 tracking-wide px-4"
        >
          {funMessages[currentMessageIndex]}
        </motion.h3>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-2 mt-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
              className="w-2 h-2 bg-orange-400 rounded-full"
            />
          ))}
        </div>
      </div>

      {/* Fun fact section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="bg-orange-50 rounded-xl p-6 border border-orange-200/50 shadow-sm"
      >
        <div className="text-center">
          <motion.p
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="text-sm text-orange-600 font-medium mb-2"
          >
            🐕 Did you know?
          </motion.p>
          <p className="text-xs text-orange-700 leading-relaxed">
            Our AI analyzes over 50 different canine characteristics to find the perfect match. 
            This includes everything from ear shape to tail wagging patterns!
          </p>
        </div>
      </motion.div>

      {/* Subtle loading bar */}
      <div className="w-full max-w-xs">
        <div className="h-1 bg-orange-100 rounded-full overflow-hidden">
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "reverse"
            }}
            className="h-full w-1/3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
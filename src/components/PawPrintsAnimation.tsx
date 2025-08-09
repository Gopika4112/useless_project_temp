import React from 'react';
import { motion } from 'framer-motion';

interface PawPrint {
  id: number;
  x: number;
  y: number;
  rotation: number;
  delay: number;
}

const PawPrintsAnimation: React.FC = () => {
  // Generate paw prints in a walking pattern
  const generatePawPrints = (): PawPrint[] => {
    const prints: PawPrint[] = [];
    const pathPoints = [
      { x: 5, y: 85 },
      { x: 15, y: 80 },
      { x: 25, y: 75 },
      { x: 35, y: 70 },
      { x: 45, y: 65 },
      { x: 55, y: 60 },
      { x: 65, y: 65 },
      { x: 75, y: 70 },
      { x: 85, y: 75 },
      { x: 95, y: 80 },
    ];

    pathPoints.forEach((point, index) => {
      // Create alternating paw prints for a natural walking pattern
      const isLeftSide = index % 2 === 0;
      const pawOffset = isLeftSide ? -1.5 : 1.5;
      
      // Front paw
      prints.push({
        id: index * 2,
        x: point.x,
        y: point.y + pawOffset,
        rotation: isLeftSide ? -8 : 8,
        delay: index * 0.6,
      });
      
      // Back paw (slightly behind and offset)
      prints.push({
        id: index * 2 + 1,
        x: point.x - 2,
        y: point.y + pawOffset + (isLeftSide ? 2 : -2),
        rotation: isLeftSide ? -5 : 5,
        delay: index * 0.6 + 0.15,
      });
    });

    return prints;
  };

  const pawPrints = generatePawPrints();

  const pawPrintVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: 0 
    },
    visible: (custom: { rotation: number; delay: number }) => ({
      opacity: [0, 0.6, 0.3, 0.1],
      scale: [0, 1.2, 1, 1],
      rotate: custom.rotation,
      transition: {
        duration: 2,
        delay: custom.delay,
        times: [0, 0.2, 0.6, 1],
        ease: "easeOut" as const
      }
    })
  };

  const PawIcon: React.FC<{ className?: string }> = ({ className = "" }) => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      {/* Main pad */}
      <ellipse cx="12" cy="16" rx="4" ry="3" />
      {/* Toe pads */}
      <circle cx="8" cy="10" r="1.5" />
      <circle cx="10.5" cy="8" r="1.5" />
      <circle cx="13.5" cy="8" r="1.5" />
      <circle cx="16" cy="10" r="1.5" />
    </svg>
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {pawPrints.map((print) => (
          <motion.div
            key={print.id}
            className="absolute w-6 h-6 text-orange-300"
            style={{
              left: `${print.x}%`,
              top: `${print.y}%`,
            }}
            variants={pawPrintVariants}
            initial="hidden"
            animate="visible"
            custom={{ rotation: print.rotation, delay: print.delay }}
          >
            <PawIcon className="w-full h-full" />
          </motion.div>
        ))}
      </div>
      
      {/* Repeat animation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          delay: pawPrints.length * 0.6 + 3,
          repeat: Infinity,
          repeatDelay: 5,
          duration: 0
        }}
      >
        {pawPrints.map((print) => (
          <motion.div
            key={`repeat-${print.id}`}
            className="absolute w-6 h-6 text-orange-300"
            style={{
              left: `${print.x}%`,
              top: `${print.y}%`,
            }}
            variants={pawPrintVariants}
            initial="hidden"
            animate="visible"
            custom={{ rotation: print.rotation, delay: print.delay }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default PawPrintsAnimation;

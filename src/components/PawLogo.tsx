import React from 'react';
import { motion } from 'framer-motion';

interface PawLogoProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const PawLogo: React.FC<PawLogoProps> = ({ className = "", size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-6 h-6',
        md: 'w-10 h-10',
        lg: 'w-16 h-16'
    };

    return (
        <motion.div
            animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.1, 1]
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
            }}
            className={`${sizeClasses[size]} ${className}`}
        >
            <svg
                viewBox="0 0 100 100"
                fill="currentColor"
                className="w-full h-full"
            >
                {/* Main paw pad - heart-shaped design */}
                <ellipse cx="50" cy="70" rx="18" ry="14" className="fill-current" />

                {/* Toe pads - made slightly larger and rounder */}
                <circle cx="30" cy="45" r="8" className="fill-current" />
                <circle cx="42" cy="35" r="9" className="fill-current" />
                <circle cx="58" cy="35" r="9" className="fill-current" />
                <circle cx="70" cy="45" r="8" className="fill-current" />

                {/* Optional sparkle effect */}
                <motion.g
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatDelay: 4
                    }}
                >
                    <circle cx="25" cy="30" r="1.5" className="fill-yellow-300" />
                    <circle cx="75" cy="30" r="1.5" className="fill-yellow-300" />
                    <circle cx="50" cy="20" r="1" className="fill-yellow-300" />
                </motion.g>
            </svg>
        </motion.div>
    );
};

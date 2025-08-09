import React from 'react';
import { motion } from 'framer-motion';
import { PawLogo } from './PawLogo';

export const Header: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Elegant background with subtle patterns */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">
        <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-white/40" />

        {/* Floating geometric shapes */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 40, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-orange-200/20 to-amber-300/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            rotate: -360,
            y: [0, -20, 0],
          }}
          transition={{
            rotate: { duration: 35, repeat: Infinity, ease: "linear" },
            y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute bottom-32 right-24 w-40 h-40 bg-gradient-to-tl from-rose-200/20 to-orange-200/30 rounded-full blur-sm"
        />
        <motion.div
          animate={{
            rotate: 180,
            x: [0, 15, 0],
          }}
          transition={{
            rotate: { duration: 30, repeat: Infinity, ease: "linear" },
            x: { duration: 7, repeat: Infinity, ease: "easeInOut" }
          }}
          className="absolute top-1/2 right-12 w-24 h-24 bg-gradient-to-bl from-amber-200/25 to-orange-300/25 rounded-full blur-sm"
        />
      </div>

      <motion.header
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Logo and title section */}
        <motion.div
          className="flex flex-col items-center mb-16"
        >
          {/* Enhanced logo with elegant backdrop */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full blur-lg opacity-30 scale-110" />
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                repeatDelay: 4,
                ease: "easeInOut"
              }}
              className="relative p-6 bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 rounded-full shadow-2xl border-4 border-white/50 backdrop-blur-sm"
            >
              <PawLogo className="text-white drop-shadow-lg" size="lg" />
            </motion.div>
          </motion.div>

          {/* Main title with enhanced typography */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative"
          >
            <motion.h1
              className="text-7xl md:text-8xl font-extralight bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 bg-clip-text text-transparent tracking-tight mb-4 leading-none"
              style={{ fontFamily: "'Inter', 'SF Pro Display', system-ui, sans-serif" }}
            >
              DOGGO LENS
            </motion.h1>

            {/* Subtle underline accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8, duration: 1, ease: "easeOut" }}
              className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400 to-transparent rounded-full mb-8"
            />
          </motion.div>

          {/* Elegant subtitle section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex items-center justify-center space-x-4 mb-12"
          >
            <motion.div
              animate={{ rotate: [0, 10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <PawLogo className="text-orange-400/60" size="sm" />
            </motion.div>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
            <span className="text-orange-600/80 font-light tracking-[0.3em] text-sm uppercase">
              AI Recognition
            </span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-300 to-transparent" />
            <motion.div
              animate={{ rotate: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            >
              <PawLogo className="text-orange-400/60" size="sm" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Enhanced description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-xl md:text-2xl text-orange-800/70 max-w-3xl mx-auto leading-relaxed mb-12 font-light tracking-wide"
        >
          Discover and connect with the beloved canine companions of our campus community through
          <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-medium"> advanced AI recognition</span>
        </motion.p>

        {/* Enhanced stats/info card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-300" />

          <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl px-8 py-6 shadow-xl border border-white/60 hover:shadow-2xl transition-all duration-300">
            <div className="flex items-center justify-center space-x-8">
              {/* CET Campus section */}
              <div className="flex items-center space-x-3">
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-2xl"
                >
                  🏫
                </motion.span>
                <div className="text-left">
                  <div className="text-sm font-medium text-orange-700 tracking-wide">CET Campus</div>
                  <div className="text-xs text-orange-600/70 tracking-wider">Community Dogs</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent" />

              {/* Accuracy section */}
              <div className="flex items-center space-x-3">
                <motion.span
                  animate={{ rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="text-2xl"
                >
                  🎯
                </motion.span>
                <div className="text-left">
                  <div className="text-sm font-medium text-orange-700 tracking-wide">94.7% Accurate</div>
                  <div className="text-xs text-orange-600/70 tracking-wider">AI Recognition</div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-8 w-px bg-gradient-to-b from-transparent via-orange-300 to-transparent" />

              {/* Dogs count section */}
              <div className="flex items-center space-x-3">
                <motion.span
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="text-2xl"
                >
                  🐕
                </motion.span>
                <div className="text-left">
                  <div className="text-sm font-medium text-orange-700 tracking-wide">50+ Dogs</div>
                  <div className="text-xs text-orange-600/70 tracking-wider">In Database</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to action hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="mt-16 text-orange-600/60 text-sm font-light tracking-wide"
        >
          <motion.span
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓ Upload a photo to begin ↓
          </motion.span>
        </motion.div>
      </motion.header>
    </div>
  );
};
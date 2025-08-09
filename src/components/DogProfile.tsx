import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Heart, AlertTriangle, Coffee, MessageCircle, User } from 'lucide-react';
import { Dog } from '../types/Dog';
import { PawLogo } from './PawLogo';

interface DogProfileProps {
  dog: Dog;
  confidence: number;
  matchedFeatures: string[];
  onClose: () => void;
}

export const DogProfile: React.FC<DogProfileProps> = ({ dog, confidence, matchedFeatures, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-gradient-to-br from-black/60 via-black/50 to-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 40 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden border border-white/20"
      >
        {/* Header with Name and Photo */}
        <div className="relative bg-gradient-to-br from-orange-400 via-amber-400 to-orange-500 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full blur-2xl" />
            <div className="absolute bottom-10 right-10 w-24 h-24 bg-white rounded-full blur-xl" />
          </div>

          <div className="relative p-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-white/30 rounded-full blur-md scale-110" />
                  <img
                    src={dog.profilePhoto}
                    alt={dog.name}
                    className="relative w-24 h-24 rounded-full border-4 border-white shadow-xl object-cover"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <h2 className="text-4xl font-bold mb-2">{dog.name}</h2>
                  <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 inline-block">
                    <span className="font-medium">{confidence}% Match</span>
                  </div>
                </motion.div>
              </div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                onClick={onClose}
                className="text-white/80 hover:text-white hover:bg-white/20 rounded-full p-3 transition-all duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6 max-h-[60vh] overflow-y-auto">

          {/* Hangout Place */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 shadow-sm border border-orange-200/50"
          >
            <div className="flex items-center mb-3">
              <div className="p-2 bg-orange-200 rounded-lg mr-3">
                <MapPin className="w-5 h-5 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-orange-900">Hangout Place</h3>
            </div>
            <p className="text-lg text-orange-800 bg-white/50 rounded-lg p-4 font-medium">
              {dog.favoriteLocations[0] || 'Campus grounds'}
            </p>
          </motion.div>

          {/* Personality Meters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-sm border border-gray-200/50"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
              <div className="p-2 bg-gray-200 rounded-lg mr-3">
                <User className="w-5 h-5 text-gray-600" />
              </div>
              Personality
            </h3>

            <div className="space-y-6">
              {/* Friendliness */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-gray-700">Friendliness</span>
                  <span className="text-3xl font-bold text-green-600">{dog.friendliness}/10</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(dog.friendliness / 10) * 100}%` }}
                    transition={{ delay: 0.8, duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full shadow-sm"
                  />
                </div>
              </div>

              {/* Aggression */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="text-lg font-medium text-gray-700">Aggression</span>
                  <span className="text-3xl font-bold text-red-600">{dog.aggression}/10</span>
                </div>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(dog.aggression / 10) * 100}%` }}
                    transition={{ delay: 1.0, duration: 1.2 }}
                    className="h-full bg-gradient-to-r from-red-400 to-red-500 rounded-full shadow-sm"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* What it's thinking about the person */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-6 shadow-sm border border-blue-200/50"
          >
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-200 rounded-lg mr-3">
                <MessageCircle className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-blue-900">What I'm thinking about you</h3>
            </div>
            <div className="bg-white/60 rounded-lg p-4">
              <p className="text-blue-800 italic text-lg leading-relaxed font-medium">
                "{dog.recentThoughts[0] || 'Ivan ethaa'}"
              </p>
            </div>
          </motion.div>

          {/* Bottom Row: Relationship, Food, Bites */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

            {/* Relationship Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl p-5 shadow-sm border border-pink-200/50"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-pink-200 rounded-lg mr-2">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
                <h3 className="text-lg font-semibold text-pink-900">Relationship</h3>
              </div>
              <p className="text-pink-800 bg-white/50 rounded-lg p-3 font-medium text-center">
                {dog.relationshipStatus}
              </p>
            </motion.div>

            {/* Favorite Food */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-gradient-to-br from-amber-50 to-yellow-100 rounded-xl p-5 shadow-sm border border-amber-200/50"
            >
              <div className="flex items-center mb-3">
                <div className="p-2 bg-amber-200 rounded-lg mr-2">
                  <Coffee className="w-4 h-4 text-amber-600" />
                </div>
                <h3 className="text-lg font-semibold text-amber-900">Favorite Food</h3>
              </div>
              <div className="bg-white/50 rounded-lg p-3">
                {dog.foodPreferences.slice(0, 2).map((food, index) => (
                  <div key={index} className="text-amber-800 font-medium text-center mb-1">
                    {food}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Bite Count */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className={`bg-gradient-to-br rounded-xl p-5 shadow-sm border ${dog.biteHistory.length > 0
                  ? 'from-yellow-50 to-orange-100 border-yellow-200/50'
                  : 'from-green-50 to-emerald-100 border-green-200/50'
                }`}
            >
              <div className="flex items-center mb-3">
                <div className={`p-2 rounded-lg mr-2 ${dog.biteHistory.length > 0 ? 'bg-yellow-200' : 'bg-green-200'
                  }`}>
                  <AlertTriangle className={`w-4 h-4 ${dog.biteHistory.length > 0 ? 'text-yellow-600' : 'text-green-600'
                    }`} />
                </div>
                <h3 className={`text-lg font-semibold ${dog.biteHistory.length > 0 ? 'text-yellow-900' : 'text-green-900'
                  }`}>
                  Bite Count
                </h3>
              </div>
              <div className={`rounded-lg p-3 text-center ${dog.biteHistory.length > 0
                  ? 'bg-white/60 text-yellow-800'
                  : 'bg-white/60 text-green-800'
                }`}>
                <div className="text-2xl font-bold mb-1">{dog.biteHistory.length}</div>
                <div className="text-sm font-medium">
                  {dog.biteHistory.length === 0 ? 'incidents' : 'incidents'}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="flex justify-center items-center space-x-4 pt-6 mt-6 border-t border-gray-200"
          >
            <PawLogo className="text-orange-300" size="sm" />
            <span className="text-gray-500 font-light text-sm tracking-wider">CAMPUS DOGGO</span>
            <PawLogo className="text-amber-300" size="sm" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
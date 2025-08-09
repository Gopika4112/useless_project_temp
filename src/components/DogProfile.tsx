import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, AlertTriangle, MapPin, Calendar, Brain, Coffee, Award, MessageCircle } from 'lucide-react';
import { Dog } from '../types/Dog';

interface DogProfileProps {
  dog: Dog;
  confidence: number;
  matchedFeatures: string[];
  onClose: () => void;
}

export const DogProfile: React.FC<DogProfileProps> = ({ dog, confidence, matchedFeatures, onClose }) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'metrics' | 'details' | 'social'>('basic');

  const getConfidenceColor = (conf: number) => {
    if (conf >= 80) return 'text-green-600';
    if (conf >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScaleDescription = (value: number, type: string) => {
    const descriptions = {
      friendliness: ['Antisocial', 'Wary', 'Cautious', 'Reserved', 'Neutral', 'Friendly', 'Welcoming', 'Outgoing', 'Social Butterfly', 'Loves Everyone', 'Universal Friend'],
      aggression: ['Pacifist', 'Peaceful', 'Gentle', 'Mild', 'Balanced', 'Assertive', 'Protective', 'Defensive', 'Territorial', 'Intense', 'Maximum Security Risk'],
      foodMotivation: ['Food? Meh', 'Picky Eater', 'Selective', 'Normal', 'Interested', 'Motivated', 'Eager', 'Food-Focused', 'Obsessed', 'Will Sell Soul', 'Black Hole for Food'],
      bellyRubTolerance: ['No Touching!', 'Personal Space', 'Brief Contact', 'Limited Pets', 'Some Touching', 'Enjoys Pets', 'Loves Attention', 'Belly Rub Fan', 'Professional Snuggler', 'Unlimited Access', 'Belly Rub Addict'],
      fetchEnthusiasm: ['What\'s Fetch?', 'Not Interested', 'Reluctant', 'Occasional', 'Will Play', 'Enjoys Fetch', 'Active Player', 'Fetch Fan', 'Obsessed', 'Fetch Machine', 'Unstoppable Force']
    };
    return descriptions[type as keyof typeof descriptions]?.[value] || 'Unknown';
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Heart },
    { id: 'metrics', label: 'Behavior', icon: Brain },
    { id: 'details', label: 'Personal', icon: Star },
    { id: 'social', label: 'Social', icon: MessageCircle }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-500 to-blue-600 text-white p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <img 
                src={dog.profilePhoto} 
                alt={dog.name}
                className="w-20 h-20 rounded-full border-4 border-white shadow-lg object-cover"
              />
              <div>
                <h2 className="text-3xl font-bold">{dog.name}</h2>
                <p className="text-xl opacity-90">{dog.breed}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{dog.age} years old</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Award className="w-4 h-4" />
                    <span>{dog.campusYears} years on campus</span>
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 rounded-full p-2 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* AI Analysis Results */}
          <div className="mt-4 bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">AI Match Confidence:</span>
              <span className={`text-2xl font-bold ${getConfidenceColor(confidence)}`}>
                {confidence}%
              </span>
            </div>
            <div className="text-sm opacity-90">
              <span className="font-medium">Matched Features: </span>
              {matchedFeatures.join(', ') || 'General appearance'}
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
                    activeTab === tab.id
                      ? 'border-b-2 border-orange-500 text-orange-600 bg-orange-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <h3 className="font-semibold text-blue-900 mb-3 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Favorite Campus Locations
                      </h3>
                      <ul className="space-y-1">
                        {dog.favoriteLocations.map((location, index) => (
                          <li key={index} className="text-blue-800">• {location}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-green-50 rounded-lg p-4">
                      <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                        <Coffee className="w-4 h-4 mr-2" />
                        Dietary Preferences
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-green-700 font-medium">Loves:</p>
                          <ul className="text-sm text-green-800">
                            {dog.foodPreferences.map((food, index) => (
                              <li key={index}>• {food}</li>
                            ))}
                          </ul>
                        </div>
                        {dog.allergies.length > 0 && (
                          <div>
                            <p className="text-sm text-red-700 font-medium">Allergic to:</p>
                            <ul className="text-sm text-red-800">
                              {dog.allergies.map((allergy, index) => (
                                <li key={index}>• {allergy}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h3 className="font-semibold text-yellow-900 mb-3 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-2" />
                        Safety Information
                      </h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Approach Advice:</p>
                          <p className="text-sm text-yellow-700">{dog.approachAdvice}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Best Times:</p>
                          <ul className="text-sm text-yellow-700">
                            {dog.bestEncounterTimes.map((time, index) => (
                              <li key={index}>• {time}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-900 mb-3">Conversation Starters</h3>
                      <ul className="space-y-1">
                        {dog.conversationStarters.map((starter, index) => (
                          <li key={index} className="text-purple-800 text-sm">• {starter}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'metrics' && (
              <motion.div
                key="metrics"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {[
                  { key: 'friendliness', label: 'Friendliness Scale', value: dog.friendliness, color: 'green' },
                  { key: 'aggression', label: 'Aggression Level', value: dog.aggression, color: 'red' },
                  { key: 'foodMotivation', label: 'Food Motivation', value: dog.foodMotivation, color: 'orange' },
                  { key: 'bellyRubTolerance', label: 'Belly Rub Tolerance', value: dog.bellyRubTolerance, color: 'pink' },
                  { key: 'fetchEnthusiasm', label: 'Fetch Enthusiasm', value: dog.fetchEnthusiasm, color: 'blue' }
                ].map(({ key, label, value, color }) => (
                  <div key={key} className={`bg-${color}-50 rounded-lg p-4`}>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className={`font-semibold text-${color}-900`}>{label}</h3>
                      <span className={`text-2xl font-bold text-${color}-600`}>{value}/10</span>
                    </div>
                    <div className={`w-full bg-${color}-200 rounded-full h-3 mb-2`}>
                      <div 
                        className={`bg-${color}-500 h-3 rounded-full transition-all duration-1000`}
                        style={{ width: `${(value / 10) * 100}%` }}
                      />
                    </div>
                    <p className={`text-sm text-${color}-800 font-medium`}>
                      "{getScaleDescription(value, key)}"
                    </p>
                  </div>
                ))}

                {dog.biteHistory.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Incident History
                    </h3>
                    <ul className="space-y-1">
                      {dog.biteHistory.map((incident, index) => (
                        <li key={index} className="text-red-800 text-sm">• {incident}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="bg-indigo-50 rounded-lg p-4">
                      <h3 className="font-semibold text-indigo-900 mb-3">Personal Life</h3>
                      <div className="space-y-2 text-sm">
                        <p><span className="font-medium">Status:</span> {dog.relationshipStatus}</p>
                        <p><span className="font-medium">Sign:</span> {dog.astrologicalSign}</p>
                        <p><span className="font-medium">Credit Score:</span> {dog.creditScore}</p>
                      </div>
                    </div>

                    <div className="bg-teal-50 rounded-lg p-4">
                      <h3 className="font-semibold text-teal-900 mb-3">Academic Interests</h3>
                      <ul className="space-y-1">
                        {dog.academicInterests.map((interest, index) => (
                          <li key={index} className="text-teal-800 text-sm">• {interest}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4">
                      <h3 className="font-semibold text-orange-900 mb-3">Career Goals</h3>
                      <ul className="space-y-1">
                        {dog.careerAspirations.map((goal, index) => (
                          <li key={index} className="text-orange-800 text-sm">• {goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-pink-50 rounded-lg p-4">
                      <h3 className="font-semibold text-pink-900 mb-3">Personality Traits</h3>
                      <div className="flex flex-wrap gap-2">
                        {dog.personality.map((trait, index) => (
                          <span key={index} className="bg-pink-200 text-pink-800 px-2 py-1 rounded-full text-xs font-medium">
                            {trait}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Recent Thoughts</h3>
                      <div className="space-y-2">
                        {dog.recentThoughts.map((thought, index) => (
                          <div key={index} className="bg-white rounded p-2 text-sm text-gray-700 border-l-4 border-gray-300">
                            "{thought}"
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4">
                      <h3 className="font-semibold text-purple-900 mb-3">Netflix History</h3>
                      <ul className="space-y-1">
                        {dog.netflixHistory.map((show, index) => (
                          <li key={index} className="text-purple-800 text-sm">• {show}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'social' && (
              <motion.div
                key="social"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-green-900 mb-3 flex items-center">
                      <Heart className="w-4 h-4 mr-2" />
                      Friends ({dog.friends.length})
                    </h3>
                    <ul className="space-y-1">
                      {dog.friends.map((friend, index) => (
                        <li key={index} className="text-green-800 text-sm">• {friend}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-red-50 rounded-lg p-4">
                    <h3 className="font-semibold text-red-900 mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Rivals ({dog.enemies.length})
                    </h3>
                    <ul className="space-y-1">
                      {dog.enemies.map((enemy, index) => (
                        <li key={index} className="text-red-800 text-sm">• {enemy}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-pink-50 rounded-lg p-4">
                    <h3 className="font-semibold text-pink-900 mb-3 flex items-center">
                      <Star className="w-4 h-4 mr-2" />
                      Crushes ({dog.crushes.length})
                    </h3>
                    <ul className="space-y-1">
                      {dog.crushes.map((crush, index) => (
                        <li key={index} className="text-pink-800 text-sm">• {crush}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-900 mb-3">Dating Preferences</h3>
                  <ul className="grid md:grid-cols-2 gap-1">
                    {dog.datingPreferences.map((preference, index) => (
                      <li key={index} className="text-blue-800 text-sm">• {preference}</li>
                    ))}
                  </ul>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-900 mb-3">Favorite Professors</h3>
                  <ul className="space-y-1">
                    {dog.favoriteProfessors.map((prof, index) => (
                      <li key={index} className="text-yellow-800 text-sm">• {prof}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};
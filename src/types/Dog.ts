export interface Dog {
  id: string;
  name: string;
  breed: string;
  age: number;
  campusYears: number;
  profilePhoto: string;
  
  // Behavioral Metrics
  friendliness: number;
  aggression: number;
  foodMotivation: number;
  bellyRubTolerance: number;
  fetchEnthusiasm: number;
  
  // Ridiculous Details
  favoriteLocations: string[];
  foodPreferences: string[];
  allergies: string[];
  biteHistory: string[];
  relationshipStatus: string;
  datingPreferences: string[];
  academicInterests: string[];
  favoriteProfessors: string[];
  netflixHistory: string[];
  astrologicalSign: string;
  personality: string[];
  creditScore: number;
  careerAspirations: string[];
  recentThoughts: string[];
  
  // Safety Recommendations
  approachAdvice: string;
  recommendedTreats: string[];
  bestEncounterTimes: string[];
  conversationStarters: string[];
  
  // Social Network
  friends: string[];
  enemies: string[];
  crushes: string[];
  
  // Physical characteristics for matching
  size: 'small' | 'medium' | 'large';
  colors: string[];
  furType: string;
  earType: string;
  tailType: string;
}

export interface DogRecognitionResult {
  dog: Dog;
  confidence: number;
  matchedFeatures: string[];
  analysisTime: number;
}

export interface ImageAnalysis {
  isDog: boolean;
  confidence: number;
  detectedFeatures: {
    size: string;
    colors: string[];
    breed: string;
    confidence: number;
  };
}
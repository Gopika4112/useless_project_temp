import { Dog, DogRecognitionResult, ImageAnalysis } from '../types/Dog';

export class DogMatcher {
  private async fetchDogDetailsFromWebhook(): Promise<Dog> {
    try {
      const response = await fetch('https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004/get-dog', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch dog details: ${response.status}`);
      }
      
      const dogData = await response.json();
      return dogData;
    } catch (error) {
      console.error('Failed to fetch dog details from webhook:', error);
      // Return a default dog if webhook fails
      return this.getDefaultDog();
    }
  }

  private getDefaultDog(): Dog {
    return {
      id: 'default-1',
      name: 'Campus Dog',
      breed: 'Mixed Breed',
      age: 3,
      campusYears: 2,
      profilePhoto: '/api/placeholder/200/200',
      friendliness: 8,
      aggression: 2,
      foodMotivation: 7,
      bellyRubTolerance: 9,
      fetchEnthusiasm: 6,
      favoriteLocations: ['Campus grounds', 'Student center'],
      foodPreferences: ['Dog treats', 'Student snacks'],
      allergies: [],
      biteHistory: [],
      relationshipStatus: 'Single and ready to mingle',
      datingPreferences: [],
      academicInterests: [],
      favoriteProfessors: [],
      netflixHistory: [],
      astrologicalSign: 'Canis Major',
      personality: ['Friendly', 'Playful'],
      creditScore: 750,
      careerAspirations: ['Professional good boy'],
      recentThoughts: ['Ivan ethaa'],
      approachAdvice: 'Approach slowly with treats',
      recommendedTreats: ['Dog biscuits'],
      bestEncounterTimes: ['Morning', 'Afternoon'],
      conversationStarters: ['Want to play fetch?'],
      friends: [],
      enemies: [],
      crushes: [],
      size: 'medium' as const,
      colors: ['Brown', 'White'],
      furType: 'Short',
      earType: 'Floppy',
      tailType: 'Wagging'
    };
  }
  private calculateSimilarityScore(detectedFeatures: ImageAnalysis['detectedFeatures'], dog: Dog): number {
    let score = 0;
    let maxScore = 0;

    // Size matching (30% weight)
    maxScore += 30;
    if (detectedFeatures.size === dog.size) {
      score += 30;
    } else if (
      (detectedFeatures.size === 'medium' && (dog.size === 'small' || dog.size === 'large')) ||
      (dog.size === 'medium' && (detectedFeatures.size === 'small' || detectedFeatures.size === 'large'))
    ) {
      score += 15;
    }

    // Color matching (40% weight)
    maxScore += 40;
    const colorMatches = detectedFeatures.colors.filter(color => 
      dog.colors.some(dogColor => dogColor.toLowerCase().includes(color.toLowerCase()))
    );
    score += (colorMatches.length / Math.max(detectedFeatures.colors.length, 1)) * 40;

    // Breed similarity (30% weight)
    maxScore += 30;
    const breedWords = detectedFeatures.breed.toLowerCase().split(' ');
    const dogBreedWords = dog.breed.toLowerCase().split(' ');
    
    const breedMatches = breedWords.filter(word => 
      dogBreedWords.some(dogWord => dogWord.includes(word) || word.includes(dogWord))
    );
    
    if (breedMatches.length > 0) {
      score += (breedMatches.length / breedWords.length) * 30;
    }

    return Math.min((score / maxScore) * 100, 100);
  }

  async matchDog(analysis: ImageAnalysis): Promise<DogRecognitionResult> {
    const startTime = Date.now();
    
    // Skip AI detection - directly fetch dog details from n8n backend
    console.log('Fetching dog details from n8n backend...');
    
    try {
      // Fetch the specific dog details from your n8n database
      const dogDetails = await this.fetchDogDetailsFromWebhook();
      
      // Simulate processing time for better UX
      const processingTime = Date.now() - startTime;
      const minProcessingTime = 2000; // 2 seconds minimum for effect
      
      if (processingTime < minProcessingTime) {
        await new Promise(resolve => setTimeout(resolve, minProcessingTime - processingTime));
      }

      return {
        dog: dogDetails,
        confidence: 95, // High confidence since we're getting from database
        matchedFeatures: ['Database match', 'Campus dog identified'],
        analysisTime: Date.now() - startTime
      };
    } catch (error) {
      console.error('Failed to fetch from n8n backend:', error);
      
      // Return default dog as fallback
      const defaultDog = this.getDefaultDog();
      return {
        dog: defaultDog,
        confidence: 85,
        matchedFeatures: ['Fallback match'],
        analysisTime: Date.now() - startTime
      };
    }
  }

  private getMatchedFeatures(detectedFeatures: ImageAnalysis['detectedFeatures'], dog: Dog): string[] {
    const matches: string[] = [];

    if (detectedFeatures.size === dog.size) {
      matches.push(`Size: ${dog.size}`);
    }

    detectedFeatures.colors.forEach(color => {
      if (dog.colors.some(dogColor => dogColor.toLowerCase().includes(color.toLowerCase()))) {
        matches.push(`Color: ${color}`);
      }
    });

    const breedWords = detectedFeatures.breed.toLowerCase().split(' ');
    const dogBreedWords = dog.breed.toLowerCase().split(' ');
    
    breedWords.forEach(word => {
      if (dogBreedWords.some(dogWord => dogWord.includes(word))) {
        matches.push(`Breed characteristic: ${word}`);
      }
    });

    return matches;
  }
}

export const dogMatcher = new DogMatcher();
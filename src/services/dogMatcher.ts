import { Dog, DogRecognitionResult, ImageAnalysis } from '../types/Dog';
import { CAMPUS_DOGS } from '../data/campusDogs';

export class DogMatcher {
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
    
    if (!analysis.isDog) {
      throw new Error('No dog detected in image');
    }

    // Calculate similarity scores for all campus dogs
    const scoredDogs = CAMPUS_DOGS.map(dog => ({
      dog,
      score: this.calculateSimilarityScore(analysis.detectedFeatures, dog),
      matchedFeatures: this.getMatchedFeatures(analysis.detectedFeatures, dog)
    }));

    // Sort by score and get the best match
    scoredDogs.sort((a, b) => b.score - a.score);
    const bestMatch = scoredDogs[0];

    // Add some randomness and personality to the confidence score
    let finalConfidence = bestMatch.score;
    
    // Boost confidence for some personality
    if (finalConfidence > 70) {
      finalConfidence = Math.min(finalConfidence + Math.random() * 15, 95);
    } else if (finalConfidence > 50) {
      finalConfidence = Math.min(finalConfidence + Math.random() * 10, 85);
    }

    // Simulate processing time for dramatic effect
    const processingTime = Date.now() - startTime;
    const minProcessingTime = 2000; // 2 seconds minimum for effect
    
    if (processingTime < minProcessingTime) {
      await new Promise(resolve => setTimeout(resolve, minProcessingTime - processingTime));
    }

    return {
      dog: bestMatch.dog,
      confidence: Math.round(finalConfidence * 100) / 100,
      matchedFeatures: bestMatch.matchedFeatures,
      analysisTime: Date.now() - startTime
    };
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
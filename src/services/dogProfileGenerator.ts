import { Dog } from '../types/Dog';
import { WebhookResponse } from './webhookService';

export class DogProfileGenerator {
  generateDogProfile(webhookData: WebhookResponse, uploadedImageUrl?: string): Dog {
    // Generate a comprehensive dog profile based on webhook data

    const breeds = [
      'Distinguished Golden Retriever-Philosopher Mix',
      'Campus Security German Shepherd-Guardian Hybrid',
      'Friendly Labrador-Social Butterfly Cross',
      'Mysterious Border Collie-Intellectual Blend',
      'Playful Beagle-Adventure Seeker Mix'
    ];

    const astrologicalSigns = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    
    const personalityTraits = this.generatePersonalityTraits(webhookData);
    const academicInterests = this.generateAcademicInterests(webhookData);
    const careerAspirations = this.generateCareerAspirations(webhookData);

    return {
      id: Date.now().toString(),
      name: webhookData.name,
      breed: breeds[Math.floor(Math.random() * breeds.length)],
      age: Math.floor(Math.random() * 8) + 2,
      campusYears: Math.floor(Math.random() * 5) + 1,
      profilePhoto: uploadedImageUrl || 'https://images.pexels.com/photos/1490908/pexels-photo-1490908.jpeg?auto=compress&cs=tinysrgb&w=400',
      
      // Use webhook data for behavioral metrics
      friendliness: webhookData.friendliness_meter,
      aggression: webhookData.aggressive_meter,
      foodMotivation: Math.floor(Math.random() * 5) + 6, // Dogs love food
      bellyRubTolerance: Math.floor(Math.random() * 4) + 7, // Most dogs love belly rubs
      fetchEnthusiasm: Math.floor(Math.random() * 6) + 5,
      
      // Generate detailed profile based on webhook data
      favoriteLocations: this.generateFavoriteLocations(webhookData.place),
      foodPreferences: this.generateFoodPreferences(webhookData.food),
      allergies: this.generateAllergies(),
      biteHistory: this.generateBiteHistory(webhookData.no_of_bites),
      relationshipStatus: this.formatRelationshipStatus(webhookData.relationship_status),
      datingPreferences: this.generateDatingPreferences(webhookData.relationship_status),
      academicInterests,
      favoriteProfessors: this.generateFavoriteProfessors(),
      netflixHistory: this.generateNetflixHistory(),
      astrologicalSign: astrologicalSigns[Math.floor(Math.random() * astrologicalSigns.length)],
      personality: personalityTraits,
      creditScore: Math.floor(Math.random() * 400) + 400,
      careerAspirations,
      recentThoughts: this.generateRecentThoughts(webhookData),
      
      // Safety and interaction info
      approachAdvice: this.generateApproachAdvice(webhookData),
      recommendedTreats: this.generateRecommendedTreats(webhookData.food),
      bestEncounterTimes: this.generateBestEncounterTimes(webhookData.place),
      conversationStarters: this.generateConversationStarters(webhookData),
      
      // Social network
      friends: this.generateFriends(),
      enemies: this.generateEnemies(),
      crushes: this.generateCrushes(),
      
      // Physical characteristics
      size: this.generateSize(),
      colors: this.generateColors(),
      furType: this.generateFurType(),
      earType: this.generateEarType(),
      tailType: this.generateTailType()
    };
  }

  private generatePersonalityTraits(data: WebhookResponse): string[] {
    const traits = [];
    
    if (data.friendliness_meter >= 8) traits.push('Extremely friendly', 'Social butterfly');
    else if (data.friendliness_meter >= 6) traits.push('Friendly', 'Approachable');
    else if (data.friendliness_meter >= 4) traits.push('Reserved', 'Selective');
    else traits.push('Cautious', 'Independent');

    if (data.aggressive_meter <= 2) traits.push('Gentle', 'Peaceful');
    else if (data.aggressive_meter <= 4) traits.push('Protective', 'Alert');
    else traits.push('Assertive', 'Territorial');

    if (data.relationship_status === 'committed') traits.push('Loyal', 'Devoted');
    else if (data.relationship_status === 'single') traits.push('Available', 'Looking for love');

    return traits.slice(0, 4);
  }

  private generateAcademicInterests(data: WebhookResponse): string[] {
    const interests = [
      'Campus Geography Studies',
      'Food Science and Nutrition',
      'Social Psychology',
      'Behavioral Studies',
      'Recreation Management'
    ];
    
    if (data.place.includes('library')) interests.push('Literature Studies');
    if (data.place.includes('cafeteria') || data.place.includes('gazebo')) interests.push('Culinary Arts');
    if (data.place.includes('gym') || data.place.includes('field')) interests.push('Physical Education');
    
    return interests.slice(0, 3);
  }

  private generateCareerAspirations(data: WebhookResponse): string[] {
    const aspirations = [];
    
    if (data.friendliness_meter >= 8) {
      aspirations.push('Campus Ambassador', 'Student Relations Coordinator');
    }
    
    if (data.aggressive_meter <= 2) {
      aspirations.push('Therapy Dog Certification', 'Emotional Support Specialist');
    } else {
      aspirations.push('Campus Security Consultant', 'Safety Coordinator');
    }
    
    aspirations.push('Food Quality Inspector', 'Campus Tour Guide');
    
    return aspirations.slice(0, 3);
  }

  private generateFavoriteLocations(place: string): string[] {
    const locations = [place];
    
    const commonLocations = [
      'Student Union Building',
      'Main Quad',
      'Library Steps',
      'Campus Cafeteria',
      'Recreation Center',
      'Academic Building Courtyard'
    ];
    
    // Add 2-3 more random locations
    const shuffled = commonLocations.filter(loc => !loc.toLowerCase().includes(place.toLowerCase()));
    locations.push(...shuffled.slice(0, 2));
    
    return locations;
  }

  private generateFoodPreferences(food: string): string[] {
    const preferences = [food];
    
    const commonFoods = [
      'Student lunch leftovers',
      'Premium dog biscuits',
      'Cafeteria scraps',
      'Organic treats',
      'Tennis balls (non-edible but preferred)'
    ];
    
    preferences.push(...commonFoods.slice(0, 2));
    return preferences;
  }

  private generateAllergies(): string[] {
    const allergies = [
      'Exam stress (absorbs it from students)',
      'Bad weather',
      'Vacuum cleaners',
      'Fireworks',
      'Monday mornings'
    ];
    
    return allergies.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  private generateBiteHistory(bites: number): string[] {
    if (bites === 0) {
      return ['Perfect record - no incidents', 'Model citizen of campus'];
    }
    
    const incidents = [
      'Gentle correction of inappropriate petting technique',
      'Defensive response to food theft attempt',
      'Misunderstanding during frisbee game',
      'Protective reaction to loud noises',
      'Accidental nip during enthusiastic greeting'
    ];
    
    return incidents.slice(0, Math.min(bites, 3));
  }

  private formatRelationshipStatus(status: string): string {
    const statusMap: Record<string, string> = {
      'single': 'Single and ready to mingle',
      'committed': 'In a committed relationship',
      'complicated': 'It\'s complicated',
      'dating': 'Casually dating around campus'
    };
    
    return statusMap[status.toLowerCase()] || status;
  }

  private generateDatingPreferences(status: string): string[] {
    if (status === 'committed') {
      return ['Loyal to current partner', 'Not looking', 'Happily taken'];
    }
    
    return [
      'Good personality',
      'Loves long walks',
      'Treats provider',
      'Belly rub enthusiast',
      'Compatible play style'
    ].slice(0, 3);
  }

  private generateFavoriteProfessors(): string[] {
    const professors = [
      'Dr. Johnson (always drops food)',
      'Prof. Smith (gives the best head pats)',
      'Dr. Williams (understands dog psychology)',
      'Prof. Brown (sneaks treats during lectures)'
    ];
    
    return professors.slice(0, 2);
  }

  private generateNetflixHistory(): string[] {
    return [
      'Air Bud series (complete collection)',
      'Planet Earth (for the animal content)',
      'The Office (comfort watching)',
      'Cooking shows (food inspiration)'
    ].slice(0, 3);
  }

  private generateRecentThoughts(data: WebhookResponse): string[] {
    return [
      `I really love hanging out at ${data.place}`,
      `${data.food} is absolutely delicious`,
      `My friendliness level of ${data.friendliness_meter}/10 is pretty accurate`,
      'Wonder what the humans are studying today'
    ].slice(0, 3);
  }

  private generateApproachAdvice(data: WebhookResponse): string {
    if (data.aggressive_meter <= 2 && data.friendliness_meter >= 7) {
      return 'Extremely friendly - approach with confidence and treats ready!';
    } else if (data.aggressive_meter >= 6) {
      return 'Approach with caution and respect personal space.';
    } else {
      return 'Friendly but respectful approach recommended.';
    }
  }

  private generateRecommendedTreats(food: string): string[] {
    return [
      food,
      'High-quality dog biscuits',
      'Healthy training treats'
    ];
  }

  private generateBestEncounterTimes(place: string): string[] {
    return [
      `Best found at ${place}`,
      'During lunch hours',
      'After classes end'
    ];
  }

  private generateConversationStarters(data: WebhookResponse): string[] {
    return [
      `Ask about their favorite spot: ${data.place}`,
      `Mention ${data.food} - they love it!`,
      'Comment on their friendly nature',
      'Offer to play or go for a walk'
    ].slice(0, 3);
  }

  private generateFriends(): string[] {
    const friends = [
      'Campus security team',
      'Cafeteria staff',
      'Regular students',
      'Other campus dogs'
    ];
    
    return friends.slice(0, Math.floor(Math.random() * 3) + 1);
  }

  private generateEnemies(): string[] {
    const enemies = [
      'Squirrels (ongoing rivalry)',
      'Vacuum cleaners',
      'Thunderstorms',
      'The campus cat'
    ];
    
    return enemies.slice(0, Math.floor(Math.random() * 2) + 1);
  }

  private generateCrushes(): string[] {
    const crushes = [
      'The golden retriever from the vet school',
      'That cute beagle from orientation',
      'The therapy dog from counseling services'
    ];
    
    return crushes.slice(0, Math.floor(Math.random() * 2));
  }

  private generateSize(): 'small' | 'medium' | 'large' {
    const sizes: ('small' | 'medium' | 'large')[] = ['small', 'medium', 'large'];
    return sizes[Math.floor(Math.random() * sizes.length)];
  }

  private generateColors(): string[] {
    const colorSets = [
      ['brown', 'white'],
      ['black', 'tan'],
      ['golden', 'cream'],
      ['black', 'white'],
      ['brown', 'black']
    ];
    
    return colorSets[Math.floor(Math.random() * colorSets.length)];
  }

  private generateFurType(): string {
    const types = ['short', 'medium', 'long', 'curly'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private generateEarType(): string {
    const types = ['floppy', 'pointed', 'long', 'cropped'];
    return types[Math.floor(Math.random() * types.length)];
  }

  private generateTailType(): string {
    const types = ['wagging', 'curled', 'straight', 'bushy', 'feathered'];
    return types[Math.floor(Math.random() * types.length)];
  }
}

export const dogProfileGenerator = new DogProfileGenerator();
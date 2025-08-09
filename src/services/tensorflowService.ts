import * as tf from '@tensorflow/tfjs';
import * as mobilenet from '@tensorflow-models/mobilenet';
import { ImageAnalysis } from '../types/Dog';

export class TensorFlowService {
  private model: mobilenet.MobileNet | null = null;
  private isLoading = false;

  async loadModel(): Promise<void> {
    if (this.model || this.isLoading) return;
    
    this.isLoading = true;
    try {
      await tf.ready();
      this.model = await mobilenet.load();
      console.log('MobileNet model loaded successfully');
    } catch (error) {
      console.error('Error loading MobileNet model:', error);
      throw error;
    } finally {
      this.isLoading = false;
    }
  }

  async analyzeImage(imageElement: HTMLImageElement): Promise<ImageAnalysis> {
    if (!this.model) {
      await this.loadModel();
    }

    if (!this.model) {
      throw new Error('Model failed to load');
    }

    try {
      const predictions = await this.model.classify(imageElement);
      
      // Check if any prediction is dog-related
      const dogPredictions = predictions.filter(pred => 
        this.isDogClass(pred.className.toLowerCase())
      );

      const isDog = dogPredictions.length > 0;
      const topDogPrediction = dogPredictions[0];

      if (!isDog) {
        return {
          isDog: false,
          confidence: 0,
          detectedFeatures: {
            size: 'unknown',
            colors: [],
            breed: 'not a dog',
            confidence: 0
          }
        };
      }

      // Extract features from the image
      const features = await this.extractDogFeatures(imageElement, topDogPrediction);
      
      return {
        isDog: true,
        confidence: topDogPrediction.probability,
        detectedFeatures: features
      };

    } catch (error) {
      console.error('Error analyzing image:', error);
      throw error;
    }
  }

  private isDogClass(className: string): boolean {
    const dogKeywords = [
      'dog', 'puppy', 'retriever', 'shepherd', 'terrier', 'bulldog', 'poodle',
      'beagle', 'boxer', 'husky', 'spaniel', 'collie', 'hound', 'mastiff',
      'dachshund', 'chihuahua', 'rottweiler', 'doberman', 'pug', 'corgi'
    ];
    
    return dogKeywords.some(keyword => className.includes(keyword));
  }

  private async extractDogFeatures(
    imageElement: HTMLImageElement, 
    prediction: { className: string; probability: number }
  ): Promise<ImageAnalysis['detectedFeatures']> {
    // Simulate feature extraction based on breed prediction
    const breedName = prediction.className.toLowerCase();
    
    // Determine size based on breed
    let size = 'medium';
    if (breedName.includes('chihuahua') || breedName.includes('pug') || breedName.includes('terrier')) {
      size = 'small';
    } else if (breedName.includes('retriever') || breedName.includes('shepherd') || breedName.includes('mastiff')) {
      size = 'large';
    }

    // Simulate color detection (in a real app, this would analyze pixel data)
    const commonColors = this.getCommonColorsForBreed(breedName);
    
    return {
      size,
      colors: commonColors,
      breed: prediction.className,
      confidence: prediction.probability
    };
  }

  private getCommonColorsForBreed(breedName: string): string[] {
    const breedColors: Record<string, string[]> = {
      'golden retriever': ['golden', 'cream'],
      'german shepherd': ['black', 'tan', 'brown'],
      'labrador': ['black', 'yellow', 'chocolate'],
      'beagle': ['brown', 'white', 'tan'],
      'poodle': ['white', 'black', 'cream'],
      'husky': ['black', 'white', 'grey'],
      'border collie': ['black', 'white'],
      'rottweiler': ['black', 'tan'],
      'bulldog': ['white', 'brindle', 'fawn']
    };

    // Find matching breed colors
    for (const [breed, colors] of Object.entries(breedColors)) {
      if (breedName.includes(breed.split(' ')[0])) {
        return colors;
      }
    }

    // Default colors if no specific breed match
    return ['brown', 'black', 'white'];
  }
}

export const tensorflowService = new TensorFlowService();
export interface WebhookResponse {
  name: string;
  place: string;
  food: string;
  relationship_status: string;
  no_of_bites: number;
  friendliness_meter: number;
  aggressive_meter: number;
}

export class WebhookService {
  private readonly webhookUrl = 'https://inspired-bison-generally.ngrok-free.app/webhook-test/47a93820-b180-4665-b436-f1072e45d004';

  async processImage(file: File): Promise<WebhookResponse> {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'ngrok-skip-browser-warning': 'true',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorText = await response.text().catch(() => 'Unknown error');
        throw new Error(`Webhook request failed: ${response.status} ${response.statusText}. Response: ${errorText}`);
      }

      const data = await response.json();
      
      // Handle both array and single object responses
      const result = Array.isArray(data) ? data[0] : data;
      
      if (!result || !result.name) {
        throw new Error('Invalid response format from webhook');
      }

      return result;
    } catch (error) {
      console.error('Webhook service error:', error);
      
      // Provide more specific error messages
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        throw new Error('Unable to connect to the AI processing service. Please check if the webhook URL is accessible and try again.');
      }
      
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred while processing the image.');
    }
  }
}

export const webhookService = new WebhookService();
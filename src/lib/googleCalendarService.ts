declare global {
  interface Window {
    gapi: any;
  }
}

export class GoogleCalendarService {
  private static CLIENT_ID = 'your-google-client-id.googleusercontent.com';
  private static API_KEY = 'your-google-api-key';
  private static DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
  private static SCOPES = 'https://www.googleapis.com/auth/calendar.events';

  static async initialize(): Promise<boolean> {
    try {
      if (typeof window === 'undefined') return false;
      
      // Load Google API
      await this.loadGoogleAPI();
      await window.gapi.load('auth2', () => {});
      await window.gapi.client.init({
        apiKey: this.API_KEY,
        clientId: this.CLIENT_ID,
        discoveryDocs: [this.DISCOVERY_DOC],
        scope: this.SCOPES
      });
      
      return true;
    } catch (error) {
      console.error('Google Calendar API initialization failed:', error);
      return false;
    }
  }

  private static loadGoogleAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (window.gapi) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://apis.google.com/js/api.js';
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Google API'));
      document.head.appendChild(script);
    });
  }

  static async signIn(): Promise<boolean> {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const user = await authInstance.signIn();
      return user.isSignedIn();
    } catch (error) {
      console.error('Google sign-in failed:', error);
      return false;
    }
  }

  static async addHarvestEvent(
    cropName: string,
    harvestDate: Date,
    farmLocation: string,
    estimatedYield: string
  ): Promise<boolean> {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        const signedIn = await this.signIn();
        if (!signedIn) return false;
      }

      // Create reminder date (7 days before harvest)
      const reminderDate = new Date(harvestDate);
      reminderDate.setDate(reminderDate.getDate() - 7);

      const event = {
        summary: `Expected Harvest for ${cropName.charAt(0).toUpperCase() + cropName.slice(1)}`,
        description: `🌾 Harvest Details:\n• Crop: ${cropName}\n• Location: ${farmLocation}\n• Expected Yield: ${estimatedYield}\n• Added by KisanSafe AI`,
        start: {
          date: harvestDate.toISOString().split('T')[0]
        },
        end: {
          date: harvestDate.toISOString().split('T')[0]
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 7 * 24 * 60 }, // 7 days before
            { method: 'popup', minutes: 24 * 60 } // 1 day before
          ]
        }
      };

      const response = await window.gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event
      });

      return response.status === 200;
    } catch (error) {
      console.error('Failed to add calendar event:', error);
      return false;
    }
  }

  static isSignedIn(): boolean {
    try {
      if (typeof window === 'undefined' || !window.gapi) return false;
      const authInstance = window.gapi.auth2.getAuthInstance();
      return authInstance && authInstance.isSignedIn.get();
    } catch {
      return false;
    }
  }
}
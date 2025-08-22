export class VoiceService {
  private static recognition: SpeechRecognition | null = null;
  private static synthesis: SpeechSynthesis | null = null;
  private static isListening = false;

  static initialize(): boolean {
    if (typeof window === 'undefined') return false;

    // Initialize Speech Recognition
    const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
    }

    // Initialize Speech Synthesis
    if ('speechSynthesis' in window) {
      this.synthesis = window.speechSynthesis;
    }

    return !!(this.recognition && this.synthesis);
  }

  static isSupported(): boolean {
    return !!(this.recognition && this.synthesis);
  }

  static async startListening(
    language: string = 'en-IN',
    onResult: (text: string) => void,
    onError: (error: string) => void,
    onStart?: () => void,
    onEnd?: () => void
  ): Promise<void> {
    if (!this.recognition || this.isListening) return;

    // Set language based on user preference
    const languageMap: { [key: string]: string } = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'bn': 'bn-IN',
      'gu': 'gu-IN'
    };

    this.recognition.lang = languageMap[language] || 'en-IN';
    this.isListening = true;

    this.recognition.onstart = () => {
      console.log('Voice recognition started');
      onStart?.();
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      console.log('Voice input:', transcript);
      onResult(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      this.isListening = false;
      
      let errorMessage = 'Voice recognition failed';
      switch (event.error) {
        case 'no-speech':
          errorMessage = 'No speech detected. Please try again.';
          break;
        case 'audio-capture':
          errorMessage = 'Microphone not accessible. Please check permissions.';
          break;
        case 'not-allowed':
          errorMessage = 'Microphone permission denied. Please allow microphone access.';
          break;
        case 'network':
          errorMessage = 'Network error. Please check your internet connection.';
          break;
        default:
          errorMessage = `Voice recognition error: ${event.error}`;
      }
      
      onError(errorMessage);
    };

    this.recognition.onend = () => {
      console.log('Voice recognition ended');
      this.isListening = false;
      onEnd?.();
    };

    try {
      this.recognition.start();
    } catch (error) {
      this.isListening = false;
      onError('Failed to start voice recognition');
    }
  }

  static stopListening(): void {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  static speak(
    text: string,
    language: string = 'en-IN',
    onStart?: () => void,
    onEnd?: () => void,
    onError?: (error: string) => void
  ): void {
    if (!this.synthesis) {
      onError?.('Speech synthesis not supported');
      return;
    }

    // Cancel any ongoing speech
    this.synthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // Set language and voice
    const languageMap: { [key: string]: string } = {
      'en': 'en-IN',
      'hi': 'hi-IN',
      'te': 'te-IN',
      'ta': 'ta-IN',
      'bn': 'bn-IN',
      'gu': 'gu-IN'
    };

    utterance.lang = languageMap[language] || 'en-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 0.8;

    // Try to find a suitable voice
    const voices = this.synthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.lang.startsWith(utterance.lang.split('-')[0]) && 
      (voice.name.includes('Female') || voice.name.includes('Google'))
    );
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      console.log('Speech synthesis started');
      onStart?.();
    };

    utterance.onend = () => {
      console.log('Speech synthesis ended');
      onEnd?.();
    };

    utterance.onerror = (event) => {
      console.error('Speech synthesis error:', event.error);
      onError?.(`Speech synthesis failed: ${event.error}`);
    };

    this.synthesis.speak(utterance);
  }

  static stopSpeaking(): void {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  static getAvailableVoices(): SpeechSynthesisVoice[] {
    if (!this.synthesis) return [];
    return this.synthesis.getVoices();
  }

  static isCurrentlyListening(): boolean {
    return this.isListening;
  }

  static isCurrentlySpeaking(): boolean {
    return this.synthesis ? this.synthesis.speaking : false;
  }

  // Utility method to get microphone permission
  static async requestMicrophonePermission(): Promise<boolean> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop()); // Stop the stream immediately
      return true;
    } catch (error) {
      console.error('Microphone permission denied:', error);
      return false;
    }
  }

  // Method to check if microphone is available
  static async isMicrophoneAvailable(): Promise<boolean> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      return devices.some(device => device.kind === 'audioinput');
    } catch (error) {
      console.error('Error checking microphone availability:', error);
      return false;
    }
  }
}
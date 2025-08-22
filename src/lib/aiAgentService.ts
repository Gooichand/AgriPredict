interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface FarmContext {
  crop?: string;
  location?: string;
  farmSize?: string;
  state?: string;
  district?: string;
}

export class AIAgentService {
  private static conversationHistory: ChatMessage[] = [];
  private static readonly MAX_HISTORY = 10;

  // Hugging Face API (Free tier)
  private static readonly HF_API_KEY = 'hf_your_key_here'; // Replace with actual key
  private static readonly HF_MODEL = 'microsoft/DialoGPT-medium';

  // OpenAI API (if available)
  private static readonly OPENAI_API_KEY = 'sk-your_key_here'; // Replace with actual key

  // Gemini API (Free tier)
  private static readonly GEMINI_API_KEY = 'AIzaSyBmYCbl9o23oNiA_rzro1h6A0KKpl8l580';

  static addToHistory(role: 'user' | 'assistant', content: string) {
    this.conversationHistory.push({
      role,
      content,
      timestamp: new Date()
    });

    // Keep only recent messages
    if (this.conversationHistory.length > this.MAX_HISTORY) {
      this.conversationHistory = this.conversationHistory.slice(-this.MAX_HISTORY);
    }
  }

  static getContextualPrompt(userMessage: string, language: string, farmContext?: FarmContext): string {
    const contextInfo = farmContext ? 
      `Farm Context: Growing ${farmContext.crop} on ${farmContext.farmSize} acres in ${farmContext.location}, ${farmContext.state}. ` : '';

    const conversationContext = this.conversationHistory.length > 0 ? 
      `Previous conversation:\n${this.conversationHistory.map(msg => `${msg.role}: ${msg.content}`).join('\n')}\n\n` : '';

    const systemPrompt = `You are KisanSafe AI, an expert agricultural advisor for Indian farmers. You provide practical, actionable farming advice.

${contextInfo}${conversationContext}

Guidelines:
- Respond in ${language === 'hi' ? 'Hindi (Devanagari script)' : language === 'te' ? 'Telugu' : 'English'} language
- Be friendly, encouraging, and use farmer-friendly language
- Provide specific, practical advice with numbers/quantities when relevant
- Use appropriate emojis (🌾🚜💧🌱🌦️💰)
- Keep responses concise but informative (3-5 sentences)
- Include warnings about common mistakes
- Suggest seasonal timing when relevant
- Reference Indian farming practices and conditions

Current user question: ${userMessage}`;

    return systemPrompt;
  }

  static async generateResponse(userMessage: string, language: string = 'en', farmContext?: FarmContext): Promise<string> {
    // Add user message to history
    this.addToHistory('user', userMessage);

    try {
      // Try Gemini API first (most reliable for Indian languages)
      const geminiResponse = await this.tryGeminiAPI(userMessage, language, farmContext);
      if (geminiResponse) {
        this.addToHistory('assistant', geminiResponse);
        return geminiResponse;
      }

      // Fallback to OpenAI if available
      const openaiResponse = await this.tryOpenAI(userMessage, language, farmContext);
      if (openaiResponse) {
        this.addToHistory('assistant', openaiResponse);
        return openaiResponse;
      }

      // Fallback to Hugging Face
      const hfResponse = await this.tryHuggingFace(userMessage, language, farmContext);
      if (hfResponse) {
        this.addToHistory('assistant', hfResponse);
        return hfResponse;
      }

      // Ultimate fallback to rule-based responses
      const fallbackResponse = this.getIntelligentFallback(userMessage, language, farmContext);
      this.addToHistory('assistant', fallbackResponse);
      return fallbackResponse;

    } catch (error) {
      console.error('AI Agent Error:', error);
      const errorResponse = this.getIntelligentFallback(userMessage, language, farmContext);
      this.addToHistory('assistant', errorResponse);
      return errorResponse;
    }
  }

  private static async tryGeminiAPI(userMessage: string, language: string, farmContext?: FarmContext): Promise<string | null> {
    try {
      const prompt = this.getContextualPrompt(userMessage, language, farmContext);
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${this.GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: prompt }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (aiResponse) {
          return aiResponse.trim();
        }
      }
    } catch (error) {
      console.log('Gemini API failed:', error);
    }
    return null;
  }

  private static async tryOpenAI(userMessage: string, language: string, farmContext?: FarmContext): Promise<string | null> {
    try {
      const prompt = this.getContextualPrompt(userMessage, language, farmContext);
      
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 300,
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data.choices?.[0]?.message?.content?.trim();
      }
    } catch (error) {
      console.log('OpenAI API failed:', error);
    }
    return null;
  }

  private static async tryHuggingFace(userMessage: string, language: string, farmContext?: FarmContext): Promise<string | null> {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.HF_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: userMessage,
          parameters: {
            max_length: 200,
            temperature: 0.7
          }
        })
      });

      if (response.ok) {
        const data = await response.json();
        return data[0]?.generated_text?.trim();
      }
    } catch (error) {
      console.log('Hugging Face API failed:', error);
    }
    return null;
  }

  private static getIntelligentFallback(userMessage: string, language: string, farmContext?: FarmContext): string {
    const lowerInput = userMessage.toLowerCase();
    const isHindi = language === 'hi';
    const isTelugu = language === 'te';

    // Crop-specific responses
    if (lowerInput.includes('rice') || lowerInput.includes('धान') || lowerInput.includes('వరి')) {
      if (isHindi) {
        return "🌾 **धान की खेती के लिए सुझाव:**\n\n• **मिट्टी**: दोमट मिट्टी सबसे अच्छी\n• **पानी**: 3-5 सेमी खड़ा पानी रखें\n• **बीज**: 20-25 किलो/हेक्टेयर\n• **खाद**: NPK 120:60:40 किलो/हेक्टेयर\n• **समय**: जून-जुलाई में रोपाई\n\n⚠️ **सावधानी**: ज्यादा पानी से जड़ सड़न हो सकती है!";
      } else if (isTelugu) {
        return "🌾 **వరి సాగుకు సూచనలు:**\n\n• **నేల**: మట్టి నేల ఉత్తమం\n• **నీరు**: 3-5 సెం.మీ నిలిచిన నీరు\n• **విత్తనాలు**: 20-25 కిలోలు/హెక్టారు\n• **ఎరువులు**: NPK 120:60:40 కిలోలు/హెక్టారు\n• **సమయం**: జూన్-జూలైలో నాట్లు\n\n⚠️ **జాగ్రత్త**: ఎక్కువ నీరు వేర్లు కుళ్ళిపోవచ్చు!";
      } else {
        return "🌾 **Rice Cultivation Tips:**\n\n• **Soil**: Loamy soil is best\n• **Water**: Maintain 3-5cm standing water\n• **Seeds**: 20-25 kg per hectare\n• **Fertilizer**: NPK 120:60:40 kg/hectare\n• **Timing**: Transplant in June-July\n\n⚠️ **Warning**: Excess water can cause root rot!";
      }
    }

    // Fertilizer responses
    if (lowerInput.includes('fertilizer') || lowerInput.includes('खाद') || lowerInput.includes('ఎరువు')) {
      if (isHindi) {
        return "🌱 **खाद का सही उपयोग:**\n\n• **मिट्टी जांच**: पहले pH और NPK जांचें\n• **जैविक खाद**: 5-10 टन गोबर खाद/हेक्टेयर\n• **रासायनिक खाद**: फसल के अनुसार NPK अनुपात\n• **समय**: बुआई के समय + 30-45 दिन बाद\n• **सूक्ष्म तत्व**: जिंक, आयरन, बोरॉन\n\n💡 **टिप**: ज्यादा खाद नुकसानदायक है!";
      } else if (isTelugu) {
        return "🌱 **ఎరువుల సరైన వాడకం:**\n\n• **నేల పరీక్ష**: మొదట pH మరియు NPK చూడండి\n• **సేంద్రీయ ఎరువు**: 5-10 టన్నుల పేడ/హెక్టారు\n• **రసాయన ఎరువు**: పంట ప్రకారం NPK నిష్పత్తి\n• **సమయం**: విత్తనల సమయం + 30-45 రోజుల తర్వాత\n• **సూక్ష్మ పోషకాలు**: జింక్, ఇనుము, బోరాన్\n\n💡 **చిట్కా**: ఎక్కువ ఎరువు హానికరం!";
      } else {
        return "🌱 **Smart Fertilizer Guide:**\n\n• **Soil Test**: Check pH and NPK levels first\n• **Organic**: 5-10 tons farmyard manure/hectare\n• **Chemical**: NPK ratio based on crop needs\n• **Timing**: Base dose + top dressing after 30-45 days\n• **Micronutrients**: Zinc, Iron, Boron as needed\n\n💡 **Tip**: Over-fertilization damages crops and soil!";
      }
    }

    // Weather/climate responses
    if (lowerInput.includes('weather') || lowerInput.includes('मौसम') || lowerInput.includes('వాతావరణం')) {
      if (isHindi) {
        return "🌦️ **मौसम आधारित खेती:**\n\n• **बारिश**: IMD का पूर्वानुमान देखें\n• **तापमान**: फसल के अनुसार बुआई करें\n• **आर्द्रता**: बीमारी से बचाव के लिए\n• **हवा**: तेज हवा से फसल सुरक्षा\n\n📱 **ऐप**: मौसम ऐप डाउनलोड करें!";
      } else if (isTelugu) {
        return "🌦️ **వాతావరణ ఆధారిత వ్యవసాయం:**\n\n• **వర్షం**: IMD అంచనాలు చూడండి\n• **ఉష్ణోగ్రత**: పంట ప్రకారం విత్తనలు\n• **తేమ**: వ్యాధుల నివారణకు\n• **గాలి**: గట్టి గాలుల నుండి పంట రక్షణ\n\n📱 **యాప్**: వాతావరణ యాప్ డౌన్లోడ్ చేయండి!";
      } else {
        return "🌦️ **Weather-Smart Farming:**\n\n• **Rainfall**: Check IMD forecasts\n• **Temperature**: Time sowing according to crop needs\n• **Humidity**: Monitor for disease prevention\n• **Wind**: Protect crops from strong winds\n\n📱 **Apps**: Download weather apps for alerts!";
      }
    }

    // Market price responses
    if (lowerInput.includes('price') || lowerInput.includes('भाव') || lowerInput.includes('ధర')) {
      if (isHindi) {
        return "💰 **बाजार भाव की जानकारी:**\n\n• **eNAM पोर्टल**: ऑनलाइन भाव देखें\n• **मंडी**: स्थानीय मंडी में जाकर पूछें\n• **ऐप**: Kisan Suvidha, AgriMarket ऐप\n• **समय**: सुबह 6-10 बजे भाव अच्छे\n\n📈 **टिप**: त्योहारों के समय भाव बढ़ते हैं!";
      } else if (isTelugu) {
        return "💰 **మార్కెట్ ధరల సమాచారం:**\n\n• **eNAM పోర్టల్**: ఆన్లైన్ ధరలు చూడండి\n• **మార్కెట్**: స్థానిక మార్కెట్లో అడగండి\n• **యాప్**: Kisan Suvidha, AgriMarket యాప్\n• **సమయం**: ఉదయం 6-10 గంటలకు మంచి ధరలు\n\n📈 **చిట్కా**: పండుగల సమయంలో ధరలు పెరుగుతాయి!";
      } else {
        return "💰 **Market Price Information:**\n\n• **eNAM Portal**: Check online prices\n• **Local Mandi**: Visit nearby markets\n• **Apps**: Kisan Suvidha, AgriMarket apps\n• **Timing**: Morning 6-10 AM for better rates\n\n📈 **Tip**: Prices rise during festivals!";
      }
    }

    // Default response with context
    const contextResponse = farmContext ? 
      (isHindi ? `आपकी ${farmContext.crop} की फसल के लिए` : 
       isTelugu ? `మీ ${farmContext.crop} పంట కోసం` : 
       `For your ${farmContext.crop} crop`) : '';

    if (isHindi) {
      return `🤖 **किसानसेफ AI यहां है!** ${contextResponse}\n\nमैं आपकी मदद कर सकता हूं:\n• फसल की देखभाल और पैदावार\n• खाद-पानी और मिट्टी की जानकारी\n• बीमारी-कीट का इलाज\n• मौसम और बाजार भाव\n• सरकारी योजनाएं\n\nकृपया अपना सवाल विस्तार से पूछें! 🌾`;
    } else if (isTelugu) {
      return `🤖 **కిసాన్సేఫ్ AI ఇక్కడ ఉంది!** ${contextResponse}\n\nనేను మీకు సహాయం చేయగలను:\n• పంట సంరక్షణ మరియు దిగుబడి\n• ఎరువులు-నీరు మరియు నేల సమాచారం\n• వ్యాధి-కీటకాల చికిత్స\n• వాతావరణం మరియు మార్కెట్ ధరలు\n• ప్రభుత్వ పథకాలు\n\nదయచేసి మీ ప్రశ్నను వివరంగా అడగండి! 🌾`;
    } else {
      return `🤖 **KisanSafe AI at your service!** ${contextResponse}\n\nI can help you with:\n• Crop care and yield improvement\n• Fertilizers, irrigation, and soil health\n• Disease and pest management\n• Weather updates and market prices\n• Government schemes and subsidies\n\nPlease ask me a specific farming question! 🌾`;
    }
  }

  static clearHistory() {
    this.conversationHistory = [];
  }

  static getConversationHistory(): ChatMessage[] {
    return [...this.conversationHistory];
  }
}
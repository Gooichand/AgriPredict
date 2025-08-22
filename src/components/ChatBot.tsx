'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { AIAgentService } from '@/lib/aiAgentService'
import { VoiceService } from '@/lib/voiceService'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

interface FarmContext {
  crop?: string
  location?: string
  farmSize?: string
  state?: string
  district?: string
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Initialize voice service
    const initVoice = async () => {
      const supported = VoiceService.initialize()
      setVoiceSupported(supported)
      
      if (supported) {
        // Request microphone permission on first load
        await VoiceService.requestMicrophonePermission()
      }
    }
    
    initVoice()
  }, [])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage = getWelcomeMessage()
      setMessages([{
        id: Date.now().toString(),
        text: welcomeMessage,
        isBot: true,
        timestamp: new Date()
      }])
    }
  }, [isOpen, language])

  const getWelcomeMessage = () => {
    const welcomeMessages = {
      en: "🌾 Hello! I'm KisanSafe AI Assistant. I can help you with:\n\n• Crop yield predictions\n• Weather alerts & farming tips\n• Market prices & best selling times\n• Disease identification & treatment\n• Government schemes & subsidies\n• Planting schedules & soil management\n\nWhat would you like to know?",
      hi: "🌾 नमस्ते! मैं किसानसेफ AI सहायक हूं। मैं आपकी मदद कर सकता हूं:\n\n• फसल उत्पादन पूर्वानुमान\n• मौसम चेतावनी और खेती के टिप्स\n• बाजार भाव और बेचने का सही समय\n• बीमारी पहचान और इलाज\n• सरकारी योजनाएं और सब्सिडी\n• बुआई का समय और मिट्टी प्रबंधन\n\nआप क्या जानना चाहते हैं?",
      te: "🌾 నమస్కారం! నేను కిసాన్‌సేఫ్ AI సహాయకుడిని. నేను మీకు సహాయం చేయగలను:\n\n• పంట దిగుబడి అంచనాలు\n• వాతావరణ హెచ్చరికలు & వ్యవసాయ చిట్కాలు\n• మార్కెట్ ధరలు & అమ్మకపు సమయం\n• వ్యాధి గుర్తింపు & చికిత్స\n• ప్రభుత్వ పథకాలు & సబ్సిడీలు\n• విత్తన సమయం & నేల నిర్వహణ\n\nమీరు ఏమి తెలుసుకోవాలనుకుంటున్నారు?",
      ta: "🌾 வணக்கம்! நான் கிசான்சேஃப் AI உதவியாளர். நான் உங்களுக்கு உதவ முடியும்:\n\n• பயிர் விளைச்சல் கணிப்புகள்\n• வானிலை எச்சரிக்கைகள் & விவசாய குறிப்புகள்\n• சந்தை விலைகள் & விற்பனை நேரம்\n• நோய் கண்டறிதல் & சிகிச்சை\n• அரசு திட்டங்கள் & மானியங்கள்\n• விதைப்பு நேரம் & மண் மேலாண்மை\n\nநீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
      bn: "🌾 নমস্কার! আমি কিসানসেফ AI সহায়ক। আমি আপনাকে সাহায্য করতে পারি:\n\n• ফসল উৎপাদন পূর্বাভাস\n• আবহাওয়া সতর্কতা ও কৃষি টিপস\n• বাজার দাম ও বিক্রয়ের সময়\n• রোগ নির্ণয় ও চিকিৎসা\n• সরকারি প্রকল্প ও ভর্তুকি\n• বপনের সময় ও মাটি ব্যবস্থাপনা\n\nআপনি কী জানতে চান?",
      gu: "🌾 નમસ્તે! હું કિસાનસેફ AI સહાયક છું. હું તમારી મદદ કરી શકું છું:\n\n• પાક ઉત્પાદન અનુમાન\n• હવામાન ચેતવણી અને ખેતીની ટિપ્સ\n• બજાર ભાવ અને વેચાણનો સમય\n• રોગ ઓળખ અને સારવાર\n• સરકારી યોજનાઓ અને સબસિડી\n• વાવેતરનો સમય અને માટી વ્યવસ્થાપન\n\nતમે શું જાણવા માંગો છો?"
    }
    return welcomeMessages[language] || welcomeMessages.en
  }

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Get farm data for context
      let farmContext: FarmContext = {}
      if (typeof window !== 'undefined') {
        const farmData = localStorage.getItem('farmData')
        if (farmData) {
          const parsed = JSON.parse(farmData)
          farmContext = {
            crop: parsed.crop,
            location: parsed.location,
            farmSize: parsed.farmSize,
            state: parsed.state,
            district: parsed.district
          }
        }
      }

      // Use the new AI Agent Service
      const response = await AIAgentService.generateResponse(userMessage, language, farmContext)
      return response
      
    } catch (error) {
      console.error('AI Agent Error:', error)
      return getEnhancedFallback(userMessage, language)
    }
  }

  const getEnhancedFallback = (userMessage: string, language: string): string => {
    const lowerInput = userMessage.toLowerCase()
    const isHindi = language === 'hi'
    
    // Fertilizer specific response
    if (lowerInput.includes('fertilizer') || lowerInput.includes('fertiliser') || lowerInput.includes('खाद')) {
      return isHindi
        ? "🌱 **खाद का सही उपयोग:**\n\n1️⃣ **मिट्टी जांच**: पहले pH और NPK लेवल जांचें\n2️⃣ **NPK अनुपात**: 120:60:40 किलो/हेक्टेयर\n3️⃣ **समय**: बुआई के समय + 30-45 दिन बाद\n4️⃣ **जैविक**: 5-10 टन गोबर खाद/हेक्टेयर\n\n**चेतावनी**: ज्यादा खाद नुकसानदायक!"
        : "🌱 **Smart Fertilizer Application:**\n\n1️⃣ **Soil Test First**: Check pH and NPK levels\n2️⃣ **NPK Ratio**: 120:60:40 kg per hectare\n3️⃣ **Split Application**: Base dose + top dressing after 30-45 days\n4️⃣ **Organic Matter**: Add 5-10 tons farmyard manure\n5️⃣ **Micronutrients**: Zinc, Iron, Boron as needed\n\n**Warning**: Over-fertilization can damage crops and soil!"
    }
    
    // Default intelligent response
    return isHindi
      ? "🤖 मैं आपके खेती के सवाल का जवाब देने के लिए तैयार हूं! आप मुझसे पूछ सकते हैं:\n\n• फसल की देखभाल और पैदावार\n• खाद-पानी और मिट्टी\n• बीमारी-कीट का इलाज\n• बाजार भाव और बिक्री\n• सरकारी योजनाएं\n\nकृपया विस्तार से पूछें!"
      : "🤖 I'm ready to answer your farming questions! You can ask me about:\n\n• Crop care and yield improvement\n• Fertilizers, irrigation, and soil health\n• Disease and pest management\n• Market prices and selling strategies\n• Government schemes and subsidies\n• Weather alerts and farming calendar\n\nPlease ask me a specific question for detailed guidance!"
  }

  const handleSendMessage = async (messageText?: string) => {
    const textToSend = messageText || inputText
    if (!textToSend.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    try {
      const botResponse = await generateBotResponse(textToSend)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      
      // Auto-speak response if voice is supported and enabled
      if (voiceSupported && !VoiceService.isCurrentlySpeaking()) {
        setTimeout(() => {
          VoiceService.speak(
            botResponse,
            language,
            () => setIsSpeaking(true),
            () => setIsSpeaking(false),
            (error) => console.error('Speech error:', error)
          )
        }, 500)
      }
      
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: language === 'hi' 
          ? "क्षमा करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया फिर से कोशिश करें।"
          : language === 'te'
          ? "క్షమించండి, నాకు కొన్ని సాంకేతిక సమస్యలు ఉన్నాయి. దయచేసి మళ్లీ ప్రయత్నించండి."
          : "Sorry, I'm experiencing some technical issues. Please try again.",
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleVoiceInput = async () => {
    if (!voiceSupported) {
      alert(language === 'hi' ? 'आवाज़ सुविधा उपलब्ध नहीं है' : 'Voice feature not available')
      return
    }

    if (isListening) {
      VoiceService.stopListening()
      setIsListening(false)
      return
    }

    try {
      await VoiceService.startListening(
        language,
        (transcript) => {
          setInputText(transcript)
          setIsListening(false)
          // Auto-send the voice message
          setTimeout(() => handleSendMessage(transcript), 500)
        },
        (error) => {
          console.error('Voice error:', error)
          setIsListening(false)
          alert(error)
        },
        () => setIsListening(true),
        () => setIsListening(false)
      )
    } catch (error) {
      console.error('Voice input error:', error)
      setIsListening(false)
    }
  }

  const toggleSpeech = () => {
    if (isSpeaking) {
      VoiceService.stopSpeaking()
      setIsSpeaking(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg z-50 transition-all duration-300 hover:scale-110"
      >
        <div className="flex items-center gap-2">
          <span className="text-2xl">🤖</span>
          <span className="hidden sm:block font-medium">Ask KisanSafe AI</span>
        </div>
      </button>
    )
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-2xl z-50 flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-xl">🤖</span>
          <div>
            <h3 className="font-semibold">KisanSafe AI</h3>
            <p className="text-xs opacity-90">Farming Assistant</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {voiceSupported && (
            <div className="text-xs opacity-75">
              🎤 Voice
            </div>
          )}
          <button
            onClick={() => {
              setIsOpen(false)
              VoiceService.stopListening()
              VoiceService.stopSpeaking()
              setIsListening(false)
              setIsSpeaking(false)
            }}
            className="text-white hover:bg-green-700 p-1 rounded"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg whitespace-pre-line ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-green-600 text-white'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-green-100'}`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 mb-2">{language === 'hi' ? 'तुरंत पूछें:' : 'Quick Ask:'}</p>
          <div className="grid grid-cols-2 gap-2 mb-3">
            <button
              onClick={() => setInputText(
                language === 'hi' ? 'धान की खेती कैसे करें?' : 
                language === 'te' ? 'వరి సాగు ఎలా చేయాలి?' : 
                'How to grow rice?'
              )}
              className="text-xs bg-green-50 hover:bg-green-100 text-green-700 p-2 rounded border"
            >
              🌾 {language === 'hi' ? 'धान' : language === 'te' ? 'వరి' : 'Rice'}
            </button>
            <button
              onClick={() => setInputText(
                language === 'hi' ? 'आज के भाव बताएं' : 
                language === 'te' ? 'నేటి మార్కెట్ ధరలు' : 
                'Today market prices'
              )}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded border"
            >
              💰 {language === 'hi' ? 'भाव' : language === 'te' ? 'ధరలు' : 'Prices'}
            </button>
            <button
              onClick={() => setInputText(
                language === 'hi' ? 'मौसम की जानकारी' : 
                language === 'te' ? 'వాతావరణ సమాచారం' : 
                'Weather updates'
              )}
              className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-2 rounded border"
            >
              🌦️ {language === 'hi' ? 'मौसम' : language === 'te' ? 'వాతావరణం' : 'Weather'}
            </button>
            <button
              onClick={() => setInputText(
                language === 'hi' ? 'सरकारी योजनाएं' : 
                language === 'te' ? 'ప్రభుత్వ పథకాలు' : 
                'Government schemes'
              )}
              className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 p-2 rounded border"
            >
              🏛️ {language === 'hi' ? 'योजना' : language === 'te' ? 'పథకాలు' : 'Schemes'}
            </button>
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={language === 'hi' ? 'अपना सवाल पूछें...' : language === 'te' ? 'మీ ప్రశ్న అడగండి...' : 'Ask your farming question...'}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          
          {/* Voice Input Button */}
          {voiceSupported && (
            <button
              onClick={handleVoiceInput}
              disabled={isTyping}
              className={`p-2 rounded-lg transition-colors ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
              title={isListening ? 'Stop listening' : 'Voice input'}
            >
              <span className="text-sm">{isListening ? '🔴' : '🎤'}</span>
            </button>
          )}
          
          {/* Speech Toggle Button */}
          {isSpeaking && (
            <button
              onClick={toggleSpeech}
              className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg transition-colors"
              title="Stop speaking"
            >
              <span className="text-sm">🔇</span>
            </button>
          )}
          
          <button
            onClick={() => handleSendMessage()}
            disabled={!inputText.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
          >
            <span className="text-sm">📤</span>
          </button>
        </div>
        
        {/* Voice Status */}
        {isListening && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              {language === 'hi' ? 'सुन रहा हूं...' : language === 'te' ? 'వింటున్నాను...' : 'Listening...'}
            </div>
          </div>
        )}
        
        {isSpeaking && (
          <div className="mt-2 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-xs">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce"></div>
              {language === 'hi' ? 'बोल रहा हूं...' : language === 'te' ? 'మాట్లాడుతున్నాను...' : 'Speaking...'}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
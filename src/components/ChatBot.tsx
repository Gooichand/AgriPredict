'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSmartResponse } from '@/lib/farmingKnowledge'
import { searchLocations, getLocationByPincode } from '@/lib/indianLocations'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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
      let farmContext = ''
      if (typeof window !== 'undefined') {
        const farmData = localStorage.getItem('farmData')
        if (farmData) {
          const parsed = JSON.parse(farmData)
          farmContext = `User's farm: ${parsed.crop} crop, ${parsed.farmSize} acres, located in ${parsed.location}`
        }
      }

      // Try direct Gemini API call first (works without server restart)
      try {
        const geminiKey = 'AIzaSyBmYCbl9o23oNiA_rzro1h6A0KKpl8l580'
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `You are KisanSafe AI, a friendly and expert agricultural advisor for Indian farmers. ${farmContext ? `Context: ${farmContext}.` : ''} 

Respond in ${language === 'hi' ? 'Hindi' : 'English'} language. Be helpful, practical, and encouraging. Provide specific, actionable farming advice. Keep responses concise but informative (2-4 sentences). Use emojis appropriately.

User question: ${userMessage}`
              }]
            }]
          })
        })
        
        if (response.ok) {
          const data = await response.json()
          const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
          if (aiResponse) {
            return aiResponse.trim()
          }
        }
      } catch (directError) {
        console.log('Direct Gemini call failed:', directError)
      }

      // Fallback to server API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          language: language,
          context: farmContext
        })
      })

      if (response.ok) {
        const data = await response.json()
        if (data.response) {
          return data.response
        }
      }
      
      throw new Error('All AI services failed')
      
    } catch (error) {
      console.error('AI Error:', error)
      
      // Enhanced fallback responses
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

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isBot: false,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Get AI response with longer delay for better UX
    setTimeout(async () => {
      try {
        const botResponse = await generateBotResponse(inputText)
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: botResponse,
          isBot: true,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, botMessage])
      } catch (error) {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: language === 'hi' 
            ? "क्षमा करें, मुझे कुछ तकनीकी समस्या हो रही है। कृपया फिर से कोशिश करें।"
            : "Sorry, I'm experiencing some technical issues. Please try again.",
          isBot: true,
          timestamp: new Date()
        }
        setMessages(prev => [...prev, errorMessage])
      } finally {
        setIsTyping(false)
      }
    }, 1500)
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
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:bg-green-700 p-1 rounded"
        >
          ✕
        </button>
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
              onClick={() => setInputText(language === 'hi' ? 'धान की खेती कैसे करें?' : 'How to grow rice?')}
              className="text-xs bg-green-50 hover:bg-green-100 text-green-700 p-2 rounded border"
            >
              🌾 {language === 'hi' ? 'धान' : 'Rice'}
            </button>
            <button
              onClick={() => setInputText(language === 'hi' ? 'आज के भाव बताएं' : 'Today market prices')}
              className="text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 p-2 rounded border"
            >
              💰 {language === 'hi' ? 'भाव' : 'Prices'}
            </button>
            <button
              onClick={() => setInputText(language === 'hi' ? 'मौसम की जानकारी' : 'Weather updates')}
              className="text-xs bg-yellow-50 hover:bg-yellow-100 text-yellow-700 p-2 rounded border"
            >
              🌦️ {language === 'hi' ? 'मौसम' : 'Weather'}
            </button>
            <button
              onClick={() => setInputText(language === 'hi' ? 'सरकारी योजनाएं' : 'Government schemes')}
              className="text-xs bg-purple-50 hover:bg-purple-100 text-purple-700 p-2 rounded border"
            >
              🏛️ {language === 'hi' ? 'योजना' : 'Schemes'}
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
            placeholder={language === 'hi' ? 'अपना सवाल पूछें...' : 'Ask your farming question...'}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-lg transition-colors"
          >
            <span className="text-sm">📤</span>
          </button>
        </div>
      </div>
    </div>
  )
}
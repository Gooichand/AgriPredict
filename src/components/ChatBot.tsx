'use client'

import { useState, useRef, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSmartResponse } from '@/lib/farmingKnowledge'

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
    // Try smart response from knowledge base first
    const smartResponse = getSmartResponse(userMessage, language)
    if (smartResponse) {
      return smartResponse
    }

    // Fallback responses
    const fallbackResponses = {
      en: {
        greeting: "Hello! I'm KisanSafe AI Assistant. I can help with crops, weather, prices, government schemes, and farming tips. What would you like to know?",
        help: "I can assist you with:\n\n🌾 Crop cultivation (Rice, Wheat, Cotton, etc.)\n🌦️ Weather updates & alerts\n💰 Market prices & trends\n🏛️ Government schemes & subsidies\n🦠 Disease & pest management\n🌱 Soil health & fertilizers\n💧 Irrigation guidance\n\nJust ask your question!",
        price: "💰 Current Market Prices:\n\n• Rice: ₹2,100-2,300/quintal\n• Wheat: ₹2,200-2,400/quintal\n• Cotton: ₹6,000-7,000/quintal\n• Sugarcane: ₹350-380/quintal\n• Onion: ₹2,500-3,000/quintal\n• Potato: ₹1,800-2,200/quintal\n• Soybean: ₹4,200-4,500/quintal\n\nPrices vary by location and quality.",
        default: "I'm here to help with your farming questions! You can ask me about:\n\n🌾 Specific crops (rice, wheat, cotton, etc.)\n🌦️ Weather and farming alerts\n💰 Market prices\n🏛️ Government schemes\n🦠 Plant diseases\n🌱 Soil and fertilizers\n\nWhat would you like to know?"
      },
      hi: {
        greeting: "नमस्ते! मैं किसानसेफ AI सहायक हूं। मैं फसल, मौसम, भाव, सरकारी योजनाओं और खेती की जानकारी में मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
        help: "मैं आपकी इन चीजों में मदद कर सकता हूं:\n\n🌾 फसल की खेती (धान, गेहूं, कपास आदि)\n🌦️ मौसम अपडेट और चेतावनी\n💰 बाजार भाव और रुझान\n🏛️ सरकारी योजनाएं और सब्सिडी\n🦠 बीमारी और कीट प्रबंधन\n🌱 मिट्टी की सेहत और खाद\n💧 सिंचाई मार्गदर्शन\n\nबस अपना सवाल पूछें!",
        price: "💰 आज के बाजार भाव:\n\n• धान: ₹2,100-2,300/क्विंटल\n• गेहूं: ₹2,200-2,400/क्विंटल\n• कपास: ₹6,000-7,000/क्विंटल\n• गन्ना: ₹350-380/क्विंटल\n• प्याज: ₹2,500-3,000/क्विंटल\n• आलू: ₹1,800-2,200/क्विंटल\n• सोयाबीन: ₹4,200-4,500/क्विंटल\n\nभाव स्थान और गुणवत्ता के अनुसार अलग होते हैं।",
        default: "मैं आपके खेती के सवालों में मदद के लिए यहां हूं! आप मुझसे पूछ सकते हैं:\n\n🌾 विशिष्ट फसलें (धान, गेहूं, कपास आदि)\n🌦️ मौसम और खेती की चेतावनी\n💰 बाजार भाव\n🏛️ सरकारी योजनाएं\n🦠 पौधों की बीमारियां\n🌱 मिट्टी और खाद\n\nआप क्या जानना चाहते हैं?"
      }
    }

    const lowerMessage = userMessage.toLowerCase()
    const langResponses = fallbackResponses[language as keyof typeof fallbackResponses] || fallbackResponses.en

    // Pattern matching for common queries
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('नमस्ते') || lowerMessage.includes('हैलो')) {
      return langResponses.greeting
    }
    if (lowerMessage.includes('help') || lowerMessage.includes('मदद') || lowerMessage.includes('सहायता')) {
      return langResponses.help
    }
    if (lowerMessage.includes('price') || lowerMessage.includes('भाव') || lowerMessage.includes('दाम') || lowerMessage.includes('rate')) {
      return langResponses.price
    }

    return langResponses.default
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

    // Simulate typing delay
    setTimeout(async () => {
      const botResponse = await generateBotResponse(inputText)
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botResponse,
        isBot: true,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMessage])
      setIsTyping(false)
    }, 1000)
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
'use client'

import { useState } from 'react'
import { AIService } from '@/lib/aiService'

interface AIAssistantProps {
  farmData: any
}

export default function AIAssistant({ farmData }: AIAssistantProps) {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: `Hello! I'm your AI farming assistant. I can help with advice for your ${farmData?.crop} farm in ${farmData?.location}.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    
    const userMessage = { role: 'user', content: input }
    setMessages(prev => [...prev, userMessage])
    const currentInput = input
    setInput('')
    setLoading(true)

    try {
      // Direct Google Gemini API call
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyBmYCbl9o23oNiA_rzro1h6A0KKpl8l580`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert agricultural advisor. The user has a ${farmData.crop} farm in ${farmData.location} covering ${farmData.farmSize} acres. User question: ${currentInput}. Provide practical farming advice in 2-3 sentences.`
            }]
          }]
        })
      })
      
      const data = await response.json()
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
      
      if (aiResponse) {
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse.trim() }])
      } else {
        throw new Error('No AI response')
      }
    } catch (error) {
      // Smart fallback
      const fallbackResponse = getSmartResponse(currentInput, farmData)
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }])
    }
    
    setLoading(false)
  }

  const getSmartResponse = (input: string, farmData: any) => {
    const lowerInput = input.toLowerCase()
    const crop = farmData.crop
    const location = farmData.location
    
    if (lowerInput.includes('yield') || lowerInput.includes('increase') || lowerInput.includes('production')) {
      return `To increase ${crop} yield in ${location}: Use high-quality seeds, apply balanced NPK fertilizer (120:60:40 kg/hectare), maintain proper plant spacing, ensure adequate irrigation during critical growth stages, and implement integrated pest management. These practices can boost yield by 20-30%.`
    }
    
    if (lowerInput.includes('disease') || lowerInput.includes('pest') || lowerInput.includes('problem')) {
      return `For ${crop} disease/pest management in ${location}: Regular field monitoring is crucial. Apply preventive fungicides/pesticides during vulnerable stages. Use resistant varieties when available. Maintain field hygiene by removing infected plants. Consider biological control methods alongside chemical treatments.`
    }
    
    if (lowerInput.includes('fertilizer') || lowerInput.includes('nutrition') || lowerInput.includes('feed')) {
      return `${crop} fertilizer recommendations: Conduct soil testing first. Apply basal dose of NPK at planting, followed by top-dressing with urea during vegetative growth. Use organic matter like farmyard manure (5-10 tons/hectare). Split applications prevent nutrient losses and improve uptake efficiency.`
    }
    
    if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('drought')) {
      return `Water management for ${crop}: Maintain soil moisture at 70-80% field capacity. Critical irrigation periods are flowering and grain filling stages. Use drip irrigation to save 40% water. Mulching helps retain soil moisture. Monitor weather forecasts for irrigation scheduling.`
    }
    
    if (lowerInput.includes('harvest') || lowerInput.includes('ready') || lowerInput.includes('when')) {
      return `${crop} harvest timing: Monitor physiological maturity indicators like grain color and moisture content (20-25% for most crops). Harvest during dry weather to prevent quality deterioration. Use proper harvesting techniques to minimize losses. Plan post-harvest storage in advance.`
    }
    
    return `For your ${crop} farm in ${location}: Focus on soil health management, timely field operations, balanced nutrition, efficient water use, and integrated pest management. Regular monitoring and following scientific practices will optimize your farming success and profitability.`
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4">🤖 AI Farming Assistant</h3>
      
      <div className="h-64 overflow-y-auto mb-4 p-3 bg-gray-50 rounded">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-3 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
            <div className={`inline-block p-2 rounded max-w-xs ${
              msg.role === 'user' ? 'bg-green-600 text-white' : 'bg-white border'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-left">
            <div className="inline-block p-2 rounded bg-white border">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about farming advice, weather, or market prices..."
          className="flex-1 p-2 border rounded"
          disabled={loading}
        />
        <button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
        >
          Send
        </button>
      </div>
      
      <div className="mt-3 text-xs text-gray-500">
        💡 Powered by Google Gemini AI - Ask: "How to increase yield?", "Disease prevention?", "Best fertilizer?"
      </div>
    </div>
  )
}
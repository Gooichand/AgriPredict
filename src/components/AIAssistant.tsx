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
      // Call server-side API for real AI
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: currentInput,
          farmData: farmData
        })
      })
      
      const data = await response.json()
      const aiResponse = data.response || 'I\'m here to help with your farming questions!'
      
      setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }])
    } catch (error) {
      // Fallback to client-side AI
      const fallbackResponse = await AIService.generateAIResponse(currentInput, farmData)
      setMessages(prev => [...prev, { role: 'assistant', content: fallbackResponse }])
    }
    
    setLoading(false)
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
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, farmData } = await request.json()
    const response = await callServerAI(message, farmData)
    return NextResponse.json({ response })
  } catch (error) {
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 })
  }
}

async function callServerAI(userInput: string, farmData: any) {
  // Try OpenAI first
  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{
          role: 'system',
          content: `You are an expert agricultural advisor. The user has a ${farmData.crop} farm in ${farmData.location} covering ${farmData.farmSize} acres.`
        }, {
          role: 'user',
          content: userInput
        }],
        max_tokens: 200
      })
    })
    
    const data = await response.json()
    if (data.choices?.[0]?.message?.content) {
      return data.choices[0].message.content
    }
  } catch {}
  
  // Fallback response
  return `For your ${farmData.crop} farm in ${farmData.location}: Focus on soil health, proper irrigation, pest management, and timely operations for optimal yield.`
}
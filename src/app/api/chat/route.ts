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
  // Try Google Gemini first (your configured API)
  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert agricultural advisor. The user has a ${farmData.crop} farm in ${farmData.location} covering ${farmData.farmSize} acres. User question: ${userInput}. Provide practical, actionable farming advice in 2-3 sentences.`
            }]
          }]
        })
      })
      
      const data = await response.json()
      const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
      if (aiResponse) {
        return aiResponse.trim()
      }
    } catch (error) {
      console.log('Gemini API error:', error)
    }
  }
  
  // Intelligent fallback with detailed responses
  return getDetailedFallback(userInput, farmData)
}

function getDetailedFallback(input: string, farmData: any) {
  const lowerInput = input.toLowerCase()
  const crop = farmData.crop
  const location = farmData.location
  
  if (lowerInput.includes('yield') || lowerInput.includes('production') || lowerInput.includes('increase')) {
    return `To increase ${crop} yield in ${location}: 1) Use high-quality seeds and maintain optimal plant spacing, 2) Apply balanced fertilizers based on soil testing, 3) Ensure proper irrigation and pest management, 4) Follow recommended planting and harvesting schedules. These practices can boost your yield by 15-25%.`
  }
  
  if (lowerInput.includes('disease') || lowerInput.includes('pest') || lowerInput.includes('problem')) {
    return `Common ${crop} issues in ${location}: Regular field monitoring is essential. Apply preventive treatments during vulnerable growth stages. Use integrated pest management combining biological and chemical controls. Remove infected plants immediately and maintain field hygiene to prevent disease spread.`
  }
  
  if (lowerInput.includes('fertilizer') || lowerInput.includes('nutrition') || lowerInput.includes('feed')) {
    return `${crop} nutrition management: Conduct soil testing to determine nutrient needs. Apply balanced NPK fertilizer - typically 120:60:40 kg per hectare for most crops. Use organic matter like compost or farmyard manure. Split fertilizer applications for better uptake and reduced losses.`
  }
  
  if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('drought')) {
    return `Water management for ${crop} in ${location}: Maintain consistent soil moisture throughout the growing season. Use drip irrigation to save 30-40% water. Critical watering periods are during flowering and grain filling. Install moisture sensors for precision irrigation scheduling.`
  }
  
  if (lowerInput.includes('harvest') || lowerInput.includes('ready') || lowerInput.includes('when')) {
    return `${crop} harvest timing: Monitor crop maturity indicators like grain color and moisture content. Harvest during dry weather conditions for better quality. Check weather forecasts and avoid harvesting during rain. Proper timing can improve quality and reduce post-harvest losses by 10-15%.`
  }
  
  return `For your ${crop} farm in ${location}: Focus on these key areas - soil health through organic matter, timely field operations, integrated pest management, efficient water use, and proper post-harvest handling. Regular monitoring and following scientific practices will optimize your farming success.`
}
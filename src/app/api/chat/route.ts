import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, language, context } = await request.json()
    console.log('API called with:', { message, language, context })
    const response = await callServerAI(message, language, context)
    console.log('AI response:', response)
    return NextResponse.json({ response })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({ error: 'AI service unavailable' }, { status: 500 })
  }
}

async function callServerAI(userInput: string, language: string, context: string) {
  const systemPrompt = `You are KisanSafe AI, a friendly and expert agricultural advisor for Indian farmers. ${context ? `Context: ${context}.` : ''} 

Respond in ${language === 'hi' ? 'Hindi' : 'English'} language. Be helpful, practical, and encouraging. Provide specific, actionable farming advice. Keep responses concise but informative (2-4 sentences). Use emojis appropriately.`

  // Try OpenAI first
  const openaiKey = process.env.OPENAI_API_KEY
  if (openaiKey) {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openaiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userInput }
          ],
          max_tokens: 200,
          temperature: 0.7
        })
      })
      
      const data = await response.json()
      if (data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim()
      }
    } catch (error) {
      console.log('OpenAI error:', error)
    }
  }

  // Try Google Gemini
  const geminiKey = process.env.GEMINI_API_KEY
  if (geminiKey) {
    try {
      console.log('Trying Gemini API...')
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are KisanSafe AI, a friendly agricultural expert for Indian farmers. ${context ? `Context: ${context}.` : ''} Respond in ${language === 'hi' ? 'Hindi' : 'English'}. Be helpful and practical. User question: ${userInput}`
            }]
          }]
        })
      })
      
      if (!response.ok) {
        console.log('Gemini API error:', response.status, response.statusText)
        const errorText = await response.text()
        console.log('Error details:', errorText)
      } else {
        const data = await response.json()
        console.log('Gemini response:', data)
        const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text
        if (aiResponse) {
          return aiResponse.trim()
        }
      }
    } catch (error) {
      console.log('Gemini error:', error)
    }
  }

  // Try Hugging Face
  const hfKey = process.env.HUGGING_FACE_API_KEY
  if (hfKey) {
    try {
      const response = await fetch('https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${hfKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          inputs: userInput,
          parameters: { max_length: 100 }
        })
      })
      
      const data = await response.json()
      if (data.generated_text) {
        return data.generated_text.trim()
      }
    } catch (error) {
      console.log('Hugging Face error:', error)
    }
  }
  
  // Intelligent fallback
  return getDetailedFallback(userInput, language, context)
}

function getDetailedFallback(input: string, language: string, context: string) {
  const lowerInput = input.toLowerCase()
  const isHindi = language === 'hi'
  
  // Extract crop and location from context if available
  const cropMatch = context.match(/crop: (\w+)/i)
  const locationMatch = context.match(/located in ([^,]+)/i)
  const crop = cropMatch ? cropMatch[1] : 'crops'
  const location = locationMatch ? locationMatch[1] : 'your area'
  
  // Fertilizer usage - very detailed response
  if (lowerInput.includes('fertilizer') || lowerInput.includes('fertiliser') || lowerInput.includes('खाद') || lowerInput.includes('nutrition') || lowerInput.includes('nutrient')) {
    return isHindi
      ? `🌱 ${crop} के लिए खाद का सही उपयोग:\n\n1️⃣ **मिट्टी जांच**: पहले मिट्टी की जांच कराएं\n2️⃣ **NPK अनुपात**: 120:60:40 किलो/हेक्टेयर\n3️⃣ **समय**: बुआई के समय और फिर 30-45 दिन बाद\n4️⃣ **जैविक खाद**: गोबर की खाद 5-10 टन/हेक्टेयर\n\nयाद रखें: अधिक खाद नुकसानदायक हो सकती है!`
      : `🌱 **Fertilizer Guide for ${crop}:**\n\n1️⃣ **Soil Testing First**: Always test soil pH and nutrient levels\n2️⃣ **NPK Ratio**: Apply 120:60:40 kg per hectare (N:P:K)\n3️⃣ **Timing**: Base dose at sowing + top dressing after 30-45 days\n4️⃣ **Organic Matter**: Add 5-10 tons farmyard manure per hectare\n5️⃣ **Micronutrients**: Zinc, Iron, Boron as per soil test\n\n**Pro Tip**: Split nitrogen application to reduce losses and improve uptake. Over-fertilization can harm crops and environment!`
  }
  
  // Greeting responses
  if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('नमस्ते') || lowerInput.includes('hey')) {
    return isHindi 
      ? `🙏 नमस्ते! मैं KisanSafe AI हूं - आपका व्यक्तिगत कृषि सलाहकार। ${context ? `मैं देख रहा हूं कि आपके पास ${crop} की खेती है ${location} में।` : ''} मैं आपकी किसी भी खेती की समस्या में मदद कर सकता हूं!`
      : `🙏 Hello! I'm KisanSafe AI, your personal farming advisor. ${context ? `I see you have a ${crop} farm in ${location}.` : ''} I'm here to help with any agricultural questions you have!`
  }
  
  // Yield and production
  if (lowerInput.includes('yield') || lowerInput.includes('production') || lowerInput.includes('increase') || lowerInput.includes('पैदावार') || lowerInput.includes('उत्पादन')) {
    return isHindi
      ? `🌾 **${crop} की पैदावार बढ़ाने के वैज्ञानिक तरीके:**\n\n✅ **उन्नत बीज**: प्रमाणित और रोग प्रतिरोधी बीज का उपयोग\n✅ **सही दूरी**: पौधों के बीच उचित अंतर रखें\n✅ **मिट्टी की जांच**: pH 6.5-7.5 रखें\n✅ **संतुलित पोषण**: NPK + सूक्ष्म पोषक तत्व\n✅ **जल प्रबंधन**: ड्रिप सिंचाई से 40% पानी की बचत\n\n**परिणाम**: 20-30% पैदावार में वृद्धि!`
      : `🌾 **Scientific Methods to Increase ${crop} Yield:**\n\n✅ **Quality Seeds**: Use certified, disease-resistant varieties\n✅ **Proper Spacing**: Maintain optimal plant-to-plant distance\n✅ **Soil Health**: Keep pH between 6.5-7.5, add organic matter\n✅ **Balanced Nutrition**: NPK + micronutrients based on soil test\n✅ **Water Management**: Drip irrigation saves 40% water\n✅ **Pest Control**: Integrated pest management approach\n\n**Expected Result**: 20-30% yield increase with proper implementation!`
  }
  
  // Disease and pest management
  if (lowerInput.includes('disease') || lowerInput.includes('pest') || lowerInput.includes('problem') || lowerInput.includes('बीमारी') || lowerInput.includes('कीट')) {
    return isHindi
      ? `🦠 **${crop} में रोग और कीट प्रबंधन:**\n\n🔍 **पहचान**: पत्तियों पर धब्बे, पीलापन, कीड़े\n🛡️ **रोकथाम**: नीम का तेल, बीटी का छिड़काव\n🌿 **जैविक नियंत्रण**: त्रिकोग्रामा, लेडीबर्ड बीटल\n📊 **निगरानी**: साप्ताहिक खेत की जांच\n⚠️ **तुरंत कार्य**: संक्रमित पौधे हटाएं\n\n**याद रखें**: रोकथाम इलाज से बेहतर है!`
      : `🦠 **${crop} Disease & Pest Management:**\n\n🔍 **Early Detection**: Check for spots, yellowing, insects weekly\n🛡️ **Prevention**: Neem oil spray, BT application, crop rotation\n🌿 **Biological Control**: Use Trichogramma, ladybird beetles\n📊 **Monitoring**: Weekly field inspection is crucial\n⚠️ **Quick Action**: Remove infected plants immediately\n🌱 **Soil Health**: Healthy soil = disease-resistant plants\n\n**Remember**: Prevention is always better than cure!`
  }
  
  // Market prices and selling
  if (lowerInput.includes('price') || lowerInput.includes('market') || lowerInput.includes('sell') || lowerInput.includes('भाव') || lowerInput.includes('दाम') || lowerInput.includes('बेच')) {
    return isHindi
      ? `💰 **${crop} के लिए बाजार रणनीति:**\n\n📱 **ऑनलाइन प्लेटफॉर्म**: eNAM, AgriMarket ऐप का उपयोग\n📊 **भाव ट्रेंड**: पिछले 3 महीने का डेटा देखें\n🎯 **गुणवत्ता**: साफ, सूखा, और ग्रेडिंग के अनुसार\n🚚 **परिवहन**: कम लागत के लिए FPO से जुड़ें\n⏰ **समय**: त्योहारों से पहले बेचें\n\n**प्रो टिप**: सीधे खरीदार से संपर्क बनाएं!`
      : `💰 **Smart Marketing Strategy for ${crop}:**\n\n📱 **Digital Platforms**: Use eNAM, AgriMarket apps for better prices\n📊 **Price Trends**: Monitor last 3 months data before selling\n🎯 **Quality Matters**: Clean, dry, properly graded produce gets premium\n🚚 **Transportation**: Join FPO for reduced logistics costs\n⏰ **Timing**: Sell before festivals for higher demand\n🤝 **Direct Sales**: Build relationships with bulk buyers\n\n**Pro Tip**: Storage facilities can help you wait for better prices!`
  }
  
  // Water and irrigation
  if (lowerInput.includes('water') || lowerInput.includes('irrigation') || lowerInput.includes('drought') || lowerInput.includes('पानी') || lowerInput.includes('सिंचाई')) {
    return isHindi
      ? `💧 **${crop} के लिए स्मार्ट जल प्रबंधन:**\n\n💧 **ड्रिप सिस्टम**: 40-50% पानी की बचत\n📱 **सेंसर तकनीक**: मिट्टी की नमी मापें\n⏰ **समय**: सुबह 6-8 या शाम 4-6 बजे\n🌱 **मल्चिंग**: पुआल डालकर नमी बचाएं\n🌧️ **बरसाती पानी**: हार्वेस्टिंग करें\n\n**क्रिटिकल स्टेज**: फूल आने और दाना भरते समय!`
      : `💧 **Smart Water Management for ${crop}:**\n\n💧 **Drip Irrigation**: Save 40-50% water with precise delivery\n📱 **Soil Sensors**: Monitor moisture levels scientifically\n⏰ **Timing**: Water early morning (6-8 AM) or evening (4-6 PM)\n🌱 **Mulching**: Use straw/plastic to retain soil moisture\n🌧️ **Rainwater**: Harvest and store for dry periods\n📊 **Scheduling**: Deep, less frequent watering is better\n\n**Critical Stages**: Flowering and grain filling need extra attention!`
  }
  
  // Government schemes
  if (lowerInput.includes('scheme') || lowerInput.includes('subsidy') || lowerInput.includes('government') || lowerInput.includes('योजना') || lowerInput.includes('सब्सिडी') || lowerInput.includes('सरकार')) {
    return isHindi
      ? `🏛️ **किसानों के लिए मुख्य सरकारी योजनाएं:**\n\n💰 **PM-KISAN**: ₹6000/वर्ष आय सहायता\n🛡️ **PMFBY**: फसल बीमा योजना\n💳 **KCC**: किसान क्रेडिट कार्ड (4% ब्याज)\n🚜 **मशीनरी**: 50-80% सब्सिडी\n🌱 **मिट्टी कार्ड**: मुफ्त मिट्टी जांच\n💧 **सिंचाई**: ड्रिप/स्प्रिंकलर पर 90% सब्सिडी\n\n**आवेदन**: CSC/ऑनलाइन पोर्टल से करें!`
      : `🏛️ **Key Government Schemes for Farmers:**\n\n💰 **PM-KISAN**: ₹6000/year income support\n🛡️ **PMFBY**: Crop insurance with low premium\n💳 **KCC**: Kisan Credit Card at 4% interest\n🚜 **Machinery**: 50-80% subsidy on farm equipment\n🌱 **Soil Health Card**: Free soil testing\n💧 **Irrigation**: 90% subsidy on drip/sprinkler systems\n🏭 **FPO**: Support for farmer producer organizations\n\n**Apply**: Visit CSC centers or online government portals!`
  }
  
  // Default intelligent response
  return isHindi
    ? `🤖 मैं आपके सवाल को समझ रहा हूं! ${context ? `आपके ${crop} के खेत के लिए` : 'आपके लिए'} मैं इन विषयों में मदद कर सकता हूं:\n\n• फसल की देखभाल और पैदावार बढ़ाना\n• खाद-पानी और मिट्टी प्रबंधन\n• रोग-कीट की पहचान और इलाज\n• बाजार भाव और बिक्री की रणनीति\n• सरकारी योजनाएं और सब्सिडी\n\nकृपया अपना सवाल विस्तार से पूछें!`
    : `🤖 I understand your question! ${context ? `For your ${crop} farm in ${location},` : 'For your farming needs,'} I can help with:\n\n• Crop care and yield improvement strategies\n• Fertilizer, irrigation, and soil management\n• Disease and pest identification & treatment\n• Market prices and selling strategies\n• Government schemes and subsidies\n• Weather alerts and farming calendar\n\nPlease ask me a specific question for detailed guidance!`
}
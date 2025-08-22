export const farmingKnowledge = {
  crops: {
    rice: {
      en: {
        planting: "Best time: June-July (Kharif), November-December (Rabi)",
        care: "Maintain 2-5cm water level, apply NPK 120:60:40 kg/ha",
        harvest: "110-120 days after transplanting",
        diseases: "Common: Blast, Brown spot, Sheath blight",
        price: "Current: ₹2,100-2,300/quintal"
      },
      hi: {
        planting: "सबसे अच्छा समय: जून-जुलाई (खरीफ), नवंबर-दिसंबर (रबी)",
        care: "2-5 सेमी पानी बनाए रखें, NPK 120:60:40 किग्रा/हेक्टेयर डालें",
        harvest: "रोपाई के 110-120 दिन बाद",
        diseases: "आम बीमारियां: ब्लास्ट, ब्राउन स्पॉट, शीथ ब्लाइट",
        price: "वर्तमान: ₹2,100-2,300/क्विंटल"
      }
    },
    wheat: {
      en: {
        planting: "Sowing: October-December, Seed rate: 100-125 kg/ha",
        care: "4-6 irrigations, NPK 120:60:40 kg/ha",
        harvest: "April-May, 120-150 days",
        diseases: "Rust, Smut, Bunt - use resistant varieties",
        price: "Current: ₹2,200-2,400/quintal"
      },
      hi: {
        planting: "बुआई: अक्टूबर-दिसंबर, बीज दर: 100-125 किग्रा/हेक्टेयर",
        care: "4-6 सिंचाई, NPK 120:60:40 किग्रा/हेक्टेयर",
        harvest: "अप्रैल-मई, 120-150 दिन",
        diseases: "रस्ट, स्मट, बंट - प्रतिरोधी किस्में उगाएं",
        price: "वर्तमान: ₹2,200-2,400/क्विंटल"
      }
    },
    cotton: {
      en: {
        planting: "April-June, spacing 90x45 cm",
        care: "8-10 irrigations, monitor for bollworm",
        harvest: "October-January, 150-180 days",
        diseases: "Bollworm, Whitefly - use IPM practices",
        price: "Current: ₹6,000-7,000/quintal"
      },
      hi: {
        planting: "अप्रैल-जून, दूरी 90x45 सेमी",
        care: "8-10 सिंचाई, बॉलवर्म की निगरानी करें",
        harvest: "अक्टूबर-जनवरी, 150-180 दिन",
        diseases: "बॉलवर्म, सफेद मक्खी - IPM अपनाएं",
        price: "वर्तमान: ₹6,000-7,000/क्विंटल"
      }
    }
  },
  
  schemes: {
    en: {
      pmkisan: "PM-KISAN: ₹6,000/year direct benefit transfer to farmers. Register at pmkisan.gov.in",
      pmfby: "Crop Insurance: PMFBY covers crop losses. Premium: 2% for Kharif, 1.5% for Rabi",
      kcc: "Kisan Credit Card: Easy loans up to ₹3 lakh at 7% interest. Apply at nearest bank",
      soilcard: "Soil Health Card: Free soil testing every 3 years. Check soilhealth.dac.gov.in"
    },
    hi: {
      pmkisan: "पीएम-किसान: ₹6,000/वर्ष सीधा लाभ। pmkisan.gov.in पर रजिस्टर करें",
      pmfby: "फसल बीमा: PMFBY फसल नुकसान कवर करता है। प्रीमियम: खरीफ 2%, रबी 1.5%",
      kcc: "किसान क्रेडिट कार्ड: ₹3 लाख तक 7% ब्याज पर आसान लोन",
      soilcard: "मृदा स्वास्थ्य कार्ड: हर 3 साल मुफ्त मिट्टी जांच"
    }
  },

  weather: {
    en: {
      monsoon: "Normal monsoon expected. Good for kharif sowing. Continue rice, cotton, sugarcane planting",
      temperature: "Temperature 25-35°C ideal for most crops. Avoid midday spraying",
      humidity: "High humidity (70-80%) good for rice. Ensure proper ventilation for stored grains",
      advisory: "Weather suitable for farming operations. Monitor for pest outbreaks in humid conditions"
    },
    hi: {
      monsoon: "सामान्य मानसून की उम्मीद। खरीफ बुआई के लिए अच्छा। धान, कपास, गन्ना बोना जारी रखें",
      temperature: "25-35°C तापमान अधिकांश फसलों के लिए आदर्श। दोपहर में छिड़काव न करें",
      humidity: "उच्च आर्द्रता (70-80%) धान के लिए अच्छी। भंडारित अनाज के लिए उचित हवादार",
      advisory: "मौसम खेती के कामों के लिए उपयुक्त। नम स्थितियों में कीट प्रकोप की निगरानी करें"
    }
  },

  diseases: {
    en: {
      rice: "Rice Blast: Use resistant varieties, avoid excess nitrogen. Spray Tricyclazole if needed",
      wheat: "Wheat Rust: Use certified seeds, spray Propiconazole at first sign",
      cotton: "Bollworm: Use pheromone traps, spray Bt or Spinosad when threshold reached",
      general: "Prevention: Crop rotation, resistant varieties, balanced nutrition, proper spacing"
    },
    hi: {
      rice: "धान ब्लास्ट: प्रतिरोधी किस्में उगाएं, अधिक नाइट्रोजन न दें। जरूरत पर ट्राइसाइक्लाजोल छिड़कें",
      wheat: "गेहूं रस्ट: प्रमाणित बीज उपयोग करें, पहले लक्षण पर प्रोपिकोनाजोल छिड़कें",
      cotton: "बॉलवर्म: फेरोमोन ट्रैप लगाएं, सीमा पार करने पर Bt या स्पिनोसैड छिड़कें",
      general: "रोकथाम: फसल चक्र, प्रतिरोधी किस्में, संतुलित पोषण, उचित दूरी"
    }
  }
}

export const getSmartResponse = (query: string, language: string = 'en') => {
  const lowerQuery = query.toLowerCase()
  const lang = language as 'en' | 'hi'
  
  // Crop-specific responses
  for (const [crop, data] of Object.entries(farmingKnowledge.crops)) {
    if (lowerQuery.includes(crop)) {
      const cropData = data[lang] || data.en
      return `🌾 ${crop.toUpperCase()} Information:\n\n📅 Planting: ${cropData.planting}\n🌱 Care: ${cropData.care}\n🌾 Harvest: ${cropData.harvest}\n🦠 Diseases: ${cropData.diseases}\n💰 Price: ${cropData.price}`
    }
  }
  
  // Scheme responses
  if (lowerQuery.includes('scheme') || lowerQuery.includes('योजना') || lowerQuery.includes('subsidy')) {
    const schemes = farmingKnowledge.schemes[lang] || farmingKnowledge.schemes.en
    return `🏛️ Government Schemes:\n\n• ${schemes.pmkisan}\n• ${schemes.pmfby}\n• ${schemes.kcc}\n• ${schemes.soilcard}\n\nCall 1800-180-1551 for more info`
  }
  
  // Weather responses
  if (lowerQuery.includes('weather') || lowerQuery.includes('मौसम')) {
    const weather = farmingKnowledge.weather[lang] || farmingKnowledge.weather.en
    return `🌦️ Weather Update:\n\n${weather.monsoon}\n\n🌡️ ${weather.temperature}\n💧 ${weather.humidity}\n\n📋 Advisory: ${weather.advisory}`
  }
  
  // Disease responses
  if (lowerQuery.includes('disease') || lowerQuery.includes('बीमारी') || lowerQuery.includes('pest')) {
    const diseases = farmingKnowledge.diseases[lang] || farmingKnowledge.diseases.en
    return `🦠 Disease Management:\n\n• ${diseases.rice}\n• ${diseases.wheat}\n• ${diseases.cotton}\n\n💡 ${diseases.general}`
  }
  
  return null
}
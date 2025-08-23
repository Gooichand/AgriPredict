'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

const translations = {
  en: {
    selectLanguage: 'Select Language',
    title: 'Kisan Safe',
    home: 'Home',
    about: 'About',
    helplines: 'Helplines',
    news: 'News',
    cropDetails: 'Crop Details',
    location: 'Location',
    cropType: 'Crop Type',
    farmSize: 'Farm Size (in acres)',
    startDashboard: 'Start Farming Dashboard',
    locationPlaceholder: 'Enter pincode (110001) or city/area name (Mumbai, Andheri)',
    search: 'Search',
    autoDetect: 'Auto Detect',
    searching: 'Searching...',
    detecting: 'Detecting...',
    selected: 'Selected:',
    cropPlaceholder: 'Search for your crop...',
    farmSizePlaceholder: 'Enter farm size in acres',
    
    // Dashboard translations
    dashboard: 'Dashboard',
    yieldPrediction: 'AI Yield Prediction',
    weatherAlerts: 'Weather-Based Smart Alerts',
    marketPrices: 'Market Price Predictions',
    recommendations: 'Personalized Farming Recommendations',
    cropHealthAnalysis: 'AI Crop Health Analysis',
    smartFarmingAssistant: 'Smart Farming Assistant',
    interactiveMaps: 'Interactive Environmental Maps',
    dataSources: 'Data Sources',
    
    // About page
    aboutTitle: 'About Kisan Safe',
    aboutDescription: 'AI-powered smart farming solution for better crop yields',
    
    // Contact page
    contactTitle: 'Emergency Helplines',
    farmerHelpline: 'Farmer Helpline',
    weatherHelpline: 'Weather Helpline',
    
    // News page
    newsTitle: 'Agricultural News',
    latestNews: 'Latest News'
  },
  hi: {
    selectLanguage: 'भाषा चुनें',
    title: 'किसान सेफ',
    home: 'होम',
    about: 'हमारे बारे में',
    helplines: 'हेल्पलाइन',
    news: 'समाचार',
    cropDetails: 'फसल विवरण',
    location: 'स्थान',
    cropType: 'फसल का प्रकार',
    farmSize: 'खेत का आकार (एकड़ में)',
    startDashboard: 'फार्मिंग डैशबोर्ड शुरू करें',
    locationPlaceholder: 'पिनकोड (110001) या शहर/क्षेत्र का नाम दर्ज करें',
    search: 'खोजें',
    autoDetect: 'ऑटो डिटेक्ट',
    searching: 'खोज रहे हैं...',
    detecting: 'पता लगा रहे हैं...',
    selected: 'चयनित:',
    cropPlaceholder: 'अपनी फसल खोजें...',
    farmSizePlaceholder: 'खेत का आकार एकड़ में दर्ज करें',
    
    // Dashboard translations
    dashboard: 'डैशबोर्ड',
    yieldPrediction: 'AI फसल पूर्वानुमान',
    weatherAlerts: 'मौसम आधारित स्मार्ट अलर्ट',
    marketPrices: 'बाजार मूल्य पूर्वानुमान',
    recommendations: 'व्यक्तिगत खेती सुझाव',
    cropHealthAnalysis: 'AI फसल स्वास्थ्य विश्लेषण',
    smartFarmingAssistant: 'स्मार्ट फार्मिंग सहायक',
    interactiveMaps: 'इंटरैक्टिव पर्यावरणीय मैप',
    dataSources: 'डेटा स्रोत',
    
    // About page
    aboutTitle: 'किसान सेफ के बारे में',
    aboutDescription: 'बेहतर फसल उत्पादन के लिए AI-संचालित स्मार्ट खेती समाधान',
    
    // Contact page
    contactTitle: 'आपातकालीन हेल्पलाइन',
    farmerHelpline: 'किसान हेल्पलाइन',
    weatherHelpline: 'मौसम हेल्पलाइन',
    
    // News page
    newsTitle: 'कृषि समाचार',
    latestNews: 'ताजा खबरें'
  },
  te: {
    selectLanguage: 'భాష ఎంచుకోండి',
    title: 'కిసాన్ సేఫ్',
    home: 'హోమ్',
    about: 'మా గురించి',
    helplines: 'హెల్ప్లైన్స్',
    news: 'వార్తలు',
    cropDetails: 'పంట వివరాలు',
    location: 'స్థానం',
    cropType: 'పంట రకం',
    farmSize: 'వ్యవసాయ భూమి పరిమాణం (ఎకరాలలో)',
    startDashboard: 'వ్యవసాయ డాష్బోర్డ్ ప్రారంభించండి',
    locationPlaceholder: 'పిన్కోడ్ (110001) లేదా పట్టణం/ప్రాంతం పేరు నమోదు చేయండి',
    search: 'వెతకండి',
    autoDetect: 'ఆటో డిటెక్ట్',
    searching: 'వెతకుతున్నాము...',
    detecting: 'గుర్తిస్తున్నాము...',
    selected: 'ఎంచుకున్నది:',
    cropPlaceholder: 'మీ పంటను వెతకండి...',
    farmSizePlaceholder: 'వ్యవసాయ భూమి పరిమాణం ఎకరాలలో నమోదు చేయండి',
    
    // Dashboard translations
    dashboard: 'డాష్బోర్డ్',
    yieldPrediction: 'AI పంట అంచనా',
    weatherAlerts: 'వాతావరణ ఆధారిత స్మార్ట్ అలర్ట్లు',
    marketPrices: 'మార్కెట్ విలువ అంచనాలు',
    recommendations: 'వ్యక్తిగత వ్యవసాయ సిఫార్సులు',
    cropHealthAnalysis: 'AI పంట ఆరోగ్య విశ్లేషణ',
    smartFarmingAssistant: 'స్మార్ట్ వ్యవసాయ సహాయకుడు',
    interactiveMaps: 'ఇంటరాక్టివ్ పర్యావరణ మ్యాప్లు',
    dataSources: 'డేటా స్రోతస్సు',
    
    // About page
    aboutTitle: 'కిసాన్ సేఫ్ గురించి',
    aboutDescription: 'మెరుగైన పంట దిగుబడి కోసం AI-శక్తితో కూడిన స్మార్ట్ వ్యవసాయ పరిష్కారం',
    contactTitle: 'అత్యవసర హెల్ప్లైన్లు',
    farmerHelpline: 'రైతు హెల్ప్లైన్',
    weatherHelpline: 'వాతావరణ హెల్ప్లైన్',
    newsTitle: 'వ్యవసాయ వార్తలు',
    latestNews: 'తాజా వార్తలు'
  },
  ta: {
    selectLanguage: 'மொழி தேர்வு செய்க',
    title: 'கிசான் சேஃப்',
    home: 'முகப்பு',
    about: 'எங்களைப் பற்றி',
    helplines: 'உதவி எண்கள்',
    news: 'செய்திகள்',
    cropDetails: 'பயிர் விவரங்கள்',
    location: 'இடம்',
    cropType: 'பயிர் வகை',
    farmSize: 'பண்ணை அளவு (ஏக்கரில்)',
    startDashboard: 'விவசாய டாஷ்போர்டைத் தொடங்கவும்',
    locationPlaceholder: 'பின்கோட் (110001) அல்லது நகரம்/பரிசர் பெயரை உள்ளிடவும்',
    search: 'தேடுக',
    autoDetect: 'தானாக கண்டறியும்',
    searching: 'தேடிக்கொண்டிருக்கிறது...',
    detecting: 'கண்டறிக்கிறது...',
    selected: 'தேர்ந்தெடுக்கப்பட்டது:',
    cropPlaceholder: 'உங்கள் பயிரைத் தேடுங்கள்...',
    farmSizePlaceholder: 'பண்ணை அளவை ஏக்கரில் உள்ளிடவும்',
    
    // Dashboard translations
    dashboard: 'டாஷ்போர்டு',
    yieldPrediction: 'AI பயிர் முன்னறிவிப்பு',
    weatherAlerts: 'வானிலை ஆதாரித ஸ்மார்ட் எச்சரிக்கைகள்',
    marketPrices: 'சந்தை விலை முன்னறிவிப்புகள்',
    recommendations: 'தனிப்பட்ட விவசாய பரிந்துரைகள்',
    cropHealthAnalysis: 'AI பயிர் ஆரோக்கிய பிரிவு',
    smartFarmingAssistant: 'ஸ்மார்ட் விவசாய துணைவர்',
    interactiveMaps: 'இணையாக சுற்றுச் சூழல் வரைபடங்கள்',
    dataSources: 'தகவல் மூலங்கள்',
    
    // About page
    aboutTitle: 'கிசான் சேஃப் பற்றி',
    aboutDescription: 'சிறந்த பயிர் விளைச்சலுக்கான AI-இயங்கும் ஸ்மார்ட் விவசாய தீர்வு',
    contactTitle: 'அவசர உதவி எண்கள்',
    farmerHelpline: 'விவசாயி உதவி எண்',
    weatherHelpline: 'வானிலை உதவி எண்',
    newsTitle: 'விவசாய செய்திகள்',
    latestNews: 'சமீபத்திய செய்திகள்'
  },
  bn: {
    selectLanguage: 'ভাষা নির্বাচন করুন',
    title: 'কিসান সেফ',
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    helplines: 'হেল্পলাইন',
    news: 'সংবাদ',
    farmTitle: '🌱 আপনার খামার সম্পর্কে বলুন 🌾',
    locationLabel: '🏡 আপনার খামার কোথায় অবস্থিত?',
    locationHint: 'আমরা স্বয়ংক্রিয়ভাবে আপনার অবস্থান সনাক্ত করেছি, বা ম্যানুয়ালি প্রবেশ করান',
    locationPlaceholder: 'বিশ্বব্যাপী অবস্থান অনুসন্ধান করুন (যেমন, নিউইয়র্ক, মুম্বাই, লন্ডন, টোকিও)',
    refreshLocation: '🔄 আমার অবস্থান রিফ্রেশ করুন',
    cropLabel: '🌾 আপনি কী ফসল চাষ করছেন?',
    cropPlaceholder: 'আপনার ফসল অনুসন্ধান করুন (যেমন, চাল, গম, টমেটো)',
    farmSizeLabel: '🚜 খামারের আকার (একর)',
    farmSizePlaceholder: 'খামারের আকার প্রবেশ করান',
    submitButton: '🚀 কৃষি ড্যাশবোর্ড শুরু করুন',
    gettingLocation: '📍 আপনার অবস্থান পাচ্ছি...',
    selected: '✅ নির্বাচিত:',
    noLocationsFound: 'কোনো অবস্থান পাওয়া যায়নি। আপনি এখনও আপনার কাস্টম অবস্থান টাইপ করতে পারেন।',
    noCropsFound: 'কোনো ফসল পাওয়া যায়নি',
    dashboard: 'ড্যাশবোর্ড',
    yieldPrediction: 'ফসল পূর্বাভাস',
    weatherAlerts: 'আবহাওয়া সতর্কতা',
    marketPrices: 'বাজার দাম',
    recommendations: 'সুপারিশ',
    aboutTitle: 'কিসানসেফ সম্পর্কে',
    aboutDescription: 'উন্নত ফসল উৎপাদনের জন্য AI-চালিত স্মার্ট কৃষি সমাধান',
    contactTitle: 'জরুরি হেল্পলাইন',
    farmerHelpline: 'কৃষক হেল্পলাইন',
    weatherHelpline: 'আবহাওয়া হেল্পলাইন',
    newsTitle: 'কৃষি সংবাদ',
    latestNews: 'সর্বশেষ সংবাদ'
  },
  gu: {
    selectLanguage: 'ભાષા પસંદ કરો',
    title: 'કિસાન સેફ',
    home: 'હોમ',
    about: 'અમારા વિશે',
    helplines: 'હેલ્પલાઇન',
    news: 'સમાચાર',
    farmTitle: '🌱 તમારા ખેતર વિશે કહો 🌾',
    locationLabel: '🏡 તમારું ખેતર ક્યાં આવેલું છે?',
    locationHint: 'અમે તમારું સ્થાન આપોઆપ શોધી કાઢ્યું છે, અથવા મેન્યુઅલી દાખલ કરો',
    locationPlaceholder: 'વિશ્વવ્યાપી સ્થાનો શોધો (જેમ કે, ન્યૂયોર્ક, મુંબઈ, લંડન, ટોક્યો)',
    refreshLocation: '🔄 મારું સ્થાન રિફ્રેશ કરો',
    cropLabel: '🌾 તમે કયો પાક ઉગાડો છો?',
    cropPlaceholder: 'તમારો પાક શોધો (જેમ કે, ચોખા, ઘઉં, ટામેટાં)',
    farmSizeLabel: '🚜 ખેતરનું કદ (એકર)',
    farmSizePlaceholder: 'ખેતરનું કદ દાખલ કરો',
    submitButton: '🚀 ખેતી ડેશબોર્ડ શરૂ કરો',
    gettingLocation: '📍 તમારું સ્થાન મેળવી રહ્યા છીએ...',
    selected: '✅ પસંદ કરેલ:',
    noLocationsFound: 'કોઈ સ્થાન મળ્યું નથી. તમે હજુ પણ તમારું કસ્ટમ સ્થાન ટાઈપ કરી શકો છો.',
    noCropsFound: 'કોઈ પાક મળ્યો નથી',
    dashboard: 'ડેશબોર્ડ',
    yieldPrediction: 'પાક આગાહી',
    weatherAlerts: 'હવામાન ચેતવણી',
    marketPrices: 'બજાર ભાવ',
    recommendations: 'ભલામણો',
    aboutTitle: 'કિસાનસેફ વિશે',
    aboutDescription: 'વધુ સારા પાક ઉત્પાદન માટે AI-સંચાલિત સ્માર્ટ ખેતી સમાધાન',
    contactTitle: 'કટોકટી હેલ્પલાઇન',
    farmerHelpline: 'ખેડૂત હેલ્પલાઇન',
    weatherHelpline: 'હવામાન હેલ્પલાઇન',
    newsTitle: 'કૃષિ સમાચાર',
    latestNews: 'તાજા સમાચાર'
  }
}

type Language = keyof typeof translations
type TranslationKey = keyof typeof translations.en

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: TranslationKey) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  // Load saved language on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('kisanSafeLanguage') as Language
      if (saved && translations[saved]) {
        setLanguage(saved)
      }
    }
  }, [])

  // Save language when changed
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    if (typeof window !== 'undefined') {
      localStorage.setItem('kisanSafeLanguage', lang)
    }
  }

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key]
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
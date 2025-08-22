'use client'

import { useState } from 'react'
import { validateCropLocation } from '@/lib/cropLocationValidator'

interface CropAdvisoryProps {
  onSaveAdvice?: (advice: any) => void
}

export default function SmartCropAdvisory({ onSaveAdvice }: CropAdvisoryProps) {
  const [selectedCrop, setSelectedCrop] = useState('')
  const [selectedState, setSelectedState] = useState('')
  const [advisory, setAdvisory] = useState<any>(null)
  const [language, setLanguage] = useState<'en' | 'hi'>('en')

  const crops = [
    'Rice', 'Wheat', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion', 'Corn',
    'Soybean', 'Mustard', 'Groundnut', 'Barley', 'Millet', 'Chickpea'
  ]

  const indianStates = [
    'Andhra Pradesh', 'Bihar', 'Gujarat', 'Haryana', 'Himachal Pradesh',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Odisha',
    'Punjab', 'Rajasthan', 'Tamil Nadu', 'Uttar Pradesh', 'West Bengal'
  ]

  const handleAnalyze = () => {
    if (!selectedCrop || !selectedState) return
    
    const result = validateCropLocation(selectedCrop.toLowerCase(), selectedState.toUpperCase())
    setAdvisory({
      crop: selectedCrop,
      state: selectedState,
      ...result
    })
  }

  const handlePrint = () => {
    window.print()
  }

  const handleSave = () => {
    if (advisory && onSaveAdvice) {
      onSaveAdvice(advisory)
      alert(language === 'hi' ? 'सलाह सेव हो गई!' : 'Advice saved successfully!')
    }
  }

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200'
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default: return 'text-green-600 bg-green-50 border-green-200'
    }
  }

  const getRiskIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴'
      case 'medium': return '🟡'
      default: return '🟢'
    }
  }

  const translations = {
    en: {
      title: 'Smart Crop Advisory',
      selectCrop: 'Select Your Crop',
      selectState: 'Select Your State',
      analyze: 'Get Advisory',
      riskLevel: 'Risk Level',
      high: 'High Risk',
      medium: 'Medium Risk',
      low: 'Suitable',
      whyMatters: 'Why This Matters',
      scienceExplain: 'Each crop has specific climate needs. Wrong choices can lead to 50-80% yield loss, pest problems, and financial stress.',
      print: 'Print Advisory',
      save: 'Save Advice',
      moreInfo: 'Learn More About Alternatives'
    },
    hi: {
      title: 'स्मार्ट फसल सलाहकार',
      selectCrop: 'अपनी फसल चुनें',
      selectState: 'अपना राज्य चुनें',
      analyze: 'सलाह पाएं',
      riskLevel: 'जोखिम स्तर',
      high: 'उच्च जोखिम',
      medium: 'मध्यम जोखिम',
      low: 'उपयुक्त',
      whyMatters: 'यह क्यों महत्वपूर्ण है',
      scienceExplain: 'हर फसल की अलग जलवायु जरूरतें होती हैं। गलत चुनाव से 50-80% नुकसान, कीट समस्या और आर्थिक तनाव हो सकता है।',
      print: 'सलाह प्रिंट करें',
      save: 'सलाह सेव करें',
      moreInfo: 'विकल्पों के बारे में और जानें'
    }
  }

  const t = translations[language]

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700 flex items-center gap-2">
          🌾 {t.title}
        </h1>
        <button
          onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
          className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
        >
          {language === 'en' ? 'हिंदी' : 'English'}
        </button>
      </div>

      {/* Selection Interface */}
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            🌱 {t.selectCrop}
          </label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:outline-none"
          >
            <option value="">{language === 'hi' ? 'फसल चुनें' : 'Choose crop...'}</option>
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            📍 {t.selectState}
          </label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full p-4 border-2 border-gray-300 rounded-lg text-lg focus:border-green-500 focus:outline-none"
          >
            <option value="">{language === 'hi' ? 'राज्य चुनें' : 'Choose state...'}</option>
            {indianStates.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Analyze Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleAnalyze}
          disabled={!selectedCrop || !selectedState}
          className="px-8 py-4 bg-green-600 text-white text-xl font-semibold rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transform hover:scale-105 transition-all"
        >
          🔍 {t.analyze}
        </button>
      </div>

      {/* Advisory Results */}
      {advisory && (
        <div className="space-y-6">
          {/* Risk Level Card */}
          <div className={`p-6 rounded-xl border-2 ${getRiskColor(advisory.severity)}`}>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{getRiskIcon(advisory.severity)}</span>
              <div>
                <h2 className="text-2xl font-bold">{t.riskLevel}</h2>
                <p className="text-lg">
                  {advisory.severity === 'high' ? t.high : 
                   advisory.severity === 'medium' ? t.medium : t.low}
                </p>
              </div>
            </div>
            
            <div className="bg-white p-4 rounded-lg">
              <p className="text-lg leading-relaxed">{advisory.message}</p>
            </div>
          </div>

          {/* Why This Matters Section */}
          <div className="bg-blue-50 p-6 rounded-xl border-2 border-blue-200">
            <h3 className="text-xl font-bold text-blue-800 mb-3 flex items-center gap-2">
              🧠 {t.whyMatters}
            </h3>
            <p className="text-blue-700 text-lg">{t.scienceExplain}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={handlePrint}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2"
            >
              🖨️ {t.print}
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              💾 {t.save}
            </button>
            <button
              onClick={() => window.open('https://agricoop.gov.in', '_blank')}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2"
            >
              📚 {t.moreInfo}
            </button>
          </div>
        </div>
      )}

      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          body { font-size: 14px; }
          .print-friendly { 
            background: white !important;
            color: black !important;
            border: 1px solid #ccc !important;
          }
        }
      `}</style>
    </div>
  )
}
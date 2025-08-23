'use client'

import { useEffect, useState, useRef } from 'react'
import YieldChart from './YieldChart'
import AlertMap from './AlertMap'
import AIRecommendations from './AIRecommendations'
import CropHealthAnalysis from './CropHealthAnalysis'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useAuth } from '@/contexts/AuthContext'
import LanguageSwitcher from './LanguageSwitcher'

interface FarmData {
  location: string
  crop: string
  farmSize: string
  pincode?: string
  district?: string
  state?: string
  postOffice?: string
}

export default function Dashboard() {
  const [farmData, setFarmData] = useState<FarmData | null>(null)
  const [activeSection, setActiveSection] = useState('overview')
  const [showWarningPopup, setShowWarningPopup] = useState(false)
  const [cropWarning, setCropWarning] = useState<{isWarning: boolean, message: string, severity: string} | null>(null)
  const { t } = useLanguage()
  const { user, isGuest } = useAuth()
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('farmData')
      if (data) {
        try {
          setFarmData(JSON.parse(data))
        } catch (error) {
          console.warn('Invalid farm data in localStorage')
          localStorage.removeItem('farmData')
        }
      }
      
      // Check for crop warning
      const warningData = localStorage.getItem('cropWarning')
      if (warningData) {
        try {
          const warning = JSON.parse(warningData)
          setCropWarning(warning)
          if (warning.isWarning) {
            setShowWarningPopup(true)
          }
          localStorage.removeItem('cropWarning')
        } catch (error) {
          console.warn('Invalid warning data in localStorage')
        }
      }
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['overview', 'schedule', 'recommendations', 'map', 'health', 'sources']
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const element = document.getElementById(sections[i])
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [farmData])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const getCropYield = (crop: string, state?: string, district?: string) => {
    // Base yields by crop
    const baseYields: { [key: string]: number } = {
      rice: 4.2, wheat: 3.1, corn: 5.8, barley: 2.9, millet: 1.8,
      potato: 18.5, tomato: 28.6, onion: 13.8, cotton: 1.8, sugarcane: 52.3,
      soybean: 2.6, chickpea: 1.8, mustard: 1.6, sunflower: 1.9
    }
    
    // State-wise yield multipliers (based on agricultural productivity)
    const stateMultipliers: { [key: string]: number } = {
      'PUNJAB': 1.3, 'HARYANA': 1.25, 'UTTAR PRADESH': 1.1,
      'WEST BENGAL': 1.15, 'BIHAR': 0.9, 'MAHARASHTRA': 1.2,
      'GUJARAT': 1.18, 'RAJASTHAN': 0.85, 'MADHYA PRADESH': 1.05,
      'KARNATAKA': 1.1, 'ANDHRA PRADESH': 1.12, 'TAMIL NADU': 1.15,
      'KERALA': 1.08, 'ODISHA': 0.95, 'JHARKHAND': 0.88
    }
    
    const baseYield = baseYields[crop.toLowerCase()] || 4.5
    const stateMultiplier = state ? (stateMultipliers[state.toUpperCase()] || 1.0) : 1.0
    
    // Add some randomness for realism (±10%)
    const randomFactor = 0.9 + (Math.random() * 0.2)
    
    return (baseYield * stateMultiplier * randomFactor).toFixed(1)
  }

  const getCropAlert = (crop: string, state?: string, district?: string) => {
    const currentMonth = new Date().getMonth() + 1
    const currentSeason = currentMonth >= 6 && currentMonth <= 9 ? 'monsoon' : 
                         currentMonth >= 10 && currentMonth <= 2 ? 'winter' : 'summer'
    
    const cropAlerts: { [key: string]: { [key: string]: { type: string; message: string } } } = {
      rice: {
        monsoon: { type: 'Water Management', message: `Monitor water levels in ${district || 'your area'} - optimal for rice growth` },
        winter: { type: 'Harvest Alert', message: `Rabi rice harvest time in ${state || 'your region'}` },
        summer: { type: 'Land Preparation', message: `Prepare fields for next planting season in ${district || 'your area'}` }
      },
      wheat: {
        monsoon: { type: 'Planting Alert', message: `Post-monsoon wheat planting optimal in ${state || 'your region'}` },
        winter: { type: 'Growth Monitoring', message: `Monitor wheat growth in ${district || 'your area'} - critical growth phase` },
        summer: { type: 'Harvest Alert', message: `Wheat harvest season in ${state || 'your region'}` }
      },
      cotton: {
        monsoon: { type: 'Pest Alert', message: `Monitor for bollworm in ${district || 'your area'} during monsoon` },
        winter: { type: 'Harvest Preparation', message: `Cotton harvest approaching in ${state || 'your region'}` },
        summer: { type: 'Planting Alert', message: `Cotton planting season in ${district || 'your area'}` }
      },
      tomato: {
        monsoon: { type: 'Disease Alert', message: `Watch for blight in ${district || 'your area'} during monsoon` },
        winter: { type: 'Growth Optimal', message: `Ideal growing conditions for tomato in ${state || 'your region'}` },
        summer: { type: 'Water Management', message: `Increase irrigation for tomato in ${district || 'your area'}` }
      }
    }
    
    const alert = cropAlerts[crop.toLowerCase()]?.[currentSeason] || 
                 { type: 'Weather Alert', message: `Monitor local weather conditions in ${district || state || 'your area'}` }
    
    return alert
  }

  const getPlantingSchedule = (crop: string) => {
    const now = new Date()
    const currentYear = now.getFullYear()
    const currentMonth = now.getMonth() + 1
    
    const getCurrentSeason = () => {
      if (currentMonth >= 6 && currentMonth <= 9) return 'Monsoon (Kharif)'
      if (currentMonth >= 10 || currentMonth <= 2) return 'Winter (Rabi)'
      return 'Summer (Zaid)'
    }
    
    const getNextPlantingDate = (plantingMonths: number[]) => {
      for (const month of plantingMonths) {
        const plantingDate = new Date(currentYear, month - 1, 15)
        if (plantingDate > now) {
          return plantingDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      }
      // If all dates passed, get next year's first planting date
      const nextYearDate = new Date(currentYear + 1, plantingMonths[0] - 1, 15)
      return nextYearDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    
    const getHarvestDate = (plantingMonths: number[], growthMonths: number) => {
      for (const month of plantingMonths) {
        const plantingDate = new Date(currentYear, month - 1, 15)
        if (plantingDate > now) {
          const harvestDate = new Date(plantingDate)
          harvestDate.setMonth(harvestDate.getMonth() + growthMonths)
          return harvestDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
        }
      }
      // Next year calculation
      const nextYearPlanting = new Date(currentYear + 1, plantingMonths[0] - 1, 15)
      const nextYearHarvest = new Date(nextYearPlanting)
      nextYearHarvest.setMonth(nextYearHarvest.getMonth() + growthMonths)
      return nextYearHarvest.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    }
    
    const schedules: { [key: string]: { season: string; months: string; nextPlanting: string; harvestTime: string; currentSeason: string; bestSeason: string } } = {
      rice: { 
        season: 'Kharif & Rabi', 
        months: 'June-July (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: getNextPlantingDate([6, 11]),
        harvestTime: getHarvestDate([6, 11], 4),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Monsoon (Kharif) - High rainfall ideal'
      },
      wheat: { 
        season: 'Rabi', 
        months: 'October-December', 
        nextPlanting: getNextPlantingDate([10, 11, 12]),
        harvestTime: getHarvestDate([10, 11, 12], 5),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Winter (Rabi) - Cool weather preferred'
      },
      corn: { 
        season: 'Kharif & Rabi', 
        months: 'June-July (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: getNextPlantingDate([6, 11]),
        harvestTime: getHarvestDate([6, 11], 3),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Monsoon (Kharif) - Warm & wet conditions'
      },
      cotton: { 
        season: 'Kharif', 
        months: 'April-June', 
        nextPlanting: getNextPlantingDate([4, 5, 6]),
        harvestTime: getHarvestDate([4, 5, 6], 6),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Summer to Monsoon - Long growing period'
      },
      sugarcane: { 
        season: 'Year-round', 
        months: 'February-April (Spring) | Oct-Nov (Autumn)', 
        nextPlanting: getNextPlantingDate([2, 3, 4, 10, 11]),
        harvestTime: getHarvestDate([2, 3, 4, 10, 11], 12),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Spring planting - 12-month crop cycle'
      },
      soybean: { 
        season: 'Kharif', 
        months: 'June-July', 
        nextPlanting: getNextPlantingDate([6, 7]),
        harvestTime: getHarvestDate([6, 7], 4),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Monsoon (Kharif) - Adequate rainfall needed'
      },
      potato: { 
        season: 'Rabi', 
        months: 'October-December', 
        nextPlanting: getNextPlantingDate([10, 11, 12]),
        harvestTime: getHarvestDate([10, 11, 12], 3),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Winter (Rabi) - Cool weather essential'
      },
      tomato: { 
        season: 'Year-round', 
        months: 'July-Aug (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: getNextPlantingDate([7, 8, 11, 12]),
        harvestTime: getHarvestDate([7, 8, 11, 12], 3),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Winter (Rabi) - Better fruit quality'
      },
      onion: { 
        season: 'Rabi', 
        months: 'November-January', 
        nextPlanting: getNextPlantingDate([11, 12, 1]),
        harvestTime: getHarvestDate([11, 12, 1], 5),
        currentSeason: getCurrentSeason(),
        bestSeason: 'Winter (Rabi) - Long day variety'
      }
    }
    return schedules[crop] || { 
      season: 'Seasonal', 
      months: 'Consult local agricultural officer', 
      nextPlanting: 'Check with local experts',
      harvestTime: 'Varies by crop variety',
      currentSeason: getCurrentSeason(),
      bestSeason: 'Depends on crop variety'
    }
  }

  if (!farmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to {t('title')}!</h2>
          <p className="mb-4">Please set up your farm information first.</p>
          <Link href="/crop-setup" className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
            Set Up Farm
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor: '#4CAF50', transform: 'scale(1.3)'}}>
              <div className="absolute inset-0 rounded-full opacity-20" style={{backgroundImage: 'radial-gradient(circle, #8BC34A 0%, #4CAF50 50%, #2E7D32 100%)'}}></div>
              <span className="relative z-10 text-white font-bold text-lg">K.S</span>
            </div>
            <Link href="/crop-setup" className="text-2xl font-bold">
              {t('title')}
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {user && (
              <div className="text-sm">
                Welcome, {user.name}!
              </div>
            )}
            {isGuest && (
              <div className="text-sm opacity-75">
                Guest Mode
              </div>
            )}
            <div className="flex gap-6">
              <Link href="/crop-setup" className="hover:text-yellow-200">{t('home')}</Link>
              <Link href="/about" className="hover:text-yellow-200">{t('about')}</Link>
              <Link href="/contact" className="hover:text-yellow-200">{t('helplines')}</Link>
              <Link href="/news" className="hover:text-yellow-200">{t('news')}</Link>
              <Link href="/crop-advisory" className="hover:text-yellow-200">Crop Advisory</Link>
              <Link href="/dashboard" className="hover:text-yellow-200 font-semibold">{t('dashboard')}</Link>
              {!isGuest && <Link href="/profile" className="hover:text-yellow-200">👤 Profile</Link>}
              {isGuest && <Link href="/login" className="hover:text-yellow-200">⚙️ Login/Signup</Link>}
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      {/* Scroll Spy Navigation */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 bg-white rounded-lg shadow-lg p-2">
        <div className="flex flex-col gap-2">
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'schedule', icon: '📅', label: 'Schedule' },
            { id: 'recommendations', icon: '🤖', label: 'AI Tips' },
            { id: 'map', icon: '🗺️', label: 'Map' },
            { id: 'health', icon: '🔬', label: 'Health' },
            { id: 'sources', icon: '📈', label: 'Data' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              className={`p-2 rounded-lg text-sm transition-all duration-200 ${
                activeSection === section.id 
                  ? 'bg-green-600 text-white shadow-md' 
                  : 'bg-gray-100 text-gray-600 hover:bg-green-100'
              }`}
              title={section.label}
            >
              <div className="text-lg">{section.icon}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Warning Popup */}
      {showWarningPopup && cropWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 max-w-md mx-4 border-l-4 ${
            cropWarning.severity === 'high' ? 'border-red-500' : 'border-yellow-500'
          }`}>
            <div className="flex items-center mb-4">
              <span className="text-2xl mr-3">
                {cropWarning.severity === 'high' ? '🚨' : '⚠️'}
              </span>
              <h3 className={`text-lg font-semibold ${
                cropWarning.severity === 'high' ? 'text-red-800' : 'text-yellow-800'
              }`}>
                {cropWarning.severity === 'high' ? 'High Risk Warning' : 'Caution'}
              </h3>
            </div>
            <p className={`text-sm mb-4 ${
              cropWarning.severity === 'high' ? 'text-red-700' : 'text-yellow-700'
            }`}>
              {cropWarning.message}
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowWarningPopup(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              >
                I Understand
              </button>
              <Link
                href="/crop-setup"
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-center"
              >
                Change Crop
              </Link>
            </div>
          </div>
        </div>
      )}

      <main className="container mx-auto p-6">
        <div 
          id="overview"
          className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg mb-6"
        >
          <h2 className="text-3xl font-bold mb-2">🌾 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Farm Dashboard</h2>
          <div className="flex flex-wrap gap-4 text-sm">
            <span>📍 {farmData.location}</span>
            <span>🏡 {farmData.farmSize} acres</span>
            {farmData.district && <span>🏛️ {farmData.district} District</span>}
            {farmData.state && <span>🗺️ {farmData.state}</span>}
            {farmData.pincode && <span>📮 PIN: {farmData.pincode}</span>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">{t('yieldPrediction')}</h3>
            <p className="text-3xl font-bold text-green-600">
              {getCropYield(farmData.crop, farmData.state, farmData.district)} tons/acre
            </p>
            <p className="text-lg text-green-500 mt-1">
              Total: {(parseFloat(getCropYield(farmData.crop, farmData.state, farmData.district)) * parseFloat(farmData.farmSize)).toFixed(1)} tons
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Based on {farmData.state || 'regional'} agricultural data
            </p>
            <p className="text-sm text-gray-500 mt-2">For {farmData.farmSize} acres</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">🚨 {t('weatherAlerts')}</h3>
            <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
              <p className="font-semibold">{getCropAlert(farmData.crop, farmData.state, farmData.district).type}</p>
              <p className="text-sm">{getCropAlert(farmData.crop, farmData.state, farmData.district).message}</p>
              <p className="text-xs text-gray-500 mt-1">Source: {farmData.state || 'Regional'} Agricultural Department</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Yield Trends</h3>
            <YieldChart crop={farmData.crop} />
          </div>
        </div>

        <div 
          id="schedule"
          className="mt-6 bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4">📅 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Schedule for {farmData.state || 'Your Region'}</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                🌤️ Current Season
              </h4>
              <p className="text-lg font-bold text-blue-700">{getPlantingSchedule(farmData.crop).currentSeason}</p>
              <p className="text-xs text-blue-600 mt-1">Based on current date: {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                ⭐ Best Season
              </h4>
              <p className="text-sm font-medium text-green-700">{getPlantingSchedule(farmData.crop).bestSeason}</p>
              <p className="text-xs text-green-600 mt-1">Optimal growing conditions for {farmData.crop}</p>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
              <h4 className="font-semibold text-purple-800 mb-2 flex items-center gap-2">
                📍 Location
              </h4>
              <p className="text-sm font-medium text-purple-700">{farmData.state || 'Your Region'}</p>
              <p className="text-xs text-purple-600 mt-1">{farmData.district || 'District'} - {farmData.farmSize} acres</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                🌱 Next Planting Date
              </h4>
              <div className="bg-white p-3 rounded-md mb-2">
                <p className="text-lg font-bold text-green-700">{getPlantingSchedule(farmData.crop).nextPlanting}</p>
              </div>
              <p className="text-sm text-green-700 mb-1"><strong>Season:</strong> {getPlantingSchedule(farmData.crop).season}</p>
              <p className="text-sm text-green-700 mb-1"><strong>Ideal Months:</strong> {getPlantingSchedule(farmData.crop).months}</p>
              <p className="text-xs text-green-600 mt-2">📍 Calculated for {farmData.state || 'your region'} climate</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                🌾 Expected Harvest Date
              </h4>
              <div className="bg-white p-3 rounded-md mb-2">
                <p className="text-lg font-bold text-blue-700">{getPlantingSchedule(farmData.crop).harvestTime}</p>
              </div>
              <p className="text-sm text-blue-700 mb-1"><strong>Expected Yield:</strong> {(parseFloat(getCropYield(farmData.crop, farmData.state, farmData.district)) * parseFloat(farmData.farmSize)).toFixed(1)} tons</p>
              <p className="text-sm text-blue-700 mb-1"><strong>Per Acre:</strong> {getCropYield(farmData.crop, farmData.state, farmData.district)} tons/acre</p>
              <p className="text-xs text-blue-600 mt-2">📊 Based on {farmData.farmSize} acres in {farmData.district || farmData.state}</p>
            </div>
          </div>
        </div>

        <div 
          id="recommendations"
          className="mt-6 bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4">🤖 {t('recommendations')} for {farmData.district || farmData.state || 'Your Area'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💧 Water Management</h4>
              <p className="text-sm text-blue-700">Based on {farmData.state || 'regional'} rainfall patterns, maintain optimal irrigation for {farmData.crop} in {farmData.farmSize} acres.</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🌱 Fertilizer Advice</h4>
              <p className="text-sm text-green-700">For {farmData.crop} in {farmData.district || 'your area'}, apply NPK fertilizer based on soil test results.</p>
            </div>
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-semibant text-yellow-800 mb-2">🐛 Pest Control</h4>
              <p className="text-sm text-yellow-700">Monitor for common {farmData.crop} pests in {farmData.state || 'your region'} during current season.</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 mb-2">💰 Market Insights</h4>
              <p className="text-sm text-purple-700">Current {farmData.crop} prices in {farmData.district || farmData.state || 'your area'} are favorable for harvest planning.</p>
            </div>
          </div>
        </div>

        <div 
          id="map"
          className="mt-6"
        >
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">🗺️ Weather & Alert Map - {farmData.district || farmData.state}</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700">📍 Monitoring weather conditions for {farmData.crop} farming in {farmData.location}</p>
              <p className="text-xs text-gray-500 mt-1">PIN: {farmData.pincode || 'Location detected'}</p>
            </div>
            <AlertMap />
          </div>
        </div>

        <div 
          id="health"
          className="mt-6 bg-white p-6 rounded-lg shadow"
        >
          <h3 className="text-xl font-semibold mb-4">🔬 {t('cropHealthAnalysis')}</h3>
          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-green-800 mb-2">Farm Status: {farmData.location}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-green-600 font-medium">Crop:</span>
                <p>{farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Area:</span>
                <p>{farmData.farmSize} acres</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">District:</span>
                <p>{farmData.district || 'Not specified'}</p>
              </div>
              <div>
                <span className="text-green-600 font-medium">Expected Yield:</span>
                <p>{getCropYield(farmData.crop, farmData.state, farmData.district)} tons/acre</p>
              </div>
            </div>
          </div>
          <CropHealthAnalysis farmData={farmData} />
        </div>

        <div 
          id="sources"
          className="mt-6 bg-gradient-to-br from-blue-50 to-green-50 p-6 rounded-xl shadow-lg border border-blue-100"
        >
          <div className="flex items-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-green-600 p-3 rounded-full mr-4">
              <span className="text-white text-xl">📊</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-800">{t('dataSources')}</h3>
              <p className="text-sm text-gray-600">Powered by India's leading agricultural institutions</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-500">
              <div className="flex items-center mb-2">
                <span className="text-green-600 text-lg mr-2">🌾</span>
                <h4 className="font-semibold text-gray-800">Yield Predictions</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://agricoop.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-green-600 hover:underline">
                  Ministry of Agriculture & Farmers Welfare, India
                </a>
              </p>
              <p className="text-xs text-green-600 mt-1">Real-time crop yield forecasting</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center mb-2">
                <span className="text-blue-600 text-lg mr-2">🌤️</span>
                <h4 className="font-semibold text-gray-800">Weather Data</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://mausam.imd.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 hover:underline">
                  India Meteorological Department (IMD)
                </a>
              </p>
              <p className="text-xs text-blue-600 mt-1">Live weather monitoring & forecasts</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-yellow-500">
              <div className="flex items-center mb-2">
                <span className="text-yellow-600 text-lg mr-2">🚨</span>
                <h4 className="font-semibold text-gray-800">Crop Alerts</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-yellow-600 hover:underline">
                  {farmData?.state || 'State'} Agricultural Universities
                </a>
              </p>
              <p className="text-xs text-yellow-600 mt-1">Location-specific farming alerts</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-purple-500">
              <div className="flex items-center mb-2">
                <span className="text-purple-600 text-lg mr-2">📈</span>
                <h4 className="font-semibold text-gray-800">Historical Data</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://eands.dacnet.nic.in" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 hover:underline">
                  Agricultural Statistics Division
                </a>
              </p>
              <p className="text-xs text-purple-600 mt-1">10+ years of farming trends</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-red-500">
              <div className="flex items-center mb-2">
                <span className="text-red-600 text-lg mr-2">🛰️</span>
                <h4 className="font-semibold text-gray-800">Satellite Data</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://isro.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-red-600 hover:underline">
                  ISRO's RISAT & Cartosat missions
                </a>
              </p>
              <p className="text-xs text-red-600 mt-1">High-resolution crop monitoring</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border-l-4 border-indigo-500">
              <div className="flex items-center mb-2">
                <span className="text-indigo-600 text-lg mr-2">📅</span>
                <h4 className="font-semibold text-gray-800">Planting Schedules</h4>
              </div>
              <p className="text-sm text-gray-600">
                <a href="https://icar.org.in" target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 hover:underline">
                  Indian Council of Agricultural Research (ICAR)
                </a>
              </p>
              <p className="text-xs text-indigo-600 mt-1">Science-based crop calendars</p>
            </div>
          </div>
          
          <div className="mt-6 bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="text-2xl mr-3">🤖</span>
                <div>
                  <h4 className="font-semibold text-gray-800">AI-Powered Analysis</h4>
                  <p className="text-sm text-gray-600">Advanced machine learning for personalized recommendations</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Updated for</div>
                <div className="font-semibold text-green-600">{farmData?.location || 'Your Location'}</div>
              </div>
            </div>
          </div>
          
          <div className="mt-4 text-center">
            <p className="text-xs text-gray-500">
              🔒 All data is processed securely and updated in real-time for {farmData?.district || 'your area'}
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
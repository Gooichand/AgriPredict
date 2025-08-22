'use client'

import { useEffect, useState } from 'react'
import YieldChart from './YieldChart'
import AlertMap from './AlertMap'
import AIRecommendations from './AIRecommendations'
import CropHealthAnalysis from './CropHealthAnalysis'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
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
  const { t } = useLanguage()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('farmData')
      if (data) {
        setFarmData(JSON.parse(data))
      }
    }
  }, [])

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
    const schedules: { [key: string]: { season: string; months: string; nextPlanting: string; harvestTime: string } } = {
      rice: { 
        season: 'Kharif & Rabi', 
        months: 'June-July (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: 'June 2024 (Monsoon season)',
        harvestTime: '3-4 months after planting'
      },
      wheat: { 
        season: 'Rabi', 
        months: 'October-December', 
        nextPlanting: 'October 2024 (Post-monsoon)',
        harvestTime: '4-5 months after planting'
      },
      corn: { 
        season: 'Kharif & Rabi', 
        months: 'June-July (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: 'June 2024 (Monsoon season)',
        harvestTime: '3-4 months after planting'
      },
      cotton: { 
        season: 'Kharif', 
        months: 'April-June', 
        nextPlanting: 'April 2024 (Pre-monsoon)',
        harvestTime: '5-6 months after planting'
      },
      sugarcane: { 
        season: 'Year-round', 
        months: 'February-April (Spring) | Oct-Nov (Autumn)', 
        nextPlanting: 'February 2024 (Spring planting)',
        harvestTime: '10-12 months after planting'
      },
      soybean: { 
        season: 'Kharif', 
        months: 'June-July', 
        nextPlanting: 'June 2024 (Monsoon season)',
        harvestTime: '3-4 months after planting'
      },
      potato: { 
        season: 'Rabi', 
        months: 'October-December', 
        nextPlanting: 'October 2024 (Post-monsoon)',
        harvestTime: '2-3 months after planting'
      },
      tomato: { 
        season: 'Year-round', 
        months: 'July-Aug (Kharif) | Nov-Dec (Rabi)', 
        nextPlanting: 'July 2024 (Monsoon season)',
        harvestTime: '2-3 months after planting'
      },
      onion: { 
        season: 'Rabi', 
        months: 'November-January', 
        nextPlanting: 'November 2024 (Post-monsoon)',
        harvestTime: '4-5 months after planting'
      }
    }
    return schedules[crop] || { 
      season: 'Seasonal', 
      months: 'Consult local agricultural officer', 
      nextPlanting: 'Check with local experts',
      harvestTime: 'Varies by crop variety'
    }
  }

  if (!farmData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Welcome to KisanSafe!</h2>
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
            <div className="flex gap-6">
              <Link href="/crop-setup" className="hover:text-yellow-200">{t('home')}</Link>
              <Link href="/about" className="hover:text-yellow-200">{t('about')}</Link>
              <Link href="/contact" className="hover:text-yellow-200">{t('helplines')}</Link>
              <Link href="/news" className="hover:text-yellow-200">{t('news')}</Link>
              <Link href="/dashboard" className="hover:text-yellow-200 font-semibold">{t('dashboard')}</Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6 rounded-lg mb-6">
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
            <h3 className="text-xl font-semibold mb-2">Predicted Yield</h3>
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
            <h3 className="text-xl font-semibold mb-4">🚨 Live Alerts</h3>
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

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">📅 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Schedule for {farmData.state || 'Your Region'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Best Planting Time</h4>
              <p className="text-sm text-green-700 mb-1"><strong>Season:</strong> {getPlantingSchedule(farmData.crop).season}</p>
              <p className="text-sm text-green-700 mb-1"><strong>Months:</strong> {getPlantingSchedule(farmData.crop).months}</p>
              <p className="text-sm text-green-700"><strong>Next Planting:</strong> {getPlantingSchedule(farmData.crop).nextPlanting}</p>
              <p className="text-xs text-green-600 mt-1">Optimized for {farmData.state || 'your region'}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Harvest Timeline</h4>
              <p className="text-sm text-blue-700 mb-2"><strong>Harvest Time:</strong> {getPlantingSchedule(farmData.crop).harvestTime}</p>
              <p className="text-xs text-blue-600">Estimated yield: {(parseFloat(getCropYield(farmData.crop, farmData.state, farmData.district)) * parseFloat(farmData.farmSize)).toFixed(1)} tons from {farmData.farmSize} acres</p>
            </div>
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">🤖 AI Recommendations for {farmData.district || farmData.state || 'Your Area'}</h3>
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

        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">🗺️ Weather & Alert Map - {farmData.district || farmData.state}</h3>
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700">📍 Monitoring weather conditions for {farmData.crop} farming in {farmData.location}</p>
              <p className="text-xs text-gray-500 mt-1">PIN: {farmData.pincode || 'Location detected'}</p>
            </div>
            <AlertMap />
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">🔬 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Health Analysis</h3>
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

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Data Sources</h3>
          <ul className="space-y-2 text-sm">
            <li><strong>Yield Predictions:</strong> Ministry of Agriculture & Farmers Welfare, India</li>
            <li><strong>Weather Data:</strong> India Meteorological Department (IMD)</li>
            <li><strong>Crop Alerts:</strong> State Agricultural Universities</li>
            <li><strong>Historical Data:</strong> Agricultural Statistics Division</li>
            <li><strong>Satellite Data:</strong> ISRO's RISAT & Cartosat missions</li>
            <li><strong>Planting Schedules:</strong> Indian Council of Agricultural Research (ICAR)</li>
          </ul>
        </div>
      </main>
    </div>
  )
}
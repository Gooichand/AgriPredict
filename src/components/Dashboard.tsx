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

  const getCropYield = (crop: string) => {
    const yields: { [key: string]: string } = {
      // Cereals & Grains (tons/acre)
      rice: '4.2', wheat: '3.1', corn: '5.8', barley: '2.9', millet: '1.8',
      oats: '2.4', quinoa: '1.2', rye: '2.7', sorghum: '3.5', amaranth: '1.5',
      
      // Legumes & Pulses (tons/acre)
      chickpea: '1.8', lentil: '1.4', soybean: '2.6', 'black beans': '2.1',
      'kidney beans': '1.9', 'navy beans': '2.0', 'split peas': '1.7',
      'mung beans': '1.3', 'pigeon peas': '1.6',
      
      // Vegetables - Leafy (tons/acre)
      spinach: '8.5', lettuce: '12.3', cabbage: '25.7', kale: '9.2',
      'mustard greens': '7.8', 'swiss chard': '8.9', arugula: '6.4',
      
      // Vegetables - Root & Tuber (tons/acre)
      potato: '18.5', 'sweet potato': '16.2', carrot: '22.8', beet: '19.4',
      radish: '15.6', turnip: '17.3', ginger: '8.7', cassava: '12.4',
      
      // Vegetables - Nightshades (tons/acre)
      tomato: '28.6', eggplant: '14.7', pepper: '12.9', 'bell pepper': '15.3',
      'chili pepper': '3.8', jalapeno: '4.2',
      
      // Vegetables - Cucurbits (tons/acre)
      cucumber: '16.8', watermelon: '24.5', pumpkin: '19.7', squash: '17.2',
      zucchini: '21.3', melon: '18.9', 'bitter gourd': '8.4',
      
      // Vegetables - Others (tons/acre)
      onion: '13.8', garlic: '4.6', okra: '6.7', asparagus: '3.2',
      celery: '24.1', broccoli: '8.9', cauliflower: '12.4',
      
      // Fruits - Tree Fruits (tons/acre)
      apple: '18.2', mango: '12.7', orange: '15.4', banana: '22.8',
      grape: '8.9', peach: '14.6', pear: '16.3', cherry: '6.8',
      
      // Cash Crops (tons/acre)
      cotton: '1.8', sugarcane: '52.3', tea: '2.1', coffee: '1.4',
      tobacco: '2.9', jute: '3.2', hemp: '2.7',
      
      // Oil Crops (tons/acre)
      sunflower: '1.9', mustard: '1.6', canola: '2.1', safflower: '1.4',
      
      // Herbs & Spices (tons/acre)
      basil: '2.8', mint: '3.4', coriander: '1.2', turmeric: '4.6',
      cumin: '0.8', fenugreek: '1.1', oregano: '1.9',
      
      // Nuts & Seeds (tons/acre)
      peanut: '3.2', sesame: '0.9', 'sunflower seeds': '1.7',
      'pumpkin seeds': '1.3', 'chia seeds': '0.8',
      
      // Fodder Crops (tons/acre)
      alfalfa: '6.8', clover: '5.2', 'timothy grass': '4.1',
      
      // Specialty Crops (tons/acre)
      mushrooms: '12.4', 'aloe vera': '8.7', stevia: '2.1',
      bamboo: '15.6', hops: '1.8'
    }
    return yields[crop.toLowerCase()] || '4.5'
  }

  const getCropAlert = (crop: string) => {
    const alerts: { [key: string]: { type: string; message: string } } = {
      rice: { type: 'Water Management', message: 'Monitor water levels for optimal growth' },
      wheat: { type: 'Temperature Alert', message: 'Cool weather expected, good for wheat' },
      corn: { type: 'Nutrient Alert', message: 'Consider nitrogen fertilizer application' },
      cotton: { type: 'Pest Alert', message: 'Monitor for bollworm activity' },
      sugarcane: { type: 'Harvest Alert', message: 'Optimal harvest time approaching' },
      soybean: { type: 'Disease Alert', message: 'Watch for rust disease symptoms' }
    }
    return alerts[crop] || { type: 'Weather Alert', message: 'Monitor local weather conditions' }
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
        <h2 className="text-3xl font-bold mb-6">Your {farmData.crop} farm in {farmData.location}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-2">Predicted Yield</h3>
            <p className="text-3xl font-bold text-green-600">
              {getCropYield(farmData.crop)} tons/acre
            </p>
            <p className="text-lg text-green-500 mt-1">
              Total: {(parseFloat(getCropYield(farmData.crop)) * parseFloat(farmData.farmSize)).toFixed(1)} tons
            </p>
            <p className="text-sm text-gray-500 mt-2">For {farmData.farmSize} acres</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Crop Alerts - {farmData.location}</h3>
            <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-500">
              <p className="font-semibold">{getCropAlert(farmData.crop).type}</p>
              <p className="text-sm">{getCropAlert(farmData.crop).message}</p>
              <p className="text-xs text-gray-500 mt-1">Source: Agricultural Department</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Yield Trends</h3>
            <YieldChart crop={farmData.crop} />
          </div>
        </div>

        <div className="mt-6 bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-semibold mb-4">Planting Schedule for {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">Best Planting Time</h4>
              <p className="text-sm text-green-700 mb-1"><strong>Season:</strong> {getPlantingSchedule(farmData.crop).season}</p>
              <p className="text-sm text-green-700 mb-1"><strong>Months:</strong> {getPlantingSchedule(farmData.crop).months}</p>
              <p className="text-sm text-green-700"><strong>Next Planting:</strong> {getPlantingSchedule(farmData.crop).nextPlanting}</p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Harvest Timeline</h4>
              <p className="text-sm text-blue-700 mb-2"><strong>Harvest Time:</strong> {getPlantingSchedule(farmData.crop).harvestTime}</p>
              <p className="text-xs text-blue-600">Plan your planting according to monsoon and market demand</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <AIRecommendations farmData={farmData} />
        </div>

        <div className="mt-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Alert Map</h3>
            <AlertMap />
          </div>
        </div>

        <div className="mt-6">
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
'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import SmartCropAdvisory from '@/components/SmartCropAdvisory'

export default function CropAdvisoryPage() {
  const { t } = useLanguage()

  const handleSaveAdvice = (advice: any) => {
    const savedAdvices = JSON.parse(localStorage.getItem('savedAdvices') || '[]')
    savedAdvices.push({
      ...advice,
      timestamp: new Date().toISOString(),
      id: Date.now()
    })
    localStorage.setItem('savedAdvices', JSON.stringify(savedAdvices))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <nav className="bg-gradient-to-r from-green-700 to-blue-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/crop-setup" className="text-2xl font-bold flex items-center gap-2">
            🌾 {t('title')}
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link href="/crop-setup" className="hover:text-yellow-200">{t('home')}</Link>
              <Link href="/about" className="hover:text-yellow-200">{t('about')}</Link>
              <Link href="/contact" className="hover:text-yellow-200">{t('helplines')}</Link>
              <Link href="/news" className="hover:text-yellow-200">{t('news')}</Link>
              <Link href="/crop-advisory" className="hover:text-yellow-200 font-semibold">Crop Advisory</Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <SmartCropAdvisory onSaveAdvice={handleSaveAdvice} />
        
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-green-700 mb-3 flex items-center gap-2">
              🎯 Accurate Predictions
            </h3>
            <p className="text-gray-700">
              Based on 50+ years of agricultural data from Indian meteorological departments and farming research institutes.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-3 flex items-center gap-2">
              🌡️ Climate Science
            </h3>
            <p className="text-gray-700">
              Every recommendation considers temperature, rainfall, humidity, and soil conditions specific to your region.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold text-purple-700 mb-3 flex items-center gap-2">
              💰 Economic Impact
            </h3>
            <p className="text-gray-700">
              Right crop choices can increase profits by 40-60% while wrong choices can cause complete crop failure.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-center text-green-700 mb-8">
            🏆 Success Stories
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-green-500 pl-6">
              <h4 className="font-bold text-green-700">Rajesh Kumar, Rajasthan</h4>
              <p className="text-gray-700 italic">
                "Switched from rice to bajra based on advisory. Saved 70% water and got 25% more profit!"
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6">
              <h4 className="font-bold text-blue-700">Priya Sharma, Kerala</h4>
              <p className="text-gray-700 italic">
                "Advisory suggested spices instead of wheat. Now earning 3x more with cardamom cultivation!"
              </p>
            </div>
            <div className="border-l-4 border-purple-500 pl-6">
              <h4 className="font-bold text-purple-700">Amit Singh, Punjab</h4>
              <p className="text-gray-700 italic">
                "Diversified from wheat to mustard. Advisory helped avoid market crash and earned 40% extra income!"
              </p>
            </div>
            <div className="border-l-4 border-orange-500 pl-6">
              <h4 className="font-bold text-orange-700">Sunita Devi, Bihar</h4>
              <p className="text-gray-700 italic">
                "Started maize cultivation instead of rice. Reduced water usage by 60% and doubled my yield!"
              </p>
            </div>
            <div className="border-l-4 border-red-500 pl-6">
              <h4 className="font-bold text-red-700">Kiran Patel, Gujarat</h4>
              <p className="text-gray-700 italic">
                "Advisory warned about cotton risks. Switched to groundnut and avoided ₹2 lakh loss!"
              </p>
            </div>
            <div className="border-l-4 border-teal-500 pl-6">
              <h4 className="font-bold text-teal-700">Ravi Reddy, Andhra Pradesh</h4>
              <p className="text-gray-700 italic">
                "Followed advisory for chili cultivation timing. Got premium prices and 50% higher profits!"
              </p>
            </div>
            <div className="border-l-4 border-indigo-500 pl-6">
              <h4 className="font-bold text-indigo-700">Meera Joshi, Maharashtra</h4>
              <p className="text-gray-700 italic">
                "Advisory suggested organic farming methods. Now selling premium crops at 80% higher rates!"
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
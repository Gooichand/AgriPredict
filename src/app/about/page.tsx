'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function AboutPage() {
  const { t } = useLanguage()
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/crop-setup" className="text-2xl font-bold flex items-center gap-2">
            {t('title')}
          </Link>
          <div className="flex items-center gap-6">
            <div className="flex gap-6">
              <Link href="/crop-setup" className="hover:text-yellow-200">{t('home')}</Link>
              <Link href="/about" className="hover:text-yellow-200 font-semibold">{t('about')}</Link>
              <Link href="/contact" className="hover:text-yellow-200">{t('helplines')}</Link>
              <Link href="/news" className="hover:text-yellow-200">{t('news')}</Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-6 text-center">
            {t('aboutTitle')}
          </h1>
          
          <div className="prose max-w-none">
            <p className="text-lg text-gray-700 mb-6 text-center">
              {t('aboutDescription')}
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-green-700 mb-4">🚀 Our Mission</h2>
                <p className="text-gray-700">
                  To revolutionize agriculture through cutting-edge AI technology, providing farmers 
                  with accurate crop yield predictions, personalized recommendations, and real-time 
                  insights to maximize productivity and sustainability.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h2 className="text-2xl font-semibold text-yellow-700 mb-4">🎯 Our Vision</h2>
                <p className="text-gray-700">
                  To create a world where every farmer has access to intelligent farming solutions, 
                  reducing crop losses, increasing yields, and ensuring food security for future generations.
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-3xl font-semibold text-green-700 mb-6">🌟 Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🌱</div>
                  <h3 className="font-semibold text-green-700 mb-2">AI Yield Predictions</h3>
                  <p className="text-sm text-gray-600">15% more accurate than traditional methods</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🤖</div>
                  <h3 className="font-semibold text-green-700 mb-2">Smart Assistant</h3>
                  <p className="text-sm text-gray-600">24/7 AI farming advisor</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🧠</div>
                  <h3 className="font-semibold text-green-700 mb-2">Health Analysis</h3>
                  <p className="text-sm text-gray-600">Computer vision disease detection</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">⚠️</div>
                  <h3 className="font-semibold text-green-700 mb-2">Smart Alerts</h3>
                  <p className="text-sm text-gray-600">Weather-based recommendations</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">💹</div>
                  <h3 className="font-semibold text-green-700 mb-2">Market Insights</h3>
                  <p className="text-sm text-gray-600">Price predictions & timing</p>
                </div>
                <div className="text-center p-4">
                  <div className="text-4xl mb-3">🧬</div>
                  <h3 className="font-semibold text-green-700 mb-2">Personalized Tips</h3>
                  <p className="text-sm text-gray-600">Tailored farming recommendations</p>
                </div>
              </div>
            </div>



            <div className="text-center bg-green-100 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-green-700 mb-4">🌍 Global Impact</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <div className="text-3xl font-bold text-green-600">200+</div>
                  <div className="text-sm text-gray-600">Crops Supported</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">200+</div>
                  <div className="text-sm text-gray-600">Indian Regions</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-600">100%</div>
                  <div className="text-sm text-gray-600">Free AI Services</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ContactPage() {
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
              <Link href="/about" className="hover:text-yellow-200">{t('about')}</Link>
              <Link href="/contact" className="hover:text-yellow-200 font-semibold">{t('helplines')}</Link>
              <Link href="/news" className="hover:text-yellow-200">{t('news')}</Link>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            {t('contactTitle')}
          </h1>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* National Helplines */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🇮🇳 National Helplines
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Kisan Call Centre</h3>
                  <p className="text-2xl font-bold text-green-600">1800-180-1551</p>
                  <p className="text-sm text-gray-600">24x7 Free Service</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">PM-KISAN Helpline</h3>
                  <p className="text-2xl font-bold text-blue-600">155261</p>
                  <p className="text-sm text-gray-600">Scheme Related Queries</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Soil Health Card</h3>
                  <p className="text-2xl font-bold text-orange-600">1800-180-1551</p>
                  <p className="text-sm text-gray-600">Soil Testing Information</p>
                </div>
              </div>
            </div>

            {/* Insurance & Credit */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🛡️ Insurance & Credit
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Crop Insurance</h3>
                  <p className="text-2xl font-bold text-red-600">1800-200-7710</p>
                  <p className="text-sm text-gray-600">PMFBY Claims & Info</p>
                </div>
                
                <div className="border-l-4 border-purple-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Kisan Credit Card</h3>
                  <p className="text-2xl font-bold text-purple-600">1800-180-1551</p>
                  <p className="text-sm text-gray-600">KCC Application & Issues</p>
                </div>
                
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h3 className="font-semibold text-gray-800">NABARD</h3>
                  <p className="text-2xl font-bold text-indigo-600">1800-200-2626</p>
                  <p className="text-sm text-gray-600">Rural Development Finance</p>
                </div>
              </div>
            </div>

            {/* Weather & Disaster */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🌦️ Weather & Disaster
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Weather Helpline</h3>
                  <p className="text-2xl font-bold text-yellow-600">1800-180-1551</p>
                  <p className="text-sm text-gray-600">IMD Weather Updates</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Disaster Management</h3>
                  <p className="text-2xl font-bold text-red-600">1078</p>
                  <p className="text-sm text-gray-600">Emergency Response</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Drought Helpline</h3>
                  <p className="text-2xl font-bold text-green-600">1800-180-1551</p>
                  <p className="text-sm text-gray-600">Drought Relief Information</p>
                </div>
              </div>
            </div>

            {/* State Helplines */}
            <div className="bg-white rounded-xl shadow-lg p-8 md:col-span-2 lg:col-span-3">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-green-700 mb-2">
                  🏛️ All State Agriculture Helplines
                </h2>
                <p className="text-gray-600">Find your state-specific agriculture helpline number</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Northern States */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-blue-700 mb-4 text-center border-b-2 border-blue-200 pb-2">
                    🏔️ Northern States
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Uttar Pradesh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Punjab</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Haryana</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-2117</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Rajasthan</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-6127</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Himachal Pradesh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Uttarakhand</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Jammu & Kashmir</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-7035</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Delhi</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                  </div>
                </div>
                
                {/* Western & Central States */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-orange-700 mb-4 text-center border-b-2 border-orange-200 pb-2">
                    🌾 Western & Central
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Maharashtra</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-233-4555</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Gujarat</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-200-0023</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Madhya Pradesh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-233-4144</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Chhattisgarh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-233-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Goa</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-233-0022</span>
                    </div>
                  </div>
                </div>
                
                {/* Southern States */}
                <div className="bg-green-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-green-700 mb-4 text-center border-b-2 border-green-200 pb-2">
                    🌴 Southern States
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Karnataka</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Tamil Nadu</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Andhra Pradesh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Telangana</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Kerala</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1550</span>
                    </div>
                  </div>
                </div>
                
                {/* Eastern States */}
                <div className="bg-purple-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-purple-700 mb-4 text-center border-b-2 border-purple-200 pb-2">
                    🌊 Eastern States
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">West Bengal</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-6770</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Bihar</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Jharkhand</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-6770</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Odisha</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-6551</span>
                    </div>
                  </div>
                </div>
                
                {/* Northeastern States */}
                <div className="bg-teal-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-teal-700 mb-4 text-center border-b-2 border-teal-200 pb-2">
                    🌿 Northeast States
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Assam</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Arunachal Pradesh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Manipur</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Meghalaya</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Mizoram</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Nagaland</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Tripura</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Sikkim</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-3644</span>
                    </div>
                  </div>
                </div>
                
                {/* Union Territories */}
                <div className="bg-indigo-50 rounded-lg p-6">
                  <h3 className="text-lg font-bold text-indigo-700 mb-4 text-center border-b-2 border-indigo-200 pb-2">
                    🏛️ Union Territories
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Chandigarh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Puducherry</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1551</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Andaman & Nicobar</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-345-4545</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Lakshadweep</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-425-1550</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Ladakh</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-180-7035</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Dadra & Nagar Haveli</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-200-0023</span>
                    </div>
                    <div className="bg-white p-3 rounded-lg flex justify-between items-center">
                      <span className="font-medium text-gray-700">Daman & Diu</span>
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">1800-200-0023</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Online Portals */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🌐 Online Portals
              </h2>
              
              <div className="space-y-3">
                <a href="https://pmkisan.gov.in" target="_blank" className="block p-3 bg-blue-50 rounded-lg hover:bg-blue-100">
                  <h3 className="font-semibold text-blue-700">PM-KISAN Portal</h3>
                  <p className="text-sm text-gray-600">pmkisan.gov.in</p>
                </a>
                
                <a href="https://pmfby.gov.in" target="_blank" className="block p-3 bg-green-50 rounded-lg hover:bg-green-100">
                  <h3 className="font-semibold text-green-700">Crop Insurance</h3>
                  <p className="text-sm text-gray-600">pmfby.gov.in</p>
                </a>
                
                <a href="https://soilhealth.dac.gov.in" target="_blank" className="block p-3 bg-orange-50 rounded-lg hover:bg-orange-100">
                  <h3 className="font-semibold text-orange-700">Soil Health Card</h3>
                  <p className="text-sm text-gray-600">soilhealth.dac.gov.in</p>
                </a>
                
                <a href="https://mkisan.gov.in" target="_blank" className="block p-3 bg-purple-50 rounded-lg hover:bg-purple-100">
                  <h3 className="font-semibold text-purple-700">mKisan Portal</h3>
                  <p className="text-sm text-gray-600">mkisan.gov.in</p>
                </a>
              </div>
            </div>

            {/* Emergency Numbers */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🚨 Emergency Numbers
              </h2>
              
              <div className="space-y-4">
                <div className="border-l-4 border-red-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Police</h3>
                  <p className="text-2xl font-bold text-red-600">100</p>
                </div>
                
                <div className="border-l-4 border-orange-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Fire Brigade</h3>
                  <p className="text-2xl font-bold text-orange-600">101</p>
                </div>
                
                <div className="border-l-4 border-blue-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Ambulance</h3>
                  <p className="text-2xl font-bold text-blue-600">108</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-4">
                  <h3 className="font-semibold text-gray-800">Women Helpline</h3>
                  <p className="text-2xl font-bold text-green-600">1091</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-green-100 rounded-xl p-6">
            <h3 className="text-2xl font-semibold text-green-700 mb-4">📱 How to Use These Helplines</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">📞 Call Directly</h4>
                <p className="text-sm text-gray-600">Dial the numbers directly from your mobile or landline. Most are toll-free.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">🌐 Visit Portals</h4>
                <p className="text-sm text-gray-600">Access online services, applications, and information through government portals.</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">📋 Keep Handy</h4>
                <p className="text-sm text-gray-600">Save these numbers in your phone for quick access during emergencies.</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
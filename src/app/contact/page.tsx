'use client'

import Link from 'next/link'

export default function ContactPage() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50">
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/crop-setup" className="text-2xl font-bold flex items-center gap-2">
            🌾 KISAN SAFE 🚜
          </Link>
          <div className="flex gap-6">
            <Link href="/crop-setup" className="hover:text-yellow-200">Home</Link>
            <Link href="/about" className="hover:text-yellow-200">About</Link>
            <Link href="/contact" className="hover:text-yellow-200 font-semibold">Helplines</Link>
            <Link href="/news" className="hover:text-yellow-200">News</Link>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-green-700 mb-8 text-center">
            📞 Government Helplines for Farmers
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
            <div className="bg-white rounded-xl shadow-lg p-6 md:col-span-2 lg:col-span-3">
              <h2 className="text-xl font-semibold text-green-700 mb-4 flex items-center gap-2">
                🏛️ All State Agriculture Helplines
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Northern States</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">Uttar Pradesh:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Punjab:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Haryana:</span>
                    <span className="text-green-600 font-bold">1800-180-2117</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Rajasthan:</span>
                    <span className="text-green-600 font-bold">1800-180-6127</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Himachal Pradesh:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Uttarakhand:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Jammu & Kashmir:</span>
                    <span className="text-green-600 font-bold">1800-180-7035</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Delhi:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Western & Central States</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">Maharashtra:</span>
                    <span className="text-green-600 font-bold">1800-233-4555</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Gujarat:</span>
                    <span className="text-green-600 font-bold">1800-200-0023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Madhya Pradesh:</span>
                    <span className="text-green-600 font-bold">1800-233-4144</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Chhattisgarh:</span>
                    <span className="text-green-600 font-bold">1800-233-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Goa:</span>
                    <span className="text-green-600 font-bold">1800-233-0022</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Southern States</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">Karnataka:</span>
                    <span className="text-green-600 font-bold">1800-425-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tamil Nadu:</span>
                    <span className="text-green-600 font-bold">1800-425-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Andhra Pradesh:</span>
                    <span className="text-green-600 font-bold">1800-425-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Telangana:</span>
                    <span className="text-green-600 font-bold">1800-425-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Kerala:</span>
                    <span className="text-green-600 font-bold">1800-425-1550</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Eastern States</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">West Bengal:</span>
                    <span className="text-green-600 font-bold">1800-345-6770</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Bihar:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Jharkhand:</span>
                    <span className="text-green-600 font-bold">1800-345-6770</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Odisha:</span>
                    <span className="text-green-600 font-bold">1800-345-6551</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Northeastern States</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">Assam:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Arunachal Pradesh:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Manipur:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Meghalaya:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Mizoram:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Nagaland:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Tripura:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sikkim:</span>
                    <span className="text-green-600 font-bold">1800-345-3644</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-semibold text-gray-800 mb-3">Union Territories</h3>
                  <div className="flex justify-between">
                    <span className="font-medium">Chandigarh:</span>
                    <span className="text-green-600 font-bold">1800-180-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Puducherry:</span>
                    <span className="text-green-600 font-bold">1800-425-1551</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Andaman & Nicobar:</span>
                    <span className="text-green-600 font-bold">1800-345-4545</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Lakshadweep:</span>
                    <span className="text-green-600 font-bold">1800-425-1550</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ladakh:</span>
                    <span className="text-green-600 font-bold">1800-180-7035</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Dadra & Nagar Haveli:</span>
                    <span className="text-green-600 font-bold">1800-200-0023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Daman & Diu:</span>
                    <span className="text-green-600 font-bold">1800-200-0023</span>
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
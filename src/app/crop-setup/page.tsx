'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CropSetupPage() {
  const [location, setLocation] = useState('')
  const [crop, setCrop] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const router = useRouter()

  // Automatically get location on page load
  useEffect(() => {
    getDeviceLocation()
  }, [])

  const getDeviceLocation = async () => {
    setIsGettingLocation(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          
          try {
            // Try to get location name from coordinates
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            const data = await response.json()
            
            if (data.city || data.locality) {
              const locationName = `${data.locality || data.city}, ${data.principalSubdivision || data.countryName}`
              setLocation(locationName)
            } else {
              setLocation(`${data.principalSubdivision || 'Your Area'}, ${data.countryName || 'India'}`)
            }
          } catch (error) {
            // Fallback to coordinates if geocoding fails
            setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`)
          }
          setIsGettingLocation(false)
        },
        (error) => {
          console.log('Location access denied or failed:', error)
          setIsGettingLocation(false)
        }
      )
    } else {
      setIsGettingLocation(false)
    }
  }

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store data in localStorage
    localStorage.setItem('farmData', JSON.stringify({
      location,
      crop,
      farmSize
    }))
    
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">AgriPredict</h1>
        </div>
      </nav>

      <main className="container mx-auto p-6 flex items-center justify-center min-h-[80vh]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-6 text-center">Tell us about your farm</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">📍 Where is your farm located?</label>
              <p className="text-xs text-gray-600 mb-3">
                {isGettingLocation ? '📍 Getting your location...' : 'We automatically detected your location, or enter manually'}
              </p>
              
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g., Model Town Colony, Rajouri Garden, Andheri West, Sector 15 Gurgaon"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                  />
                  {isGettingLocation && (
                    <div className="absolute right-3 top-3">
                      <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={getDeviceLocation}
                  disabled={isGettingLocation}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isGettingLocation ? '📍 Getting Location...' : '🔄 Refresh My Location'}
                </button>
                
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Model Town, Delhi')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Model Town, Delhi
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Bandra West, Mumbai')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Bandra West, Mumbai
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Koramangala, Bangalore')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Koramangala, Bangalore
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Sector 15, Gurgaon')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Sector 15, Gurgaon
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Jalandhar, Punjab')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Jalandhar, Punjab
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLocationSelect('Nashik, Maharashtra')}
                    className="p-2 text-sm border rounded hover:bg-gray-50 text-left"
                  >
                    Nashik, Maharashtra
                  </button>
                </div>
                
                <p className="text-xs text-gray-500 text-center">
                  {location ? `✅ Location detected: ${location}` : 'We use your area/colony name to provide local weather alerts and regional farming insights'}
                </p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">What crop are you growing?</label>
              <select
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              >
                <option value="">Select a crop</option>
                <option value="rice">Rice</option>
                <option value="wheat">Wheat</option>
                <option value="corn">Corn</option>
                <option value="sugarcane">Sugarcane</option>
                <option value="cotton">Cotton</option>
                <option value="soybean">Soybean</option>
                <option value="potato">Potato</option>
                <option value="tomato">Tomato</option>
                <option value="onion">Onion</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Farm Size (acres)</label>
              <input
                type="number"
                placeholder="Enter farm size"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="w-full p-3 border rounded-lg"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700"
            >
              Get Predictions
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
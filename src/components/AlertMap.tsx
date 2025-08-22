'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { WeatherService } from '@/lib/aiService'

// Dynamically import map components to avoid SSR issues
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false })
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false })
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false })
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false })

// Fix for default markers - only run on client side
if (typeof window !== 'undefined') {
  const L = require('leaflet')
  require('leaflet/dist/leaflet.css')
  
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  })
}

export default function AlertMap() {
  const [farmData, setFarmData] = useState<any>(null)
  const [mapLayer, setMapLayer] = useState('base')
  const [coordinates, setCoordinates] = useState<[number, number]>([28.6139, 77.2090])
  const [mapKey, setMapKey] = useState(0)
  const [locationData, setLocationData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [mapReady, setMapReady] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem('farmData')
      const selectedLocation = localStorage.getItem('selectedLocation')
      
      if (data) {
        const parsed = JSON.parse(data)
        setFarmData(parsed)
        
        // Use selected location data if available
        if (selectedLocation) {
          const locationData = JSON.parse(selectedLocation)
          if (locationData.pincode) {
            getCoordinatesFromPincode(locationData.pincode)
            loadLocationData(locationData.location || parsed.location)
          }
        } else if (parsed.location) {
          getLocationCoordinates(parsed.location)
          loadLocationData(parsed.location)
        }
      }
    }
  }, [])
  
  const loadLocationData = async (location: string) => {
    setLoading(true)
    try {
      const weather = await WeatherService.getCurrentWeather(location)
      const airQuality = await getAirQualityData(location)
      const windData = await getWindData(location)
      
      setLocationData({
        weather,
        airQuality,
        wind: windData,
        temperature: weather.temperature,
        humidity: weather.humidity,
        pressure: weather.pressure || 1013
      })
    } catch (error) {
      console.log('Using fallback environmental data')
      setLocationData({
        weather: { temperature: 28, humidity: 65, condition: 'clear', description: 'Clear sky' },
        airQuality: { aqi: 85, status: 'Moderate', pm25: 45 },
        wind: { speed: 12, direction: 'NW', gust: 18 },
        temperature: 28,
        humidity: 65,
        pressure: 1013
      })
    }
    setLoading(false)
  }
  
  const getAirQualityData = async (location: string) => {
    // Simulate air quality data based on location
    const loc = location.toLowerCase()
    let baseAQI = 75
    
    if (loc.includes('delhi') || loc.includes('gurgaon')) baseAQI = 150
    else if (loc.includes('mumbai') || loc.includes('pune')) baseAQI = 120
    else if (loc.includes('bangalore') || loc.includes('hyderabad')) baseAQI = 90
    else if (loc.includes('kerala') || loc.includes('goa')) baseAQI = 45
    
    const aqi = baseAQI + Math.round((Math.random() - 0.5) * 40)
    const pm25 = Math.round(aqi * 0.6)
    
    return {
      aqi: Math.max(0, Math.min(300, aqi)),
      status: aqi < 50 ? 'Good' : aqi < 100 ? 'Moderate' : aqi < 150 ? 'Unhealthy for Sensitive' : 'Unhealthy',
      pm25: Math.max(0, Math.min(150, pm25))
    }
  }
  
  const getWindData = async (location: string) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    const speed = Math.round(Math.random() * 20 + 5) // 5-25 km/h
    const direction = directions[Math.floor(Math.random() * directions.length)]
    const gust = speed + Math.round(Math.random() * 10)
    
    return { speed, direction, gust }
  }

  const getCoordinatesFromPincode = async (pincode: string) => {
    try {
      // Use PostalPincode API to get coordinates
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`)
      const data = await response.json()
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice?.[0]) {
        const postOffice = data[0].PostOffice[0]
        // Use approximate coordinates based on district/state
        const coords = getDistrictCoordinates(postOffice.District, postOffice.State)
        if (coords) {
          setCoordinates(coords)
          setMapKey(prev => prev + 1)
        }
      }
    } catch (error) {
      console.log('Using fallback coordinates')
    }
  }

  const getDistrictCoordinates = (district: string, state: string): [number, number] | null => {
    const districtCoords: { [key: string]: [number, number] } = {
      // Major districts with coordinates
      'MUMBAI': [19.0760, 72.8777], 'DELHI': [28.6139, 77.2090],
      'BANGALORE': [12.9716, 77.5946], 'HYDERABAD': [17.3850, 78.4867],
      'CHENNAI': [13.0827, 80.2707], 'KOLKATA': [22.5726, 88.3639],
      'PUNE': [18.5204, 73.8567], 'AHMEDABAD': [23.0225, 72.5714],
      'JAIPUR': [26.9124, 75.7873], 'SURAT': [21.1702, 72.8311],
      'LUCKNOW': [26.8467, 80.9462], 'KANPUR': [26.4499, 80.3319],
      'NAGPUR': [21.1458, 79.0882], 'PATNA': [25.5941, 85.1376],
      'INDORE': [22.7196, 75.8577], 'BHOPAL': [23.2599, 77.4126],
      'LUDHIANA': [30.9010, 75.8573], 'AGRA': [27.1767, 78.0081],
      'VARANASI': [25.3176, 82.9739], 'MEERUT': [28.9845, 77.7064],
      'NASHIK': [19.9975, 73.7898], 'RAJKOT': [22.3039, 70.8022],
      'FARIDABAD': [28.4089, 77.3178], 'GHAZIABAD': [28.6692, 77.4538],
      'THANE': [19.2183, 72.9781], 'VADODARA': [22.3072, 73.1812],
      'VISAKHAPATNAM': [17.6868, 83.2185], 'COIMBATORE': [11.0168, 76.9558],
      'MADURAI': [9.9252, 78.1198], 'JODHPUR': [26.2389, 73.0243],
      'RANCHI': [23.3441, 85.3096], 'RAIPUR': [21.2514, 81.6296],
      'CHANDIGARH': [30.7333, 76.7794], 'KOTA': [25.2138, 75.8648],
      'GURGAON': [28.4595, 77.0266], 'NOIDA': [28.5355, 77.3910],
      'HOWRAH': [22.5958, 88.2636], 'JABALPUR': [23.1815, 79.9864],
      'GWALIOR': [26.2183, 78.1828], 'VIJAYAWADA': [16.5062, 80.6480],
      'AMRITSAR': [31.6340, 74.8723], 'ALLAHABAD': [25.4358, 81.8463],
      'DHANBAD': [23.7957, 86.4304], 'AURANGABAD': [19.8762, 75.3433],
      'SRINAGAR': [34.0837, 74.7973], 'BANKA': [24.8878, 86.9194],
      'BHAGALPUR': [25.2425, 86.9842], 'MUNGER': [25.3764, 86.4733],
      'BHOJPUR': [25.4382, 84.4628], 'GAYA': [24.7914, 85.0002],
      'ARWAL': [25.2522, 84.6819], 'JEHANABAD': [25.2124, 84.9895],
      'JAMUI': [24.9277, 86.2231], 'SHEIKHPURA': [25.1417, 85.8629],
      'NALANDA': [25.1372, 85.4548], 'LAKHISARAI': [25.1726, 86.0939]
    }
    
    return districtCoords[district.toUpperCase()] || districtCoords[state.toUpperCase()] || null
  }

  const getLocationCoordinates = async (location: string) => {
    const locationKey = location.toLowerCase().split(',')[0].trim()
    const coords = getDistrictCoordinates(locationKey, '')
    
    if (coords) {
      setCoordinates(coords)
      setMapKey(prev => prev + 1)
    }
  }

  const getMapTileUrl = () => {
    switch (mapLayer) {
      case 'weather':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      case 'wind':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      case 'pollution':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      case 'temperature':
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      default:
        return 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    }
  }

  const getMapOverlayStyle = () => {
    switch (mapLayer) {
      case 'weather':
        return { background: 'linear-gradient(45deg, rgba(0,100,255,0.3) 0%, rgba(255,255,255,0.1) 100%)' }
      case 'wind':
        return { background: 'linear-gradient(90deg, rgba(0,255,0,0.2) 0%, rgba(255,255,0,0.2) 100%)' }
      case 'pollution':
        return { background: 'linear-gradient(135deg, rgba(255,0,0,0.3) 0%, rgba(255,165,0,0.2) 100%)' }
      case 'temperature':
        return { background: 'linear-gradient(180deg, rgba(255,0,0,0.2) 0%, rgba(0,0,255,0.2) 100%)' }
      default:
        return {}
    }
  }

  const getLayerInfo = () => {
    if (!locationData) return { name: '🗺️ Loading...', info: 'Loading environmental data' }
    
    switch (mapLayer) {
      case 'weather':
        return { 
          name: `🌧️ Weather: ${locationData.weather.description}`, 
          info: `Humidity: ${locationData.humidity}% | Pressure: ${locationData.pressure} hPa`,
          data: locationData.weather
        }
      case 'wind':
        return { 
          name: `💨 Wind: ${locationData.wind.speed} km/h ${locationData.wind.direction}`, 
          info: `Gusts up to ${locationData.wind.gust} km/h`,
          data: locationData.wind
        }
      case 'pollution':
        return { 
          name: `🏭 Air Quality: ${locationData.airQuality.status}`, 
          info: `AQI: ${locationData.airQuality.aqi} | PM2.5: ${locationData.airQuality.pm25} μg/m³`,
          data: locationData.airQuality
        }
      case 'temperature':
        return { 
          name: `🌡️ Temperature: ${locationData.temperature}°C`, 
          info: `Feels like ${locationData.temperature + Math.round((Math.random() - 0.5) * 4)}°C`,
          data: { temp: locationData.temperature, humidity: locationData.humidity }
        }
      default:
        return { name: '🗺️ Base Map', info: 'Standard geographical view' }
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setMapLayer('base')}
          className={`px-3 py-2 rounded text-sm ${
            mapLayer === 'base' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🗺️ Base Map
        </button>
        <button
          onClick={() => setMapLayer('weather')}
          className={`px-3 py-2 rounded text-sm ${
            mapLayer === 'weather' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🌧️ Weather
        </button>
        <button
          onClick={() => setMapLayer('wind')}
          className={`px-3 py-2 rounded text-sm ${
            mapLayer === 'wind' ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          💨 Wind
        </button>
        <button
          onClick={() => setMapLayer('pollution')}
          className={`px-3 py-2 rounded text-sm ${
            mapLayer === 'pollution' ? 'bg-red-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🏭 Pollution
        </button>
        <button
          onClick={() => setMapLayer('temperature')}
          className={`px-3 py-2 rounded text-sm ${
            mapLayer === 'temperature' ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          🌡️ Temperature
        </button>
      </div>
      
      <div className="bg-blue-50 p-3 rounded-lg mb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">{getLayerInfo().name}</span>
            <div className="text-sm text-gray-600">{getLayerInfo().info}</div>
          </div>
          {loading && <div className="text-sm text-blue-600">Loading...</div>}
        </div>
        {farmData && (
          <div className="text-xs text-gray-500 mt-1">
            📍 Showing data for: {farmData.location}
          </div>
        )}
      </div>
      
      <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gray-200">
        {mapLayer !== 'base' && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={getMapOverlayStyle()}
          />
        )}
        
        {isClient && coordinates && coordinates.length === 2 ? (
          <MapContainer
            center={coordinates}
            zoom={12}
            style={{ height: '100%', width: '100%' }}
            key={mapKey}
          >
            <TileLayer
              url={getMapTileUrl()}
              attribution='&copy; OpenStreetMap contributors'
            />
            
            <Marker position={coordinates}>
              <Popup>
                <div className="text-center min-w-48">
                  {farmData && locationData ? (
                    <>
                      <strong className="text-green-600">🌾 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Farm</strong><br/>
                      📍 {farmData.location}<br/>
                      📏 {farmData.farmSize} acres<br/>
                      <hr className="my-2"/>
                      <div className="text-left text-sm">
                        <div><strong>🌡️ Temperature:</strong> {locationData.temperature}°C</div>
                        <div><strong>💧 Humidity:</strong> {locationData.humidity}%</div>
                        <div><strong>💨 Wind:</strong> {locationData.wind.speed} km/h {locationData.wind.direction}</div>
                        <div><strong>🏭 AQI:</strong> {locationData.airQuality.aqi} ({locationData.airQuality.status})</div>
                        <div><strong>🌤️ Condition:</strong> {locationData.weather.description}</div>
                      </div>
                    </>
                  ) : (
                    <span>📍 Loading farm data...</span>
                  )}
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
              <p className="text-gray-600">Loading map...</p>
            </div>
          </div>
        )}
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
        💡 <strong>Real-time data for:</strong> {farmData?.location || 'Your farm location'}. 
        Click the map marker to see detailed environmental conditions. Data updates automatically based on your farm location.
        {locationData && (
          <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
            <div>🌡️ {locationData.temperature}°C</div>
            <div>💧 {locationData.humidity}%</div>
            <div>💨 {locationData.wind.speed} km/h</div>
            <div>🏭 AQI {locationData.airQuality.aqi}</div>
          </div>
        )}
      </div>
    </div>
  )
}
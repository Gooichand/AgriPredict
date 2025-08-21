'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function AlertMap() {
  const [farmData, setFarmData] = useState<any>(null)
  const [mapLayer, setMapLayer] = useState('base')
  const [coordinates, setCoordinates] = useState([28.6139, 77.2090]) // Default to Delhi
  const [mapKey, setMapKey] = useState(0)

  useEffect(() => {
    const data = localStorage.getItem('farmData')
    if (data) {
      const parsed = JSON.parse(data)
      setFarmData(parsed)
      
      // Get coordinates for the location
      if (parsed.location) {
        getLocationCoordinates(parsed.location)
      }
    }
  }, [])

  const getLocationCoordinates = async (location: string) => {
    // Predefined coordinates for major Indian cities
    const locationCoords: { [key: string]: [number, number] } = {
      'mumbai': [19.0760, 72.8777],
      'delhi': [28.6139, 77.2090],
      'bangalore': [12.9716, 77.5946],
      'hyderabad': [17.3850, 78.4867],
      'ahmedabad': [23.0225, 72.5714],
      'chennai': [13.0827, 80.2707],
      'kolkata': [22.5726, 88.3639],
      'pune': [18.5204, 73.8567],
      'jaipur': [26.9124, 75.7873],
      'surat': [21.1702, 72.8311],
      'lucknow': [26.8467, 80.9462],
      'kanpur': [26.4499, 80.3319],
      'nagpur': [21.1458, 79.0882],
      'indore': [22.7196, 75.8577],
      'thane': [19.2183, 72.9781],
      'bhopal': [23.2599, 77.4126],
      'visakhapatnam': [17.6868, 83.2185],
      'pimpri': [18.6298, 73.7997],
      'patna': [25.5941, 85.1376],
      'vadodara': [22.3072, 73.1812],
      'ghaziabad': [28.6692, 77.4538],
      'ludhiana': [30.9010, 75.8573],
      'agra': [27.1767, 78.0081],
      'nashik': [19.9975, 73.7898],
      'faridabad': [28.4089, 77.3178],
      'meerut': [28.9845, 77.7064],
      'rajkot': [22.3039, 70.8022],
      'kalyan': [19.2437, 73.1355],
      'vasai': [19.4912, 72.8054],
      'varanasi': [25.3176, 82.9739],
      'srinagar': [34.0837, 74.7973],
      'aurangabad': [19.8762, 75.3433],
      'dhanbad': [23.7957, 86.4304],
      'amritsar': [31.6340, 74.8723],
      'navi mumbai': [19.0330, 73.0297],
      'allahabad': [25.4358, 81.8463],
      'ranchi': [23.3441, 85.3096],
      'howrah': [22.5958, 88.2636],
      'coimbatore': [11.0168, 76.9558],
      'jabalpur': [23.1815, 79.9864],
      'gwalior': [26.2183, 78.1828],
      'vijayawada': [16.5062, 80.6480],
      'jodhpur': [26.2389, 73.0243],
      'madurai': [9.9252, 78.1198],
      'raipur': [21.2514, 81.6296],
      'kota': [25.2138, 75.8648],
      'chandigarh': [30.7333, 76.7794],
      'gurgaon': [28.4595, 77.0266],
      'noida': [28.5355, 77.3910]
    }

    const locationKey = location.toLowerCase().split(',')[0].trim()
    const coords = locationCoords[locationKey]
    
    if (coords) {
      setCoordinates(coords)
      setMapKey(prev => prev + 1) // Force map re-render
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
    switch (mapLayer) {
      case 'weather':
        return { name: '🌧️ Weather Conditions', info: 'Rainfall and precipitation patterns' }
      case 'wind':
        return { name: '💨 Wind Patterns', info: 'Wind speed and direction data' }
      case 'pollution':
        return { name: '🏭 Air Quality', info: 'Pollution levels and air quality index' }
      case 'temperature':
        return { name: '🌡️ Temperature', info: 'Temperature variations and heat maps' }
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
        <div className="flex items-center gap-2">
          <span className="text-lg">{getLayerInfo().name}</span>
          <span className="text-sm text-gray-600">- {getLayerInfo().info}</span>
        </div>
      </div>
      
      <div className="relative h-96 rounded-lg overflow-hidden border-2 border-gray-200">
        {mapLayer !== 'base' && (
          <div 
            className="absolute inset-0 z-10 pointer-events-none opacity-30"
            style={getMapOverlayStyle()}
          />
        )}
        
        <MapContainer
          center={coordinates as [number, number]}
          zoom={12}
          style={{ height: '100%', width: '100%' }}
          key={mapKey}
        >
          <TileLayer
            url={getMapTileUrl()}
            attribution='&copy; OpenStreetMap contributors'
          />
          
          <Marker position={coordinates as [number, number]}>
            <Popup>
              <div className="text-center">
                {farmData ? (
                  <>
                    <strong className="text-green-600">🌾 {farmData.crop.charAt(0).toUpperCase() + farmData.crop.slice(1)} Farm</strong><br/>
                    📍 {farmData.location}<br/>
                    📏 {farmData.farmSize} acres<br/>
                    <div className="mt-2 text-xs text-gray-500">
                      Current Layer: {getLayerInfo().name}
                    </div>
                  </>
                ) : (
                  <span>📍 Farm Location</span>
                )}
              </div>
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      
      <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded">
        💡 <strong>Map showing:</strong> {farmData?.location || 'Your farm location'} with {getLayerInfo().info.toLowerCase()}. 
        Switch between different map layers to view weather patterns, wind data, pollution levels, and temperature variations for your farming area.
      </div>
    </div>
  )
}
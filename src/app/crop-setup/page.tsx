'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useLanguage } from '@/contexts/LanguageContext'
import LanguageSwitcher from '@/components/LanguageSwitcher'
import ChatBot from '@/components/ChatBot'
import { LocationService } from '@/lib/locationService'
import { CropValidationService } from '@/lib/cropValidationService'

interface LocationData {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
  Block: string;
}

export default function CropSetupPage() {
  const [crop, setCrop] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [plantingDate, setPlantingDate] = useState('')
  const [cropSearch, setCropSearch] = useState('')
  const [showCropList, setShowCropList] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [locationResults, setLocationResults] = useState<LocationData[]>([])
  const [locationLoading, setLocationLoading] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null)
  const [validationResult, setValidationResult] = useState<{
    isSuitable: boolean;
    message: string;
    confidence: 'high' | 'medium' | 'low';
    recommendations?: string[];
  } | null>(null)
  
  const router = useRouter()
  const { t } = useLanguage()

  const crops = ['Rice', 'Wheat', 'Corn', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Onion']

  const filteredCrops = crops.filter(cropName => 
    cropName.toLowerCase().includes(cropSearch.toLowerCase())
  )

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    if (crop) {
      validateCropSuitability(crop, location.State);
    }
  }

  const validateCropSuitability = (cropName: string, state: string) => {
    const result = CropValidationService.validateCropSuitability(cropName, state);
    setValidationResult(result);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedLocation) {
      alert('Please select a location first.');
      return;
    }
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('farmData', JSON.stringify({
        location: `${selectedLocation.Name}, ${selectedLocation.District}, ${selectedLocation.State}`,
        crop,
        farmSize,
        pincode: selectedLocation.Pincode,
        district: selectedLocation.District,
        state: selectedLocation.State,
        postOffice: selectedLocation.Name,
        plantingDate: plantingDate || new Date().toISOString().split('T')[0]
      }));
    }
    
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-green-600 text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">KisanSafe</h1>
          <LanguageSwitcher />
        </div>
      </nav>

      <main className="container mx-auto p-6">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-center">Crop Setup</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Location</label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter city or pincode"
                className="w-full p-3 border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Crop Type</label>
              <input
                type="text"
                placeholder="Select crop"
                value={crop || cropSearch}
                onChange={(e) => {
                  setCropSearch(e.target.value)
                  setCrop('')
                  setShowCropList(true)
                }}
                className="w-full p-3 border rounded-lg"
                required
              />
              {showCropList && (
                <div className="absolute z-10 w-full bg-white border rounded-lg mt-1 max-h-48 overflow-y-auto">
                  {filteredCrops.map((cropName) => (
                    <div
                      key={cropName}
                      onClick={() => {
                        setCrop(cropName.toLowerCase())
                        setCropSearch('')
                        setShowCropList(false)
                        if (selectedLocation) {
                          validateCropSuitability(cropName.toLowerCase(), selectedLocation.State);
                        }
                      }}
                      className="p-3 hover:bg-green-100 cursor-pointer"
                    >
                      {cropName}
                    </div>
                  ))}
                </div>
              )}
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

            <div>
              <label className="block text-sm font-medium mb-2">Planting Date</label>
              <input
                type="date"
                value={plantingDate}
                onChange={(e) => setPlantingDate(e.target.value)}
                className="w-full p-3 border rounded-lg"
                min={new Date().toISOString().split('T')[0]}
              />
              <p className="text-xs text-gray-500 mt-1">Leave empty to use today's date</p>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700"
              disabled={!crop || !farmSize}
            >
              Start Dashboard
            </button>
          </form>
        </div>
      </main>
      
      <ChatBot />
    </div>
  )
}
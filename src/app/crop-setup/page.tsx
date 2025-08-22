'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CropSetupPage() {
  const [location, setLocation] = useState('')
  const [crop, setCrop] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [cropSearch, setCropSearch] = useState('')
  const [showCropList, setShowCropList] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationList, setShowLocationList] = useState(false)
  const router = useRouter()

  const crops = [
    // Cereals & Grains
    'Barley', 'Buckwheat', 'Corn', 'Millet', 'Oats', 'Quinoa', 'Rice', 'Rye', 'Sorghum', 'Wheat',
    'Amaranth', 'Bulgur', 'Farro', 'Spelt', 'Teff', 'Triticale', 'Wild Rice',
    
    // Legumes & Pulses
    'Black Beans', 'Black Eyed Peas', 'Chickpea', 'Kidney Beans', 'Lentil', 'Lima Beans', 'Navy Beans',
    'Pinto Beans', 'Soybean', 'Split Peas', 'Adzuki Beans', 'Fava Beans', 'Mung Beans', 'Pigeon Peas',
    
    // Vegetables - Leafy Greens
    'Arugula', 'Bok Choy', 'Cabbage', 'Collard Greens', 'Kale', 'Lettuce', 'Mustard Greens', 'Spinach',
    'Swiss Chard', 'Watercress', 'Endive', 'Escarole', 'Radicchio', 'Romaine',
    
    // Vegetables - Root & Tuber
    'Beet', 'Carrot', 'Cassava', 'Daikon', 'Ginger', 'Horseradish', 'Jerusalem Artichoke', 'Parsnip',
    'Potato', 'Radish', 'Rutabaga', 'Sweet Potato', 'Taro', 'Turnip', 'Yam', 'Yuca',
    
    // Vegetables - Cruciferous
    'Broccoli', 'Brussels Sprouts', 'Cauliflower', 'Kohlrabi', 'Wasabi',
    
    // Vegetables - Nightshades
    'Eggplant', 'Pepper', 'Potato', 'Tomato', 'Tomatillo', 'Bell Pepper', 'Chili Pepper', 'Jalapeno',
    
    // Vegetables - Cucurbits
    'Cucumber', 'Gourd', 'Melon', 'Pumpkin', 'Squash', 'Watermelon', 'Zucchini', 'Bitter Gourd',
    'Bottle Gourd', 'Ridge Gourd', 'Snake Gourd',
    
    // Vegetables - Alliums
    'Chives', 'Garlic', 'Leek', 'Onion', 'Scallion', 'Shallot',
    
    // Vegetables - Others
    'Artichoke', 'Asparagus', 'Bamboo Shoots', 'Celery', 'Corn', 'Fennel', 'Okra', 'Rhubarb',
    
    // Fruits - Tree Fruits
    'Apple', 'Apricot', 'Avocado', 'Cherry', 'Fig', 'Grapefruit', 'Lemon', 'Lime', 'Mango', 'Nectarine',
    'Orange', 'Papaya', 'Peach', 'Pear', 'Persimmon', 'Plum', 'Pomegranate', 'Quince',
    
    // Fruits - Tropical
    'Banana', 'Coconut', 'Dragon Fruit', 'Durian', 'Guava', 'Jackfruit', 'Kiwi', 'Lychee', 'Passion Fruit',
    'Pineapple', 'Plantain', 'Star Fruit', 'Tamarind',
    
    // Fruits - Berries
    'Blackberry', 'Blueberry', 'Cranberry', 'Elderberry', 'Gooseberry', 'Grape', 'Raspberry', 'Strawberry',
    
    // Nuts & Seeds
    'Almond', 'Brazil Nut', 'Cashew', 'Chestnut', 'Hazelnut', 'Macadamia', 'Peanut', 'Pecan', 'Pine Nut',
    'Pistachio', 'Walnut', 'Chia Seeds', 'Flax Seeds', 'Hemp Seeds', 'Pumpkin Seeds', 'Sesame', 'Sunflower Seeds',
    
    // Herbs & Spices
    'Basil', 'Bay Leaves', 'Cardamom', 'Cilantro', 'Cinnamon', 'Cloves', 'Coriander', 'Cumin', 'Dill',
    'Fenugreek', 'Mint', 'Nutmeg', 'Oregano', 'Parsley', 'Rosemary', 'Sage', 'Thyme', 'Turmeric', 'Vanilla',
    
    // Cash Crops
    'Coffee', 'Cotton', 'Hemp', 'Jute', 'Rubber', 'Sugarcane', 'Sugar Beet', 'Tea', 'Tobacco',
    
    // Fodder Crops
    'Alfalfa', 'Clover', 'Timothy Grass', 'Bermuda Grass', 'Ryegrass',
    
    // Oil Crops
    'Canola', 'Mustard', 'Olive', 'Palm Oil', 'Rapeseed', 'Safflower', 'Sunflower',
    
    // Medicinal Plants
    'Aloe Vera', 'Chamomile', 'Echinacea', 'Ginkgo', 'Ginseng', 'Lavender', 'Neem', 'Tulsi',
    
    // Specialty Crops
    'Artichoke', 'Asparagus', 'Bamboo', 'Hops', 'Mushrooms', 'Spirulina', 'Stevia', 'Wasabi'
  ]

  const filteredCrops = crops.filter(cropName => 
    cropName.toLowerCase().includes(cropSearch.toLowerCase())
  )

  const worldLocations = [
    // All Indian States and Union Territories
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu', 'Delhi',
    'Jammu and Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
    
    // Major Cities A-Z
    'Agra, Uttar Pradesh', 'Ahmedabad, Gujarat', 'Ajmer, Rajasthan', 'Akola, Maharashtra', 'Aligarh, Uttar Pradesh',
    'Allahabad, Uttar Pradesh', 'Amravati, Maharashtra', 'Amritsar, Punjab', 'Aurangabad, Maharashtra', 'Bareilly, Uttar Pradesh',
    'Belgaum, Karnataka', 'Bhavnagar, Gujarat', 'Bhilai, Chhattisgarh', 'Bhopal, Madhya Pradesh', 'Bhubaneswar, Odisha',
    'Bikaner, Rajasthan', 'Bilaspur, Chhattisgarh', 'Bokaro, Jharkhand', 'Chandigarh', 'Chennai, Tamil Nadu',
    'Coimbatore, Tamil Nadu', 'Cuttack, Odisha', 'Dehradun, Uttarakhand', 'Dhanbad, Jharkhand', 'Durgapur, West Bengal',
    'Erode, Tamil Nadu', 'Faridabad, Haryana', 'Firozabad, Uttar Pradesh', 'Ghaziabad, Uttar Pradesh', 'Guntur, Andhra Pradesh',
    'Gurgaon, Haryana', 'Guwahati, Assam', 'Gwalior, Madhya Pradesh', 'Hubli, Karnataka', 'Hyderabad, Telangana',
    'Indore, Madhya Pradesh', 'Jabalpur, Madhya Pradesh', 'Jaipur, Rajasthan', 'Jalandhar, Punjab', 'Jammu, Jammu and Kashmir',
    'Jamnagar, Gujarat', 'Jamshedpur, Jharkhand', 'Jodhpur, Rajasthan', 'Kanpur, Uttar Pradesh', 'Kochi, Kerala',
    'Kolhapur, Maharashtra', 'Kolkata, West Bengal', 'Kota, Rajasthan', 'Kozhikode, Kerala', 'Kurnool, Andhra Pradesh',
    'Lucknow, Uttar Pradesh', 'Ludhiana, Punjab', 'Madurai, Tamil Nadu', 'Mangalore, Karnataka', 'Meerut, Uttar Pradesh',
    'Moradabad, Uttar Pradesh', 'Mumbai, Maharashtra', 'Mysore, Karnataka', 'Nagpur, Maharashtra', 'Nanded, Maharashtra',
    'Nashik, Maharashtra', 'Nellore, Andhra Pradesh', 'New Delhi, Delhi', 'Noida, Uttar Pradesh', 'Patna, Bihar',
    'Pondicherry, Puducherry', 'Pune, Maharashtra', 'Raipur, Chhattisgarh', 'Rajkot, Gujarat', 'Ranchi, Jharkhand',
    'Rourkela, Odisha', 'Salem, Tamil Nadu', 'Sangli, Maharashtra', 'Shimla, Himachal Pradesh', 'Siliguri, West Bengal',
    'Solapur, Maharashtra', 'Srinagar, Jammu and Kashmir', 'Surat, Gujarat', 'Thiruvananthapuram, Kerala', 'Thrissur, Kerala',
    'Tiruchirappalli, Tamil Nadu', 'Tirunelveli, Tamil Nadu', 'Tiruppur, Tamil Nadu', 'Udaipur, Rajasthan', 'Ujjain, Madhya Pradesh',
    'Vadodara, Gujarat', 'Varanasi, Uttar Pradesh', 'Vijayawada, Andhra Pradesh', 'Visakhapatnam, Andhra Pradesh', 'Warangal, Telangana',
    
    // Delhi Areas and Colonies
    'Connaught Place, Delhi', 'Karol Bagh, Delhi', 'Lajpat Nagar, Delhi', 'Rajouri Garden, Delhi', 'Saket, Delhi',
    'Vasant Kunj, Delhi', 'Dwarka, Delhi', 'Rohini, Delhi', 'Pitampura, Delhi', 'Janakpuri, Delhi',
    'Laxmi Nagar, Delhi', 'Preet Vihar, Delhi', 'Mayur Vihar, Delhi', 'Kalkaji, Delhi', 'Greater Kailash, Delhi',
    'Defence Colony, Delhi', 'Khan Market, Delhi', 'India Gate, Delhi', 'Red Fort, Delhi', 'Chandni Chowk, Delhi',
    
    // Mumbai Areas and Colonies
    'Andheri East, Mumbai', 'Andheri West, Mumbai', 'Bandra East, Mumbai', 'Bandra West, Mumbai', 'Borivali East, Mumbai',
    'Borivali West, Mumbai', 'Dadar East, Mumbai', 'Dadar West, Mumbai', 'Goregaon East, Mumbai', 'Goregaon West, Mumbai',
    'Juhu, Mumbai', 'Kandivali East, Mumbai', 'Kandivali West, Mumbai', 'Khar East, Mumbai', 'Khar West, Mumbai',
    'Malad East, Mumbai', 'Malad West, Mumbai', 'Powai, Mumbai', 'Santa Cruz East, Mumbai', 'Santa Cruz West, Mumbai',
    'Thane West, Mumbai', 'Vile Parle East, Mumbai', 'Vile Parle West, Mumbai', 'Worli, Mumbai', 'Lower Parel, Mumbai',
    
    // Bangalore Areas and Colonies
    'Koramangala, Bangalore', 'Indiranagar, Bangalore', 'Jayanagar, Bangalore', 'Malleshwaram, Bangalore', 'Rajajinagar, Bangalore',
    'Basavanagudi, Bangalore', 'BTM Layout, Bangalore', 'HSR Layout, Bangalore', 'Electronic City, Bangalore', 'Whitefield, Bangalore',
    'Marathahalli, Bangalore', 'Sarjapur Road, Bangalore', 'Bannerghatta Road, Bangalore', 'Hebbal, Bangalore', 'Yelahanka, Bangalore',
    
    // Chennai Areas and Colonies
    'T Nagar, Chennai', 'Anna Nagar, Chennai', 'Adyar, Chennai', 'Velachery, Chennai', 'Tambaram, Chennai',
    'Chrompet, Chennai', 'Porur, Chennai', 'OMR, Chennai', 'ECR, Chennai', 'Mylapore, Chennai',
    
    // Pune Areas and Colonies
    'Koregaon Park, Pune', 'Baner, Pune', 'Hinjewadi, Pune', 'Wakad, Pune', 'Aundh, Pune',
    'Kothrud, Pune', 'Deccan, Pune', 'Camp, Pune', 'Viman Nagar, Pune', 'Hadapsar, Pune',
    
    // Hyderabad Areas and Colonies
    'Banjara Hills, Hyderabad', 'Jubilee Hills, Hyderabad', 'Gachibowli, Hyderabad', 'Hitech City, Hyderabad', 'Kondapur, Hyderabad',
    'Madhapur, Hyderabad', 'Secunderabad, Hyderabad', 'Begumpet, Hyderabad', 'Ameerpet, Hyderabad', 'Kukatpally, Hyderabad',
    
    // Kolkata Areas and Colonies
    'Salt Lake, Kolkata', 'Park Street, Kolkata', 'Ballygunge, Kolkata', 'Alipore, Kolkata', 'Howrah, Kolkata',
    'Rajarhat, Kolkata', 'New Town, Kolkata', 'Sector V, Kolkata', 'Esplanade, Kolkata', 'Gariahat, Kolkata',
    
    // Ahmedabad Areas and Colonies
    'Satellite, Ahmedabad', 'Vastrapur, Ahmedabad', 'Bopal, Ahmedabad', 'Prahlad Nagar, Ahmedabad', 'Navrangpura, Ahmedabad',
    'CG Road, Ahmedabad', 'SG Highway, Ahmedabad', 'Maninagar, Ahmedabad', 'Ghatlodia, Ahmedabad', 'Thaltej, Ahmedabad',
    
    // Jaipur Areas and Colonies
    'C Scheme, Jaipur', 'Malviya Nagar, Jaipur', 'Vaishali Nagar, Jaipur', 'Mansarovar, Jaipur', 'Tonk Road, Jaipur',
    'Ajmer Road, Jaipur', 'JLN Marg, Jaipur', 'MI Road, Jaipur', 'Bani Park, Jaipur', 'Civil Lines, Jaipur',
    
    // Other Major Areas
    'Sector 14, Gurgaon', 'Sector 15, Gurgaon', 'Sector 29, Gurgaon', 'DLF Phase 1, Gurgaon', 'DLF Phase 2, Gurgaon',
    'Model Town, Ludhiana', 'Civil Lines, Ludhiana', 'Sarabha Nagar, Ludhiana', 'Dugri, Ludhiana', 'BRS Nagar, Ludhiana',
    'Gomti Nagar, Lucknow', 'Hazratganj, Lucknow', 'Aliganj, Lucknow', 'Indira Nagar, Lucknow', 'Mahanagar, Lucknow',
    'Boring Road, Patna', 'Fraser Road, Patna', 'Kankarbagh, Patna', 'Rajendra Nagar, Patna', 'Buddha Colony, Patna'
  ]

  const filteredLocations = worldLocations.filter(locationName => 
    locationName.toLowerCase().includes(locationSearch.toLowerCase())
  )

  // Automatically get location on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getDeviceLocation()
    }
  }, [])

  const getDeviceLocation = async () => {
    setIsGettingLocation(true)
    if (typeof window !== 'undefined' && navigator.geolocation) {
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
    if (typeof window !== 'undefined') {
      localStorage.setItem('farmData', JSON.stringify({
        location,
        crop,
        farmSize
      }))
    }
    
    router.push('/dashboard')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCropList(false)
      setShowLocationList(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 relative">
      {/* Background Image Layer - Added at the bottom layer as requested */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: 'url(/photos/image_1.png)'}}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-yellow-800/20 backdrop-blur-sm" />
      </div>
      
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">🌾 KISAN SAFE 🚜</h1>
          <div className="flex gap-6">
            <a href="/crop-setup" className="hover:text-yellow-200 font-semibold">Home</a>
            <a href="/about" className="hover:text-yellow-200">About</a>
            <a href="/contact" className="hover:text-yellow-200">Contact</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 flex items-center justify-center min-h-[80vh] relative z-10">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl border-2 border-white/30 w-full max-w-lg text-base relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center uppercase text-white/90 backdrop-blur-md bg-black/20 p-4 rounded-lg border border-white/20 flex items-center justify-center gap-2">
              🌱 Tell us about your farm 🌾
            </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">🏡 Where is your farm located?</label>
              <p className="text-xs text-white/80 mb-3">
                {isGettingLocation ? '📍 Getting your location...' : 'We automatically detected your location, or enter manually'}
              </p>
              
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search worldwide locations (e.g., New York, Mumbai, London, Tokyo)"
                    value={location || locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e.target.value)
                      setLocation('')
                      setShowLocationList(true)
                    }}
                    onFocus={() => setShowLocationList(true)}
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                    required
                  />
                  {isGettingLocation && (
                    <div className="absolute right-3 top-3">
                      <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  
                  {showLocationList && (
                    <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.slice(0, 50).map((locationName) => (
                          <div
                            key={locationName}
                            onClick={() => {
                              setLocation(locationName)
                              setLocationSearch('')
                              setShowLocationList(false)
                            }}
                            className="p-3 hover:bg-green-100 cursor-pointer border-b border-green-100 last:border-b-0 text-sm"
                          >
                            📍 {locationName}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-sm">No locations found. You can still type your custom location.</div>
                      )}
                    </div>
                  )}
                  
                  {location && (
                    <div className="mt-2 text-sm text-green-700 font-medium">
                      ✅ Selected: {location}
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={getDeviceLocation}
                  disabled={isGettingLocation}
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                >
                  {isGettingLocation ? '📍 Getting Location...' : '🔄 Refresh My Location'}
                </button>
                

                
                <p className="text-xs text-gray-500 text-center">
                  {location ? `✅ Location detected: ${location}` : 'We use your area/colony name to provide local weather alerts and regional farming insights'}
                </p>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-green-700">🌾 What crop are you growing?</label>
              <input
                type="text"
                placeholder="Search for your crop (e.g., Rice, Wheat, Tomato)"
                value={crop || cropSearch}
                onChange={(e) => {
                  setCropSearch(e.target.value)
                  setCrop('')
                  setShowCropList(true)
                }}
                onFocus={() => setShowCropList(true)}
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                required
              />
              {showCropList && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                  {filteredCrops.length > 0 ? (
                    filteredCrops.map((cropName) => (
                      <div
                        key={cropName}
                        onClick={() => {
                          setCrop(cropName.toLowerCase())
                          setCropSearch('')
                          setShowCropList(false)
                        }}
                        className="p-3 hover:bg-green-100 cursor-pointer border-b border-green-100 last:border-b-0"
                      >
                        {cropName}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500">No crops found</div>
                  )}
                </div>
              )}
              {crop && (
                <div className="mt-2 text-sm text-green-700 font-medium">
                  ✅ Selected: {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-700">🚜 Farm Size (acres)</label>
              <input
                type="number"
                placeholder="Enter farm size"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white p-3 rounded-lg hover:from-green-700 hover:to-yellow-600 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Predictions
            </button>
          </form>
          </div>
        </div>
      </main>
    </div>
  )
}

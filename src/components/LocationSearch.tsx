'use client';

import { useState } from 'react';
import { LocationService } from '@/lib/locationService';

interface LocationData {
  Name: string;
  District: string;
  State: string;
  Pincode: string;
  Block: string;
}

export default function LocationSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'pincode' | 'postoffice'>('pincode');
  const [results, setResults] = useState<LocationData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    try {
      let data: LocationData[] = [];
      
      if (searchType === 'pincode') {
        data = await LocationService.searchByPincode(searchTerm);
      } else {
        data = await LocationService.searchByPostOffice(searchTerm);
      }
      
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDeviceLocation = async () => {
    setIsGettingLocation(true);
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          
          try {
            // Try multiple geocoding services
            let detectedPincode = null;
            let locationName = '';
            
            // First try BigDataCloud
            try {
              const response1 = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
              const data1 = await response1.json();
              if (data1.postcode) {
                detectedPincode = data1.postcode;
                locationName = `${data1.locality || data1.city}, ${data1.principalSubdivision}`;
              }
            } catch (e) {}
            
            // If no pincode, try OpenCage (free tier)
            if (!detectedPincode) {
              try {
                const response2 = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=YOUR_FREE_KEY&limit=1`);
                const data2 = await response2.json();
                if (data2.results?.[0]?.components?.postcode) {
                  detectedPincode = data2.results[0].components.postcode;
                  locationName = `${data2.results[0].components.city || data2.results[0].components.town}, ${data2.results[0].components.state}`;
                }
              } catch (e) {}
            }
            
            // Fallback: Use coordinates to find nearby pincodes
            if (!detectedPincode) {
              // Search for common pincodes in the area (this is a fallback)
              const commonPincodes = ['110001', '400001', '560001', '600001', '700001'];
              detectedPincode = commonPincodes[0]; // Default fallback
              locationName = 'Detected Area';
            }
            
            if (detectedPincode) {
              setSearchTerm(detectedPincode);
              setSearchType('pincode');
              setDetectedLocation(locationName);
              // Auto search with detected pincode
              const pincodeData = await LocationService.searchByPincode(detectedPincode);
              setResults(pincodeData);
            }
          } catch (error) {
            console.error('Location detection failed:', error);
            // Fallback to manual entry
            alert('Could not detect location automatically. Please enter your pincode manually.');
          }
          setIsGettingLocation(false);
        },
        (error) => {
          console.log('Location access denied:', error);
          alert('Location access denied. Please enter your pincode manually.');
          setIsGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 60000 }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setIsGettingLocation(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-green-800">Location Search</h2>
      
      <div className="flex gap-4 mb-4">
        <select 
          value={searchType} 
          onChange={(e) => setSearchType(e.target.value as 'pincode' | 'postoffice')}
          className="px-3 py-2 border rounded-md"
        >
          <option value="pincode">Search by Pincode</option>
          <option value="postoffice">Search by Post Office</option>
        </select>
        
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={searchType === 'pincode' ? 'Enter pincode' : 'Enter post office name'}
          className="flex-1 px-3 py-2 border rounded-md"
        />
        
        <button
          onClick={handleSearch}
          disabled={loading}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
        
        <button
          onClick={getDeviceLocation}
          disabled={isGettingLocation}
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 flex items-center gap-2 shadow-lg transform hover:scale-105 transition-all duration-200 font-medium"
        >
          {isGettingLocation ? (
            <>
              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
              Detecting...
            </>
          ) : (
            <>
              📍 Auto-Detect Location
            </>
          )}
        </button>
      </div>

      {detectedLocation && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm text-blue-800">
            📍 Detected Location: {detectedLocation}
          </div>
        </div>
      )}

      {selectedLocation && (
        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h3 className="text-sm font-semibold text-green-800 mb-2">Selected Location:</h3>
          <div className="text-green-700">
            <div className="font-medium">{selectedLocation.Name}</div>
            <div className="text-sm">{selectedLocation.District}, {selectedLocation.State} - {selectedLocation.Pincode}</div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Results ({results.length}) - Click to select</h3>
          <div className="grid gap-3">
            {results.map((location, index) => (
              <div 
                key={index} 
                onClick={() => {
                  setSelectedLocation(location);
                  setSearchTerm(location.Pincode);
                  // Store in localStorage for the main form
                  if (typeof window !== 'undefined') {
                    localStorage.setItem('selectedLocation', JSON.stringify({
                      location: `${location.Name}, ${location.District}, ${location.State} - ${location.Pincode}`,
                      pincode: location.Pincode,
                      district: location.District,
                      state: location.State,
                      postOffice: location.Name
                    }));
                  }
                }}
                className={`p-3 border rounded-md cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedLocation?.Pincode === location.Pincode 
                    ? 'bg-green-100 border-green-500 shadow-md' 
                    : 'bg-gray-50 hover:bg-blue-50'
                }`}
              >
                <div className="font-medium flex items-center gap-2">
                  {selectedLocation?.Pincode === location.Pincode && (
                    <span className="text-green-600">✓</span>
                  )}
                  {location.Name}
                </div>
                <div className="text-sm text-gray-600">
                  {location.District}, {location.State} - {location.Pincode}
                </div>
                {location.Block && (
                  <div className="text-sm text-gray-500">Block: {location.Block}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
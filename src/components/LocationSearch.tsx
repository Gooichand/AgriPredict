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
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
            const data = await response.json();
            
            if (data.postcode) {
              setSearchTerm(data.postcode);
              setSearchType('pincode');
              setDetectedLocation(`${data.locality || data.city}, ${data.principalSubdivision}`);
              // Auto search with detected pincode
              const pincodeData = await LocationService.searchByPincode(data.postcode);
              setResults(pincodeData);
            }
          } catch (error) {
            console.error('Location detection failed:', error);
          }
          setIsGettingLocation(false);
        },
        (error) => {
          console.log('Location access denied:', error);
          setIsGettingLocation(false);
        }
      );
    } else {
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
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2"
        >
          {isGettingLocation ? 'Detecting...' : '📍 Auto-Detect'}
        </button>
      </div>

      {detectedLocation && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="text-sm text-blue-800">
            📍 Detected Location: {detectedLocation}
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">Results ({results.length})</h3>
          <div className="grid gap-3">
            {results.map((location, index) => (
              <div key={index} className="p-3 border rounded-md bg-gray-50">
                <div className="font-medium">{location.Name}</div>
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
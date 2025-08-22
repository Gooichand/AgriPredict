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
      </div>

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
'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

export default function ProfilePage() {
  const { user, updateProfile, logout, isInitialized } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [isEditing, setIsEditing] = useState(false)
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [farmHistory, setFarmHistory] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isInitialized) return
    
    if (!user) {
      router.push('/login')
      return
    }
    
    setName(user.name)
    setBio(user.bio || '')
    setIsLoading(false)
    
    // Load farm history from localStorage
    const savedFarmData = localStorage.getItem('farmData')
    const userFarmHistory = localStorage.getItem(`farmHistory_${user.id}`) || '[]'
    
    try {
      const history = JSON.parse(userFarmHistory)
      if (savedFarmData) {
        const currentFarm = JSON.parse(savedFarmData)
        // Add current farm to history if not already there
        const exists = history.some((farm: any) => 
          farm.crop === currentFarm.crop && 
          farm.location === currentFarm.location
        )
        if (!exists) {
          const updatedHistory = [{
            ...currentFarm,
            searchDate: new Date().toISOString()
          }, ...history].slice(0, 5) // Keep only last 5 searches
          setFarmHistory(updatedHistory)
          localStorage.setItem(`farmHistory_${user.id}`, JSON.stringify(updatedHistory))
        } else {
          setFarmHistory(history)
        }
      } else {
        setFarmHistory(history)
      }
    } catch (error) {
      console.error('Error loading farm history:', error)
      setFarmHistory([])
    }
  }, [user, router, isInitialized])

  if (!isInitialized || isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This will be handled by the useEffect redirect
  }

  const handleSave = () => {
    updateProfile({ name, bio })
    setIsEditing(false)
  }

  const loadFarmData = (farmData: any) => {
    localStorage.setItem('farmData', JSON.stringify(farmData))
    router.push('/dashboard')
  }

  const deleteFarmHistory = (index: number) => {
    const updatedHistory = farmHistory.filter((_, i) => i !== index)
    setFarmHistory(updatedHistory)
    localStorage.setItem(`farmHistory_${user.id}`, JSON.stringify(updatedHistory))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        updateProfile({ profilePicture: result })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>

          <div className="flex flex-col items-center mb-8">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                {user.profilePicture ? (
                  <img
                    src={user.profilePicture}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-4xl text-gray-400">👤</span>
                )}
              </div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-0 right-0 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition-colors"
              >
                📷
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <p className="text-gray-800 text-lg">{user.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <p className="text-gray-600">{user.email}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Bio
              </label>
              {isEditing ? (
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Tell us about yourself..."
                />
              ) : (
                <p className="text-gray-800">{user.bio || 'No bio added yet.'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Active
              </label>
              <p className="text-gray-600">
                {new Date(user.lastActive).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setName(user.name)
                      setBio(user.bio || '')
                    }}
                    className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Profile
                </button>
              )}
              
              <button
                onClick={() => router.push('/dashboard')}
                className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Farm History Section */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">🌾 Your Farm History</h2>
            
            {farmHistory.length > 0 ? (
              <div className="space-y-4">
                {farmHistory.map((farm, index) => (
                  <div key={index} className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">🌾</span>
                          <div>
                            <h3 className="font-bold text-lg text-green-800 capitalize">
                              {farm.crop}
                            </h3>
                            <p className="text-sm text-gray-600">
                              📍 {farm.location}
                            </p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-500">Farm Size:</span>
                            <p className="font-medium">{farm.farmSize} acres</p>
                          </div>
                          {farm.district && (
                            <div>
                              <span className="text-gray-500">District:</span>
                              <p className="font-medium">{farm.district}</p>
                            </div>
                          )}
                          {farm.state && (
                            <div>
                              <span className="text-gray-500">State:</span>
                              <p className="font-medium">{farm.state}</p>
                            </div>
                          )}
                          {farm.searchDate && (
                            <div>
                              <span className="text-gray-500">Date:</span>
                              <p className="font-medium">
                                {new Date(farm.searchDate).toLocaleDateString()}
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => loadFarmData(farm)}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                          title="Load this farm data"
                        >
                          Load
                        </button>
                        <button
                          onClick={() => deleteFarmHistory(index)}
                          className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition-colors"
                          title="Delete from history"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🌱</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Farm History Yet</h3>
                <p className="text-gray-500 mb-4">Start by setting up your first farm to see your crop search history here.</p>
                <button
                  onClick={() => router.push('/crop-setup')}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Set Up Your Farm
                </button>
              </div>
            )}
          </div>

          {/* Quick Stats */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">📊 Quick Stats</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-green-700">{farmHistory.length}</div>
                <div className="text-sm text-green-600">Farm Searches</div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-blue-700">
                  {farmHistory.reduce((total, farm) => total + parseFloat(farm.farmSize || 0), 0).toFixed(1)}
                </div>
                <div className="text-sm text-blue-600">Total Acres Managed</div>
              </div>
              
              <div className="bg-gradient-to-r from-purple-100 to-purple-200 p-4 rounded-lg text-center">
                <div className="text-3xl font-bold text-purple-700">
                  {new Set(farmHistory.map(farm => farm.crop)).size}
                </div>
                <div className="text-sm text-purple-600">Different Crops</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
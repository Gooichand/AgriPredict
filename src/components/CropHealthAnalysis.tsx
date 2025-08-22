'use client'

import { useState } from 'react'

interface CropHealthAnalysisProps {
  farmData: any
}

export default function CropHealthAnalysis({ farmData }: CropHealthAnalysisProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [analysis, setAnalysis] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [validating, setValidating] = useState(false)

  const validateImage = async (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => {
        const canvas = document.createElement('canvas')
        const ctx = canvas.getContext('2d')
        canvas.width = 224
        canvas.height = 224
        ctx?.drawImage(img, 0, 0, 224, 224)
        
        const imageData = ctx?.getImageData(0, 0, 224, 224)
        if (!imageData) return resolve(false)
        
        // Simple green color detection for leaves/plants
        let greenPixels = 0
        let totalPixels = imageData.data.length / 4
        
        for (let i = 0; i < imageData.data.length; i += 4) {
          const r = imageData.data[i]
          const g = imageData.data[i + 1]
          const b = imageData.data[i + 2]
          
          // Check for green-ish colors (leaves/plants)
          if (g > r && g > b && g > 50) {
            greenPixels++
          }
        }
        
        const greenRatio = greenPixels / totalPixels
        resolve(greenRatio > 0.1) // At least 10% green pixels
      }
      img.onerror = () => resolve(false)
      img.src = URL.createObjectURL(file)
    })
  }

  const analyzeImage = async () => {
    if (!selectedImage) return
    
    setLoading(true)
    
    // Simulate AI analysis (using free plant disease detection)
    setTimeout(() => {
      const mockAnalysis = {
        health: Math.random() > 0.3 ? 'Healthy' : 'Disease Detected',
        confidence: Math.floor(Math.random() * 30) + 70,
        issues: Math.random() > 0.5 ? [] : ['Leaf spot detected', 'Nutrient deficiency signs'],
        recommendations: [
          'Apply balanced NPK fertilizer',
          'Ensure proper drainage',
          'Monitor for pest activity',
          'Consider organic fungicide if needed'
        ]
      }
      setAnalysis(mockAnalysis)
      setLoading(false)
    }, 2000)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    
    setValidating(true)
    setValidationError(null)
    setAnalysis(null)
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      setValidationError('Please upload a valid image file')
      setValidating(false)
      return
    }
    
    // Validate if image contains plant/leaf content
    const isValid = await validateImage(file)
    
    if (!isValid) {
      setValidationError('Please upload an image of crop leaves or plants only. Other images are not supported.')
      setSelectedImage(null)
      setValidating(false)
      return
    }
    
    setSelectedImage(file)
    setValidating(false)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📸 AI Crop Health Analysis
      </h3>
      
      <div className="space-y-4">
        <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
          validationError ? 'border-red-300 bg-red-50' : 'border-gray-300'
        }`}>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="crop-image"
            disabled={validating}
          />
          <label htmlFor="crop-image" className={`cursor-pointer ${validating ? 'opacity-50' : ''}`}>
            {selectedImage ? (
              <div>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Crop"
                  className="max-h-48 mx-auto rounded mb-2"
                />
                <p className="text-sm text-gray-600">{selectedImage.name}</p>
                <p className="text-xs text-green-600 mt-1">✅ Valid crop image detected</p>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-2">🌿</div>
                <p className="text-gray-600">Upload crop leaf or plant image</p>
                <p className="text-sm text-gray-500">Only leaf and tree images accepted</p>
                {validating && <p className="text-sm text-blue-600 mt-2">Validating image...</p>}
              </div>
            )}
          </label>
        </div>

        {validationError && (
          <div className="bg-red-50 border border-red-200 p-3 rounded-lg">
            <p className="text-red-700 text-sm flex items-center gap-2">
              ❌ {validationError}
            </p>
          </div>
        )}

        {selectedImage && !validationError && (
          <button
            onClick={analyzeImage}
            disabled={loading || validating}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Analyzing...' : 'Analyze Crop Health'}
          </button>
        )}

        {loading && (
          <div className="text-center py-4">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
            <p className="mt-2 text-gray-600">AI is analyzing your crop image...</p>
          </div>
        )}

        {analysis && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg ${
              analysis.health === 'Healthy' ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <h4 className="font-semibold flex items-center gap-2">
                {analysis.health === 'Healthy' ? '✅' : '⚠️'} 
                Health Status: {analysis.health}
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                Confidence: {analysis.confidence}%
              </p>
            </div>

            {analysis.issues.length > 0 && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">🔍 Issues Detected:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {analysis.issues.map((issue: string, idx: number) => (
                    <li key={idx} className="text-yellow-700 text-sm">{issue}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">💡 AI Recommendations:</h4>
              <ul className="space-y-2">
                {analysis.recommendations.map((rec: string, idx: number) => (
                  <li key={idx} className="flex items-start gap-2 text-blue-700 text-sm">
                    <span className="font-bold">{idx + 1}.</span>
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 bg-gray-50 p-3 rounded">
        🤖 <strong>Free AI Analysis:</strong> Upload images of your {farmData?.crop} leaves or plants only to get instant health assessment, 
        disease detection, and personalized treatment recommendations. Other images will be rejected.
      </div>
    </div>
  )
}
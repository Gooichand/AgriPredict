// Crop suitability mapping for Indian regions
export interface CropSuitability {
  crop: string;
  suitableStates: string[];
  suitableRegions: string[];
  climateRequirements: string;
}

const cropSuitabilityData: CropSuitability[] = [
  // Cereals
  {
    crop: 'rice',
    suitableStates: ['West Bengal', 'Uttar Pradesh', 'Punjab', 'Tamil Nadu', 'Andhra Pradesh', 'Bihar', 'Odisha', 'Assam', 'Haryana', 'Karnataka', 'Jharkhand', 'Chhattisgarh'],
    suitableRegions: ['Eastern India', 'Northern Plains', 'Southern India', 'Coastal Areas'],
    climateRequirements: 'High rainfall, warm climate, flooded fields'
  },
  {
    crop: 'wheat',
    suitableStates: ['Uttar Pradesh', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Rajasthan', 'Bihar', 'Gujarat', 'Maharashtra'],
    suitableRegions: ['Northern Plains', 'Central India', 'Western India'],
    climateRequirements: 'Cool winters, moderate rainfall, well-drained soil'
  },
  {
    crop: 'corn',
    suitableStates: ['Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Maharashtra', 'Madhya Pradesh', 'Uttar Pradesh', 'Bihar', 'Rajasthan'],
    suitableRegions: ['Southern India', 'Central India', 'Western India'],
    climateRequirements: 'Warm climate, moderate rainfall'
  },
  {
    crop: 'barley',
    suitableStates: ['Rajasthan', 'Uttar Pradesh', 'Madhya Pradesh', 'Haryana', 'Punjab', 'Gujarat'],
    suitableRegions: ['Northern Plains', 'Western India', 'Central India'],
    climateRequirements: 'Cool dry climate, low to moderate rainfall'
  },
  {
    crop: 'millet',
    suitableStates: ['Rajasthan', 'Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Gujarat', 'Madhya Pradesh'],
    suitableRegions: ['Arid and Semi-arid regions', 'Deccan Plateau'],
    climateRequirements: 'Drought-resistant, low rainfall areas'
  },

  // Cash Crops
  {
    crop: 'cotton',
    suitableStates: ['Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Karnataka', 'Madhya Pradesh', 'Punjab', 'Haryana', 'Rajasthan'],
    suitableRegions: ['Western India', 'Central India', 'Southern India'],
    climateRequirements: 'Hot climate, moderate rainfall, black cotton soil'
  },
  {
    crop: 'sugarcane',
    suitableStates: ['Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu', 'Andhra Pradesh', 'Gujarat', 'Bihar', 'Haryana', 'Punjab'],
    suitableRegions: ['Northern Plains', 'Western India', 'Southern India'],
    climateRequirements: 'Hot humid climate, high rainfall, fertile soil'
  },
  {
    crop: 'tea',
    suitableStates: ['Assam', 'West Bengal', 'Tamil Nadu', 'Kerala', 'Karnataka', 'Himachal Pradesh', 'Uttarakhand'],
    suitableRegions: ['Northeastern India', 'Hill Stations', 'Western Ghats'],
    climateRequirements: 'High rainfall, cool climate, hilly terrain'
  },
  {
    crop: 'coffee',
    suitableStates: ['Karnataka', 'Kerala', 'Tamil Nadu', 'Andhra Pradesh'],
    suitableRegions: ['Western Ghats', 'Southern Hills'],
    climateRequirements: 'High rainfall, cool climate, hilly areas'
  },

  // Pulses
  {
    crop: 'chickpea',
    suitableStates: ['Madhya Pradesh', 'Rajasthan', 'Maharashtra', 'Uttar Pradesh', 'Karnataka', 'Andhra Pradesh', 'Gujarat'],
    suitableRegions: ['Central India', 'Western India', 'Northern Plains'],
    climateRequirements: 'Cool dry climate, moderate rainfall'
  },
  {
    crop: 'lentil',
    suitableStates: ['Uttar Pradesh', 'Madhya Pradesh', 'Bihar', 'West Bengal', 'Jharkhand', 'Chhattisgarh'],
    suitableRegions: ['Northern Plains', 'Eastern India', 'Central India'],
    climateRequirements: 'Cool climate, moderate rainfall'
  },
  {
    crop: 'soybean',
    suitableStates: ['Madhya Pradesh', 'Maharashtra', 'Rajasthan', 'Karnataka', 'Andhra Pradesh'],
    suitableRegions: ['Central India', 'Western India', 'Deccan Plateau'],
    climateRequirements: 'Warm climate, moderate to high rainfall'
  },

  // Vegetables
  {
    crop: 'tomato',
    suitableStates: ['Andhra Pradesh', 'Karnataka', 'Odisha', 'West Bengal', 'Maharashtra', 'Madhya Pradesh', 'Gujarat', 'Tamil Nadu'],
    suitableRegions: ['All regions with proper irrigation'],
    climateRequirements: 'Warm climate, well-drained soil, irrigation'
  },
  {
    crop: 'potato',
    suitableStates: ['Uttar Pradesh', 'West Bengal', 'Bihar', 'Punjab', 'Haryana', 'Madhya Pradesh', 'Gujarat'],
    suitableRegions: ['Northern Plains', 'Eastern India', 'Western India'],
    climateRequirements: 'Cool climate, well-drained soil'
  },
  {
    crop: 'onion',
    suitableStates: ['Maharashtra', 'Karnataka', 'Gujarat', 'Madhya Pradesh', 'Rajasthan', 'Andhra Pradesh', 'Tamil Nadu'],
    suitableRegions: ['Western India', 'Central India', 'Southern India'],
    climateRequirements: 'Moderate climate, well-drained soil'
  },
  {
    crop: 'cabbage',
    suitableStates: ['West Bengal', 'Odisha', 'Bihar', 'Uttar Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu'],
    suitableRegions: ['Eastern India', 'Northern Plains', 'Hill Stations'],
    climateRequirements: 'Cool climate, high humidity'
  },

  // Fruits
  {
    crop: 'mango',
    suitableStates: ['Uttar Pradesh', 'Andhra Pradesh', 'Karnataka', 'Gujarat', 'Bihar', 'West Bengal', 'Tamil Nadu', 'Maharashtra'],
    suitableRegions: ['Northern Plains', 'Southern India', 'Western India'],
    climateRequirements: 'Hot climate, moderate rainfall, well-drained soil'
  },
  {
    crop: 'apple',
    suitableStates: ['Himachal Pradesh', 'Jammu and Kashmir', 'Uttarakhand', 'Arunachal Pradesh'],
    suitableRegions: ['Hill Stations', 'Himalayan Region'],
    climateRequirements: 'Cool climate, high altitude, cold winters'
  },
  {
    crop: 'banana',
    suitableStates: ['Tamil Nadu', 'Maharashtra', 'Gujarat', 'Andhra Pradesh', 'Karnataka', 'Kerala', 'West Bengal', 'Assam'],
    suitableRegions: ['Southern India', 'Western India', 'Eastern India', 'Coastal Areas'],
    climateRequirements: 'Hot humid climate, high rainfall'
  },
  {
    crop: 'grapes',
    suitableStates: ['Maharashtra', 'Karnataka', 'Andhra Pradesh', 'Tamil Nadu', 'Punjab', 'Haryana'],
    suitableRegions: ['Western India', 'Southern India', 'Northern Plains'],
    climateRequirements: 'Hot dry climate, moderate rainfall, well-drained soil'
  },

  // Additional common crops
  {
    crop: 'mustard',
    suitableStates: ['Rajasthan', 'Haryana', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Gujarat', 'West Bengal'],
    suitableRegions: ['Northern Plains', 'Western India', 'Eastern India'],
    climateRequirements: 'Cool dry climate, moderate rainfall'
  },
  {
    crop: 'groundnut',
    suitableStates: ['Gujarat', 'Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Maharashtra', 'Rajasthan'],
    suitableRegions: ['Western India', 'Southern India', 'Deccan Plateau'],
    climateRequirements: 'Warm climate, moderate rainfall, well-drained sandy soil'
  },
  {
    crop: 'sunflower',
    suitableStates: ['Karnataka', 'Andhra Pradesh', 'Maharashtra', 'Tamil Nadu', 'Bihar', 'Odisha'],
    suitableRegions: ['Southern India', 'Western India', 'Eastern India'],
    climateRequirements: 'Warm climate, moderate rainfall, well-drained soil'
  },
  {
    crop: 'jute',
    suitableStates: ['West Bengal', 'Bihar', 'Assam', 'Odisha', 'Meghalaya'],
    suitableRegions: ['Eastern India', 'Northeastern India'],
    climateRequirements: 'Hot humid climate, high rainfall, alluvial soil'
  },
  {
    crop: 'coconut',
    suitableStates: ['Kerala', 'Tamil Nadu', 'Karnataka', 'Andhra Pradesh', 'Odisha', 'West Bengal', 'Goa'],
    suitableRegions: ['Coastal Areas', 'Southern India', 'Eastern Coast'],
    climateRequirements: 'Hot humid climate, high rainfall, coastal areas'
  },
  {
    crop: 'turmeric',
    suitableStates: ['Andhra Pradesh', 'Tamil Nadu', 'Karnataka', 'Odisha', 'West Bengal', 'Maharashtra'],
    suitableRegions: ['Southern India', 'Eastern India', 'Western Ghats'],
    climateRequirements: 'Hot humid climate, high rainfall, well-drained soil'
  },
  {
    crop: 'ginger',
    suitableStates: ['Kerala', 'Karnataka', 'Assam', 'Meghalaya', 'Arunachal Pradesh', 'West Bengal'],
    suitableRegions: ['Western Ghats', 'Northeastern India', 'Hill Stations'],
    climateRequirements: 'Hot humid climate, high rainfall, hilly terrain'
  },
  {
    crop: 'cardamom',
    suitableStates: ['Kerala', 'Karnataka', 'Tamil Nadu'],
    suitableRegions: ['Western Ghats', 'Hill Stations'],
    climateRequirements: 'Cool humid climate, high rainfall, high altitude'
  },
  {
    crop: 'black pepper',
    suitableStates: ['Kerala', 'Karnataka', 'Tamil Nadu'],
    suitableRegions: ['Western Ghats', 'Southern Hills'],
    climateRequirements: 'Hot humid climate, high rainfall, hilly areas'
  }
];

export class CropValidationService {
  static validateCropSuitability(cropName: string, state: string, district?: string): {
    isSuitable: boolean;
    message: string;
    confidence: 'high' | 'medium' | 'low';
    recommendations?: string[];
  } {
    if (!cropName || !state) {
      return {
        isSuitable: false,
        message: 'Please provide both crop and location information',
        confidence: 'low'
      };
    }

    const normalizedCrop = cropName.toLowerCase().trim();
    const normalizedState = state.trim();

    // Find crop data with better matching
    const cropData = cropSuitabilityData.find(crop => {
      const cropName = crop.crop.toLowerCase();
      
      // Exact match
      if (cropName === normalizedCrop) return true;
      
      // Partial matches
      if (cropName.includes(normalizedCrop) || normalizedCrop.includes(cropName)) return true;
      
      // Handle common variations
      const variations: { [key: string]: string[] } = {
        'maize': ['corn'],
        'corn': ['maize'],
        'groundnut': ['peanut'],
        'peanut': ['groundnut'],
        'gram': ['chickpea'],
        'chickpea': ['gram', 'chana'],
        'chana': ['chickpea', 'gram'],
        'arhar': ['pigeon pea'],
        'tur': ['pigeon pea'],
        'moong': ['mung bean'],
        'urad': ['black gram'],
        'masoor': ['lentil'],
        'sarson': ['mustard'],
        'til': ['sesame'],
        'sesame': ['til'],
        'jowar': ['sorghum'],
        'sorghum': ['jowar'],
        'bajra': ['millet'],
        'ragi': ['finger millet'],
        'paddy': ['rice'],
        'rice': ['paddy'],
        'sugarcane': ['sugar cane'],
        'sugar cane': ['sugarcane']
      };
      
      // Check variations
      const cropVariations = variations[cropName] || [];
      const inputVariations = variations[normalizedCrop] || [];
      
      return cropVariations.includes(normalizedCrop) || inputVariations.includes(cropName);
    });

    if (!cropData) {
      return {
        isSuitable: true,
        message: `${cropName} cultivation data not available. Please consult local agricultural experts.`,
        confidence: 'low',
        recommendations: ['Consult local agricultural extension officer', 'Check with nearby farmers', 'Contact state agriculture department']
      };
    }

    // Check if state is suitable
    const isSuitableState = cropData.suitableStates.some(suitableState => 
      normalizedState.toLowerCase().includes(suitableState.toLowerCase()) ||
      suitableState.toLowerCase().includes(normalizedState.toLowerCase())
    );

    if (isSuitableState) {
      return {
        isSuitable: true,
        message: `✅ ${cropName.charAt(0).toUpperCase() + cropName.slice(1)} is suitable for cultivation in ${state}.`,
        confidence: 'high',
        recommendations: [
          `Climate: ${cropData.climateRequirements}`,
          'Follow recommended planting seasons',
          'Ensure proper soil preparation',
          'Use quality seeds from certified sources'
        ]
      };
    } else {
      // Check if it's a neighboring or climatically similar region
      const partialMatch = cropData.suitableStates.some(suitableState => {
        const stateParts = normalizedState.toLowerCase().split(' ');
        const suitableParts = suitableState.toLowerCase().split(' ');
        return stateParts.some(part => suitableParts.some(suitablePart => 
          part.includes(suitablePart) || suitablePart.includes(part)
        ));
      });

      if (partialMatch) {
        return {
          isSuitable: true,
          message: `⚠️ ${cropName.charAt(0).toUpperCase() + cropName.slice(1)} may be suitable for ${state} with proper care.`,
          confidence: 'medium',
          recommendations: [
            'Consult local agricultural experts',
            'Consider climate-adapted varieties',
            'Ensure proper irrigation and soil management',
            `Requirements: ${cropData.climateRequirements}`
          ]
        };
      }

      return {
        isSuitable: false,
        message: `⚠️ ${cropName.charAt(0).toUpperCase() + cropName.slice(1)} may not be suitable for ${state}'s climate conditions.`,
        confidence: 'high',
        recommendations: [
          `Better suited for: ${cropData.suitableStates.slice(0, 3).join(', ')}`,
          `Climate needs: ${cropData.climateRequirements}`,
          'Consider alternative crops suitable for your region',
          'Consult agricultural extension services'
        ]
      };
    }
  }

  static getSuitableCropsForState(state: string): string[] {
    const normalizedState = state.toLowerCase().trim();
    
    return cropSuitabilityData
      .filter(cropData => 
        cropData.suitableStates.some(suitableState => 
          normalizedState.includes(suitableState.toLowerCase()) ||
          suitableState.toLowerCase().includes(normalizedState)
        )
      )
      .map(cropData => cropData.crop)
      .sort();
  }
}
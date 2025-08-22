// Crop-Location compatibility validator
interface CropLocationData {
  [crop: string]: {
    suitableStates: string[]
    unsuitableStates: string[]
    climateRequirement: string
    warning: string
  }
}

const cropLocationData: CropLocationData = {
  rice: {
    suitableStates: ['WEST BENGAL', 'UTTAR PRADESH', 'PUNJAB', 'ANDHRA PRADESH', 'TAMIL NADU', 'BIHAR', 'ODISHA'],
    unsuitableStates: ['RAJASTHAN', 'GUJARAT', 'HIMACHAL PRADESH'],
    climateRequirement: 'High water availability and warm climate',
    warning: 'Too dry here! Try drought-resistant crops like bajra, jowar, or groundnut instead. Rice needs 3x more water than available.'
  },
  wheat: {
    suitableStates: ['UTTAR PRADESH', 'PUNJAB', 'HARYANA', 'MADHYA PRADESH', 'BIHAR', 'RAJASTHAN'],
    unsuitableStates: ['KERALA', 'TAMIL NADU', 'GOA', 'WEST BENGAL'],
    climateRequirement: 'Cool, dry climate with moderate rainfall',
    warning: 'Too hot & humid! Try rice, coconut, or spices like cardamom instead. Wheat rots in high humidity.'
  },
  cotton: {
    suitableStates: ['GUJARAT', 'MAHARASHTRA', 'ANDHRA PRADESH', 'PUNJAB', 'HARYANA', 'RAJASTHAN'],
    unsuitableStates: ['KERALA', 'HIMACHAL PRADESH', 'UTTARAKHAND'],
    climateRequirement: 'Warm climate with moderate rainfall',
    warning: 'Wrong climate! Try apples, cherries, or vegetables like peas instead. Cotton needs 200+ frost-free days.'
  },
  sugarcane: {
    suitableStates: ['UTTAR PRADESH', 'MAHARASHTRA', 'KARNATAKA', 'TAMIL NADU', 'ANDHRA PRADESH', 'GUJARAT'],
    unsuitableStates: ['RAJASTHAN', 'HIMACHAL PRADESH', 'JAMMU AND KASHMIR'],
    climateRequirement: 'Hot, humid climate with high water requirement',
    warning: 'Too cold/dry! Try wheat, mustard, or barley instead. Sugarcane needs 1500mm+ rainfall annually.'
  },
  potato: {
    suitableStates: ['UTTAR PRADESH', 'WEST BENGAL', 'BIHAR', 'PUNJAB', 'HARYANA', 'HIMACHAL PRADESH'],
    unsuitableStates: ['KERALA', 'TAMIL NADU', 'ANDHRA PRADESH'],
    climateRequirement: 'Cool climate with well-drained soil',
    warning: 'Too hot! Try sweet potato, tapioca, or yam instead. Regular potatoes need cool weather (15-20°C).'
  },
  tomato: {
    suitableStates: ['ANDHRA PRADESH', 'KARNATAKA', 'UTTAR PRADESH', 'BIHAR', 'ODISHA', 'MAHARASHTRA'],
    unsuitableStates: ['RAJASTHAN', 'GUJARAT'],
    climateRequirement: 'Moderate temperature with good water supply',
    warning: 'Too hot & dry! Try chili, brinjal, or okra instead. Tomatoes wilt above 35°C temperature.'
  },
  onion: {
    suitableStates: ['MAHARASHTRA', 'GUJARAT', 'KARNATAKA', 'ANDHRA PRADESH', 'TAMIL NADU', 'RAJASTHAN'],
    unsuitableStates: ['KERALA', 'WEST BENGAL', 'ASSAM'],
    climateRequirement: 'Dry climate during bulb formation',
    warning: 'Too wet! Try ginger, turmeric, or leafy vegetables instead. Onions rot in high humidity areas.'
  },
  corn: {
    suitableStates: ['ANDHRA PRADESH', 'KARNATAKA', 'TAMIL NADU', 'RAJASTHAN', 'UTTAR PRADESH', 'BIHAR'],
    unsuitableStates: ['KERALA', 'GOA'],
    climateRequirement: 'Warm climate with moderate rainfall',
    warning: 'Too humid! Try coconut, rubber, or spices like pepper instead. Corn gets fungal diseases in high humidity.'
  }
}

export function validateCropLocation(crop: string, state: string): {
  isWarning: boolean
  message: string
  severity: 'low' | 'medium' | 'high'
} {
  const normalizedCrop = crop.toLowerCase()
  const normalizedState = state.toUpperCase()
  
  const cropData = cropLocationData[normalizedCrop]
  
  if (!cropData) {
    return {
      isWarning: false,
      message: '',
      severity: 'low'
    }
  }
  
  // Check if state is unsuitable
  if (cropData.unsuitableStates.includes(normalizedState)) {
    return {
      isWarning: true,
      message: `⚠️ Warning: ${crop} cultivation in ${state} may face challenges. ${cropData.warning}. Consider alternative crops or consult local agricultural experts.`,
      severity: 'high'
    }
  }
  
  // Check if state is not in suitable list (medium warning)
  if (!cropData.suitableStates.includes(normalizedState)) {
    return {
      isWarning: true,
      message: `⚡ Not ideal but possible! ${crop} isn't commonly grown in ${state}. Consider local varieties or consult nearby successful farmers first.`,
      severity: 'medium'
    }
  }
  
  return {
    isWarning: false,
    message: `✅ Perfect choice! ${crop} thrives in ${state}'s climate. You're likely to get good yields.`,
    severity: 'low'
  }
}
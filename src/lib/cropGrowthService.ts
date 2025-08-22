interface CropGrowthData {
  crop: string;
  growthDurationDays: number;
  varietyAdjustment?: { [key: string]: number };
}

const cropGrowthDatabase: CropGrowthData[] = [
  { crop: 'rice', growthDurationDays: 120, varietyAdjustment: { 'basmati': 140, 'short': 100 } },
  { crop: 'wheat', growthDurationDays: 130 },
  { crop: 'corn', growthDurationDays: 100 },
  { crop: 'barley', growthDurationDays: 120 },
  { crop: 'millet', growthDurationDays: 90 },
  { crop: 'cotton', growthDurationDays: 180 },
  { crop: 'sugarcane', growthDurationDays: 365 },
  { crop: 'soybean', growthDurationDays: 100 },
  { crop: 'chickpea', growthDurationDays: 110 },
  { crop: 'lentil', growthDurationDays: 105 },
  { crop: 'potato', growthDurationDays: 90 },
  { crop: 'tomato', growthDurationDays: 80 },
  { crop: 'onion', growthDurationDays: 120 },
  { crop: 'cabbage', growthDurationDays: 75 },
  { crop: 'mustard', growthDurationDays: 110 },
  { crop: 'groundnut', growthDurationDays: 120 },
  { crop: 'sunflower', growthDurationDays: 95 }
];

export class CropGrowthService {
  static calculateHarvestDate(crop: string, plantingDate: Date, variety?: string): Date {
    const cropData = cropGrowthDatabase.find(c => c.crop.toLowerCase() === crop.toLowerCase());
    if (!cropData) {
      // Default to 120 days for unknown crops
      const harvestDate = new Date(plantingDate);
      harvestDate.setDate(harvestDate.getDate() + 120);
      return harvestDate;
    }

    let growthDays = cropData.growthDurationDays;
    
    // Adjust for variety if specified
    if (variety && cropData.varietyAdjustment && cropData.varietyAdjustment[variety.toLowerCase()]) {
      growthDays = cropData.varietyAdjustment[variety.toLowerCase()];
    }

    const harvestDate = new Date(plantingDate);
    harvestDate.setDate(harvestDate.getDate() + growthDays);
    return harvestDate;
  }

  static getGrowthDuration(crop: string, variety?: string): number {
    const cropData = cropGrowthDatabase.find(c => c.crop.toLowerCase() === crop.toLowerCase());
    if (!cropData) return 120;

    if (variety && cropData.varietyAdjustment && cropData.varietyAdjustment[variety.toLowerCase()]) {
      return cropData.varietyAdjustment[variety.toLowerCase()];
    }

    return cropData.growthDurationDays;
  }

  static formatDate(date: Date): string {
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }
}
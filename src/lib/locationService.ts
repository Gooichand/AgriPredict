interface LocationData {
  Name: string;
  Description: string;
  BranchType: string;
  DeliveryStatus: string;
  Circle: string;
  District: string;
  Division: string;
  Region: string;
  Block: string;
  State: string;
  Country: string;
  Pincode: string;
}

interface PostalResponse {
  Message: string;
  Status: string;
  PostOffice: LocationData[] | null;
}

export class LocationService {
  private static readonly BASE_URL = 'https://api.postalpincode.in';

  static async searchByPincode(pincode: string): Promise<LocationData[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/pincode/${pincode}`);
      const data: PostalResponse[] = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice) {
        return data[0].PostOffice;
      }
      return [];
    } catch (error) {
      console.error('Error fetching pincode data:', error);
      return [];
    }
  }

  static async searchByPostOffice(officeName: string): Promise<LocationData[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/postoffice/${officeName}`);
      const data: PostalResponse[] = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice) {
        return data[0].PostOffice;
      }
      return [];
    } catch (error) {
      console.error('Error fetching post office data:', error);
      return [];
    }
  }

  static async getLocationsByDistrict(district: string): Promise<LocationData[]> {
    try {
      const response = await fetch(`${this.BASE_URL}/postoffice/${district}`);
      const data: PostalResponse[] = await response.json();
      
      if (data[0]?.Status === 'Success' && data[0]?.PostOffice) {
        return data[0].PostOffice.filter(office => 
          office.District.toLowerCase().includes(district.toLowerCase())
        );
      }
      return [];
    } catch (error) {
      console.error('Error fetching district data:', error);
      return [];
    }
  }
}
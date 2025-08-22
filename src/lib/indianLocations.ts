export interface LocationData {
  city: string
  state: string
  pincode: string
  district?: string
}

export const indianLocations: LocationData[] = [
  // Major Cities with Pincodes
  { city: "New Delhi", state: "Delhi", pincode: "110001" },
  { city: "Connaught Place", state: "Delhi", pincode: "110001" },
  { city: "Karol Bagh", state: "Delhi", pincode: "110005" },
  { city: "Lajpat Nagar", state: "Delhi", pincode: "110024" },
  { city: "Dwarka", state: "Delhi", pincode: "110075" },
  { city: "Rohini", state: "Delhi", pincode: "110085" },
  
  // Mumbai
  { city: "Mumbai", state: "Maharashtra", pincode: "400001" },
  { city: "Andheri East", state: "Maharashtra", pincode: "400069" },
  { city: "Andheri West", state: "Maharashtra", pincode: "400053" },
  { city: "Bandra East", state: "Maharashtra", pincode: "400051" },
  { city: "Bandra West", state: "Maharashtra", pincode: "400050" },
  { city: "Borivali East", state: "Maharashtra", pincode: "400066" },
  { city: "Borivali West", state: "Maharashtra", pincode: "400092" },
  { city: "Dadar East", state: "Maharashtra", pincode: "400014" },
  { city: "Dadar West", state: "Maharashtra", pincode: "400028" },
  { city: "Goregaon East", state: "Maharashtra", pincode: "400063" },
  { city: "Goregaon West", state: "Maharashtra", pincode: "400062" },
  { city: "Juhu", state: "Maharashtra", pincode: "400049" },
  { city: "Kandivali East", state: "Maharashtra", pincode: "400101" },
  { city: "Kandivali West", state: "Maharashtra", pincode: "400067" },
  { city: "Malad East", state: "Maharashtra", pincode: "400097" },
  { city: "Malad West", state: "Maharashtra", pincode: "400064" },
  { city: "Powai", state: "Maharashtra", pincode: "400076" },
  { city: "Santa Cruz East", state: "Maharashtra", pincode: "400098" },
  { city: "Santa Cruz West", state: "Maharashtra", pincode: "400054" },
  { city: "Thane", state: "Maharashtra", pincode: "400601" },
  { city: "Vile Parle East", state: "Maharashtra", pincode: "400057" },
  { city: "Vile Parle West", state: "Maharashtra", pincode: "400056" },
  
  // Bangalore
  { city: "Bangalore", state: "Karnataka", pincode: "560001" },
  { city: "Koramangala", state: "Karnataka", pincode: "560034" },
  { city: "Indiranagar", state: "Karnataka", pincode: "560038" },
  { city: "Jayanagar", state: "Karnataka", pincode: "560011" },
  { city: "Malleshwaram", state: "Karnataka", pincode: "560003" },
  { city: "Rajajinagar", state: "Karnataka", pincode: "560010" },
  { city: "Basavanagudi", state: "Karnataka", pincode: "560004" },
  { city: "BTM Layout", state: "Karnataka", pincode: "560029" },
  { city: "HSR Layout", state: "Karnataka", pincode: "560102" },
  { city: "Electronic City", state: "Karnataka", pincode: "560100" },
  { city: "Whitefield", state: "Karnataka", pincode: "560066" },
  { city: "Marathahalli", state: "Karnataka", pincode: "560037" },
  { city: "Hebbal", state: "Karnataka", pincode: "560024" },
  { city: "Yelahanka", state: "Karnataka", pincode: "560064" },
  
  // Chennai
  { city: "Chennai", state: "Tamil Nadu", pincode: "600001" },
  { city: "T Nagar", state: "Tamil Nadu", pincode: "600017" },
  { city: "Anna Nagar", state: "Tamil Nadu", pincode: "600040" },
  { city: "Adyar", state: "Tamil Nadu", pincode: "600020" },
  { city: "Velachery", state: "Tamil Nadu", pincode: "600042" },
  { city: "Tambaram", state: "Tamil Nadu", pincode: "600045" },
  { city: "Chrompet", state: "Tamil Nadu", pincode: "600044" },
  { city: "Porur", state: "Tamil Nadu", pincode: "600116" },
  { city: "Mylapore", state: "Tamil Nadu", pincode: "600004" },
  
  // Hyderabad
  { city: "Hyderabad", state: "Telangana", pincode: "500001" },
  { city: "Banjara Hills", state: "Telangana", pincode: "500034" },
  { city: "Jubilee Hills", state: "Telangana", pincode: "500033" },
  { city: "Gachibowli", state: "Telangana", pincode: "500032" },
  { city: "Hitech City", state: "Telangana", pincode: "500081" },
  { city: "Kondapur", state: "Telangana", pincode: "500084" },
  { city: "Madhapur", state: "Telangana", pincode: "500081" },
  { city: "Secunderabad", state: "Telangana", pincode: "500003" },
  { city: "Begumpet", state: "Telangana", pincode: "500016" },
  { city: "Ameerpet", state: "Telangana", pincode: "500038" },
  { city: "Kukatpally", state: "Telangana", pincode: "500072" },
  
  // Kolkata
  { city: "Kolkata", state: "West Bengal", pincode: "700001" },
  { city: "Salt Lake", state: "West Bengal", pincode: "700064" },
  { city: "Park Street", state: "West Bengal", pincode: "700016" },
  { city: "Ballygunge", state: "West Bengal", pincode: "700019" },
  { city: "Alipore", state: "West Bengal", pincode: "700027" },
  { city: "Howrah", state: "West Bengal", pincode: "711101" },
  { city: "New Town", state: "West Bengal", pincode: "700156" },
  
  // Pune
  { city: "Pune", state: "Maharashtra", pincode: "411001" },
  { city: "Koregaon Park", state: "Maharashtra", pincode: "411001" },
  { city: "Baner", state: "Maharashtra", pincode: "411045" },
  { city: "Hinjewadi", state: "Maharashtra", pincode: "411057" },
  { city: "Wakad", state: "Maharashtra", pincode: "411057" },
  { city: "Aundh", state: "Maharashtra", pincode: "411007" },
  { city: "Kothrud", state: "Maharashtra", pincode: "411029" },
  { city: "Deccan", state: "Maharashtra", pincode: "411004" },
  { city: "Camp", state: "Maharashtra", pincode: "411001" },
  { city: "Viman Nagar", state: "Maharashtra", pincode: "411014" },
  { city: "Hadapsar", state: "Maharashtra", pincode: "411028" },
  
  // Agricultural Cities - Uttar Pradesh
  { city: "Lucknow", state: "Uttar Pradesh", pincode: "226001" },
  { city: "Kanpur", state: "Uttar Pradesh", pincode: "208001" },
  { city: "Agra", state: "Uttar Pradesh", pincode: "282001" },
  { city: "Varanasi", state: "Uttar Pradesh", pincode: "221001" },
  { city: "Meerut", state: "Uttar Pradesh", pincode: "250001" },
  { city: "Allahabad", state: "Uttar Pradesh", pincode: "211001" },
  { city: "Bareilly", state: "Uttar Pradesh", pincode: "243001" },
  { city: "Aligarh", state: "Uttar Pradesh", pincode: "202001" },
  { city: "Moradabad", state: "Uttar Pradesh", pincode: "244001" },
  { city: "Saharanpur", state: "Uttar Pradesh", pincode: "247001" },
  { city: "Gorakhpur", state: "Uttar Pradesh", pincode: "273001" },
  { city: "Firozabad", state: "Uttar Pradesh", pincode: "283203" },
  { city: "Jhansi", state: "Uttar Pradesh", pincode: "284001" },
  { city: "Muzaffarnagar", state: "Uttar Pradesh", pincode: "251001" },
  { city: "Mathura", state: "Uttar Pradesh", pincode: "281001" },
  
  // Agricultural Cities - Punjab
  { city: "Chandigarh", state: "Punjab", pincode: "160001" },
  { city: "Ludhiana", state: "Punjab", pincode: "141001" },
  { city: "Amritsar", state: "Punjab", pincode: "143001" },
  { city: "Jalandhar", state: "Punjab", pincode: "144001" },
  { city: "Patiala", state: "Punjab", pincode: "147001" },
  { city: "Bathinda", state: "Punjab", pincode: "151001" },
  { city: "Mohali", state: "Punjab", pincode: "160055" },
  { city: "Firozpur", state: "Punjab", pincode: "152002" },
  { city: "Batala", state: "Punjab", pincode: "143505" },
  { city: "Pathankot", state: "Punjab", pincode: "145001" },
  { city: "Moga", state: "Punjab", pincode: "142001" },
  { city: "Abohar", state: "Punjab", pincode: "152116" },
  { city: "Malerkotla", state: "Punjab", pincode: "148023" },
  { city: "Khanna", state: "Punjab", pincode: "141401" },
  { city: "Phagwara", state: "Punjab", pincode: "144401" },
  
  // Agricultural Cities - Haryana
  { city: "Gurgaon", state: "Haryana", pincode: "122001" },
  { city: "Faridabad", state: "Haryana", pincode: "121001" },
  { city: "Panipat", state: "Haryana", pincode: "132103" },
  { city: "Ambala", state: "Haryana", pincode: "134003" },
  { city: "Yamunanagar", state: "Haryana", pincode: "135001" },
  { city: "Rohtak", state: "Haryana", pincode: "124001" },
  { city: "Hisar", state: "Haryana", pincode: "125001" },
  { city: "Karnal", state: "Haryana", pincode: "132001" },
  { city: "Sonipat", state: "Haryana", pincode: "131001" },
  { city: "Panchkula", state: "Haryana", pincode: "134109" },
  { city: "Bhiwani", state: "Haryana", pincode: "127021" },
  { city: "Sirsa", state: "Haryana", pincode: "125055" },
  { city: "Jind", state: "Haryana", pincode: "126102" },
  { city: "Thanesar", state: "Haryana", pincode: "132001" },
  { city: "Kaithal", state: "Haryana", pincode: "136027" },
  
  // Agricultural Cities - Rajasthan
  { city: "Jaipur", state: "Rajasthan", pincode: "302001" },
  { city: "Jodhpur", state: "Rajasthan", pincode: "342001" },
  { city: "Kota", state: "Rajasthan", pincode: "324001" },
  { city: "Bikaner", state: "Rajasthan", pincode: "334001" },
  { city: "Ajmer", state: "Rajasthan", pincode: "305001" },
  { city: "Udaipur", state: "Rajasthan", pincode: "313001" },
  { city: "Bhilwara", state: "Rajasthan", pincode: "311001" },
  { city: "Alwar", state: "Rajasthan", pincode: "301001" },
  { city: "Bharatpur", state: "Rajasthan", pincode: "321001" },
  { city: "Sikar", state: "Rajasthan", pincode: "332001" },
  { city: "Pali", state: "Rajasthan", pincode: "306401" },
  { city: "Sri Ganganagar", state: "Rajasthan", pincode: "335001" },
  { city: "Kishangarh", state: "Rajasthan", pincode: "305801" },
  { city: "Baran", state: "Rajasthan", pincode: "325205" },
  { city: "Dhaulpur", state: "Rajasthan", pincode: "328001" },
  
  // Agricultural Cities - Gujarat
  { city: "Ahmedabad", state: "Gujarat", pincode: "380001" },
  { city: "Surat", state: "Gujarat", pincode: "395001" },
  { city: "Vadodara", state: "Gujarat", pincode: "390001" },
  { city: "Rajkot", state: "Gujarat", pincode: "360001" },
  { city: "Bhavnagar", state: "Gujarat", pincode: "364001" },
  { city: "Jamnagar", state: "Gujarat", pincode: "361001" },
  { city: "Junagadh", state: "Gujarat", pincode: "362001" },
  { city: "Gandhinagar", state: "Gujarat", pincode: "382010" },
  { city: "Anand", state: "Gujarat", pincode: "388001" },
  { city: "Bharuch", state: "Gujarat", pincode: "392001" },
  { city: "Mehsana", state: "Gujarat", pincode: "384001" },
  { city: "Morbi", state: "Gujarat", pincode: "363641" },
  { city: "Nadiad", state: "Gujarat", pincode: "387001" },
  { city: "Surendranagar", state: "Gujarat", pincode: "363001" },
  { city: "Gandhidham", state: "Gujarat", pincode: "370201" },
  
  // Agricultural Cities - Madhya Pradesh
  { city: "Bhopal", state: "Madhya Pradesh", pincode: "462001" },
  { city: "Indore", state: "Madhya Pradesh", pincode: "452001" },
  { city: "Gwalior", state: "Madhya Pradesh", pincode: "474001" },
  { city: "Jabalpur", state: "Madhya Pradesh", pincode: "482001" },
  { city: "Ujjain", state: "Madhya Pradesh", pincode: "456001" },
  { city: "Sagar", state: "Madhya Pradesh", pincode: "470001" },
  { city: "Dewas", state: "Madhya Pradesh", pincode: "455001" },
  { city: "Satna", state: "Madhya Pradesh", pincode: "485001" },
  { city: "Ratlam", state: "Madhya Pradesh", pincode: "457001" },
  { city: "Rewa", state: "Madhya Pradesh", pincode: "486001" },
  { city: "Murwara", state: "Madhya Pradesh", pincode: "483501" },
  { city: "Singrauli", state: "Madhya Pradesh", pincode: "486889" },
  { city: "Burhanpur", state: "Madhya Pradesh", pincode: "450331" },
  { city: "Khandwa", state: "Madhya Pradesh", pincode: "450001" },
  { city: "Morena", state: "Madhya Pradesh", pincode: "476001" },
  
  // Add more agricultural regions
  { city: "Nashik", state: "Maharashtra", pincode: "422001", district: "Nashik" },
  { city: "Aurangabad", state: "Maharashtra", pincode: "431001", district: "Aurangabad" },
  { city: "Solapur", state: "Maharashtra", pincode: "413001", district: "Solapur" },
  { city: "Kolhapur", state: "Maharashtra", pincode: "416001", district: "Kolhapur" },
  { city: "Sangli", state: "Maharashtra", pincode: "416416", district: "Sangli" },
  { city: "Ahmednagar", state: "Maharashtra", pincode: "414001", district: "Ahmednagar" },
  { city: "Latur", state: "Maharashtra", pincode: "413512", district: "Latur" },
  { city: "Nanded", state: "Maharashtra", pincode: "431602", district: "Nanded" },
  { city: "Akola", state: "Maharashtra", pincode: "444001", district: "Akola" },
  { city: "Amravati", state: "Maharashtra", pincode: "444601", district: "Amravati" },
]

export const searchLocations = (query: string): LocationData[] => {
  if (!query || query.length < 2) return []
  
  const lowerQuery = query.toLowerCase()
  return indianLocations.filter(location => 
    location.city.toLowerCase().includes(lowerQuery) ||
    location.state.toLowerCase().includes(lowerQuery) ||
    location.pincode.includes(query) ||
    (location.district && location.district.toLowerCase().includes(lowerQuery))
  ).slice(0, 50)
}

export const getLocationByPincode = (pincode: string): LocationData | undefined => {
  return indianLocations.find(location => location.pincode === pincode)
}

export const getLocationsByState = (state: string): LocationData[] => {
  return indianLocations.filter(location => 
    location.state.toLowerCase() === state.toLowerCase()
  )
}
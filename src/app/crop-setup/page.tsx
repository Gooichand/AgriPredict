'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function CropSetupPage() {
  const [location, setLocation] = useState('')
  const [crop, setCrop] = useState('')
  const [farmSize, setFarmSize] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [cropSearch, setCropSearch] = useState('')
  const [showCropList, setShowCropList] = useState(false)
  const [locationSearch, setLocationSearch] = useState('')
  const [showLocationList, setShowLocationList] = useState(false)
  const router = useRouter()

  const crops = [
    // Cereals & Grains
    'Barley', 'Buckwheat', 'Corn', 'Millet', 'Oats', 'Quinoa', 'Rice', 'Rye', 'Sorghum', 'Wheat',
    'Amaranth', 'Bulgur', 'Farro', 'Spelt', 'Teff', 'Triticale', 'Wild Rice',
    
    // Legumes & Pulses
    'Black Beans', 'Black Eyed Peas', 'Chickpea', 'Kidney Beans', 'Lentil', 'Lima Beans', 'Navy Beans',
    'Pinto Beans', 'Soybean', 'Split Peas', 'Adzuki Beans', 'Fava Beans', 'Mung Beans', 'Pigeon Peas',
    
    // Vegetables - Leafy Greens
    'Arugula', 'Bok Choy', 'Cabbage', 'Collard Greens', 'Kale', 'Lettuce', 'Mustard Greens', 'Spinach',
    'Swiss Chard', 'Watercress', 'Endive', 'Escarole', 'Radicchio', 'Romaine',
    
    // Vegetables - Root & Tuber
    'Beet', 'Carrot', 'Cassava', 'Daikon', 'Ginger', 'Horseradish', 'Jerusalem Artichoke', 'Parsnip',
    'Potato', 'Radish', 'Rutabaga', 'Sweet Potato', 'Taro', 'Turnip', 'Yam', 'Yuca',
    
    // Vegetables - Cruciferous
    'Broccoli', 'Brussels Sprouts', 'Cauliflower', 'Kohlrabi', 'Wasabi',
    
    // Vegetables - Nightshades
    'Eggplant', 'Pepper', 'Potato', 'Tomato', 'Tomatillo', 'Bell Pepper', 'Chili Pepper', 'Jalapeno',
    
    // Vegetables - Cucurbits
    'Cucumber', 'Gourd', 'Melon', 'Pumpkin', 'Squash', 'Watermelon', 'Zucchini', 'Bitter Gourd',
    'Bottle Gourd', 'Ridge Gourd', 'Snake Gourd',
    
    // Vegetables - Alliums
    'Chives', 'Garlic', 'Leek', 'Onion', 'Scallion', 'Shallot',
    
    // Vegetables - Others
    'Artichoke', 'Asparagus', 'Bamboo Shoots', 'Celery', 'Corn', 'Fennel', 'Okra', 'Rhubarb',
    
    // Fruits - Tree Fruits
    'Apple', 'Apricot', 'Avocado', 'Cherry', 'Fig', 'Grapefruit', 'Lemon', 'Lime', 'Mango', 'Nectarine',
    'Orange', 'Papaya', 'Peach', 'Pear', 'Persimmon', 'Plum', 'Pomegranate', 'Quince',
    
    // Fruits - Tropical
    'Banana', 'Coconut', 'Dragon Fruit', 'Durian', 'Guava', 'Jackfruit', 'Kiwi', 'Lychee', 'Passion Fruit',
    'Pineapple', 'Plantain', 'Star Fruit', 'Tamarind',
    
    // Fruits - Berries
    'Blackberry', 'Blueberry', 'Cranberry', 'Elderberry', 'Gooseberry', 'Grape', 'Raspberry', 'Strawberry',
    
    // Nuts & Seeds
    'Almond', 'Brazil Nut', 'Cashew', 'Chestnut', 'Hazelnut', 'Macadamia', 'Peanut', 'Pecan', 'Pine Nut',
    'Pistachio', 'Walnut', 'Chia Seeds', 'Flax Seeds', 'Hemp Seeds', 'Pumpkin Seeds', 'Sesame', 'Sunflower Seeds',
    
    // Herbs & Spices
    'Basil', 'Bay Leaves', 'Cardamom', 'Cilantro', 'Cinnamon', 'Cloves', 'Coriander', 'Cumin', 'Dill',
    'Fenugreek', 'Mint', 'Nutmeg', 'Oregano', 'Parsley', 'Rosemary', 'Sage', 'Thyme', 'Turmeric', 'Vanilla',
    
    // Cash Crops
    'Coffee', 'Cotton', 'Hemp', 'Jute', 'Rubber', 'Sugarcane', 'Sugar Beet', 'Tea', 'Tobacco',
    
    // Fodder Crops
    'Alfalfa', 'Clover', 'Timothy Grass', 'Bermuda Grass', 'Ryegrass',
    
    // Oil Crops
    'Canola', 'Mustard', 'Olive', 'Palm Oil', 'Rapeseed', 'Safflower', 'Sunflower',
    
    // Medicinal Plants
    'Aloe Vera', 'Chamomile', 'Echinacea', 'Ginkgo', 'Ginseng', 'Lavender', 'Neem', 'Tulsi',
    
    // Specialty Crops
    'Artichoke', 'Asparagus', 'Bamboo', 'Hops', 'Mushrooms', 'Spirulina', 'Stevia', 'Wasabi'
  ]

  const filteredCrops = crops.filter(cropName => 
    cropName.toLowerCase().includes(cropSearch.toLowerCase())
  )

  const worldLocations = [
    // DETAILED STREET-LEVEL LOCATIONS (Like Zomato/Swiggy Delivery)
    
    // DELHI - Street Level Details
    'Connaught Place, Block A, New Delhi - 110001', 'Connaught Place, Block B, New Delhi - 110001', 'Connaught Place, Block C, New Delhi - 110001',
    'Karol Bagh Main Road, Near Metro Station, Delhi - 110005', 'Karol Bagh, Ghaffar Market, Delhi - 110005', 'Karol Bagh, Ajmal Khan Road, Delhi - 110005',
    'Lajpat Nagar Central Market, Delhi - 110024', 'Lajpat Nagar Part 1, Delhi - 110024', 'Lajpat Nagar Part 2, Delhi - 110024',
    'Rajouri Garden Main Market, Delhi - 110027', 'Rajouri Garden, Tagore Garden Extension, Delhi - 110027', 'Rajouri Garden Metro Station Area, Delhi - 110027',
    'Saket District Centre, Delhi - 110017', 'Saket, Malviya Nagar, Delhi - 110017', 'Saket, Press Enclave Road, Delhi - 110017',
    'Vasant Kunj Sector A, Delhi - 110070', 'Vasant Kunj Sector B, Delhi - 110070', 'Vasant Kunj Sector C, Delhi - 110070',
    'Dwarka Sector 1, Delhi - 110075', 'Dwarka Sector 6, Delhi - 110075', 'Dwarka Sector 10, Delhi - 110075', 'Dwarka Sector 12, Delhi - 110078',
    'Rohini Sector 3, Delhi - 110085', 'Rohini Sector 7, Delhi - 110085', 'Rohini Sector 11, Delhi - 110085', 'Rohini Sector 15, Delhi - 110089',
    'Pitampura Main Road, Delhi - 110034', 'Pitampura, Kohat Enclave, Delhi - 110034', 'Pitampura TV Tower Area, Delhi - 110034',
    'Janakpuri Block A, Delhi - 110058', 'Janakpuri Block C, Delhi - 110058', 'Janakpuri District Centre, Delhi - 110058',
    'Laxmi Nagar Main Market, Delhi - 110092', 'Laxmi Nagar Metro Station, Delhi - 110092', 'Laxmi Nagar, Shakarpur, Delhi - 110092',
    'Preet Vihar Main Road, Delhi - 110092', 'Preet Vihar, Nirman Vihar, Delhi - 110092', 'Preet Vihar Metro Station, Delhi - 110092',
    'Mayur Vihar Phase 1, Delhi - 110091', 'Mayur Vihar Phase 2, Delhi - 110091', 'Mayur Vihar Phase 3, Delhi - 110096',
    'Kalkaji Main Market, Delhi - 110019', 'Kalkaji, Govind Puri, Delhi - 110019', 'Kalkaji Metro Station, Delhi - 110019',
    'Greater Kailash Part 1, M Block Market, Delhi - 110048', 'Greater Kailash Part 2, Delhi - 110048', 'GK 1, N Block Market, Delhi - 110048',
    'Defence Colony Main Market, Delhi - 110024', 'Defence Colony, Lajpat Nagar Border, Delhi - 110024', 'Defence Colony Flyover, Delhi - 110024',
    'Khan Market Main Road, Delhi - 110003', 'Khan Market, Sujan Singh Park, Delhi - 110003', 'Khan Market Metro Station, Delhi - 110003',
    
    // MUMBAI - Street Level Details
    'Andheri East, Chakala, Near Airport, Mumbai - 400099', 'Andheri East, MIDC, Marol, Mumbai - 400093', 'Andheri East, Sakinaka, Mumbai - 400072',
    'Andheri West, Lokhandwala Complex, Mumbai - 400053', 'Andheri West, Oshiwara, Mumbai - 400053', 'Andheri West, Versova, Mumbai - 400061',
    'Bandra East, BKC, Mumbai - 400051', 'Bandra East, Kherwadi, Mumbai - 400051', 'Bandra East, Kalanagar, Mumbai - 400051',
    'Bandra West, Linking Road, Mumbai - 400050', 'Bandra West, Hill Road, Mumbai - 400050', 'Bandra West, Carter Road, Mumbai - 400050',
    'Borivali East, Kandivali Border, Mumbai - 400066', 'Borivali East, Shimpoli, Mumbai - 400092', 'Borivali East, Poisar, Mumbai - 400092',
    'Borivali West, IC Colony, Mumbai - 400103', 'Borivali West, Eksar, Mumbai - 400091', 'Borivali West, Gorai, Mumbai - 400091',
    'Dadar East, Shivaji Park, Mumbai - 400028', 'Dadar East, Hindmata, Mumbai - 400014', 'Dadar East, Naigaon, Mumbai - 400014',
    'Dadar West, Mahim Border, Mumbai - 400028', 'Dadar West, Portuguese Church, Mumbai - 400028', 'Dadar West, Plaza Cinema, Mumbai - 400028',
    'Goregaon East, Film City Road, Mumbai - 400063', 'Goregaon East, Malad Border, Mumbai - 400065', 'Goregaon East, Aarey Colony, Mumbai - 400065',
    'Goregaon West, Link Road, Mumbai - 400062', 'Goregaon West, Motilal Nagar, Mumbai - 400104', 'Goregaon West, Bangur Nagar, Mumbai - 400090',
    'Juhu Beach Road, Mumbai - 400049', 'Juhu, JVPD Scheme, Mumbai - 400049', 'Juhu, Gulmohar Road, Mumbai - 400049',
    'Kandivali East, Thakur Complex, Mumbai - 400101', 'Kandivali East, Lokhandwala Township, Mumbai - 400101', 'Kandivali East, Mahavir Nagar, Mumbai - 400101',
    'Kandivali West, Charkop, Mumbai - 400067', 'Kandivali West, Poisar, Mumbai - 400067', 'Kandivali West, Akurli Road, Mumbai - 400067',
    'Khar East, Linking Road, Mumbai - 400052', 'Khar East, Bandra Border, Mumbai - 400052', 'Khar East, Danda, Mumbai - 400052',
    'Khar West, 14th Road, Mumbai - 400052', 'Khar West, 16th Road, Mumbai - 400052', 'Khar West, Waterfield Road, Mumbai - 400052',
    'Malad East, Kurar Village, Mumbai - 400097', 'Malad East, Rustomjee, Mumbai - 400097', 'Malad East, Mindspace, Mumbai - 400064',
    'Malad West, Infiniti Mall, Mumbai - 400064', 'Malad West, Orlem, Mumbai - 400064', 'Malad West, Chincholi Bunder, Mumbai - 400064',
    'Powai, Hiranandani Gardens, Mumbai - 400076', 'Powai, IIT Bombay, Mumbai - 400076', 'Powai, Chandivali, Mumbai - 400072',
    'Santa Cruz East, Kalina, Mumbai - 400098', 'Santa Cruz East, Vakola, Mumbai - 400055', 'Santa Cruz East, Scruz Bandra Road, Mumbai - 400054',
    'Santa Cruz West, Linking Road, Mumbai - 400054', 'Santa Cruz West, Hill Road, Mumbai - 400054', 'Santa Cruz West, Turner Road, Mumbai - 400054',
    'Thane West, Ghodbunder Road, Thane - 400607', 'Thane West, Vartak Nagar, Thane - 400606', 'Thane West, Naupada, Thane - 400602',
    'Vile Parle East, Nehru Road, Mumbai - 400057', 'Vile Parle East, Airport Road, Mumbai - 400099', 'Vile Parle East, Hanuman Road, Mumbai - 400057',
    'Vile Parle West, Juhu Road, Mumbai - 400056', 'Vile Parle West, Irla, Mumbai - 400056', 'Vile Parle West, Parle Scheme, Mumbai - 400056',
    'Worli, Sea Face, Mumbai - 400018', 'Worli, BDD Chawl, Mumbai - 400018', 'Worli, Lotus Mills, Mumbai - 400013',
    'Lower Parel, Phoenix Mills, Mumbai - 400013', 'Lower Parel, Kamala Mills, Mumbai - 400013', 'Lower Parel, Senapati Bapat Marg, Mumbai - 400013',
    
    // BANGALORE - Street Level Details
    'Koramangala 1st Block, 80 Feet Road, Bangalore - 560034', 'Koramangala 3rd Block, Jyoti Nivas College Road, Bangalore - 560034', 'Koramangala 4th Block, Forum Mall, Bangalore - 560034',
    'Koramangala 5th Block, Sony World Signal, Bangalore - 560095', 'Koramangala 6th Block, Intermediate Ring Road, Bangalore - 560095', 'Koramangala 7th Block, Bangalore - 560095',
    'Indiranagar 100 Feet Road, Bangalore - 560038', 'Indiranagar 12th Main Road, Bangalore - 560008', 'Indiranagar CMH Road, Bangalore - 560038',
    'Jayanagar 3rd Block, Bangalore - 560011', 'Jayanagar 4th Block, Bangalore - 560011', 'Jayanagar 9th Block, Bangalore - 560069',
    'Malleshwaram 8th Cross, Bangalore - 560003', 'Malleshwaram 15th Cross, Bangalore - 560003', 'Malleshwaram Margosa Road, Bangalore - 560003',
    'Rajajinagar 1st Block, Bangalore - 560010', 'Rajajinagar 2nd Block, Bangalore - 560010', 'Rajajinagar 6th Block, Bangalore - 560010',
    'Basavanagudi Bull Temple Road, Bangalore - 560019', 'Basavanagudi Gandhi Bazaar, Bangalore - 560004', 'Basavanagudi DVG Road, Bangalore - 560004',
    'BTM Layout 1st Stage, Bangalore - 560029', 'BTM Layout 2nd Stage, Bangalore - 560076', 'BTM Layout Silk Board, Bangalore - 560076',
    'HSR Layout Sector 1, Bangalore - 560102', 'HSR Layout Sector 2, Bangalore - 560102', 'HSR Layout Sector 6, Bangalore - 560102',
    'Electronic City Phase 1, Bangalore - 560100', 'Electronic City Phase 2, Bangalore - 560100', 'Electronic City Hosur Road, Bangalore - 560100',
    'Whitefield ITPL Road, Bangalore - 560066', 'Whitefield Varthur Road, Bangalore - 560066', 'Whitefield Hope Farm Junction, Bangalore - 560066',
    'Marathahalli Outer Ring Road, Bangalore - 560037', 'Marathahalli Brookefield, Bangalore - 560037', 'Marathahalli Kundalahalli, Bangalore - 560037',
    'Sarjapur Road, Carmelaram, Bangalore - 560035', 'Sarjapur Road, Bellandur, Bangalore - 560103', 'Sarjapur Road, HSR Extension, Bangalore - 560102',
    'Bannerghatta Road, Arekere, Bangalore - 560076', 'Bannerghatta Road, Hulimavu, Bangalore - 560076', 'Bannerghatta Road, Gottigere, Bangalore - 560083',
    'Hebbal Outer Ring Road, Bangalore - 560024', 'Hebbal Bellary Road, Bangalore - 560024', 'Hebbal Manyata Tech Park, Bangalore - 560045',
    'Yelahanka New Town, Bangalore - 560064', 'Yelahanka Old Town, Bangalore - 560064', 'Yelahanka Doddaballapur Road, Bangalore - 560064',
    
    // PUNE - Street Level Details
    'Koregaon Park, North Main Road, Pune - 411001', 'Koregaon Park, Lane 5, Pune - 411001', 'Koregaon Park, Lane 7, Pune - 411001',
    'Baner Road, Sus Road Junction, Pune - 411045', 'Baner, Aundh Road, Pune - 411007', 'Baner, Pashan Road, Pune - 411021',
    'Hinjewadi Phase 1, Rajiv Gandhi Infotech Park, Pune - 411057', 'Hinjewadi Phase 2, Pune - 411057', 'Hinjewadi Phase 3, Pune - 411057',
    'Wakad, Hinjewadi Road, Pune - 411057', 'Wakad, Mumbai Pune Highway, Pune - 411057', 'Wakad, Dange Chowk, Pune - 411033',
    'Aundh, University Road, Pune - 411007', 'Aundh, ITI Road, Pune - 411007', 'Aundh, Ganesh Nagar, Pune - 411007',
    'Kothrud, Karve Road, Pune - 411029', 'Kothrud, Paud Road, Pune - 411038', 'Kothrud, Mayur Colony, Pune - 411029',
    'Deccan Gymkhana, Fergusson College Road, Pune - 411004', 'Deccan, JM Road, Pune - 411004', 'Deccan, Karve Road, Pune - 411004',
    'Camp, MG Road, Pune - 411001', 'Camp, East Street, Pune - 411001', 'Camp, Moledina Road, Pune - 411001',
    'Viman Nagar, Airport Road, Pune - 411014', 'Viman Nagar, Nagar Road, Pune - 411014', 'Viman Nagar, Clover Park, Pune - 411014',
    'Hadapsar, Magarpatta Road, Pune - 411028', 'Hadapsar, Amanora Park, Pune - 411028', 'Hadapsar, Kharadi Road, Pune - 411014',
    
    // HYDERABAD - Street Level Details
    'Banjara Hills Road No 1, Hyderabad - 500034', 'Banjara Hills Road No 3, Hyderabad - 500034', 'Banjara Hills Road No 12, Hyderabad - 500034',
    'Jubilee Hills Road No 36, Hyderabad - 500033', 'Jubilee Hills Road No 45, Hyderabad - 500033', 'Jubilee Hills Check Post, Hyderabad - 500033',
    'Gachibowli, Financial District, Hyderabad - 500032', 'Gachibowli, DLF Cyber City, Hyderabad - 500081', 'Gachibowli, Kondapur Road, Hyderabad - 500084',
    'Hitech City, Madhapur, Hyderabad - 500081', 'Hitech City, Cyber Towers, Hyderabad - 500081', 'Hitech City, Raheja Mindspace, Hyderabad - 500081',
    'Kondapur, Botanical Garden Road, Hyderabad - 500084', 'Kondapur, KPHB Road, Hyderabad - 500072', 'Kondapur, Miyapur Road, Hyderabad - 500049',
    'Madhapur, Ayyappa Society, Hyderabad - 500081', 'Madhapur, Image Hospital Road, Hyderabad - 500081', 'Madhapur, Silpa Gram, Hyderabad - 500081',
    'Secunderabad, SP Road, Hyderabad - 500003', 'Secunderabad, Clock Tower, Hyderabad - 500003', 'Secunderabad, Paradise Circle, Hyderabad - 500003',
    'Begumpet, Greenlands, Hyderabad - 500016', 'Begumpet, Airport Road, Hyderabad - 500016', 'Begumpet, Prakash Nagar, Hyderabad - 500016',
    'Ameerpet, SR Nagar, Hyderabad - 500038', 'Ameerpet, Punjagutta, Hyderabad - 500082', 'Ameerpet, Erragadda, Hyderabad - 500018',
    'Kukatpally, KPHB Colony, Hyderabad - 500072', 'Kukatpally, Balanagar, Hyderabad - 500037', 'Kukatpally, Moosapet, Hyderabad - 500018',
    
    // CHENNAI - Street Level Details
    'T Nagar, Ranganathan Street, Chennai - 600017', 'T Nagar, Usman Road, Chennai - 600017', 'T Nagar, Pondy Bazaar, Chennai - 600017',
    'Anna Nagar East, 2nd Avenue, Chennai - 600102', 'Anna Nagar West, 6th Avenue, Chennai - 600040', 'Anna Nagar, Roundtana, Chennai - 600040',
    'Adyar, Lattice Bridge Road, Chennai - 600020', 'Adyar, Besant Nagar, Chennai - 600090', 'Adyar, Thiruvanmiyur, Chennai - 600041',
    'Velachery, Vijayanagar, Chennai - 600042', 'Velachery, Taramani Road, Chennai - 600113', 'Velachery, Phoenix Mall, Chennai - 600042',
    'Tambaram East, Chennai - 600059', 'Tambaram West, Chennai - 600045', 'Tambaram, Sanatorium, Chennai - 600047',
    'Chrompet, GST Road, Chennai - 600044', 'Chrompet, Hasthinapuram, Chennai - 600064', 'Chrompet, Pallavaram, Chennai - 600043',
    'Porur, Kundrathur Road, Chennai - 600116', 'Porur, Mount Poonamallee Road, Chennai - 600116', 'Porur, Ramapuram, Chennai - 600089',
    'OMR, Thoraipakkam, Chennai - 600097', 'OMR, Sholinganallur, Chennai - 600119', 'OMR, Perungudi, Chennai - 600096',
    'ECR, Mahabalipuram Road, Chennai - 600041', 'ECR, Kovalam, Chennai - 600112', 'ECR, Muttukadu, Chennai - 603112',
    'Mylapore, Luz Corner, Chennai - 600004', 'Mylapore, R K Mutt Road, Chennai - 600004', 'Mylapore, Kapaleeshwarar Temple, Chennai - 600004',
    
    // KOLKATA - Street Level Details
    'Salt Lake Sector 1, Kolkata - 700064', 'Salt Lake Sector 5, Kolkata - 700091', 'Salt Lake City Centre, Kolkata - 700064',
    'Park Street, Mother Teresa Sarani, Kolkata - 700016', 'Park Street, Camac Street, Kolkata - 700017', 'Park Street, Russell Street, Kolkata - 700071',
    'Ballygunge, Gariahat Road, Kolkata - 700019', 'Ballygunge, Southern Avenue, Kolkata - 700029', 'Ballygunge, Rashbehari Avenue, Kolkata - 700029',
    'Alipore, Judge Court Road, Kolkata - 700027', 'Alipore, Belvedere Road, Kolkata - 700027', 'Alipore, Zoo Road, Kolkata - 700027',
    'Howrah Station Road, Howrah - 711101', 'Howrah, GT Road, Howrah - 711102', 'Howrah, Shibpur, Howrah - 711102',
    'Rajarhat, New Town, Kolkata - 700156', 'Rajarhat, Action Area 1, Kolkata - 700156', 'Rajarhat, Eco Park, Kolkata - 700156',
    'New Town, Action Area 2, Kolkata - 700157', 'New Town, Street Mall, Kolkata - 700157', 'New Town, Unitech, Kolkata - 700157',
    'Sector V, Salt Lake, Kolkata - 700091', 'Sector V, Webel Bhawan, Kolkata - 700091', 'Sector V, TCS Building, Kolkata - 700091',
    'Esplanade, BBD Bagh, Kolkata - 700001', 'Esplanade, Dalhousie Square, Kolkata - 700001', 'Esplanade, Writers Building, Kolkata - 700001',
    'Gariahat, Rashbehari Avenue, Kolkata - 700019', 'Gariahat, Golpark, Kolkata - 700029', 'Gariahat, Triangular Park, Kolkata - 700019',
    
    // UTTAR PRADESH - Detailed Street Level
    'Agra, Uttar Pradesh', 'Aligarh, Uttar Pradesh', 'Allahabad, Uttar Pradesh', 'Bareilly, Uttar Pradesh', 'Firozabad, Uttar Pradesh',
    'Ghaziabad, Uttar Pradesh', 'Kanpur, Uttar Pradesh', 'Lucknow, Uttar Pradesh', 'Meerut, Uttar Pradesh', 'Moradabad, Uttar Pradesh',
    'Noida, Uttar Pradesh', 'Varanasi, Uttar Pradesh', 'Mathura, Uttar Pradesh', 'Gorakhpur, Uttar Pradesh', 'Saharanpur, Uttar Pradesh',
    'Muzaffarnagar, Uttar Pradesh', 'Bulandshahr, Uttar Pradesh', 'Rampur, Uttar Pradesh', 'Shahjahanpur, Uttar Pradesh', 'Farrukhabad, Uttar Pradesh',
    'Mau, Uttar Pradesh', 'Hapur, Uttar Pradesh', 'Etawah, Uttar Pradesh', 'Mirzapur, Uttar Pradesh', 'Budhana, Uttar Pradesh',
    'Shamli, Uttar Pradesh', 'Hathras, Uttar Pradesh', 'Sambhal, Uttar Pradesh', 'Orai, Uttar Pradesh', 'Bahraich, Uttar Pradesh',
    'Unnao, Uttar Pradesh', 'Rae Bareli, Uttar Pradesh', 'Lakhimpur Kheri, Uttar Pradesh', 'Sitapur, Uttar Pradesh', 'Hardoi, Uttar Pradesh',
    'Misrikh, Uttar Pradesh', 'Laharpur, Uttar Pradesh', 'Bilram, Uttar Pradesh', 'Bachhrawan, Uttar Pradesh', 'Malihabad, Uttar Pradesh',
    
    // MAHARASHTRA - Cities, Towns, Villages
    'Mumbai, Maharashtra', 'Pune, Maharashtra', 'Nagpur, Maharashtra', 'Nashik, Maharashtra', 'Aurangabad, Maharashtra',
    'Solapur, Maharashtra', 'Amravati, Maharashtra', 'Kolhapur, Maharashtra', 'Sangli, Maharashtra', 'Akola, Maharashtra',
    'Nanded, Maharashtra', 'Latur, Maharashtra', 'Dhule, Maharashtra', 'Ahmednagar, Maharashtra', 'Chandrapur, Maharashtra',
    'Parbhani, Maharashtra', 'Jalgaon, Maharashtra', 'Bhiwandi, Maharashtra', 'Navi Mumbai, Maharashtra', 'Kalyan, Maharashtra',
    'Vasai, Maharashtra', 'Thane, Maharashtra', 'Panvel, Maharashtra', 'Mira Road, Maharashtra', 'Dombivli, Maharashtra',
    'Ulhasnagar, Maharashtra', 'Malegaon, Maharashtra', 'Jalna, Maharashtra', 'Beed, Maharashtra', 'Yavatmal, Maharashtra',
    'Buldhana, Maharashtra', 'Washim, Maharashtra', 'Hingoli, Maharashtra', 'Wardha, Maharashtra', 'Gadchiroli, Maharashtra',
    'Gondia, Maharashtra', 'Bhandara, Maharashtra', 'Ratnagiri, Maharashtra', 'Sindhudurg, Maharashtra', 'Satara, Maharashtra',
    'Raigad, Maharashtra', 'Osmanabad, Maharashtra', 'Baramati, Maharashtra', 'Shirdi, Maharashtra', 'Lonavala, Maharashtra',
    'Khandala, Maharashtra', 'Mahabaleshwar, Maharashtra', 'Alibag, Maharashtra', 'Murud, Maharashtra', 'Harihareshwar, Maharashtra',
    
    // GUJARAT - Cities, Towns, Villages
    'Ahmedabad, Gujarat', 'Surat, Gujarat', 'Vadodara, Gujarat', 'Rajkot, Gujarat', 'Bhavnagar, Gujarat',
    'Jamnagar, Gujarat', 'Junagadh, Gujarat', 'Gandhinagar, Gujarat', 'Anand, Gujarat', 'Bharuch, Gujarat',
    'Mehsana, Gujarat', 'Morbi, Gujarat', 'Nadiad, Gujarat', 'Surendranagar, Gujarat', 'Gandhidham, Gujarat',
    'Veraval, Gujarat', 'Navsari, Gujarat', 'Valsad, Gujarat', 'Palanpur, Gujarat', 'Vapi, Gujarat',
    'Godhra, Gujarat', 'Patan, Gujarat', 'Porbandar, Gujarat', 'Botad, Gujarat', 'Amreli, Gujarat',
    'Deesa, Gujarat', 'Jetpur, Gujarat', 'Kalol, Gujarat', 'Dahod, Gujarat', 'Himmatnagar, Gujarat',
    'Keshod, Gujarat', 'Wadhwan, Gujarat', 'Anjar, Gujarat', 'Mandvi, Gujarat', 'Dwarka, Gujarat',
    'Somnath, Gujarat', 'Diu, Gujarat', 'Daman, Gujarat', 'Silvassa, Gujarat', 'Umbergaon, Gujarat',
    
    // PUNJAB - Cities, Towns, Villages
    'Ludhiana, Punjab', 'Amritsar, Punjab', 'Jalandhar, Punjab', 'Patiala, Punjab', 'Bathinda, Punjab',
    'Mohali, Punjab', 'Firozpur, Punjab', 'Batala, Punjab', 'Pathankot, Punjab', 'Moga, Punjab',
    'Abohar, Punjab', 'Malerkotla, Punjab', 'Khanna, Punjab', 'Phagwara, Punjab', 'Muktsar, Punjab',
    'Barnala, Punjab', 'Rajpura, Punjab', 'Hoshiarpur, Punjab', 'Kapurthala, Punjab', 'Faridkot, Punjab',
    'Sunam, Punjab', 'Sangrur, Punjab', 'Fazilka, Punjab', 'Gurdaspur, Punjab', 'Kharar, Punjab',
    'Gobindgarh, Punjab', 'Mansa, Punjab', 'Malout, Punjab', 'Nabha, Punjab', 'Tarn Taran, Punjab',
    'Jagraon, Punjab', 'Rampura Phul, Punjab', 'Zira, Punjab', 'Kotkapura, Punjab', 'Raikot, Punjab',
    'Samana, Punjab', 'Dhuri, Punjab', 'Longowal, Punjab', 'Dirba, Punjab', 'Budhlada, Punjab',
    
    // HARYANA - Cities, Towns, Villages
    'Gurgaon, Haryana', 'Faridabad, Haryana', 'Panipat, Haryana', 'Ambala, Haryana', 'Yamunanagar, Haryana',
    'Rohtak, Haryana', 'Hisar, Haryana', 'Karnal, Haryana', 'Sonipat, Haryana', 'Panchkula, Haryana',
    'Bhiwani, Haryana', 'Sirsa, Haryana', 'Jind, Haryana', 'Thanesar, Haryana', 'Kaithal, Haryana',
    'Rewari, Haryana', 'Narnaul, Haryana', 'Pundri, Haryana', 'Kosli, Haryana', 'Palwal, Haryana',
    'Hansi, Haryana', 'Fatehabad, Haryana', 'Gohana, Haryana', 'Tohana, Haryana', 'Narwana, Haryana',
    'Mandi Dabwali, Haryana', 'Charkhi Dadri, Haryana', 'Shahabad, Haryana', 'Pehowa, Haryana', 'Samalkha, Haryana',
    'Pinjore, Haryana', 'Ladwa, Haryana', 'Sohna, Haryana', 'Safidon, Haryana', 'Taraori, Haryana',
    'Mahendragarh, Haryana', 'Ratia, Haryana', 'Rania, Haryana', 'Siwani, Haryana', 'Bawal, Haryana',
    
    // RAJASTHAN - Cities, Towns, Villages
    'Jaipur, Rajasthan', 'Jodhpur, Rajasthan', 'Kota, Rajasthan', 'Bikaner, Rajasthan', 'Ajmer, Rajasthan',
    'Udaipur, Rajasthan', 'Bhilwara, Rajasthan', 'Alwar, Rajasthan', 'Bharatpur, Rajasthan', 'Sikar, Rajasthan',
    'Pali, Rajasthan', 'Sri Ganganagar, Rajasthan', 'Kishangarh, Rajasthan', 'Baran, Rajasthan', 'Dhaulpur, Rajasthan',
    'Tonk, Rajasthan', 'Beawar, Rajasthan', 'Hanumangarh, Rajasthan', 'Churu, Rajasthan', 'Nagaur, Rajasthan',
    'Jhunjhunu, Rajasthan', 'Dausa, Rajasthan', 'Sawai Madhopur, Rajasthan', 'Karauli, Rajasthan', 'Jhalawar, Rajasthan',
    'Bundi, Rajasthan', 'Chittorgarh, Rajasthan', 'Rajsamand, Rajasthan', 'Dungarpur, Rajasthan', 'Banswara, Rajasthan',
    'Mount Abu, Rajasthan', 'Pushkar, Rajasthan', 'Mandawa, Rajasthan', 'Shekhawati, Rajasthan', 'Fatehpur, Rajasthan',
    'Lachhmangarh, Rajasthan', 'Nawalgarh, Rajasthan', 'Mukundgarh, Rajasthan', 'Bissau, Rajasthan', 'Ratangarh, Rajasthan',
    
    // TAMIL NADU - Cities, Towns, Villages
    'Chennai, Tamil Nadu', 'Coimbatore, Tamil Nadu', 'Madurai, Tamil Nadu', 'Tiruchirappalli, Tamil Nadu', 'Salem, Tamil Nadu',
    'Tirunelveli, Tamil Nadu', 'Tiruppur, Tamil Nadu', 'Vellore, Tamil Nadu', 'Erode, Tamil Nadu', 'Thoothukudi, Tamil Nadu',
    'Dindigul, Tamil Nadu', 'Thanjavur, Tamil Nadu', 'Ranipet, Tamil Nadu', 'Sivakasi, Tamil Nadu', 'Karur, Tamil Nadu',
    'Udhagamandalam, Tamil Nadu', 'Hosur, Tamil Nadu', 'Nagercoil, Tamil Nadu', 'Kanchipuram, Tamil Nadu', 'Kumarakonam, Tamil Nadu',
    'Pollachi, Tamil Nadu', 'Rajapalayam, Tamil Nadu', 'Pudukkottai, Tamil Nadu', 'Neyveli, Tamil Nadu', 'Nagapattinam, Tamil Nadu',
    'Viluppuram, Tamil Nadu', 'Tiruvallur, Tamil Nadu', 'Tiruvannamalai, Tamil Nadu', 'Gudiyatham, Tamil Nadu', 'Kumbakonam, Tamil Nadu',
    'Mayiladuthurai, Tamil Nadu', 'Chidambaram, Tamil Nadu', 'Cuddalore, Tamil Nadu', 'Krishnagiri, Tamil Nadu', 'Dharmapuri, Tamil Nadu',
    'Namakkal, Tamil Nadu', 'Rasipuram, Tamil Nadu', 'Attur, Tamil Nadu', 'Yercaud, Tamil Nadu', 'Kodaikanal, Tamil Nadu',
    
    // KARNATAKA - Cities, Towns, Villages
    'Bangalore, Karnataka', 'Mysore, Karnataka', 'Hubli, Karnataka', 'Mangalore, Karnataka', 'Belgaum, Karnataka',
    'Gulbarga, Karnataka', 'Davanagere, Karnataka', 'Bellary, Karnataka', 'Bijapur, Karnataka', 'Shimoga, Karnataka',
    'Tumkur, Karnataka', 'Raichur, Karnataka', 'Bidar, Karnataka', 'Hospet, Karnataka', 'Gadag, Karnataka',
    'Udupi, Karnataka', 'Kolar, Karnataka', 'Mandya, Karnataka', 'Chikmagalur, Karnataka', 'Hassan, Karnataka',
    'Chitradurga, Karnataka', 'Davangere, Karnataka', 'Koppal, Karnataka', 'Bagalkot, Karnataka', 'Haveri, Karnataka',
    'Dharwad, Karnataka', 'Uttara Kannada, Karnataka', 'Dakshina Kannada, Karnataka', 'Kodagu, Karnataka', 'Chamarajanagar, Karnataka',
    'Mysuru, Karnataka', 'Ramanagara, Karnataka', 'Chikkaballapur, Karnataka', 'Yadgir, Karnataka', 'Vijayapura, Karnataka',
    'Ballari, Karnataka', 'Kalaburagi, Karnataka', 'Belagavi, Karnataka', 'Shivamogga, Karnataka', 'Tumakuru, Karnataka',
    
    // KERALA - Cities, Towns, Villages
    'Thiruvananthapuram, Kerala', 'Kochi, Kerala', 'Kozhikode, Kerala', 'Thrissur, Kerala', 'Kollam, Kerala',
    'Palakkad, Kerala', 'Alappuzha, Kerala', 'Malappuram, Kerala', 'Kannur, Kerala', 'Kasaragod, Kerala',
    'Pathanamthitta, Kerala', 'Idukki, Kerala', 'Ernakulam, Kerala', 'Wayanad, Kerala', 'Munnar, Kerala',
    'Thekkady, Kerala', 'Kumarakom, Kerala', 'Varkala, Kerala', 'Kovalam, Kerala', 'Bekal, Kerala',
    'Guruvayur, Kerala', 'Sabarimala, Kerala', 'Periyar, Kerala', 'Athirappilly, Kerala', 'Vagamon, Kerala',
    'Ponmudi, Kerala', 'Nelliampathy, Kerala', 'Poovar, Kerala', 'Marari, Kerala', 'Cherai, Kerala',
    'Fort Kochi, Kerala', 'Mattancherry, Kerala', 'Vypeen, Kerala', 'Kumily, Kerala', 'Devikulam, Kerala',
    'Marayoor, Kerala', 'Chinnar, Kerala', 'Eravikulam, Kerala', 'Anamudi, Kerala', 'Meesapulimala, Kerala',
    
    // ANDHRA PRADESH - Cities, Towns, Villages
    'Visakhapatnam, Andhra Pradesh', 'Vijayawada, Andhra Pradesh', 'Guntur, Andhra Pradesh', 'Nellore, Andhra Pradesh', 'Kurnool, Andhra Pradesh',
    'Rajahmundry, Andhra Pradesh', 'Tirupati, Andhra Pradesh', 'Kakinada, Andhra Pradesh', 'Anantapur, Andhra Pradesh', 'Vizianagaram, Andhra Pradesh',
    'Eluru, Andhra Pradesh', 'Ongole, Andhra Pradesh', 'Nandyal, Andhra Pradesh', 'Machilipatnam, Andhra Pradesh', 'Adoni, Andhra Pradesh',
    'Tenali, Andhra Pradesh', 'Proddatur, Andhra Pradesh', 'Chittoor, Andhra Pradesh', 'Hindupur, Andhra Pradesh', 'Bhimavaram, Andhra Pradesh',
    'Madanapalle, Andhra Pradesh', 'Guntakal, Andhra Pradesh', 'Dharmavaram, Andhra Pradesh', 'Gudivada, Andhra Pradesh', 'Narasaraopet, Andhra Pradesh',
    'Tadipatri, Andhra Pradesh', 'Mangalagiri, Andhra Pradesh', 'Chilakaluripet, Andhra Pradesh', 'Yemmiganur, Andhra Pradesh', 'Kadapa, Andhra Pradesh',
    'Srikakulam, Andhra Pradesh', 'Amalapuram, Andhra Pradesh', 'Palakollu, Andhra Pradesh', 'Narasapuram, Andhra Pradesh', 'Tanuku, Andhra Pradesh',
    'Rayachoti, Andhra Pradesh', 'Srikalahasti, Andhra Pradesh', 'Bapatla, Andhra Pradesh', 'Repalle, Andhra Pradesh', 'Kavali, Andhra Pradesh',
    
    // TELANGANA - Cities, Towns, Villages
    'Hyderabad, Telangana', 'Warangal, Telangana', 'Nizamabad, Telangana', 'Khammam, Telangana', 'Karimnagar, Telangana',
    'Ramagundam, Telangana', 'Mahbubnagar, Telangana', 'Nalgonda, Telangana', 'Adilabad, Telangana', 'Suryapet, Telangana',
    'Miryalaguda, Telangana', 'Jagtial, Telangana', 'Mancherial, Telangana', 'Nirmal, Telangana', 'Kothagudem, Telangana',
    'Palwancha, Telangana', 'Bodhan, Telangana', 'Sangareddy, Telangana', 'Metpally, Telangana', 'Zahirabad, Telangana',
    'Medak, Telangana', 'Siddipet, Telangana', 'Jangaon, Telangana', 'Bhongir, Telangana', 'Kamareddy, Telangana',
    'Wanaparthy, Telangana', 'Gadwal, Telangana', 'Nagarkurnool, Telangana', 'Vikarabad, Telangana', 'Banswada, Telangana',
    'Kalwakurthy, Telangana', 'Narayanpet, Telangana', 'Jogulamba, Telangana', 'Manthani, Telangana', 'Peddapalli, Telangana',
    'Bellampalli, Telangana', 'Mandamarri, Telangana', 'Luxettipet, Telangana', 'Asifabad, Telangana', 'Komaram Bheem, Telangana',
    
    // WEST BENGAL - Cities, Towns, Villages
    'Kolkata, West Bengal', 'Howrah, West Bengal', 'Durgapur, West Bengal', 'Asansol, West Bengal', 'Siliguri, West Bengal',
    'Malda, West Bengal', 'Bardhaman, West Bengal', 'Baharampur, West Bengal', 'Habra, West Bengal', 'Kharagpur, West Bengal',
    'Shantipur, West Bengal', 'Dankuni, West Bengal', 'Dhulian, West Bengal', 'Ranaghat, West Bengal', 'Haldia, West Bengal',
    'Raiganj, West Bengal', 'Krishnanagar, West Bengal', 'Nabadwip, West Bengal', 'Medinipur, West Bengal', 'Jalpaiguri, West Bengal',
    'Balurghat, West Bengal', 'Basirhat, West Bengal', 'Bankura, West Bengal', 'Chakdaha, West Bengal', 'Darjeeling, West Bengal',
    'Alipurduar, West Bengal', 'Purulia, West Bengal', 'Jangipur, West Bengal', 'Bolpur, West Bengal', 'Bangaon, West Bengal',
    'Cooch Behar, West Bengal', 'Tamluk, West Bengal', 'Midnapore, West Bengal', 'Contai, West Bengal', 'Egra, West Bengal',
    'Murshidabad, West Bengal', 'Jiaganj, West Bengal', 'Domkal, West Bengal', 'Lalgola, West Bengal', 'Mayurbhanj, West Bengal',
    
    // BIHAR - Cities, Towns, Villages
    'Patna, Bihar', 'Gaya, Bihar', 'Bhagalpur, Bihar', 'Muzaffarpur, Bihar', 'Darbhanga, Bihar',
    'Bihar Sharif, Bihar', 'Arrah, Bihar', 'Begusarai, Bihar', 'Katihar, Bihar', 'Munger, Bihar',
    'Chhapra, Bihar', 'Danapur, Bihar', 'Saharsa, Bihar', 'Hajipur, Bihar', 'Sasaram, Bihar',
    'Dehri, Bihar', 'Siwan, Bihar', 'Motihari, Bihar', 'Nawada, Bihar', 'Bagaha, Bihar',
    'Buxar, Bihar', 'Kishanganj, Bihar', 'Sitamarhi, Bihar', 'Jamalpur, Bihar', 'Jehanabad, Bihar',
    'Aurangabad, Bihar', 'Lakhisarai, Bihar', 'Sheikhpura, Bihar', 'Nalanda, Bihar', 'Jamui, Bihar',
    'Khagaria, Bihar', 'Supaul, Bihar', 'Madhepura, Bihar', 'Araria, Bihar', 'Forbesganj, Bihar',
    'Madhubani, Bihar', 'Benipatti, Bihar', 'Jhanjharpur, Bihar', 'Rajnagar, Bihar', 'Sakri, Bihar',
    
    // ODISHA - Cities, Towns, Villages
    'Bhubaneswar, Odisha', 'Cuttack, Odisha', 'Rourkela, Odisha', 'Berhampur, Odisha', 'Sambalpur, Odisha',
    'Puri, Odisha', 'Balasore, Odisha', 'Bhadrak, Odisha', 'Baripada, Odisha', 'Jharsuguda, Odisha',
    'Jeypore, Odisha', 'Barbil, Odisha', 'Khordha, Odisha', 'Sundargarh, Odisha', 'Rayagada, Odisha',
    'Balangir, Odisha', 'Nabarangpur, Odisha', 'Koraput, Odisha', 'Kendujhar, Odisha', 'Jagatsinghpur, Odisha',
    'Kendrapara, Odisha', 'Jajpur, Odisha', 'Dhenkanal, Odisha', 'Angul, Odisha', 'Nayagarh, Odisha',
    'Khurda, Odisha', 'Ganjam, Odisha', 'Gajapati, Odisha', 'Kandhamal, Odisha', 'Baudh, Odisha',
    'Sonepur, Odisha', 'Nuapada, Odisha', 'Kalahandi, Odisha', 'Malkangiri, Odisha', 'Konark, Odisha',
    'Chilika, Odisha', 'Gopalpur, Odisha', 'Chandipur, Odisha', 'Simlipal, Odisha', 'Bhitarkanika, Odisha',
    
    // JHARKHAND - Cities, Towns, Villages
    'Ranchi, Jharkhand', 'Jamshedpur, Jharkhand', 'Dhanbad, Jharkhand', 'Bokaro, Jharkhand', 'Deoghar, Jharkhand',
    'Phusro, Jharkhand', 'Hazaribagh, Jharkhand', 'Giridih, Jharkhand', 'Ramgarh, Jharkhand', 'Medininagar, Jharkhand',
    'Chirkunda, Jharkhand', 'Chaibasa, Jharkhand', 'Gumla, Jharkhand', 'Dumka, Jharkhand', 'Godda, Jharkhand',
    'Sahebganj, Jharkhand', 'Pakur, Jharkhand', 'Latehar, Jharkhand', 'Palamu, Jharkhand', 'Garwa, Jharkhand',
    'Chatra, Jharkhand', 'Koderma, Jharkhand', 'Jamtara, Jharkhand', 'Simdega, Jharkhand', 'Khunti, Jharkhand',
    'Saraikela, Jharkhand', 'East Singhbhum, Jharkhand', 'West Singhbhum, Jharkhand', 'Lohardaga, Jharkhand', 'Garhwa, Jharkhand',
    'Daltonganj, Jharkhand', 'Bishrampur, Jharkhand', 'Chainpur, Jharkhand', 'Hussainabad, Jharkhand', 'Japla, Jharkhand',
    'Lesliganj, Jharkhand', 'Mahuadanr, Jharkhand', 'Manatu, Jharkhand', 'Medininagar, Jharkhand', 'Patan, Jharkhand',
    
    // CHHATTISGARH - Cities, Towns, Villages
    'Raipur, Chhattisgarh', 'Bhilai, Chhattisgarh', 'Bilaspur, Chhattisgarh', 'Korba, Chhattisgarh', 'Durg, Chhattisgarh',
    'Rajnandgaon, Chhattisgarh', 'Jagdalpur, Chhattisgarh', 'Raigarh, Chhattisgarh', 'Ambikapur, Chhattisgarh', 'Mahasamund, Chhattisgarh',
    'Dhamtari, Chhattisgarh', 'Kanker, Chhattisgarh', 'Bastar, Chhattisgarh', 'Kondagaon, Chhattisgarh', 'Narayanpur, Chhattisgarh',
    'Bijapur, Chhattisgarh', 'Sukma, Chhattisgarh', 'Dantewada, Chhattisgarh', 'Gariaband, Chhattisgarh', 'Balod, Chhattisgarh',
    'Baloda Bazar, Chhattisgarh', 'Bemetara, Chhattisgarh', 'Kabirdham, Chhattisgarh', 'Mungeli, Chhattisgarh', 'Surajpur, Chhattisgarh',
    'Balrampur, Chhattisgarh', 'Jashpur, Chhattisgarh', 'Korea, Chhattisgarh', 'Surguja, Chhattisgarh', 'Janjgir, Chhattisgarh',
    'Champa, Chhattisgarh', 'Sakti, Chhattisgarh', 'Pendra, Chhattisgarh', 'Lormi, Chhattisgarh', 'Malkharoda, Chhattisgarh',
    'Akaltara, Chhattisgarh', 'Janjgir, Chhattisgarh', 'Naila, Chhattisgarh', 'Pamgarh, Chhattisgarh', 'Sarangarh, Chhattisgarh',
    
    // MADHYA PRADESH - Cities, Towns, Villages
    'Bhopal, Madhya Pradesh', 'Indore, Madhya Pradesh', 'Gwalior, Madhya Pradesh', 'Jabalpur, Madhya Pradesh', 'Ujjain, Madhya Pradesh',
    'Sagar, Madhya Pradesh', 'Dewas, Madhya Pradesh', 'Satna, Madhya Pradesh', 'Ratlam, Madhya Pradesh', 'Rewa, Madhya Pradesh',
    'Murwara, Madhya Pradesh', 'Singrauli, Madhya Pradesh', 'Burhanpur, Madhya Pradesh', 'Khandwa, Madhya Pradesh', 'Morena, Madhya Pradesh',
    'Bhind, Madhya Pradesh', 'Guna, Madhya Pradesh', 'Shivpuri, Madhya Pradesh', 'Vidisha, Madhya Pradesh', 'Chhatarpur, Madhya Pradesh',
    'Damoh, Madhya Pradesh', 'Mandsaur, Madhya Pradesh', 'Khargone, Madhya Pradesh', 'Neemuch, Madhya Pradesh', 'Pithampur, Madhya Pradesh',
    'Narmadapuram, Madhya Pradesh', 'Itarsi, Madhya Pradesh', 'Sehore, Madhya Pradesh', 'Mhow, Madhya Pradesh', 'Seoni, Madhya Pradesh',
    'Balaghat, Madhya Pradesh', 'Chhindwara, Madhya Pradesh', 'Mandla, Madhya Pradesh', 'Dindori, Madhya Pradesh', 'Narsinghpur, Madhya Pradesh',
    'Tendukheda, Madhya Pradesh', 'Gadarwara, Madhya Pradesh', 'Waraseoni, Madhya Pradesh', 'Barghat, Madhya Pradesh', 'Ghansour, Madhya Pradesh',
    
    // ASSAM - Cities, Towns, Villages
    'Guwahati, Assam', 'Silchar, Assam', 'Dibrugarh, Assam', 'Jorhat, Assam', 'Nagaon, Assam',
    'Tinsukia, Assam', 'Tezpur, Assam', 'Bongaigaon, Assam', 'Dhubri, Assam', 'North Lakhimpur, Assam',
    'Karimganj, Assam', 'Sivasagar, Assam', 'Goalpara, Assam', 'Barpeta, Assam', 'Mangaldoi, Assam',
    'Nalbari, Assam', 'Rangia, Assam', 'Diphu, Assam', 'North Guwahati, Assam', 'Marigaon, Assam',
    'Digboi, Assam', 'Duliajan, Assam', 'Margherita, Assam', 'Naharkatiya, Assam', 'Doom Dooma, Assam',
    'Sadiya, Assam', 'Pasighat, Assam', 'Tezu, Assam', 'Roing, Assam', 'Bomdila, Assam',
    'Tawang, Assam', 'Ziro, Assam', 'Itanagar, Assam', 'Naharlagun, Assam', 'Seppa, Assam',
    'Khonsa, Assam', 'Changlang, Assam', 'Miao, Assam', 'Namsai, Assam', 'Mahadevpur, Assam',
    
    // HIMACHAL PRADESH - Cities, Towns, Villages
    'Shimla, Himachal Pradesh', 'Dharamshala, Himachal Pradesh', 'Solan, Himachal Pradesh', 'Mandi, Himachal Pradesh', 'Palampur, Himachal Pradesh',
    'Baddi, Himachal Pradesh', 'Nahan, Himachal Pradesh', 'Paonta Sahib, Himachal Pradesh', 'Sundernagar, Himachal Pradesh', 'Chamba, Himachal Pradesh',
    'Una, Himachal Pradesh', 'Kullu, Himachal Pradesh', 'Manali, Himachal Pradesh', 'Kasauli, Himachal Pradesh', 'Dalhousie, Himachal Pradesh',
    'Khajjiar, Himachal Pradesh', 'McLeod Ganj, Himachal Pradesh', 'Bir, Himachal Pradesh', 'Baijnath, Himachal Pradesh', 'Jogindernagar, Himachal Pradesh',
    'Hamirpur, Himachal Pradesh', 'Bilaspur, Himachal Pradesh', 'Kangra, Himachal Pradesh', 'Nurpur, Himachal Pradesh', 'Jawalamukhi, Himachal Pradesh',
    'Dehra, Himachal Pradesh', 'Jaswan, Himachal Pradesh', 'Fatehpur, Himachal Pradesh', 'Indora, Himachal Pradesh', 'Sulah, Himachal Pradesh',
    'Amb, Himachal Pradesh', 'Gagret, Himachal Pradesh', 'Haroli, Himachal Pradesh', 'Mukerian, Himachal Pradesh', 'Talwara, Himachal Pradesh',
    'Daulatpur, Himachal Pradesh', 'Bangana, Himachal Pradesh', 'Bhota, Himachal Pradesh', 'Bharwain, Himachal Pradesh', 'Ghanari, Himachal Pradesh',
    
    // UTTARAKHAND - Cities, Towns, Villages
    'Dehradun, Uttarakhand', 'Haridwar, Uttarakhand', 'Roorkee, Uttarakhand', 'Haldwani, Uttarakhand', 'Rudrapur, Uttarakhand',
    'Kashipur, Uttarakhand', 'Rishikesh, Uttarakhand', 'Kotdwar, Uttarakhand', 'Ramnagar, Uttarakhand', 'Pithoragarh, Uttarakhand',
    'Almora, Uttarakhand', 'Nainital, Uttarakhand', 'Mussoorie, Uttarakhand', 'Tehri, Uttarakhand', 'Pauri, Uttarakhand',
    'Srinagar, Uttarakhand', 'Chamoli, Uttarakhand', 'Bageshwar, Uttarakhand', 'Champawat, Uttarakhand', 'Udham Singh Nagar, Uttarakhand',
    'Kichha, Uttarakhand', 'Sitarganj, Uttarakhand', 'Jaspur, Uttarakhand', 'Bajpur, Uttarakhand', 'Gadarpur, Uttarakhand',
    'Khatima, Uttarakhand', 'Tanakpur, Uttarakhand', 'Lalkuan, Uttarakhand', 'Bhimtal, Uttarakhand', 'Ranikhet, Uttarakhand',
    'Kausani, Uttarakhand', 'Lansdowne, Uttarakhand', 'Chakrata, Uttarakhand', 'Dhanaulti, Uttarakhand', 'Auli, Uttarakhand',
    'Joshimath, Uttarakhand', 'Badrinath, Uttarakhand', 'Kedarnath, Uttarakhand', 'Gangotri, Uttarakhand', 'Yamunotri, Uttarakhand',
    
    // GOA - Cities, Towns, Villages
    'Panaji, Goa', 'Vasco da Gama, Goa', 'Margao, Goa', 'Mapusa, Goa', 'Ponda, Goa',
    'Bicholim, Goa', 'Curchorem, Goa', 'Sanquelim, Goa', 'Cuncolim, Goa', 'Canacona, Goa',
    'Quepem, Goa', 'Sanguem, Goa', 'Pernem, Goa', 'Bardez, Goa', 'Tiswadi, Goa',
    'Salcete, Goa', 'Mormugao, Goa', 'Anjuna, Goa', 'Baga, Goa', 'Calangute, Goa',
    'Candolim, Goa', 'Arambol, Goa', 'Morjim, Goa', 'Ashwem, Goa', 'Mandrem, Goa',
    'Vagator, Goa', 'Chapora, Goa', 'Sinquerim, Goa', 'Aguada, Goa', 'Nerul, Goa',
    'Reis Magos, Goa', 'Coco Beach, Goa', 'Dona Paula, Goa', 'Miramar, Goa', 'Caranzalem, Goa',
    'Bambolim, Goa', 'Siridao, Goa', 'Bogmalo, Goa', 'Velsao, Goa', 'Arossim, Goa',
    
    // DELHI - Areas, Colonies, Villages
    'New Delhi, Delhi', 'Old Delhi, Delhi', 'Central Delhi, Delhi', 'North Delhi, Delhi', 'South Delhi, Delhi',
    'East Delhi, Delhi', 'West Delhi, Delhi', 'North East Delhi, Delhi', 'North West Delhi, Delhi', 'South East Delhi, Delhi',
    'South West Delhi, Delhi', 'Connaught Place, Delhi', 'Karol Bagh, Delhi', 'Lajpat Nagar, Delhi', 'Rajouri Garden, Delhi',
    'Saket, Delhi', 'Vasant Kunj, Delhi', 'Dwarka, Delhi', 'Rohini, Delhi', 'Pitampura, Delhi',
    'Janakpuri, Delhi', 'Laxmi Nagar, Delhi', 'Preet Vihar, Delhi', 'Mayur Vihar, Delhi', 'Kalkaji, Delhi',
    'Greater Kailash, Delhi', 'Defence Colony, Delhi', 'Khan Market, Delhi', 'India Gate, Delhi', 'Red Fort, Delhi',
    'Chandni Chowk, Delhi', 'Paharganj, Delhi', 'Daryaganj, Delhi', 'Kashmere Gate, Delhi', 'Civil Lines, Delhi',
    'Model Town, Delhi', 'Kamla Nagar, Delhi', 'Mukherjee Nagar, Delhi', 'Vijay Nagar, Delhi', 'Ashok Vihar, Delhi',
    'Shalimar Bagh, Delhi', 'Punjabi Bagh, Delhi', 'Rajendra Place, Delhi', 'Patel Nagar, Delhi', 'Kirti Nagar, Delhi',
    'Moti Nagar, Delhi', 'Naraina, Delhi', 'Uttam Nagar, Delhi', 'Najafgarh, Delhi', 'Dwarka Mor, Delhi',
    'Palam, Delhi', 'Vasant Vihar, Delhi', 'RK Puram, Delhi', 'Munirka, Delhi', 'Hauz Khas, Delhi',
    'Green Park, Delhi', 'AIIMS, Delhi', 'IIT Delhi, Delhi', 'Safdarjung, Delhi', 'Lodhi Road, Delhi',
    'Nizamuddin, Delhi', 'Jangpura, Delhi', 'Lodi Colony, Delhi', 'Friends Colony, Delhi', 'Mathura Road, Delhi',
    'Okhla, Delhi', 'Jamia Nagar, Delhi', 'Batla House, Delhi', 'Shaheen Bagh, Delhi', 'Kalindi Kunj, Delhi',
    'Jasola, Delhi', 'Sarita Vihar, Delhi', 'Nehru Place, Delhi', 'Kalkaji Extension, Delhi', 'Govindpuri, Delhi',
    'Tughlakabad, Delhi', 'Badarpur, Delhi', 'Faridabad Border, Delhi', 'Surajkund, Delhi', 'Aravalli Hills, Delhi'
  ]

  const filteredLocations = worldLocations.filter(locationName => 
    locationName.toLowerCase().includes(locationSearch.toLowerCase())
  )

  // Automatically get location on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getDeviceLocation()
    }
  }, [])

  const getDeviceLocation = async () => {
    setIsGettingLocation(true)
    if (typeof window !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude
          const lon = position.coords.longitude
          
          try {
            // Try to get location name from coordinates
            const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`)
            const data = await response.json()
            
            if (data.city || data.locality) {
              const locationName = `${data.locality || data.city}, ${data.principalSubdivision || data.countryName}`
              setLocation(locationName)
            } else {
              setLocation(`${data.principalSubdivision || 'Your Area'}, ${data.countryName || 'India'}`)
            }
          } catch (error) {
            // Fallback to coordinates if geocoding fails
            setLocation(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`)
          }
          setIsGettingLocation(false)
        },
        (error) => {
          console.log('Location access denied or failed:', error)
          setIsGettingLocation(false)
        }
      )
    } else {
      setIsGettingLocation(false)
    }
  }

  const handleLocationSelect = (selectedLocation: string) => {
    setLocation(selectedLocation)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Store data in localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('farmData', JSON.stringify({
        location,
        crop,
        farmSize
      }))
    }
    
    router.push('/dashboard')
  }

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCropList(false)
      setShowLocationList(false)
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-yellow-50 relative">
      {/* Background Image Layer - Added at the bottom layer as requested */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{backgroundImage: 'url(/photos/image_1.png)'}}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 to-yellow-800/20 backdrop-blur-sm" />
      </div>
      
      <nav className="bg-gradient-to-r from-green-700 to-yellow-600 text-white p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold flex items-center gap-2">🌾 KISAN SAFE 🚜</h1>
          <div className="flex gap-6">
            <a href="/crop-setup" className="hover:text-yellow-200 font-semibold">Home</a>
            <a href="/about" className="hover:text-yellow-200">About</a>
            <a href="/contact" className="hover:text-yellow-200">Contact</a>
            <a href="/news" className="hover:text-yellow-200">News</a>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 flex items-center justify-center min-h-[80vh] relative z-10">
        <div className="bg-white/20 backdrop-blur-lg p-8 rounded-xl shadow-2xl border-2 border-white/30 w-full max-w-lg text-base relative overflow-hidden">
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-6 text-center uppercase text-white/90 backdrop-blur-md bg-black/20 p-4 rounded-lg border border-white/20 flex items-center justify-center gap-2">
              🌱 Tell us about your farm 🌾
            </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-white">🏡 Where is your farm located?</label>
              <p className="text-xs text-white/80 mb-3">
                {isGettingLocation ? '📍 Getting your location...' : 'We automatically detected your location, or enter manually'}
              </p>
              
              <div className="space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search worldwide locations (e.g., New York, Mumbai, London, Tokyo)"
                    value={location || locationSearch}
                    onChange={(e) => {
                      setLocationSearch(e.target.value)
                      setLocation('')
                      setShowLocationList(true)
                    }}
                    onFocus={() => setShowLocationList(true)}
                    className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                    required
                  />
                  {isGettingLocation && (
                    <div className="absolute right-3 top-3">
                      <div className="animate-spin h-5 w-5 border-2 border-green-500 border-t-transparent rounded-full"></div>
                    </div>
                  )}
                  
                  {showLocationList && (
                    <div className="absolute z-20 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                      {filteredLocations.length > 0 ? (
                        filteredLocations.slice(0, 50).map((locationName) => (
                          <div
                            key={locationName}
                            onClick={() => {
                              setLocation(locationName)
                              setLocationSearch('')
                              setShowLocationList(false)
                            }}
                            className="p-3 hover:bg-green-100 cursor-pointer border-b border-green-100 last:border-b-0 text-sm"
                          >
                            📍 {locationName}
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-gray-500 text-sm">No locations found. You can still type your custom location.</div>
                      )}
                    </div>
                  )}
                  
                  {location && (
                    <div className="mt-2 text-sm text-green-700 font-medium">
                      ✅ Selected: {location}
                    </div>
                  )}
                </div>
                
                <button
                  type="button"
                  onClick={getDeviceLocation}
                  disabled={isGettingLocation}
                  className="w-full bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-yellow-600 disabled:opacity-50 flex items-center justify-center gap-2 font-medium"
                >
                  {isGettingLocation ? '📍 Getting Location...' : '🔄 Refresh My Location'}
                </button>
                

                
                <p className="text-xs text-gray-500 text-center">
                  {location ? `✅ Location detected: ${location}` : 'We use your area/colony name to provide local weather alerts and regional farming insights'}
                </p>
              </div>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium mb-2 text-green-700">🌾 What crop are you growing?</label>
              <input
                type="text"
                placeholder="Search for your crop (e.g., Rice, Wheat, Tomato)"
                value={crop || cropSearch}
                onChange={(e) => {
                  setCropSearch(e.target.value)
                  setCrop('')
                  setShowCropList(true)
                }}
                onFocus={() => setShowCropList(true)}
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                required
              />
              {showCropList && (
                <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                  {filteredCrops.length > 0 ? (
                    filteredCrops.map((cropName) => (
                      <div
                        key={cropName}
                        onClick={() => {
                          setCrop(cropName.toLowerCase())
                          setCropSearch('')
                          setShowCropList(false)
                        }}
                        className="p-3 hover:bg-green-100 cursor-pointer border-b border-green-100 last:border-b-0"
                      >
                        {cropName}
                      </div>
                    ))
                  ) : (
                    <div className="p-3 text-gray-500">No crops found</div>
                  )}
                </div>
              )}
              {crop && (
                <div className="mt-2 text-sm text-green-700 font-medium">
                  ✅ Selected: {crop.charAt(0).toUpperCase() + crop.slice(1)}
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-green-700">🚜 Farm Size (acres)</label>
              <input
                type="number"
                placeholder="Enter farm size"
                value={farmSize}
                onChange={(e) => setFarmSize(e.target.value)}
                className="w-full p-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-green-50"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-yellow-500 text-white p-3 rounded-lg hover:from-green-700 hover:to-yellow-600 font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Get Predictions
            </button>
          </form>
          </div>
        </div>
      </main>
    </div>
  )
}

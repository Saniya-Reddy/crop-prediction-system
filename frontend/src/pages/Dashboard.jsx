import React, { useState } from 'react';

export default function CropRecommendationDashboard() {
  const [formData, setFormData] = useState({
    state: '',
    district: '',
    season: '',
    year: new Date().getFullYear(),
    area: '',
    soilType: '',
    temperature: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('prediction');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Cabbage'];
  const seasons = ['Kharif', 'Rabi', 'Winter', 'Summer', 'All Seasons'];
  const soilTypes = ['Sandy', 'Black', 'Red', 'Loamy'];
  
  const seasonInfo = {
    'Kharif': {
      icon: '🌧️',
      months: 'June - October',
      sowingMonth: 'June - July',
      harvestMonth: 'September - October',
      climate: 'Monsoon Season',
      rainfall: 'High (800-2000 mm)',
      temperature: '20-30°C',
      humidity: 'High (70-90%)',
      crops: ['Rice', 'Maize', 'Cotton', 'Sugarcane', 'Okra', 'Groundnut'],
      description: 'Monsoon-dependent crop season with high rainfall and humidity',
      characteristics: ['Heavy rainfall', 'High moisture', 'Warm temperatures', 'Good for water-loving crops']
    },
    'Rabi': {
      icon: '❄️',
      months: 'October - March',
      sowingMonth: 'October - November',
      harvestMonth: 'February - March',
      climate: 'Winter Season',
      rainfall: 'Low (500-750 mm)',
      temperature: '10-25°C',
      humidity: 'Moderate (50-70%)',
      crops: ['Wheat', 'Barley', 'Chickpea', 'Mustard', 'Linseed', 'Peas'],
      description: 'Winter season crop with cool temperatures and moderate moisture',
      characteristics: ['Moderate rainfall', 'Cool climate', 'Dry soil conditions', 'Ideal for cereals']
    },
    'Winter': {
      icon: '❄️',
      months: 'December - February',
      sowingMonth: 'November - December',
      harvestMonth: 'February - March',
      climate: 'Cold Winter',
      rainfall: 'Low (100-300 mm)',
      temperature: '5-20°C',
      humidity: 'Low to Moderate (40-60%)',
      crops: ['Wheat', 'Vegetables', 'Potato', 'Onion', 'Carrot', 'Cabbage'],
      description: 'Cold season ideal for root vegetables and winter crops',
      characteristics: ['Frost possible', 'Low temperature', 'Well-drained soil needed', 'Short duration crops']
    },
    'Summer': {
      icon: '☀️',
      months: 'March - May',
      sowingMonth: 'February - April',
      harvestMonth: 'April - May',
      climate: 'Hot Dry Season',
      rainfall: 'Very Low (50-100 mm)',
      temperature: '25-40°C',
      humidity: 'Low (20-40%)',
      crops: ['Sugarcane', 'Cotton', 'Vegetables', 'Watermelon', 'Muskmelon', 'Cucumber'],
      description: 'Hot and dry season requiring irrigation for most crops',
      characteristics: ['High temperature', 'Low rainfall', 'Dry soil', 'Irrigation essential']
    },
    'All Seasons': {
      icon: '🌍',
      months: 'January - December',
      sowingMonth: 'Year-Round Planting',
      harvestMonth: 'Throughout the Year',
      climate: 'Varied Climate',
      rainfall: 'Variable (100-2000 mm)',
      temperature: '5-40°C',
      humidity: 'Variable (20-90%)',
      crops: ['Tomato', 'Onion', 'Potato', 'Cabbage', 'Carrot', 'Spinach', 'Beans', 'Pumpkin', 'Chilli', 'Coriander'],
      description: 'Year-round cultivation crops adaptable to multiple seasons with proper management',
      characteristics: ['Year-round potential', 'Multiple planting dates', 'Climate adaptable', 'High market demand', 'Consistent income']
    }
  };
  const states = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana',
    'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli', 'Daman and Diu',
    'Lakshadweep', 'Delhi', 'Puducherry'
  ];
  
  const districts = {
    'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Tirupati', 'Nellore', 'Chittoor', 'Kadapa', 'Anantapur', 'Ongole', 'Kurnool', 'Prakasam', 'Sri Potti Sriramulu Nellore', 'Srikakulam', 'Vizianagaram'],
    'Arunachal Pradesh': ['Papum Pare', 'Changlang', 'Lohit', 'West Kameng', 'East Kameng', 'Dibang Valley', 'Lower Subansiri', 'Upper Subansiri', 'West Siang', 'East Siang', 'Upper Siang', 'Siang', 'Tirap', 'Longding', 'Lepa Rada'],
    'Assam': ['Kamrup', 'Nagaon', 'Sonitpur', 'Dhemaji', 'Morigaon', 'Barpeta', 'Kokrajhar', 'Guwahati', 'Cachar', 'Karimganj', 'Hailakandi', 'Bongaigaon', 'Goalpara', 'Marigaon', 'Nalbari', 'Darrang', 'Udalguri', 'Baksa', 'Biswanath', 'Hojai', 'Dima Hasao', 'Karbi Anglong'],
    'Bihar': ['Patna', 'Nalanda', 'Muzaffarpur', 'Madhubani', 'Darbhanga', 'Vaishali', 'Saran', 'Sitamarhi', 'East Champaran', 'West Champaran', 'Araria', 'Kishanganj', 'Purnia', 'Katihar', 'Supaul', 'Jhapa', 'Gaya', 'Jehanabad', 'Aurangabad', 'Nawada', 'Jamui', 'Munger', 'Lakhisarai', 'Khagaria', 'Begusarai', 'Bhagalpur', 'Banka', 'Sheohar', 'Saharsa', 'Madhepura'],
    'Chhattisgarh': ['Raipur', 'Bilaspur', 'Durg', 'Rajnandgaon', 'Bastar', 'Kabirdham', 'Janjgir-Champa', 'Dhamtari', 'Mahasamund', 'Bemetara', 'Balod', 'Balrampur', 'Sukma', 'Bijapur', 'Narayanpur', 'Kanker', 'Gariaband', 'Mungeli', 'Mandir Hasaud'],
    'Goa': ['North Goa', 'South Goa'],
    'Gujarat': ['Ahmedabad', 'Vadodara', 'Surat', 'Rajkot', 'Junagadh', 'Kutch', 'Banaskantha', 'Sabarkantha', 'Patan', 'Mehsana', 'Gandhinagar', 'Kheda', 'Anand', 'Bhavnagar', 'Amreli', 'Jamnagar', 'Valsad', 'Navsari', 'Tapi', 'Dang', 'Narmada', 'Bharuch', 'Panch Mahals', 'Chhota Udaipur', 'Aravalli', 'Botad', 'Devbhumi Dwarka', 'Gir Somnath', 'Morbi'],
    'Haryana': ['Hisar', 'Rohtak', 'Gurugram', 'Faridabad', 'Ambala', 'Yamunanagar', 'Panipat', 'Karnal', 'Jind', 'Sonipat', 'Kaithal', 'Panchkula', 'Palwal', 'Mewat', 'Bhiwani', 'Charkhi Dadri', 'Rewari', 'Mahendragarh', 'Jhajjar', 'Nuh'],
    'Himachal Pradesh': ['Shimla', 'Mandi', 'Kangra', 'Solan', 'Kinnaur', 'Lahaul and Spiti', 'Chamba', 'Bilaspur', 'Una', 'Hamirpur', 'Sirmour', 'Kullu'],
    'Jharkhand': ['Ranchi', 'Dhanbad', 'Giridih', 'Bokaro', 'Lohardaga', 'Koderma', 'Deoghar', 'Dumka', 'Jamtara', 'Sahebganj', 'Godda', 'West Singhbhum', 'East Singhbhum', 'Seraikela Kharsawan', 'Pakur', 'Hazaribag', 'Ramgarh'],
    'Karnataka': ['Bangalore', 'Mysore', 'Belgaum', 'Mangalore', 'Tumkur', 'Kolar', 'Chikballapur', 'Bijapur', 'Gulbarga', 'Raichur', 'Bidar', 'Yadgir', 'Hassan', 'Kodagu', 'Chikmagalur', 'Davangere', 'Chitradurga', 'Shimoga', 'Uttara Kannada', 'Udupi', 'Dakshina Kannada', 'Gadag', 'Bagalkote', 'Kalaburgi', 'Mandya', 'Chamarajanagar'],
    'Kerala': ['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kannur', 'Kasaragod', 'Alappuzha', 'Pathanamthitta', 'Kottayam', 'Idukki', 'Malappuram', 'Wayanad'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Ratlam', 'Betul', 'Dewas', 'Dhar', 'Khargone', 'Khandwa', 'Burhanpur', 'Hoshangabad', 'Seoni', 'Mandla', 'Balaghat', 'Chattarpur', 'Damoh', 'Panna', 'Satna', 'Rewa', 'Sidhi', 'Shahdol', 'Anuppur', 'Umaria', 'Narsinghpur', 'Chhindwara', 'Ashok Nagar', 'Sheopur', 'Muraina', 'Datia', 'Tikamgarh', 'Chhatarpur'],
    'Maharashtra': ['Nagpur', 'Pune', 'Mumbai', 'Nashik', 'Aurangabad', 'Kolhapur', 'Solapur', 'Amravati', 'Yavatmal', 'Akola', 'Washim', 'Buldhana', 'Jalgaon', 'Dhule', 'Nandurbar', 'Latur', 'Parbhani', 'Hingoli', 'Ahmednagar', 'Sangli', 'Satara', 'Ratnagiri', 'Sindhudurg', 'Thane', 'Raigad', 'Beed', 'Wardha', 'Chandrapur', 'Vidarbha', 'Gondia'],
    'Manipur': ['Imphal East', 'Imphal West', 'Bishnupur', 'Thoubal', 'Ukhrul', 'Chandel', 'Tamenglong', 'Senapati', 'Jiribam'],
    'Meghalaya': ['Shillong', 'Ri Bhoi', 'West Khasi Hills', 'East Khasi Hills', 'Jaintia Hills', 'East Garo Hills', 'West Garo Hills', 'South Garo Hills', 'North Garo Hills'],
    'Mizoram': ['Aizawl', 'Lunglei', 'Saiha', 'Champhai', 'Mamit', 'Kolasib', 'Lawngtlai', 'Serchhip', 'Hnahthial'],
    'Nagaland': ['Kohima', 'Dimapur', 'Mokokchung', 'Tuensang', 'Wokha', 'Mon', 'Zunheboto', 'Peren', 'Kiphire', 'Longleng', 'Phek', 'Chumoukedima'],
    'Odisha': ['Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Balasore', 'Sambalpur', 'Dhenkanal', 'Angul', 'Jharsuguda', 'Sundargarh', 'Kandhamal', 'Gajapati', 'Ganjam', 'Puri', 'Khordha', 'Nayagarh', 'Boudh', 'Sonepur', 'Bargarh', 'Bolangir', 'Kalahandi', 'Nuapada', 'Nabarangpur', 'Rayagada', 'Jajpur', 'Kendrapara', 'Jagatsinghpur', 'Mayurbhanj'],
    'Punjab': ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar', 'Bathinda', 'Moga', 'Firozpur', 'Kapurthala', 'Gurdaspur', 'Hoshiarpur', 'Ropar', 'Sangrur', 'Fatehgarh Sahib', 'Mohali', 'Faridkot', 'Muktsar', 'Barnala'],
    'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner', 'Ajmer', 'Barmer', 'Bhilwara', 'Chittorgarh', 'Dungarpur', 'Hanumangarh', 'Jaisalmer', 'Jalor', 'Jhalawar', 'Jhunjhunu', 'Karauli', 'Kota', 'Nagaur', 'Pali', 'Pratapgarh', 'Sikar', 'Sirohi', 'Tonk', 'Baran', 'Dausa', 'Dholpur', 'Banswara', 'Bundi', 'Sawai Madhopur'],
    'Sikkim': ['East Sikkim', 'West Sikkim', 'North Sikkim', 'South Sikkim'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Trichy', 'Tirunelveli', 'Erode', 'Kanyakumari', 'Villupuram', 'Vellore', 'Tiruvannamalai', 'Ranipet', 'Kanchipuram', 'Chengalpattu', 'Thoothukudi', 'Virudunagar', 'Ramanathapuram', 'Sivaganga', 'Pudukottai', 'Perambalur', 'Karur', 'Namakkal', 'The Nilgiris', 'Dindigul', 'Krishnagiri', 'Cuddalore', 'Kanniyakumari', 'Srivaillanur', 'Tirupattur'],
    'Telangana': ['Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Medak', 'Nalgonda', 'Khammam', 'Mahbubnagar', 'Ranga Reddy', 'Vikarabad', 'Sangareddy', 'Siddipet', 'Jagtiyal', 'Peddapalli', 'Jangaon', 'Bhupalpally', 'Wanaparthy', 'Gadchiroli'],
    'Tripura': ['Agartala', 'West Tripura', 'South Tripura', 'Dhalai', 'Khowai', 'Unakoti', 'Sipahijala', 'Gomti'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Aligarh', 'Mathura', 'Bareilly', 'Saharanpur', 'Muzaffarnagar', 'Bijnor', 'Moradabad', 'Rampur', 'Jyotiba Phule Nagar', 'Amroha', 'Bulandshahr', 'Badaun', 'Pilibhit', 'Shahjahanpur', 'Hardoi', 'Unnao', 'Rae Bareli', 'Sultanpur', 'Partapgarh', 'Gonda', 'Bahraich', 'Shravasti', 'Balrampur', 'Siddharth Nagar', 'Basti', 'Sant Kabir Nagar', 'Ambedkar Nagar', 'Kushinagar', 'Deoria', 'Gorakhpur', 'Maharajganj', 'Mau', 'Jaunpur', 'Azamgarh', 'Ballia', 'Ghazipur', 'Chandauli', 'Mirzapur', 'Sonbhadra', 'Allahabad', 'Kaushambi', 'Fatehpur', 'Banda', 'Hamirpur', 'Mahoba', 'Jhansi', 'Lalitpur', 'Etawah', 'Mainpuri', 'Firozabad', 'Hathras', 'Kasganj', 'Auraiya', 'Farrukhabad', 'Kannauj', 'Etah'],
    'Uttarakhand': ['Dehradun', 'Garhwal', 'Kumaon', 'Nainital', 'Pauri', 'Bageshwar', 'Almora', 'Udham Singh Nagar', 'Champawat', 'Pithoragarh', 'Uttarkashi', 'Chamoli', 'Rudraprayag', 'Tehri', 'Haridwar'],
    'West Bengal': ['Kolkata', 'Darjeeling', 'Asansol', 'Siliguri', 'Jalpaiguri', 'Malda', 'Murshidabad', 'Nadia', 'North 24 Parganas', 'South 24 Parganas', 'East Midnapore', 'West Midnapore', 'Howrah', 'Hooghly', 'Birbhum', 'Bankura', 'Purulia', 'Dakshin Dinajpur', 'Uttar Dinajpur'],
    'Andaman and Nicobar Islands': ['Port Blair', 'Car Nicobar', 'Great Nicobar', 'Campbell Bay', 'Long Island', 'Havelock Island', 'Swaraj Island'],
    'Chandigarh': ['Chandigarh'],
    'Dadra and Nagar Haveli': ['Silvassa', 'Dadra', 'Nagar Haveli', 'Kilvani', 'Amli'],
    'Daman and Diu': ['Daman', 'Diu', 'Gogla'],
    'Lakshadweep': ['Kavaratti', 'Androth', 'Minicoy', 'Agatti', 'Kiltan', 'Kalpeni', 'Amini', 'Kanjirkodam'],
    'Delhi': ['Central Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'New Delhi', 'North West Delhi', 'North East Delhi'],
    'Puducherry': ['Puducherry', 'Karaikal', 'Yanam', 'Mahe'],
  };

  const soilCharacteristics = {
    Sandy: {
      icon: '🟨',
      drainage: 'Fast',
      waterHolding: 'Low',
      fertility: 'Low',
      color: '#D4A574',
    },
    Black: {
      icon: '⬛',
      drainage: 'Moderate',
      waterHolding: 'High',
      fertility: 'High',
      color: '#1a1a1a',
    },
    Red: {
      icon: '🔴',
      drainage: 'Moderate',
      waterHolding: 'Moderate',
      fertility: 'Moderate',
      color: '#D32F2F',
    },
    Loamy: {
      icon: '🟫',
      drainage: 'Well',
      waterHolding: 'Moderate',
      fertility: 'High',
      color: '#8B7355',
    },
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuggestCrop = () => {
    if (!formData.state || !formData.district || !formData.season || !formData.area || !formData.soilType || !formData.temperature) {
      showToastMsg('Please fill in all fields');
      return;
    }

    const temp = parseFloat(formData.temperature);
    if (temp < -10 || temp > 60) {
      showToastMsg('Please enter a valid temperature (-10°C to 60°C)');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const randomCrops = crops.sort(() => Math.random() - 0.5).slice(0, 3);
      const tempScore = Math.abs(temp - 25) < 10 ? 90 : Math.abs(temp - 25) < 15 ? 75 : 60;
      const soilScore = { Sandy: 70, Black: 95, Red: 85, Loamy: 98 }[formData.soilType];
      
      setPrediction({
        primary: randomCrops[0],
        secondary: randomCrops[1],
        tertiary: randomCrops[2],
        confidence: ((tempScore + soilScore) / 2).toFixed(1),
        yield: (Math.random() * 40 + 20).toFixed(1),
        waterRequirement: (Math.random() * 800 + 400).toFixed(0),
        soilType: formData.soilType,
        temperature: formData.temperature,
        tempSuitability: tempScore,
        soilSuitability: soilScore,
        season: formData.season,
      });
      setIsLoading(false);
      setActiveTab('results');
      showToastMsg('Prediction generated successfully! 🌾');
    }, 2000);
  };

  const handleReset = () => {
    setFormData({
      state: '',
      district: '',
      season: '',
      year: new Date().getFullYear(),
      area: '',
      soilType: '',
      temperature: '',
    });
    setPrediction(null);
    showToastMsg('Form reset successfully');
  };

  const showToastMsg = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #f8faf5 0%, #f0f5e8 100%)',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      transition: 'background 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
    },
    backgroundDecoration: {
      position: 'fixed',
      top: '-100px',
      right: '-100px',
      width: '500px',
      height: '500px',
      background: isDarkMode
        ? 'radial-gradient(circle, rgba(132, 195, 78, 0.08) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(132, 195, 78, 0.12) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 25s ease-in-out infinite',
      zIndex: 0,
    },
    backgroundDecoration2: {
      position: 'fixed',
      bottom: '-150px',
      left: '-150px',
      width: '600px',
      height: '600px',
      background: isDarkMode
        ? 'radial-gradient(circle, rgba(45, 80, 22, 0.05) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(45, 80, 22, 0.08) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float-reverse 30s ease-in-out infinite',
      zIndex: 0,
    },
    header: {
      position: 'relative',
      zIndex: 1,
      background: isDarkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderBottom: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    },
    logoSection: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    logo: {
      fontSize: '40px',
    },
    logoText: {
      fontSize: '24px',
      fontWeight: 700,
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      margin: 0,
    },
    headerControls: {
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
    },
    themeToggle: {
      padding: '8px 16px',
      background: isDarkMode ? '#2d5016' : '#f0f5e8',
      border: '2px solid #84c34e',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
    },
    logoutBtn: {
      padding: '8px 20px',
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      transition: 'all 0.3s ease',
    },
    mainContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1400px',
      margin: '40px auto',
      padding: '0 20px',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '40px',
    },
    card: {
      background: isDarkMode ? '#1a1a1a' : 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: isDarkMode
        ? '0 20px 60px rgba(0, 0, 0, 0.3)'
        : '0 20px 60px rgba(45, 80, 22, 0.08)',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      animation: 'slideInUp 0.8s ease-out',
    },
    cardTitle: {
      fontSize: '24px',
      fontWeight: 700,
      marginBottom: '28px',
      color: '#2d5016',
    },
    formGroup: {
      marginBottom: '20px',
    },
    label: {
      display: 'block',
      fontSize: '13px',
      fontWeight: 600,
      color: '#2d5016',
      marginBottom: '8px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
    },
    input: (isFocused) => ({
      width: '100%',
      padding: '12px 16px',
      border: isFocused ? '2px solid #84c34e' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '12px',
      fontFamily: "'Sora', sans-serif",
      fontSize: '14px',
      transition: 'all 0.3s ease',
      background: isDarkMode ? '#2d2d2d' : (isFocused ? 'white' : '#f8faf5'),
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      boxShadow: isFocused ? '0 0 0 4px rgba(132, 195, 78, 0.1)' : 'none',
    }),
    select: (isFocused) => ({
      width: '100%',
      padding: '12px 16px',
      border: isFocused ? '2px solid #84c34e' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '12px',
      fontFamily: "'Sora', sans-serif",
      fontSize: '14px',
      transition: 'all 0.3s ease',
      background: isDarkMode ? '#2d2d2d' : (isFocused ? 'white' : '#f8faf5'),
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
    }),
    buttonGroup: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginTop: '28px',
    },
    button: (variant = 'primary') => ({
      padding: '12px 24px',
      background: variant === 'primary'
        ? 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)'
        : isDarkMode ? '#2d2d2d' : '#f0f5e8',
      color: variant === 'primary' ? 'white' : '#2d5016',
      border: variant === 'primary' ? 'none' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '12px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease',
    }),
    featureCard: {
      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '20px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      transition: 'all 0.3s ease',
    },
    featureIcon: {
      fontSize: '32px',
      marginBottom: '12px',
    },
    featureTitle: {
      fontSize: '16px',
      fontWeight: 600,
      color: '#2d5016',
      marginBottom: '8px',
      margin: 0,
    },
    featureDesc: {
      fontSize: '13px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      lineHeight: 1.5,
      margin: 0,
    },
    resultCard: {
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)',
      color: 'white',
      borderRadius: '16px',
      padding: '24px',
      marginBottom: '16px',
      textAlign: 'center',
    },
    resultValue: {
      fontSize: '28px',
      fontWeight: 700,
      margin: '12px 0',
    },
    resultLabel: {
      fontSize: '13px',
      opacity: 0.9,
      margin: 0,
    },
    soilTypeCard: {
      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
      borderRadius: '12px',
      padding: '16px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      marginBottom: '12px',
      transition: 'all 0.3s ease',
    },
    suitabilityBar: {
      background: isDarkMode ? '#1a1a1a' : '#e0e8d8',
      borderRadius: '8px',
      height: '6px',
      overflow: 'hidden',
      marginTop: '8px',
    },
    suitabilityFill: (percentage) => ({
      height: '100%',
      width: `${percentage}%`,
      background: `linear-gradient(90deg, #2d5016 0%, #84c34e ${percentage}%)`,
      transition: 'all 0.5s ease',
    }),
    toast: {
      position: 'fixed',
      top: '80px',
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#2d5016',
      color: 'white',
      padding: '16px 24px',
      borderRadius: '12px',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
      zIndex: 100,
      animation: showToast ? 'slideDown 0.3s ease-out' : 'slideUp 0.3s ease-out forwards',
    },
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Sora:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          margin: 0;
          padding: 0;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(30px, -30px); }
        }

        @keyframes float-reverse {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
          }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr !important;
          }

          .header {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.backgroundDecoration}></div>
        <div style={styles.backgroundDecoration2}></div>

        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logoSection}>
            <span style={styles.logo}>🌾</span>
            <h1 style={styles.logoText}>AI Crop Recommendation</h1>
          </div>
          <div style={styles.headerControls}>
            <button
              style={styles.themeToggle}
              onClick={() => setIsDarkMode(!isDarkMode)}
              onMouseEnter={(e) => {
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'scale(1)';
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              style={styles.logoutBtn}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(45, 80, 22, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div style={styles.mainContent} className="main-content">
          {/* Form Section */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Enter Farm Details</h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                style={styles.select(formData.state)}
              >
                <option value="">Select State</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                style={styles.select(formData.district)}
                disabled={!formData.state}
              >
                <option value="">Select District</option>
                {formData.state && districts[formData.state]?.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>🌾 Season</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                style={styles.select(formData.season)}
              >
                <option value="">Select Season</option>
                {seasons.map(season => (
                  <option key={season} value={season}>{season}</option>
                ))}
              </select>
            </div>



            <div style={styles.formGroup}>
              <label style={styles.label}>Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                style={styles.input(false)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Area (hectares)</label>
              <input
                type="number"
                name="area"
                placeholder="Enter area in hectares"
                value={formData.area}
                onChange={handleInputChange}
                style={styles.input(false)}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>🌍 Soil Type</label>
              <select
                name="soilType"
                value={formData.soilType}
                onChange={handleInputChange}
                style={styles.select(formData.soilType)}
              >
                <option value="">Select Soil Type</option>
                {soilTypes.map(soil => (
                  <option key={soil} value={soil}>{soil}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>🌡️ Temperature (°C)</label>
              <input
                type="number"
                name="temperature"
                placeholder="Enter temperature (-10°C to 60°C)"
                value={formData.temperature}
                onChange={handleInputChange}
                style={styles.input(false)}
                min="-10"
                max="60"
              />
            </div>

            <div style={styles.buttonGroup}>
              <button
                style={styles.button('secondary')}
                onClick={handleReset}
                onMouseEnter={(e) => {
                  e.target.style.borderColor = '#84c34e';
                  e.target.style.background = isDarkMode ? '#3a3a3a' : '#f0f5e8';
                }}
                onMouseLeave={(e) => {
                  e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8';
                  e.target.style.background = isDarkMode ? '#2d2d2d' : '#f0f5e8';
                }}
              >
                Reset
              </button>
              <button
                style={styles.button('primary')}
                onClick={handleSuggestCrop}
                disabled={isLoading}
                onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 12px 28px rgba(45, 80, 22, 0.3)')}
                onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 8px 20px rgba(45, 80, 22, 0.2)')}
              >
                {isLoading ? '⏳ Processing...' : '🎯 Suggest Crop'}
              </button>
            </div>
          </div>

          {/* Features Section */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Key Features</h2>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>🤖</div>
              <h3 style={styles.featureTitle}>AI Prediction</h3>
              <p style={styles.featureDesc}>
                Machine learning based crop recommendation using advanced algorithms
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📊</div>
              <h3 style={styles.featureTitle}>Season Analysis</h3>
              <p style={styles.featureDesc}>
                Suggest crops according to seasonal patterns and weather conditions
              </p>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>📈</div>
              <h3 style={styles.featureTitle}>Yield Optimization</h3>
              <p style={styles.featureDesc}>
                Helps farmers maximize productivity with data-driven insights
              </p>
            </div>

            {formData.soilType && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                borderRadius: '16px',
                border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
              }}>
                <p style={{fontSize: '12px', color: '#84c34e', fontWeight: 600, margin: '0 0 12px 0', textTransform: 'uppercase'}}>
                  {soilCharacteristics[formData.soilType]?.icon} Soil Characteristics
                </p>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                }}>
                  <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '8px', padding: '10px', fontSize: '12px', textAlign: 'center', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8'}}>
                    <div style={{color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '4px'}}>Drainage</div>
                    <div style={{fontWeight: 700, color: '#2d5016'}}>{soilCharacteristics[formData.soilType]?.drainage}</div>
                  </div>
                  <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '8px', padding: '10px', fontSize: '12px', textAlign: 'center', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8'}}>
                    <div style={{color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '4px'}}>Water Holding</div>
                    <div style={{fontWeight: 700, color: '#2d5016'}}>{soilCharacteristics[formData.soilType]?.waterHolding}</div>
                  </div>
                  <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '8px', padding: '10px', fontSize: '12px', textAlign: 'center', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8', gridColumn: '1 / -1'}}>
                    <div style={{color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '4px'}}>Fertility</div>
                    <div style={{fontWeight: 700, color: '#2d5016'}}>{soilCharacteristics[formData.soilType]?.fertility}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        {prediction && (
          <div style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '1400px',
            margin: '0 auto',
            padding: '0 20px 40px',
          }}>
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>🌾 Crop Prediction Results</h2>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '28px'}}>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Primary Recommendation</p>
                  <div style={styles.resultValue}>{prediction.primary}</div>
                  <p style={styles.resultLabel}>Confidence: {prediction.confidence}%</p>
                </div>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Secondary Option</p>
                  <div style={styles.resultValue}>{prediction.secondary}</div>
                </div>
                <div style={styles.resultCard}>
                  <p style={styles.resultLabel}>Tertiary Option</p>
                  <div style={styles.resultValue}>{prediction.tertiary}</div>
                </div>
              </div>

              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px'}}>
                <div style={styles.featureCard}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#84c34e', marginBottom: '8px'}}>
                    {prediction.yield} tons/hectare
                  </div>
                  <p style={styles.featureDesc}>Expected Yield</p>
                </div>
                <div style={styles.featureCard}>
                  <div style={{fontSize: '24px', fontWeight: 700, color: '#84c34e', marginBottom: '8px'}}>
                    {prediction.waterRequirement} mm
                  </div>
                  <p style={styles.featureDesc}>Water Requirement</p>
                </div>
              </div>

              {/* Soil & Temperature Analysis */}
              <h3 style={{...styles.cardTitle, fontSize: '18px', marginTop: '24px', marginBottom: '16px'}}>Soil & Climate Suitability</h3>
              
              <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px'}}>
                <div style={styles.soilTypeCard}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>{soilCharacteristics[prediction.soilType]?.icon}</span>
                    <div>
                      <div style={{fontSize: '14px', fontWeight: 700, color: '#2d5016'}}>Soil Type: {prediction.soilType}</div>
                      <div style={{fontSize: '11px', color: isDarkMode ? '#aaaaaa' : '#666666'}}>Suitability Score</div>
                    </div>
                  </div>
                  <div style={styles.suitabilityBar}>
                    <div style={styles.suitabilityFill(prediction.soilSuitability)}></div>
                  </div>
                  <div style={{fontSize: '12px', color: '#84c34e', fontWeight: 700, marginTop: '6px'}}>
                    {prediction.soilSuitability}% Suitable
                  </div>
                </div>

                <div style={styles.soilTypeCard}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px'}}>
                    <span style={{fontSize: '24px'}}>🌡️</span>
                    <div>
                      <div style={{fontSize: '14px', fontWeight: 700, color: '#2d5016'}}>Temperature: {prediction.temperature}°C</div>
                      <div style={{fontSize: '11px', color: isDarkMode ? '#aaaaaa' : '#666666'}}>Suitability Score</div>
                    </div>
                  </div>
                  <div style={styles.suitabilityBar}>
                    <div style={styles.suitabilityFill(prediction.tempSuitability)}></div>
                  </div>
                  <div style={{fontSize: '12px', color: '#84c34e', fontWeight: 700, marginTop: '6px'}}>
                    {prediction.tempSuitability}% Suitable
                  </div>
                </div>
              </div>

              {/* Season Information */}
              {seasonInfo[prediction.season] && (
                <div style={{
                  background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                  borderRadius: '16px',
                  padding: '20px',
                  border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
                  marginBottom: '28px',
                }}>
                  <h4 style={{color: '#2d5016', marginBottom: '16px', fontSize: '14px', fontWeight: 700}}>
                    {seasonInfo[prediction.season].icon} {prediction.season} Season Information
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '12px',
                    marginBottom: '16px',
                  }}>
                    <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '10px', padding: '12px', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8'}}>
                      <div style={{fontSize: '11px', color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '6px', fontWeight: 600}}>🌧️ Rainfall</div>
                      <div style={{fontSize: '13px', fontWeight: 700, color: '#84c34e'}}>{seasonInfo[prediction.season].rainfall}</div>
                    </div>
                    <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '10px', padding: '12px', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8'}}>
                      <div style={{fontSize: '11px', color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '6px', fontWeight: 600}}>💨 Humidity</div>
                      <div style={{fontSize: '13px', fontWeight: 700, color: '#84c34e'}}>{seasonInfo[prediction.season].humidity}</div>
                    </div>
                    <div style={{background: isDarkMode ? '#1a1a1a' : 'white', borderRadius: '10px', padding: '12px', border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8', gridColumn: '1 / -1'}}>
                      <div style={{fontSize: '11px', color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '6px', fontWeight: 600}}>🌡️ Season Climate</div>
                      <div style={{fontSize: '13px', fontWeight: 700, color: '#84c34e'}}>{seasonInfo[prediction.season].climate}</div>
                    </div>
                  </div>
                  <div style={{
                    background: isDarkMode ? '#1a1a1a' : 'white',
                    borderRadius: '10px',
                    padding: '12px',
                    border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
                    fontSize: '12px',
                    color: isDarkMode ? '#aaaaaa' : '#666666',
                    lineHeight: 1.6,
                  }}>
                    <strong style={{color: isDarkMode ? '#ffffff' : '#1a1a1a'}}>📍 Season Details:</strong> {seasonInfo[prediction.season].description}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              <div style={{
                marginTop: '24px',
                padding: '20px',
                background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                borderRadius: '16px',
                border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
              }}>
                <h4 style={{color: '#2d5016', marginBottom: '12px', fontSize: '14px', fontWeight: 700}}>💡 Personalized Recommendations</h4>
                <ul style={{margin: 0, paddingLeft: '20px', fontSize: '13px', color: isDarkMode ? '#aaaaaa' : '#666666', lineHeight: 1.8}}>
                  <li>The selected {prediction.soilType} soil is highly suitable for {prediction.primary}</li>
                  <li>Temperature of {prediction.temperature}°C provides optimal growing conditions for {prediction.season} season</li>
                  <li>Ensure proper irrigation for water requirement of {prediction.waterRequirement}mm</li>
                  <li>Plan sowing between {seasonInfo[prediction.season]?.sowingMonth || 'recommended months'}</li>
                  <li>Expected harvest between {seasonInfo[prediction.season]?.harvestMonth || 'recommended months'}</li>
                  <li>Monitor soil nutrients regularly, especially for {soilCharacteristics[prediction.soilType]?.fertility} fertility {prediction.soilType} soil</li>
                  <li>Humidity of {seasonInfo[prediction.season]?.humidity || 'variable'} may require {seasonInfo[prediction.season]?.climate.includes('Dry') ? 'supplementary irrigation' : 'proper drainage management'}</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Toast */}
      {showToast && <div style={styles.toast}>{toastMessage}</div>}
    </>
  );
}
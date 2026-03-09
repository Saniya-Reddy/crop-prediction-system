
import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { suggestBestCrop } from "../api/prediction";
import { AuthContext } from "../context/AuthContext";

export default function CropRecommendationDashboard() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    state: '',
    district: '',
    season: '',
    year: new Date().getFullYear(),
    area: '',
  });

  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('prediction');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [error, setError] = useState('');

  const crops = ['Wheat', 'Rice', 'Maize', 'Cotton', 'Sugarcane', 'Potato', 'Tomato', 'Cabbage'];
  const seasons = ['Kharif', 'Rabi', 'Zaid'];
  const states = ['Maharashtra', 'Punjab', 'Haryana', 'Uttar Pradesh', 'Madhya Pradesh', 'Karnataka', 'Tamil Nadu', 'Rajasthan'];
  const districts = {
    Maharashtra: ['Nagpur', 'Pune', 'Mumbai', 'Nashik', 'Aurangabad'],
    Punjab: ['Amritsar', 'Ludhiana', 'Patiala', 'Jalandhar'],
    Haryana: ['Hisar', 'Rohtak', 'Gurugram', 'Faridabad'],
    'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra'],
    'Madhya Pradesh': ['Indore', 'Bhopal', 'Jabalpur', 'Gwalior'],
    Karnataka: ['Bangalore', 'Mysore', 'Belgaum', 'Mangalore'],
    'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem'],
    Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Bikaner'],
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSuggestCrop = async () => {
    if (!formData.state || !formData.district || !formData.season || !formData.area) {
      showToastMsg('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const payload = {
        state: formData.state,
        district: formData.district,
        season: formData.season,
        year: Number(formData.year),
        area: Number(formData.area),
      };

      const result = await suggestBestCrop(payload);
      navigate("/result", { state: { result } });
      showToastMsg('Prediction generated successfully! 🌾');

    } catch (err) {
      const errorMsg = err?.response?.data?.error || err?.message || "Prediction failed. Try again.";
      setError(errorMsg);
      showToastMsg('Error: ' + errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      state: '',
      district: '',
      season: '',
      year: new Date().getFullYear(),
      area: '',
    });
    setPrediction(null);
    setError('');
    showToastMsg('Form reset successfully');
  };

  const handleLogout = () => {
    logout();
    navigate("/");
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
      boxSizing: 'border-box',
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
      boxSizing: 'border-box',
    }),
    errorMessage: {
      background: 'rgba(239, 68, 68, 0.1)',
      border: '1px solid #ef4444',
      color: '#ef4444',
      padding: '12px',
      borderRadius: '10px',
      marginBottom: '20px',
      fontSize: '13px',
      fontWeight: 500,
    },
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
      opacity: isLoading && variant === 'primary' ? 0.7 : 1,
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
              onClick={handleLogout}
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

            {error && <div style={styles.errorMessage}>{error}</div>}

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
              <label style={styles.label}>Season</label>
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

            <div style={{
              marginTop: '24px',
              padding: '20px',
              background: isDarkMode ? '#2d2d2d' : '#f8faf5',
              borderRadius: '16px',
              border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
            }}>
              <p style={{fontSize: '12px', color: '#84c34e', fontWeight: 600, margin: '0 0 12px 0', textTransform: 'uppercase'}}>
                📊 Soil Health Score
              </p>
              <div style={{
                background: isDarkMode ? '#1a1a1a' : 'white',
                borderRadius: '8px',
                padding: '8px',
                fontSize: '11px',
                color: isDarkMode ? '#aaaaaa' : '#666666',
              }}>
                Optimal fertility level detected for your region
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {showToast && <div style={styles.toast}>{toastMessage}</div>}
    </>
  );
}


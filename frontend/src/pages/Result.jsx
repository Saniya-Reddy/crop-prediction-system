
import React, { useState, useEffect } from 'react';

export default function CropIntelligenceReport() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('Wheat');
  const [priceData, setPriceData] = useState([]);
  const [printMode, setPrintMode] = useState(false);

  const crops = {
    Wheat: {
      verified: true,
      status: 'Optimal Selection',
      yieldScore: 8.7,
      pestRisk: 'Low',
      soilProfile: { pH: 7.2, nitrogen: 45, phosphorus: 38, potassium: 92 },
      sowingMonth: 'October-November',
      harvestMonth: 'March-April',
      waterNeeded: 450,
      pestDiseases: ['Rust', 'Septoria'],
    },
    Rice: {
      verified: true,
      status: 'High Potential',
      yieldScore: 8.2,
      pestRisk: 'Moderate',
      soilProfile: { pH: 6.8, nitrogen: 52, phosphorus: 42, potassium: 85 },
      sowingMonth: 'May-June',
      harvestMonth: 'September-October',
      waterNeeded: 800,
      pestDiseases: ['Blast', 'Sheath Blight'],
    },
    Maize: {
      verified: true,
      status: 'Good Selection',
      yieldScore: 7.9,
      pestRisk: 'Moderate',
      soilProfile: { pH: 6.5, nitrogen: 48, phosphorus: 40, potassium: 88 },
      sowingMonth: 'April-May',
      harvestMonth: 'July-August',
      waterNeeded: 550,
      pestDiseases: ['Fall Armyworm', 'Turcicum Leaf Blight'],
    },
  };

  useEffect(() => {
    // Generate mock price data
    const data = [];
    for (let i = 0; i < 12; i++) {
      data.push({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        price: Math.floor(Math.random() * 3000 + 2500),
      });
    }
    setPriceData(data);
  }, [selectedCrop]);


  const currentCrop = crops[selectedCrop];
  const maxPrice = Math.max(...priceData.map(d => d.price));
  const minPrice = Math.min(...priceData.map(d => d.price));

  const styles = {
    container: {
      minHeight: '100vh',
      background: isDarkMode
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #fafbf7 0%, #f5f8f2 100%)',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      transition: 'all 0.5s ease',
      position: 'relative',
      overflow: 'hidden',
      padding: printMode ? '0' : '20px',
    },
    backgroundDecor: {
      position: 'fixed',
      top: '-100px',
      right: '-100px',
      width: '500px',
      height: '500px',
      background: isDarkMode
        ? 'radial-gradient(circle, rgba(132, 195, 78, 0.08) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(132, 195, 78, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 25s ease-in-out infinite',
      zIndex: 0,
      pointerEvents: 'none',
    },
    header: {
      position: 'relative',
      zIndex: 10,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '40px',
      background: isDarkMode ? 'rgba(26, 26, 26, 0.8)' : 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(10px)',
      padding: '20px 30px',
      borderRadius: '16px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
    },
    title: {
      fontSize: '32px',
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
    button: (variant = 'primary') => ({
      padding: '8px 16px',
      background: variant === 'primary'
        ? 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)'
        : isDarkMode ? '#2d2d2d' : '#f0f5e8',
      color: variant === 'primary' ? 'white' : '#2d5016',
      border: variant === 'primary' ? 'none' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '8px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '12px',
      transition: 'all 0.3s ease',
    }),
    mainContent: {
      position: 'relative',
      zIndex: 1,
      maxWidth: '1200px',
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
    },
    card: {
      background: isDarkMode ? '#1a1a1a' : 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: isDarkMode
        ? '0 20px 60px rgba(0, 0, 0, 0.3)'
        : '0 20px 60px rgba(45, 80, 22, 0.08)',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      animation: 'slideInUp 0.8s ease-out',
    },
    fullWidthCard: {
      background: isDarkMode ? '#1a1a1a' : 'white',
      borderRadius: '20px',
      padding: '30px',
      boxShadow: isDarkMode
        ? '0 20px 60px rgba(0, 0, 0, 0.3)'
        : '0 20px 60px rgba(45, 80, 22, 0.08)',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      animation: 'slideInUp 0.8s ease-out',
      marginTop: '30px',
      gridColumn: '1 / -1',
    },
    cardTitle: {
      fontSize: '22px',
      fontWeight: 700,
      marginBottom: '20px',
      color: '#2d5016',
    },
    sectionTitle: {
      fontSize: '16px',
      fontWeight: 700,
      marginTop: '24px',
      marginBottom: '12px',
      color: '#2d5016',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
    },
    badge: (variant = 'success') => ({
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      padding: '10px 16px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 600,
      background: variant === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
      color: variant === 'success' ? '#22c55e' : '#ef4444',
      border: variant === 'success' ? '1px solid #22c55e' : '1px solid #ef4444',
    }),
    statusGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '16px',
      marginTop: '16px',
    },
    statusItem: {
      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
      padding: '16px',
      borderRadius: '12px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
    },
    statusIcon: {
      fontSize: '24px',
      marginBottom: '8px',
    },
    statusLabel: {
      fontSize: '12px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      marginBottom: '6px',
      textTransform: 'uppercase',
      fontWeight: 600,
    },
    statusValue: {
      fontSize: '20px',
      fontWeight: 700,
      color: '#84c34e',
    },
    soilGrid: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginTop: '12px',
    },
    soilItem: {
      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
      padding: '12px',
      borderRadius: '10px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      textAlign: 'center',
    },
    soilLabel: {
      fontSize: '11px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      marginBottom: '4px',
      fontWeight: 600,
    },
    soilValue: {
      fontSize: '18px',
      fontWeight: 700,
      color: '#2d5016',
    },
    chartContainer: {
      marginTop: '16px',
      padding: '16px',
      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
      borderRadius: '12px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      height: '250px',
      display: 'flex',
      alignItems: 'flex-end',
      gap: '8px',
    },
    chartBar: (value, max) => ({
      flex: 1,
      height: `${(value / max) * 100}%`,
      background: 'linear-gradient(180deg, #84c34e 0%, #2d5016 100%)',
      borderRadius: '8px 8px 0 0',
      position: 'relative',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
    }),
    timelineContainer: {
      marginTop: '20px',
      position: 'relative',
    },
    timelineItem: {
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: '20px',
      marginBottom: '20px',
      paddingLeft: '20px',
      borderLeft: '3px solid #84c34e',
      paddingBottom: '20px',
    },
    timelineLabel: {
      fontSize: '12px',
      fontWeight: 600,
      color: '#2d5016',
      textTransform: 'uppercase',
      marginBottom: '4px',
    },
    timelineContent: {
      fontSize: '14px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      fontWeight: 500,
    },
    cropSelector: {
      display: 'flex',
      gap: '12px',
      marginBottom: '20px',
      flexWrap: 'wrap',
    },
    cropOption: (isSelected) => ({
      padding: '8px 16px',
      background: isSelected
        ? 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)'
        : isDarkMode ? '#2d2d2d' : '#f0f5e8',
      color: isSelected ? 'white' : '#2d5016',
      border: isSelected ? 'none' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      transition: 'all 0.3s ease',
    }),
    date: {
      fontSize: '12px',
      color: isDarkMode ? '#666666' : '#999999',
      marginBottom: '16px',
      fontWeight: 500,
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

        @media print {
          body {
            background: white;
          }
        }
      `}</style>

      <div style={styles.container}>
        <div style={styles.backgroundDecor}></div>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>🌾 Crop Intelligence Report</h1>
          <div style={styles.headerControls}>
            <button
              style={styles.button('secondary')}
              onClick={() => window.print()}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#84c34e';
                e.target.style.background = isDarkMode ? '#3a3a3a' : '#e8f0e0';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8';
                e.target.style.background = isDarkMode ? '#2d2d2d' : '#f0f5e8';
              }}
            >
              📄 Print
            </button>
            <button
              style={styles.button('secondary')}
              onClick={() => setIsDarkMode(!isDarkMode)}
              onMouseEnter={(e) => {
                e.target.style.borderColor = '#84c34e';
                e.target.style.background = isDarkMode ? '#3a3a3a' : '#e8f0e0';
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8';
                e.target.style.background = isDarkMode ? '#2d2d2d' : '#f0f5e8';
              }}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>

        {/* Date */}
        <div style={{ ...styles.date, marginLeft: '30px', marginBottom: '30px', position: 'relative', zIndex: 1 }}>
          Generated on {new Date().toLocaleDateString()}
        </div>

        {/* Crop Selector */}
        <div style={{ ...styles.cropSelector, marginLeft: '30px', position: 'relative', zIndex: 1 }}>
          {Object.keys(crops).map(crop => (
            <button
              key={crop}
              style={styles.cropOption(selectedCrop === crop)}
              onClick={() => setSelectedCrop(crop)}
              onMouseEnter={(e) => {
                if (selectedCrop !== crop) {
                  e.target.style.borderColor = '#84c34e';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedCrop !== crop) {
                  e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8';
                }
              }}
            >
              {crop}
            </button>
          ))}
        </div>

        {/* Main Content */}
        <div style={styles.mainContent}>
          {/* Left Column */}
          <div>
            {/* Status Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Recommendation Status</h2>
              
              <div style={{ marginBottom: '16px' }}>
                {currentCrop.verified && (
                  <span style={styles.badge('success')}>
                    ✓ Verified - {currentCrop.status}
                  </span>
                )}
              </div>

              <div style={styles.statusGrid}>
                <div style={styles.statusItem}>
                  <div style={styles.statusIcon}>📈</div>
                  <div style={styles.statusLabel}>Yield Score</div>
                  <div style={styles.statusValue}>{currentCrop.yieldScore}/10</div>
                </div>
                <div style={styles.statusItem}>
                  <div style={styles.statusIcon}>🛡️</div>
                  <div style={styles.statusLabel}>Pest Risk</div>
                  <div style={{
                    fontSize: '16px',
                    fontWeight: 700,
                    color: currentCrop.pestRisk === 'Low' ? '#22c55e' : '#f97316',
                  }}>
                    {currentCrop.pestRisk}
                  </div>
                </div>
              </div>
            </div>

            {/* Soil Profile Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Detailed Soil Profile</h2>
              
              <div style={styles.soilGrid}>
                <div style={styles.soilItem}>
                  <div style={styles.soilLabel}>pH Level</div>
                  <div style={styles.soilValue}>{currentCrop.soilProfile.pH}</div>
                </div>
                <div style={styles.soilItem}>
                  <div style={styles.soilLabel}>Nitrogen</div>
                  <div style={styles.soilValue}>{currentCrop.soilProfile.nitrogen}</div>
                </div>
                <div style={styles.soilItem}>
                  <div style={styles.soilLabel}>Phosphorus</div>
                  <div style={styles.soilValue}>{currentCrop.soilProfile.phosphorus}</div>
                </div>
                <div style={styles.soilItem}>
                  <div style={styles.soilLabel}>Potassium</div>
                  <div style={styles.soilValue}>{currentCrop.soilProfile.potassium}</div>
                </div>
              </div>
            </div>

            {/* Cultivation Cycle */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Cultivation Cycle</h2>
              
              <div style={styles.timelineContainer}>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineLabel}>🌱 Sowing</div>
                  <div style={styles.timelineContent}>{currentCrop.sowingMonth}</div>
                </div>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineLabel}>🌾 Harvest</div>
                  <div style={styles.timelineContent}>{currentCrop.harvestMonth}</div>
                </div>
                <div style={styles.timelineItem}>
                  <div style={styles.timelineLabel}>💧 Water</div>
                  <div style={styles.timelineContent}>{currentCrop.waterNeeded} mm required</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div>
            {/* Market Analysis Card */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Market Analysis</h2>
              
              <p style={{
                fontSize: '13px',
                color: isDarkMode ? '#aaaaaa' : '#666666',
                marginBottom: '16px',
                lineHeight: 1.6,
              }}>
                Projected market performance for {selectedCrop} shows strong demand with stable pricing trends.
              </p>

              <div style={styles.sectionTitle}>Price Trend Chart (12 Months)</div>
              <div style={styles.chartContainer}>
                {priceData.map((item, idx) => (
                  <div key={idx} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1,
                    alignItems: 'center',
                    gap: '8px',
                  }}>
                    <div
                      style={styles.chartBar(item.price, maxPrice)}
                      onMouseEnter={(e) => {
                        e.target.style.opacity = '0.8';
                        e.target.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.opacity = '1';
                        e.target.style.transform = 'scale(1)';
                      }}
                      title={`${item.month}: ₹${item.price}`}
                    ></div>
                    <span style={{
                      fontSize: '10px',
                      color: isDarkMode ? '#aaaaaa' : '#666666',
                      fontWeight: 500,
                    }}>
                      {item.month}
                    </span>
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '16px',
                padding: '12px',
                background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                borderRadius: '10px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '12px',
                fontSize: '12px',
              }}>
                <div>
                  <div style={{color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '4px'}}>Avg Price</div>
                  <div style={{fontSize: '16px', fontWeight: 700, color: '#84c34e'}}>
                    ₹{(priceData.reduce((a, b) => a + b.price, 0) / priceData.length).toFixed(0)}
                  </div>
                </div>
                <div>
                  <div style={{color: isDarkMode ? '#aaaaaa' : '#666666', marginBottom: '4px'}}>Range</div>
                  <div style={{fontSize: '16px', fontWeight: 700, color: '#84c34e'}}>
                    ₹{minPrice} - ₹{maxPrice}
                  </div>
                </div>
              </div>
            </div>

            {/* Pest & Diseases */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Pest & Diseases Management</h2>
              
              <div style={{marginTop: '16px'}}>
                {currentCrop.pestDiseases.map((pest, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: '12px',
                      background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                      borderRadius: '10px',
                      marginBottom: '8px',
                      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '13px',
                      fontWeight: 500,
                    }}
                  >
                    <span style={{fontSize: '16px'}}>🦗</span>
                    {pest}
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Reference */}
            <div style={styles.card}>
              <h2 style={styles.cardTitle}>Geographic Reference</h2>
              
              <div style={{
                padding: '16px',
                background: isDarkMode ? '#2d2d2d' : '#f8faf5',
                borderRadius: '12px',
                border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
              }}>
                <div style={{
                  fontSize: '13px',
                  color: isDarkMode ? '#aaaaaa' : '#666666',
                  lineHeight: 1.8,
                }}>
                  <div style={{marginBottom: '8px'}}>
                    <strong style={{color: isDarkMode ? '#ffffff' : '#1a1a1a'}}>Region:</strong> {selectedCrop} growing regions
                  </div>
                  <div style={{marginBottom: '8px'}}>
                    <strong style={{color: isDarkMode ? '#ffffff' : '#1a1a1a'}}>Climate:</strong> Temperate to subtropical
                  </div>
                  <div>
                    <strong style={{color: isDarkMode ? '#ffffff' : '#1a1a1a'}}>Altitude:</strong> 0-2000 meters above sea level
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div style={styles.fullWidthCard}>
          <h2 style={styles.cardTitle}>Recommendation Summary</h2>
          
          <div style={{
            background: isDarkMode ? '#2d2d2d' : '#f8faf5',
            borderRadius: '12px',
            padding: '20px',
            border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
            lineHeight: 1.8,
            fontSize: '14px',
            color: isDarkMode ? '#aaaaaa' : '#666666',
          }}>
            <p>
              Based on the comprehensive soil analysis, weather patterns, and market trends, <strong style={{color: isDarkMode ? '#ffffff' : '#1a1a1a'}}>{selectedCrop}</strong> is strongly recommended for your farm. With a yield score of <strong>{currentCrop.yieldScore}/10</strong> and <strong>{currentCrop.pestRisk} pest risk</strong>, this crop offers optimal returns. The recommended planting period is <strong>{currentCrop.sowingMonth}</strong> with an estimated water requirement of <strong>{currentCrop.waterNeeded}mm</strong>. Monitor soil nutrients especially nitrogen and maintain pH around <strong>{currentCrop.soilProfile.pH}</strong> for best results.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}


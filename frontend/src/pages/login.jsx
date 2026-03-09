
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { AuthContext } from "../context/AuthContext";

export default function CropAILoginDynamic() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [activeTab, setActiveTab] = useState('login');
  const [liveStats, setLiveStats] = useState({ accuracy: 98, farms: 35420 });
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const translations = {
    en: {
      welcome: 'Welcome Back',
      subtitle: 'Sign in to access your smart farming dashboard',
      username: 'Username or Email',
      password: 'Password',
      signIn: 'Sign In',
      forgotPassword: 'Forgot password?',
      rememberMe: 'Remember me',
      createAccount: 'Create one',
      noAccount: 'Don\'t have an account?',
      accuracy: 'Prediction Accuracy',
      farms: 'Farms Connected',
      cropRec: 'Recommended Crop',
      weather: 'Weather',
      signUp: 'Sign Up',
      email: 'Email Address',
      confirmPassword: 'Confirm Password',
      agreeTerms: 'I agree to Terms & Conditions',
    },
    es: {
      welcome: 'Bienvenido',
      subtitle: 'Inicia sesión para acceder a tu panel de agricultura inteligente',
      username: 'Usuario o Correo',
      password: 'Contraseña',
      signIn: 'Iniciar Sesión',
      forgotPassword: '¿Olvidaste contraseña?',
      rememberMe: 'Recuérdame',
      createAccount: 'Crear una',
      noAccount: '¿No tienes cuenta?',
      accuracy: 'Precisión de Predicción',
      farms: 'Granjas Conectadas',
      cropRec: 'Cultivo Recomendado',
      weather: 'Clima',
      signUp: 'Registrarse',
      email: 'Correo Electrónico',
      confirmPassword: 'Confirmar Contraseña',
      agreeTerms: 'Estoy de acuerdo con Términos y Condiciones',
    },
  };

  const t = translations[language];

  // Dynamic password strength calculation
  useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

  // Simulate live stats update
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        accuracy: prev.accuracy + (Math.random() > 0.5 ? 0.1 : -0.05),
        farms: prev.farms + Math.floor(Math.random() * 5)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const calculatePasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let strength = 0;
    if (pwd.length >= 6) strength += 25;
    if (pwd.length >= 10) strength += 25;
    if (/[A-Z]/.test(pwd)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pwd)) strength += 25;
    return strength;
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 25) return '#ef4444';
    if (passwordStrength < 50) return '#f97316';
    if (passwordStrength < 75) return '#eab308';
    return '#22c55e';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Weak';
    if (passwordStrength < 50) return 'Fair';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showToastMessage('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const data = await loginUser(username, password);

      if (data && data.access) {
        login(data.access);
        showToastMessage(`Welcome, ${username}! 🌾`);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        setError("Invalid response from server");
      }

    } catch (err) {
      const errorMsg = err.response?.data?.detail || "Invalid username or password";
      setError(errorMsg);
      showToastMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const styles = {
    body: {
      fontFamily: "'Sora', sans-serif",
      background: isDarkMode 
        ? 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)'
        : 'linear-gradient(135deg, #f8faf5 0%, #f0f5e8 100%)',
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      padding: 0,
      transition: 'background 0.5s ease',
    },
    backgroundDecoration: {
      position: 'fixed',
      top: '-100px',
      right: '-100px',
      width: '400px',
      height: '400px',
      background: isDarkMode
        ? 'radial-gradient(circle, rgba(132, 195, 78, 0.1) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(132, 195, 78, 0.15) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float 20s ease-in-out infinite',
      zIndex: 0,
    },
    backgroundDecoration2: {
      position: 'fixed',
      bottom: '-150px',
      left: '-150px',
      width: '500px',
      height: '500px',
      background: isDarkMode
        ? 'radial-gradient(circle, rgba(45, 80, 22, 0.05) 0%, transparent 70%)'
        : 'radial-gradient(circle, rgba(45, 80, 22, 0.1) 0%, transparent 70%)',
      borderRadius: '50%',
      animation: 'float-reverse 25s ease-in-out infinite',
      zIndex: 0,
    },
    themeToggle: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '8px 16px',
      background: isDarkMode ? '#2d5016' : '#f0f5e8',
      border: '2px solid #84c34e',
      borderRadius: '20px',
      cursor: 'pointer',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      zIndex: 10,
    },
    languageToggle: {
      position: 'fixed',
      top: '20px',
      right: '140px',
      padding: '8px 12px',
      background: isDarkMode ? '#2d5016' : '#f0f5e8',
      border: '2px solid #84c34e',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '12px',
      transition: 'all 0.3s ease',
      zIndex: 10,
      display: 'flex',
      gap: '6px',
    },
    container: {
      position: 'relative',
      zIndex: 1,
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      maxWidth: '1200px',
      width: '90%',
      alignItems: 'center',
    },
    brandingSection: {
      animation: 'slideInLeft 0.8s ease-out',
    },
    heroImage: {
      marginBottom: '40px',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: isDarkMode 
        ? '0 10px 40px rgba(0, 0, 0, 0.4)'
        : '0 10px 40px rgba(45, 80, 22, 0.15)',
      position: 'relative',
    },
    statsContainer: {
      background: isDarkMode ? '#2d2d2d' : 'linear-gradient(135deg, #f8faf5 0%, #f0f5e8 100%)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '15px',
    },
    statItem: {
      textAlign: 'center',
    },
    statValue: {
      fontSize: '24px',
      fontWeight: 700,
      color: '#84c34e',
      marginBottom: '4px',
      animation: 'pulse 2s ease-in-out infinite',
    },
    statLabel: {
      fontSize: '11px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      margin: 0,
    },
    loginSection: {
      animation: 'slideInRight 0.8s ease-out',
    },
    tabButtons: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '24px',
    },
    tabButton: (isActive) => ({
      padding: '12px',
      background: isActive 
        ? 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)'
        : isDarkMode ? '#2d2d2d' : '#f0f5e8',
      color: isActive ? 'white' : (isDarkMode ? '#aaaaaa' : '#666666'),
      border: isActive ? 'none' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '10px',
      cursor: 'pointer',
      fontWeight: 600,
      fontSize: '13px',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
    }),
    loginCard: {
      background: isDarkMode ? '#1a1a1a' : 'white',
      borderRadius: '24px',
      padding: '40px',
      boxShadow: isDarkMode
        ? '0 20px 60px rgba(0, 0, 0, 0.3)'
        : '0 20px 60px rgba(45, 80, 22, 0.08)',
      border: isDarkMode ? '1px solid #404040' : '1px solid #e0e8d8',
      transition: 'all 0.3s ease',
    },
    loginCardH2: {
      fontFamily: "'Poppins', sans-serif",
      fontSize: '28px',
      fontWeight: 700,
      marginBottom: '12px',
      color: '#2d5016',
      margin: 0,
    },
    loginCardP: {
      fontSize: '14px',
      color: isDarkMode ? '#aaaaaa' : '#666666',
      marginBottom: '35px',
      margin: 0,
    },
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
    formGroup: {
      marginBottom: '22px',
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
    inputWrapper: {
      position: 'relative',
    },
    input: (isFocused) => ({
      width: '100%',
      padding: '13px 16px',
      paddingRight: '40px',
      border: isFocused ? '2px solid #84c34e' : `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
      borderRadius: '12px',
      fontFamily: "'Sora', sans-serif",
      fontSize: '14px',
      transition: 'all 0.3s ease',
      background: isDarkMode ? '#2d2d2d' : (isFocused ? 'white' : '#f8faf5'),
      color: isDarkMode ? '#ffffff' : '#1a1a1a',
      boxShadow: isFocused ? '0 0 0 4px rgba(132, 195, 78, 0.1)' : 'none',
    }),
    passwordStrengthBar: {
      height: '4px',
      background: isDarkMode ? '#404040' : '#e0e8d8',
      borderRadius: '2px',
      marginTop: '8px',
      overflow: 'hidden',
    },
    passwordStrengthFill: {
      height: '100%',
      width: `${passwordStrength}%`,
      background: getPasswordStrengthColor(),
      transition: 'all 0.3s ease',
    },
    strengthText: {
      fontSize: '11px',
      color: getPasswordStrengthColor(),
      marginTop: '4px',
      fontWeight: 600,
    },
    togglePassword: {
      position: 'absolute',
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      cursor: 'pointer',
      fontSize: '18px',
      background: 'none',
      border: 'none',
      color: isDarkMode ? '#aaaaaa' : '#666666',
    },
    formOptions: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '28px',
      fontSize: '13px',
    },
    signInBtn: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #2d5016 0%, #4a7c3e 100%)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontFamily: "'Sora', sans-serif",
      fontSize: '14px',
      fontWeight: 600,
      textTransform: 'uppercase',
      letterSpacing: '0.8px',
      cursor: isLoading ? 'not-allowed' : 'pointer',
      transition: 'all 0.3s ease',
      boxShadow: '0 8px 20px rgba(45, 80, 22, 0.2)',
      position: 'relative',
      overflow: 'hidden',
      opacity: isLoading ? 0.7 : 1,
    },
    loadingSpinner: {
      display: 'inline-block',
      width: '16px',
      height: '16px',
      marginRight: '8px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      verticalAlign: 'middle',
    },
    divider: {
      display: 'flex',
      alignItems: 'center',
      margin: '28px 0',
      color: isDarkMode ? '#666666' : '#666666',
      fontSize: '13px',
    },
    dividerLine: {
      flex: 1,
      height: '1px',
      background: isDarkMode ? '#404040' : '#e0e8d8',
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

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
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

        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            padding: 20px !important;
          }

          .branding-section {
            display: none;
          }

          .login-card {
            padding: 40px 30px !important;
          }

          .login-card h2 {
            font-size: 24px !important;
          }
        }
      `}</style>

      {/* Theme Toggle */}
      <button
        style={styles.themeToggle}
        onClick={() => setIsDarkMode(!isDarkMode)}
        onMouseEnter={(e) => {
          e.target.style.background = isDarkMode ? '#3d7a25' : '#e0e8d8';
          e.target.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          e.target.style.background = isDarkMode ? '#2d5016' : '#f0f5e8';
          e.target.style.transform = 'scale(1)';
        }}
      >
        {isDarkMode ? '☀️' : '🌙'}
      </button>

      {/* Language Toggle */}
      <div style={styles.languageToggle}>
        <button
          onClick={() => setLanguage('en')}
          style={{
            background: language === 'en' ? '#84c34e' : 'transparent',
            color: language === 'en' ? '#1a1a1a' : (isDarkMode ? '#aaaaaa' : '#666666'),
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          EN
        </button>
        <button
          onClick={() => setLanguage('es')}
          style={{
            background: language === 'es' ? '#84c34e' : 'transparent',
            color: language === 'es' ? '#1a1a1a' : (isDarkMode ? '#aaaaaa' : '#666666'),
            border: 'none',
            padding: '4px 8px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 600,
            transition: 'all 0.3s ease',
          }}
        >
          ES
        </button>
      </div>

      <div style={styles.body}>
        <div style={styles.backgroundDecoration}></div>
        <div style={styles.backgroundDecoration2}></div>

        <div style={styles.container} className="container">
          {/* Left Section: Branding */}
          <div style={styles.brandingSection} className="branding-section">
            {/* Spacer - 2cm top space */}
            <div style={{height: '80px', marginBottom: '10px'}}></div>

            {/* Live Statistics */}
            <div style={styles.statsContainer}>
              <div style={styles.statItem}>
                <div style={styles.statValue}>
                  {liveStats.accuracy.toFixed(1)}%
                </div>
                <p style={styles.statLabel}>{t.accuracy}</p>
              </div>
              <div style={styles.statItem}>
                <div style={styles.statValue}>
                  {liveStats.farms.toLocaleString()}
                </div>
                <p style={styles.statLabel}>{t.farms}</p>
              </div>
            </div>

            {/* Features with Images */}
            <div style={styles.features}>
              {[
                {
                  icon: '🤖',
                  title: 'AI-Powered Insights',
                  desc: 'Get intelligent crop recommendations based on real-time data',
                },
                {
                  icon: '📊',
                  title: 'Data-Driven Decisions',
                  desc: 'Make informed choices with comprehensive analytics',
                },
                {
                  icon: '🌱',
                  title: 'Sustainable Farming',
                  desc: 'Maximize yields while supporting environmental health',
                },
              ].map((feature, idx) => (
                <div key={idx} style={{display: 'flex', gap: '15px', animation: `slideInLeft 0.8s ease-out backwards`, animationDelay: `${0.2 + idx * 0.2}s`}}>
                  <div style={{
                    width: '45px',
                    height: '45px',
                    background: 'linear-gradient(135deg, #a8d978 0%, #84c34e 100%)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '24px',
                    flexShrink: 0,
                  }}>
                    {feature.icon}
                  </div>
                  <div>
                    <h3 style={{
                      fontSize: '16px',
                      fontWeight: 600,
                      color: '#2d5016',
                      marginBottom: '4px',
                      margin: 0,
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: '13px',
                      color: isDarkMode ? '#aaaaaa' : '#666666',
                      lineHeight: 1.4,
                      margin: 0,
                    }}>
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section: Login Form */}
          <div style={styles.loginSection}>
            <div style={styles.loginCard} className="login-card">
              {/* Tab Buttons */}
              <div style={styles.tabButtons}>
                <button
                  style={styles.tabButton(activeTab === 'login')}
                  onClick={() => setActiveTab('login')}
                  onMouseEnter={(e) => activeTab !== 'login' && (e.target.style.borderColor = '#84c34e')}
                  onMouseLeave={(e) => activeTab !== 'login' && (e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8')}
                >
                  {t.signIn}
                </button>
                <button
                  style={styles.tabButton(activeTab === 'signup')}
                  onClick={() => setActiveTab('signup')}
                  onMouseEnter={(e) => activeTab !== 'signup' && (e.target.style.borderColor = '#84c34e')}
                  onMouseLeave={(e) => activeTab !== 'signup' && (e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8')}
                >
                  {t.signUp}
                </button>
              </div>

              <h2 style={styles.loginCardH2}>{t.welcome}</h2>
              <p style={styles.loginCardP}>{t.subtitle}</p>

              {error && <div style={styles.errorMessage}>{error}</div>}

              <form onSubmit={handleSubmit}>
                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="username">
                    {t.username}
                  </label>
                  <input
                    type="text"
                    id="username"
                    placeholder="saniya"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setFocusedInput('username')}
                    onBlur={() => setFocusedInput(null)}
                    style={styles.input(focusedInput === 'username')}
                    required
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label} htmlFor="password">
                    {t.password}
                  </label>
                  <div style={styles.inputWrapper}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedInput('password')}
                      onBlur={() => setFocusedInput(null)}
                      style={styles.input(focusedInput === 'password')}
                      required
                    />
                    <button
                      type="button"
                      style={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {password && (
                    <>
                      <div style={styles.passwordStrengthBar}>
                        <div style={styles.passwordStrengthFill}></div>
                      </div>
                      <p style={styles.strengthText}>
                        Password Strength: {getPasswordStrengthText()}
                      </p>
                    </>
                  )}
                </div>

                <div style={styles.formOptions}>
                  <div style={{display: 'flex', alignItems: 'center', gap: '6px'}}>
                    <input
                      type="checkbox"
                      id="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      style={{
                        width: '16px',
                        height: '16px',
                        accentColor: '#84c34e',
                        cursor: 'pointer',
                      }}
                    />
                    <label style={{
                      margin: 0,
                      textTransform: 'none',
                      letterSpacing: 'normal',
                      fontWeight: 400,
                      cursor: 'pointer',
                      fontSize: '13px',
                      color: isDarkMode ? '#aaaaaa' : '#1a1a1a',
                    }} htmlFor="remember">
                      {t.rememberMe}
                    </label>
                  </div>
                  <a
                    href="#"
                    style={{
                      color: '#4a7c3e',
                      textDecoration: 'none',
                      fontWeight: 500,
                      transition: 'color 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#84c34e')}
                    onMouseLeave={(e) => (e.target.style.color = '#4a7c3e')}
                    onClick={(e) => e.preventDefault()}
                  >
                    {t.forgotPassword}
                  </a>
                </div>

                <button
                  type="submit"
                  style={styles.signInBtn}
                  onMouseEnter={(e) => !isLoading && (e.target.style.transform = 'translateY(-2px)', e.target.style.boxShadow = '0 12px 28px rgba(45, 80, 22, 0.3)')}
                  onMouseLeave={(e) => !isLoading && (e.target.style.transform = 'translateY(0)', e.target.style.boxShadow = '0 8px 20px rgba(45, 80, 22, 0.2)')}
                  disabled={isLoading}
                >
                  {isLoading && <span style={styles.loadingSpinner}></span>}
                  {isLoading ? 'SIGNING IN...' : t.signIn}
                </button>

                <div style={styles.divider}>
                  <div style={styles.dividerLine}></div>
                  or continue with
                  <div style={styles.dividerLine}></div>
                </div>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '12px',
                  marginBottom: '20px',
                }}>
                  {['Google', 'Email'].map((provider) => (
                    <button
                      key={provider}
                      type="button"
                      style={{
                        padding: '11px',
                        border: `2px solid ${isDarkMode ? '#404040' : '#e0e8d8'}`,
                        borderRadius: '10px',
                        background: isDarkMode ? '#2d2d2d' : 'white',
                        cursor: 'pointer',
                        fontWeight: 500,
                        color: isDarkMode ? '#aaaaaa' : '#1a1a1a',
                        transition: 'all 0.3s ease',
                        fontFamily: "'Sora', sans-serif",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#84c34e';
                        e.target.style.background = isDarkMode ? '#3a3a3a' : '#f8faf5';
                        e.target.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = isDarkMode ? '#404040' : '#e0e8d8';
                        e.target.style.background = isDarkMode ? '#2d2d2d' : 'white';
                        e.target.style.transform = 'scale(1)';
                      }}
                      onClick={(e) => e.preventDefault()}
                    >
                      {provider}
                    </button>
                  ))}
                </div>

                <p style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  color: isDarkMode ? '#aaaaaa' : '#666666',
                }}>
                  {t.noAccount}{' '}
                  <a
                    href="#"
                    style={{
                      color: '#2d5016',
                      textDecoration: 'none',
                      fontWeight: 600,
                      transition: 'color 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => (e.target.style.color = '#84c34e')}
                    onMouseLeave={(e) => (e.target.style.color = '#2d5016')}
                    onClick={(e) => { e.preventDefault(); setActiveTab('signup'); }}
                  >
                    {t.createAccount}
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && <div style={styles.toast}>{toastMessage}</div>}
    </>
  );
}


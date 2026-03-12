
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
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [liveStats, setLiveStats] = useState({ accuracy: 98, farms: 35420 });
  const [error, setError] = useState('');

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const strength = calculatePasswordStrength(password);
    setPasswordStrength(strength);
  }, [password]);

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

        showToastMessage(`Welcome ${username} 🌾`);

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

    setTimeout(() => {
      setShowToast(false);
    }, 3000);

  };

  const styles = {

    body: {
      fontFamily: "'Sora', sans-serif",
      background: isDarkMode
        ? 'linear-gradient(135deg,#1a1a1a,#2d2d2d)'
        : 'linear-gradient(135deg,#f8faf5,#f0f5e8)',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },

    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      width: '90%',
      maxWidth: '1100px'
    },

    loginCard: {
      background: isDarkMode ? '#1a1a1a' : 'white',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
    },

    input: (isFocused) => ({
      width: '100%',
      padding: '13px',
      borderRadius: '10px',
      border: isFocused ? '2px solid #84c34e' : '2px solid #e0e8d8',
      outline: 'none'
    }),

    signInBtn: {
      width: '100%',
      padding: '14px',
      border: 'none',
      borderRadius: '12px',
      background: 'linear-gradient(135deg,#2d5016,#4a7c3e)',
      color: 'white',
      fontWeight: 600,
      cursor: 'pointer'
    }

  };

  return (
    <>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&family=Sora:wght@400;500;600;700&display=swap');

        @keyframes spin{
        to{transform:rotate(360deg)}
        }
        `}
      </style>

      <div style={styles.body}>

        <div style={styles.container}>

          {/* LEFT SIDE */}

          <div>

            <h1 style={{fontSize:"34px",marginBottom:"20px"}}>
              AI Smart Farming
            </h1>

            <div style={{display:"flex",gap:"40px"}}>

              <div>
                <h2 style={{color:"#84c34e"}}>
                  {liveStats.accuracy.toFixed(1)}%
                </h2>
                <p>Prediction Accuracy</p>
              </div>

              <div>
                <h2 style={{color:"#84c34e"}}>
                  {liveStats.farms.toLocaleString()}
                </h2>
                <p>Farms Connected</p>
              </div>

            </div>

          </div>


          {/* RIGHT SIDE LOGIN */}

          <div style={styles.loginCard}>

            <h2>Welcome Back</h2>

            <p style={{marginBottom:"25px"}}>
              Sign in to access your smart farming dashboard
            </p>

            {error && (
              <div style={{
                color:"red",
                marginBottom:"10px"
              }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>

              <div style={{marginBottom:"20px"}}>

                <label>Username or Email</label>

                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e)=>setUsername(e.target.value)}
                  onFocus={()=>setFocusedInput("username")}
                  onBlur={()=>setFocusedInput(null)}
                  style={styles.input(focusedInput==="username")}
                />

              </div>

              <div style={{marginBottom:"20px"}}>

                <label>Password</label>

                <input
                  type={showPassword ? "text":"password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  onFocus={()=>setFocusedInput("password")}
                  onBlur={()=>setFocusedInput(null)}
                  style={styles.input(focusedInput==="password")}
                />

                {password && (
                  <>
                    <div style={{
                      height:"5px",
                      marginTop:"6px",
                      background:"#ddd"
                    }}>
                      <div style={{
                        width:`${passwordStrength}%`,
                        height:"100%",
                        background:getPasswordStrengthColor()
                      }}></div>
                    </div>

                    <small style={{color:getPasswordStrengthColor()}}>
                      {getPasswordStrengthText()}
                    </small>
                  </>
                )}

              </div>

              <button
                type="submit"
                style={styles.signInBtn}
                disabled={isLoading}
              >

                {isLoading ? "Signing in..." : "Sign In"}

              </button>

            </form>

          </div>

        </div>

      </div>

      {showToast && (
        <div style={{
          position:"fixed",
          top:"40px",
          left:"50%",
          transform:"translateX(-50%)",
          background:"#2d5016",
          color:"white",
          padding:"14px 20px",
          borderRadius:"10px"
        }}>
          {toastMessage}
        </div>
      )}

    </>
  );
}


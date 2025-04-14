import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMobile, 
  FaEnvelope, 
  FaChevronRight,
  FaTimes,
  FaEye,
  FaEyeSlash,
  FaShieldAlt
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import '../styles/LoginModal.css';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setLoginMethod('phone');
      setPhone('');
      setOtp('');
      setOtpSent(false);
      setEmail('');
      setPassword('');
    }
  }, [isOpen]);

  // OTP timer
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [countdown]);

  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Send OTP function
  const sendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      setCountdown(30);
      toast.success(`OTP sent to +91 ${phone}`, {
        position: "bottom-center",
        autoClose: 2000
      });
      // In a real app, you would call an API to send OTP here
    }
  };

  // Verify OTP function
  const verifyOtp = () => {
    // In a real app, you would verify the OTP with an API
    // Using "1234" as a demo OTP
    if (otp === "1234") {
      localStorage.setItem("isAuthenticated", "true");
      onLogin();
      onClose();
      toast.success("Successfully logged in!", {
        position: "bottom-center",
        autoClose: 2000
      });
      navigate('/account');
    } else {
      toast.error("Invalid OTP. Please try again.", {
        position: "bottom-center"
      });
    }
  };

  // Email login function
  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      // In a real app, you would validate credentials with an API
      localStorage.setItem("isAuthenticated", "true");
      onLogin();
      onClose();
      toast.success("Successfully logged in!", {
        position: "bottom-center",
        autoClose: 2000
      });
      navigate('/account');
    } else {
      toast.error("Please enter both email and password", {
        position: "bottom-center"
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay">
      <div className="login-modal" ref={modalRef}>
        <button className="login-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="login-modal-content">
          <div className="login-header">
            <h2>Login to Fresh Deliver</h2>
            <p>Get access to your orders, wishlist, and recommendations</p>
          </div>

          <div className="login-method-selector">
            <button 
              className={`method-tab ${loginMethod === 'phone' ? 'active' : ''}`}
              onClick={() => setLoginMethod('phone')}
            >
              <FaMobile />
              <span>Phone</span>
            </button>
            <button 
              className={`method-tab ${loginMethod === 'email' ? 'active' : ''}`}
              onClick={() => setLoginMethod('email')}
            >
              <FaEnvelope />
              <span>Email</span>
            </button>
          </div>
          
          <div className="secure-login">
            <FaShieldAlt className="secure-icon" />
            <span>Secure Login</span>
          </div>

          {loginMethod === 'phone' ? (
            <div className="phone-login-section">
              {!otpSent ? (
                <div className="phone-input-container">
                  <div className="input-wrapper">
                    <span className="country-code">+91</span>
                    <input 
                      type="tel"
                      placeholder="Enter mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      maxLength={10}
                    />
                  </div>
                  
                  <button 
                    className="continue-btn"
                    onClick={sendOtp}
                    disabled={phone.length !== 10}
                  >
                    Continue <FaChevronRight />
                  </button>
                </div>
              ) : (
                <div className="otp-verification-container">
                  <p className="otp-sent-message">
                    Enter the 4-digit OTP sent to +91 {phone}
                    <br /><small>(Use "1234" for demo)</small>
                  </p>
                  
                  <div className="otp-input-wrapper">
                    <input 
                      type="text"
                      placeholder="Enter 4-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').substring(0, 4))}
                      maxLength={4}
                      className="otp-input"
                    />
                  </div>
                  
                  <div className="otp-actions">
                    {countdown > 0 ? (
                      <p className="resend-timer">
                        Resend OTP in {countdown} seconds
                      </p>
                    ) : (
                      <button 
                        className="resend-otp-btn"
                        onClick={sendOtp}
                      >
                        Resend OTP
                      </button>
                    )}
                    
                    <button 
                      className="verify-otp-btn"
                      onClick={verifyOtp}
                      disabled={otp.length !== 4}
                    >
                      Verify & Login <FaChevronRight />
                    </button>
                  </div>

                  <button 
                    className="back-button" 
                    onClick={() => {
                      setOtpSent(false);
                      setOtp("");
                    }}
                  >
                    Change Phone Number
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleEmailLogin} className="email-login-section">
              <div className="input-group">
                <label>Email Address</label>
                <input 
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="input-group">
                <label>Password</label>
                <div className="password-input">
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button 
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
              
              <div className="forgot-password">
                <button type="button" className="text-button">
                  Forgot Password?
                </button>
              </div>
              
              <button 
                type="submit" 
                className="login-submit-btn"
                disabled={!email || !password}
              >
                Login <FaChevronRight />
              </button>
            </form>
          )}

          <div className="login-footer">
            <p>New to Fresh Deliver?</p>
            <button className="create-account-btn">
              Create an Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
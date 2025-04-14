import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  FaMobile, 
  FaEnvelope, 
  FaChevronRight,
  FaTimes
} from 'react-icons/fa';

const LoginModal = ({ isOpen, onClose, onLogin }) => {
  const [loginMethod, setLoginMethod] = useState('phone');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  // Send OTP function
  const sendOtp = () => {
    if (phone.length === 10) {
      setOtpSent(true);
      setCountdown(30);
      toast.success("OTP sent to your mobile number");
    } else {
      toast.error("Please enter a valid 10-digit mobile number");
    }
  };

  // Verify OTP function
  const verifyOtp = () => {
    if (otp === "1234") {
      onLogin();
      toast.success("Login Successful!");
    } else {
      toast.error("Incorrect OTP. Please try again.");
    }
  };

  // Email login function
  const handleEmailLogin = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin();
      toast.success("Login Successful!");
    } else {
      toast.error("Please enter both email and password");
    }
  };

  // Prevent modal from closing when clicking inside
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal" onClick={handleModalClick}>
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
                  </p>
                  
                  <div className="otp-input-wrapper">
                    {[1,2,3,4].map((_, index) => (
                      <input 
                        key={index}
                        type="text"
                        maxLength={1}
                        value={otp[index] || ''}
                        onChange={(e) => {
                          const newOtp = otp.split('');
                          newOtp[index] = e.target.value;
                          setOtp(newOtp.join(''));
                        }}
                        className="otp-digit-input"
                      />
                    ))}
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
                      Verify OTP <FaChevronRight />
                    </button>
                  </div>
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
                <input 
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                className="login-submit-btn"
                disabled={!email || !password}
              >
                Login <FaChevronRight />
              </button>
              
              <div className="forgot-password">
                <a href="#">Forgot Password?</a>
              </div>
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
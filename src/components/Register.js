import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    city: 'New Delhi'
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? value.replace(/\D/g, '').slice(0, 10) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.phone.length !== 10) {
      Swal.fire({
        title: 'Invalid Phone Number',
        text: "Please enter a valid 10-digit mobile number",
        icon: 'warning'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          password: formData.password,
          address: formData.city
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        Swal.fire({
          title: 'Success!',
          text: "Registration Successful!",
          icon: 'success'
        });
        navigate('/');
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: 'Registration Failed',
          text: errorMsg || "Registration failed. Email might already be in use.",
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
      Swal.fire({
        title: 'Connection Error',
        text: "Error connecting to server. Please ensure the backend is running on localhost:8080",
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <motion.div 
          className="register-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="register-header">
            <div className="register-icon">✨</div>
            <h1>Create Account</h1>
            <p>Join Urban.Easy for the best home services</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="form-group-advanced">
              <label>Full Name</label>
              <div className="input-wrapper-advanced">
                <span className="input-icon-advanced">👤</span>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group-advanced">
              <label>Mobile Number</label>
              <div className="input-wrapper-advanced">
                <span className="input-icon-advanced">📱</span>
                <span className="prefix-advanced">+91</span>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Mobile Number"
                  value={formData.phone}
                  onChange={handleChange}
                  required 
                />
              </div>
            </div>

            <div className="form-group-advanced">
              <label>Email Address</label>
              <div className="input-wrapper-advanced">
                <span className="input-icon-advanced">✉️</span>
                <input 
                  type="email" 
                  name="email"
                  placeholder="example@mail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group-advanced">
              <label>Password</label>
              <div className="input-wrapper-advanced">
                <span className="input-icon-advanced">🔒</span>
                <input 
                  type="password" 
                  name="password"
                  placeholder="Min 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength="6"
                />
              </div>
            </div>

            <div className="form-group-advanced">
              <label>City</label>
              <div className="input-wrapper-advanced">
                <span className="input-icon-advanced">📍</span>
                <select name="city" value={formData.city} onChange={handleChange}>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Mumbai">Mumbai</option>
                  <option value="Pune">Pune</option>
                  <option value="Nagpur">Nagpur</option>
                  <option value="Nashik">Nashik</option>
                  <option value="Aurangabad">Aurangabad</option>
                  <option value="Thane">Thane</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Chennai">Chennai</option>
                </select>
              </div>
            </div>

            <button type="submit" className="register-submit-btn" disabled={isLoading}>
              {isLoading ? (
                <span className="spinner-border spinner-border-sm me-2"></span>
              ) : null}
              {isLoading ? 'Creating Account...' : 'Sign Up'}
            </button>
          </form>

          <div className="register-footer">
            <p>Already have an account? <Link to="#" onClick={(e) => { e.preventDefault(); navigate('/'); /* This would ideally trigger the login modal */ }}>Login</Link></p>
            <p className="terms-text-small">
              By signing up, you agree to our <span>Terms</span> and <span>Privacy Policy</span>
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="register-info-box"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Why register?</h3>
          <ul className="benefits-list">
            <li>
              <span className="benefit-icon">🛡️</span>
              <div>
                <strong>Safe & Secure</strong>
                <p>Verified professionals at your doorstep</p>
              </div>
            </li>
            <li>
              <span className="benefit-icon">🎁</span>
              <div>
                <strong>Exclusive Offers</strong>
                <p>Get ₹100 off on your first booking</p>
              </div>
            </li>
            <li>
              <span className="benefit-icon">⚡</span>
              <div>
                <strong>Quick Booking</strong>
                <p>Save details for 1-click checkout</p>
              </div>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;

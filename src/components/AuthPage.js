import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Swal from 'sweetalert2';
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  Sun,
  Moon,
  Sparkles,
  Droplets,
  Wrench,
  Zap,
  Scissors,
  Paintbrush,
  Hammer,
  Bug,
  ArrowRight,
  Settings,
  X
} from 'lucide-react';
import './AuthPage.css';

const AnimatedServiceCard = ({ Icon, title, delay, color, positionClass }) => {
  return (
    <motion.div
      className={`service-card-auth ${positionClass}`}
      animate={{ y: [0, -10, 0] }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
    >
      <div className="card-content-auth">
        <div className={`card-icon-container-auth ${color}`}>
          <Icon className="card-icon-auth" />
        </div>
        <span className="card-title-auth">{title}</span>
      </div>
    </motion.div>
  );
};

const ServiceShowcase = () => {
  const cards = [
    {
      Icon: Droplets,
      title: 'Cleaning',
      color: 'bg-blue-500',
      positionClass: 'card-position-1'
    },
    {
      Icon: Wrench,
      title: 'Plumbing',
      color: 'bg-emerald-500',
      positionClass: 'card-position-2'
    },
    {
      Icon: Zap,
      title: 'Electrician',
      color: 'bg-yellow-500',
      positionClass: 'card-position-3'
    },
    {
      Icon: Settings,
      title: 'AC Repair',
      color: 'bg-purple-500',
      positionClass: 'card-position-4'
    },
    {
      Icon: Scissors,
      title: 'Salon',
      color: 'bg-rose-500',
      positionClass: 'card-position-5'
    },
    {
      Icon: Paintbrush,
      title: 'Painting',
      color: 'bg-orange-500',
      positionClass: 'card-position-6'
    },
    {
      Icon: Hammer,
      title: 'Carpentry',
      color: 'bg-amber-600',
      positionClass: 'card-position-7'
    },
    {
      Icon: Bug,
      title: 'Pest Control',
      color: 'bg-lime-600',
      positionClass: 'card-position-8'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="service-showcase-auth"
    >
      <div className="showcase-blob-auth">
        <div className="blob-1-auth" />
        <div className="blob-2-auth" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: -18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="showcase-brand-auth"
      >
        URBANEASY
      </motion.div>

      <div className="floating-cards-auth">
        {cards.map((card, index) => (
          <AnimatedServiceCard
            key={card.title}
            Icon={card.Icon}
            title={card.title}
            delay={index * 0.5}
            color={card.color}
            positionClass={card.positionClass}
          />
        ))}
      </div>
    </motion.div>
  );
};

const LoginForm = ({ onToggle, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        
        if (userData.role === 'PROVIDER') {
          navigate('/provider');
        } else {
          onClose(); // Default: Close modal for regular user
        }
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: 'Login Failed',
          text: errorMsg || "Invalid email or password",
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: 'Connection Error',
        text: "Error connecting to server. Is the backend running?",
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="form-container-auth"
    >
      <h2 className="form-title-auth">Welcome Back</h2>
      <p className="form-subtitle-auth">Sign in to continue booking services</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group-auth">
          <label className="form-label-auth">Email Address</label>
          <div className="input-wrapper-auth">
            <Mail className="input-icon-auth" />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="form-input-auth"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group-auth">
          <label className="form-label-auth">Password</label>
          <div className="input-wrapper-auth">
            <Lock className="input-icon-auth" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="form-input-auth"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-auth"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="submit-btn-auth form-actions-auth"
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
          <ArrowRight className="btn-icon-auth" />
        </motion.button>

        <p className="toggle-text-auth">
          Don&apos;t have an account?
          <button type="button" onClick={onToggle} className="toggle-link-auth">
            Sign up
          </button>
        </p>
      </form>
    </motion.div>
  );
};

const RegisterForm = ({ onToggle, onClose, initialRole = 'USER' }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: initialRole
  });
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useCart();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          role: formData.role
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        login(userData);
        
        if (userData.role === 'PROVIDER') {
          Swal.fire({
            title: 'Welcome Aboard!',
            text: "Partner account created! Welcome aboard.",
            icon: 'success'
          });
          navigate('/provider');
        } else {
          Swal.fire({
            title: 'Success!',
            text: "Account created successfully!",
            icon: 'success'
          });
          onClose();
        }
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: 'Registration Failed',
          text: errorMsg || "Registration failed",
          icon: 'error'
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      Swal.fire({
        title: 'Error',
        text: "Error connecting to server.",
        icon: 'error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="form-container-auth register-form-auth"
    >
      <h2 className="form-title-auth">Create Account</h2>
      <p className="form-subtitle-auth">Join thousands of satisfied customers</p>

      <form onSubmit={handleSubmit}>
        <div className="role-selector-auth mb-3">
          <label className="form-label-auth">Register as:</label>
          <div className="d-flex gap-2">
            <button 
              type="button" 
              className={`btn btn-sm ${formData.role === 'USER' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFormData({...formData, role: 'USER'})}
            >User</button>
            <button 
              type="button" 
              className={`btn btn-sm ${formData.role === 'PROVIDER' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFormData({...formData, role: 'PROVIDER'})}
            >Partner</button>
          </div>
        </div>

        <div className="form-group-auth">
          <label className="form-label-auth">Full Name</label>
          <div className="input-wrapper-auth">
            <User className="input-icon-auth" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="form-input-auth"
              placeholder="John Doe"
              required
            />
          </div>
        </div>

        <div className="form-group-auth">
          <label className="form-label-auth">Email Address</label>
          <div className="input-wrapper-auth">
            <Mail className="input-icon-auth" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-input-auth"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div className="form-group-auth">
          <label className="form-label-auth">Phone Number</label>
          <div className="input-wrapper-auth">
            <Zap size={18} className="input-icon-auth" />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-input-auth"
              placeholder="1234567890"
              required
            />
          </div>
        </div>

        <div className="form-group-auth">
          <label className="form-label-auth">Password</label>
          <div className="input-wrapper-auth">
            <Lock className="input-icon-auth" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-input-auth"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="password-toggle-auth"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="submit-btn-auth form-actions-auth"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Account'}
          <Sparkles className="btn-icon-auth" />
        </motion.button>

        <p className="toggle-text-auth">
          Already have an account?
          <button type="button" onClick={onToggle} className="toggle-link-auth">
            Sign in
          </button>
        </p>
      </form>
    </motion.div>
  );
};

const AuthPage = ({ onClose }) => {
  const { authMode, setAuthMode, authRole, setAuthRole } = useCart();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Derived state from context
  const isLogin = authMode === 'login';

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    document.body.classList.toggle('dark-mode-auth', isDarkMode);

    return () => {
      document.body.style.overflow = originalStyle;
      document.body.classList.remove('dark-mode-auth');
    };
  }, [isDarkMode]);

  return (
    <div className="auth-container-auth">
      <ServiceShowcase />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-section-auth"
      >
        <div className="auth-wrapper-auth">
          <div className="auth-top-controls-auth">
            <button
              type="button"
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="auth-mode-toggle-auth"
              aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button 
              type="button" 
              className="auth-close-btn-auth"
              onClick={onClose}
            >
              <X size={24} />
            </button>
          </div>

          <div className="auth-card-auth">
            <div className="toggle-container-auth">
              <div className="toggle-wrapper-auth">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`toggle-btn-auth ${isLogin ? 'active' : ''}`}
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`toggle-btn-auth ${!isLogin ? 'active' : ''}`}
                >
                  Register
                </button>
              </div>
            </div>

            <AnimatePresence mode="wait">
              {isLogin ? (
                <LoginForm key="login" onToggle={() => setAuthMode('register')} onClose={onClose} />
              ) : (
                <RegisterForm 
                  key="register" 
                  onToggle={() => setAuthMode('login')} 
                  onClose={onClose} 
                  initialRole={authRole}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;

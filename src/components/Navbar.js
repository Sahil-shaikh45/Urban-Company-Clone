import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import AuthPage from './AuthPage';
import Swal from 'sweetalert2';
import './Navbar.css';

const Navbar = () => {
  const { cart, setSelectedCategory, isLoggedIn, user, logout, showAuthModal, setShowAuthModal, openLogin } = useCart();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locationName, setLocationName] = useState('Pune, Maharashtra');
  const [isDetecting, setIsDetecting] = useState(false);
  const location = useLocation();

  const profileRef = useRef(null);
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/', icon: '🏠', category: null },
    { name: 'Services', path: '/', icon: '🔧', category: 'Cleaning' },
    { name: 'About Us', path: '/about', icon: '📌', category: null },
    { name: 'Contact Us', path: '/contact', icon: '📞', category: null }
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle clicks outside for profile menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (item) => {
    setSelectedCategory(item.category);
    setMobileMenuOpen(false);
    if (item.path === '/' && location.pathname === '/') {
      window.scrollTo({ top: item.category ? 600 : 0, behavior: 'smooth' });
    }
  };

  const detectLocation = () => {
    setIsDetecting(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setTimeout(() => {
            setLocationName("Kothrud, Pune");
            setIsDetecting(false);
            Swal.fire({
              title: 'Location Updated',
              text: 'Delivering services to Kothrud, Pune',
              icon: 'success',
              toast: true,
              position: 'top-end',
              timer: 3000,
              showConfirmButton: false
            });
          }, 1500);
        },
        (error) => {
          setIsDetecting(false);
          Swal.fire('Error', 'Could not access your location. Please check permissions.', 'error');
        }
      );
    } else {
      Swal.fire('Error', 'Geolocation is not supported by your browser.', 'error');
    }
  };

  return (
    <>
      <nav className={`navbar-advanced ${isScrolled ? 'scrolled' : ''}`}>
        <div className={`nav-container-advanced ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <Link to="/" className="logo-advanced" onClick={() => handleNavClick(navItems[0])}>
            Urban<span className="logo-dot-advanced">.</span>Easy
          </Link>

          <button className="mobile-toggle-advanced" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`nav-backdrop ${mobileMenuOpen ? 'active' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>

          <div className={`nav-menu-advanced ${mobileMenuOpen ? 'active' : ''}`}>
            <ul className="nav-items-advanced">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={`nav-link-advanced ${location.pathname === item.path && !item.category ? 'active' : ''}`}
                    onClick={() => handleNavClick(item)}
                  >
                    <span className="nav-icon-advanced">{item.icon}</span>
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <div className="user-section-advanced">
              <div className="location-picker-refined d-none d-lg-flex" onClick={detectLocation}>
                <div className="location-icon-wrapper">
                  <span className="location-icon-nav">📍</span>
                </div>
                <div className="location-info-nav">
                  <span className="location-label-nav">Deliver to</span>
                  <span className="location-value-nav">{isDetecting ? 'Detecting...' : locationName}</span>
                </div>
                <span className="location-arrow-nav">▼</span>
              </div>

              <Link to="/cart" className="cart-btn-advanced" onClick={() => setMobileMenuOpen(false)}>
                <i className="bi bi-cart3"></i>
                {cart.length > 0 && <span className="cart-badge-advanced">{cart.length}</span>}
              </Link>

              {isLoggedIn ? (
                <div className="profile-container-advanced" ref={profileRef}>
                  <button className="profile-btn-advanced" onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    <div className="profile-avatar-advanced">{user.name[0]}</div>
                    <span className="profile-name-advanced">{user.name}</span>
                    <span className="arrow-icon-advanced" style={{ transform: showProfileMenu ? 'rotate(180deg)' : 'rotate(0deg)' }}>▼</span>
                  </button>

                  <AnimatePresence>
                    {showProfileMenu && (
                      <motion.div
                        className="profile-menu-advanced"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <div className="profile-header-advanced">
                          <div className="profile-header-avatar-advanced">{user.name[0]}</div>
                          <div className="profile-header-info-advanced">
                            <h4>{user.name}</h4>
                            <p>{user.phone}</p>
                          </div>
                        </div>
                        <div className="profile-menu-items-advanced">
                          <Link to="/profile" className="menu-item-advanced" onClick={() => setShowProfileMenu(false)}>
                            <span className="menu-icon-advanced">👤</span>
                            <span>My Profile</span>
                          </Link>
                          {user?.role === 'PROVIDER' && (
                            <Link to="/provider" className="menu-item-advanced" onClick={() => setShowProfileMenu(false)}>
                              <span className="menu-icon-advanced">🛠️</span>
                              <span className="fw-bold text-primary">Partner Dashboard</span>
                            </Link>
                          )}
                          <button className="menu-item-advanced">
                            <span className="menu-icon-advanced">📅</span>
                            <span>My Bookings</span>
                          </button>
                          <div className="menu-divider-advanced"></div>
                          <button className="menu-item-advanced logout-advanced" onClick={() => { logout(); setShowProfileMenu(false); navigate('/'); }}>
                            <span className="menu-icon-advanced">🚪</span>
                            <span>Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button className="login-btn-advanced" onClick={() => { openLogin(); setMobileMenuOpen(false); }}>
                  <span className="login-icon-advanced">🔐</span>
                  <span>Login</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Login Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <AuthPage onClose={() => setShowAuthModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

import React from 'react';
import { categories } from '../data/services';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const { searchQuery, setSearchQuery } = useCart();
  const navigate = useNavigate();

  const handleCategoryClick = (catName) => {
    navigate(`/category/${catName}`);
  };

  return (
    <div className="hero-bg-animated py-5 position-relative" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      {/* Background Video */}
      <div className="hero-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://www.pexels.com/download/video/4201927/" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay"></div>
      </div>

      <div className="container text-center py-5 position-relative" style={{ zIndex: 10 }}>
        <motion.h1 
          className="display-2 fw-bold mb-3 hero-text-white"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Home services <span className="gradient-text">at your doorstep</span>
        </motion.h1>
        
        <motion.p 
          className="lead mb-5 hero-text-white opacity-90 fw-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ letterSpacing: '1px' }}
        >
          PROFESSIONAL • RELIABLE • INSURED
        </motion.p>

        <motion.div 
          className="hero-search-container glass-card p-2 mx-auto shadow-lg"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          style={{ maxWidth: '700px', borderRadius: '50px', background: 'rgba(255,255,255,0.9)' }}
        >
          <div className="position-relative d-flex align-items-center">
            <i className="bi bi-search fs-4 ms-4 text-primary"></i>
            <input 
              type="text" 
              className="form-control form-control-lg border-0 bg-transparent shadow-none px-3 py-3" 
              placeholder="Search for 'AC Repair', 'Sofa cleaning'..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ fontSize: '1.2rem', fontWeight: '500' }}
            />
            <button className="btn btn-primary rounded-pill px-4 py-2 me-2 fw-bold">
              Find Service
            </button>
          </div>
        </motion.div>

        <div className="mt-5 pt-4">
          <div className="row justify-content-center g-4">
            {categories.map((cat, index) => (
              <motion.div 
                key={cat.id} 
                className="col-6 col-sm-4 col-md-3 col-lg-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index + 0.7 }}
                onClick={() => handleCategoryClick(cat.name)}
                style={{ cursor: 'pointer' }}
              >
                <div className="category-icon-box shadow-lg">
                  <i className={`bi ${cat.icon} fs-2`} style={{ color: cat.color }}></i>
                </div>
                <p className="small fw-bold mt-2 text-dark">{cat.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

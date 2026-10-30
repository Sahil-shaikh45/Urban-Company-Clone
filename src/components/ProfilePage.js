import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user, logout } = useCart();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '123, Street Name, Pune, Maharashtra'
  });

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || ''
      }));
    }
  }, [user]);

  const handleSave = () => {
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <div className="display-1 text-muted opacity-25 mb-4">👤</div>
          <h3 className="fw-bold">Please login to view your profile</h3>
          <p className="text-muted">You need to be authenticated to access this dashboard.</p>
        </motion.div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="profile-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            <motion.div 
              className="profile-card shadow-lg"
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <div className="profile-cover"></div>
              <div className="profile-content px-5 pb-5">
                <div className="profile-header-main">
                  <motion.div className="profile-avatar-large" variants={itemVariants}>
                    {formData.name[0]}
                  </motion.div>
                  <motion.div className="profile-basic-info" variants={itemVariants}>
                    <div className="badge-premium mb-2">Premium Member</div>
                    <h2 className="fw-bold mb-0">{formData.name}</h2>
                    <p className="text-muted mb-0">Member since March 2026</p>
                  </motion.div>
                  <motion.div className="ms-auto" variants={itemVariants}>
                    {isEditing ? (
                      <button className="btn btn-success rounded-pill px-5 py-2 fw-bold" onClick={handleSave}>Save Changes</button>
                    ) : (
                      <button className="btn btn-outline-primary rounded-pill px-5 py-2 fw-bold" onClick={() => setIsEditing(true)}>Edit Profile</button>
                    )}
                  </motion.div>
                </div>

                <motion.div className="profile-details-grid mt-5" variants={itemVariants}>
                  <div className="detail-item">
                    <label>Full Name</label>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.input 
                          key="edit-name"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          type="text" 
                          value={formData.name} 
                          onChange={(e) => setFormData({...formData, name: e.target.value})} 
                        />
                      ) : (
                        <motion.p key="view-name" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {formData.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="detail-item">
                    <label>Email Address</label>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.input 
                          key="edit-email"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          type="email" 
                          value={formData.email} 
                          onChange={(e) => setFormData({...formData, email: e.target.value})} 
                        />
                      ) : (
                        <motion.p key="view-email" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {formData.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="detail-item">
                    <label>Phone Number</label>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.input 
                          key="edit-phone"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          type="tel" 
                          value={formData.phone} 
                          onChange={(e) => setFormData({...formData, phone: e.target.value})} 
                        />
                      ) : (
                        <motion.p key="view-phone" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          +91 {formData.phone}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                  <div className="detail-item">
                    <label>Default Address</label>
                    <AnimatePresence mode="wait">
                      {isEditing ? (
                        <motion.textarea 
                          key="edit-address"
                          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                          value={formData.address} 
                          rows="1"
                          onChange={(e) => setFormData({...formData, address: e.target.value})} 
                        />
                      ) : (
                        <motion.p key="view-address" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          {formData.address}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>

                <motion.div className="profile-stats row mt-5 g-4 text-center" variants={itemVariants}>
                  <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                      <h4 className="fw-bold mb-1 text-primary">12</h4>
                      <p className="small text-muted mb-0 fw-bold uppercase">Total Bookings</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                      <h4 className="fw-bold mb-1 text-primary">₹4,250</h4>
                      <p className="small text-muted mb-0 fw-bold uppercase">Money Saved</p>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="stat-card shadow-sm">
                      <h4 className="fw-bold mb-1 text-primary">4.9</h4>
                      <p className="small text-muted mb-0 fw-bold uppercase">User Rating</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div className="mt-5 pt-5 border-top" variants={itemVariants}>
                  <h5 className="fw-bold mb-4 d-flex align-items-center">
                    <i className="bi bi-gear-fill me-2 text-primary"></i> Account Settings
                  </h5>
                  <div className="settings-list">
                    <div className="settings-item d-flex align-items-center">
                      <div className="settings-icon bg-primary-subtle text-primary">
                        <i className="bi bi-bell-fill"></i>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">Push Notifications</h6>
                        <p className="small text-muted mb-0">Stay updated with service status</p>
                      </div>
                      <div className="form-check form-switch ms-auto">
                        <input className="form-check-input" type="checkbox" defaultChecked />
                      </div>
                    </div>
                    
                    <div className="settings-item d-flex align-items-center">
                      <div className="settings-icon bg-info-subtle text-info">
                        <i className="bi bi-shield-lock-fill"></i>
                      </div>
                      <div className="ms-3">
                        <h6 className="mb-0 fw-bold">Two-Step Verification</h6>
                        <p className="small text-muted mb-0">Secure your account with 2FA</p>
                      </div>
                      <div className="form-check form-switch ms-auto">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </div>

                    <div className="text-center mt-5">
                      <button className="btn btn-link text-danger text-decoration-none fw-bold p-0" onClick={logout}>
                        <i className="bi bi-power me-2"></i> Logout from this session
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

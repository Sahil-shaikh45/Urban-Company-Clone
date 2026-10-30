import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ConfirmationPage.css';

const ConfirmationPage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('Assigning professional...');
  const [isCalling, setIsCalling] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Map Animation States
  const [markerPos, setMarkerPos] = useState({ x: 20, y: 80 }); // Start pos (Hinjewadi)
  
  useEffect(() => {
    if (showMap) {
      const mapTimer = setInterval(() => {
        setMarkerPos(prev => {
          if (prev.x >= 75) return prev; // End pos (Baner)
          return {
            x: prev.x + 0.5,
            y: prev.y - 0.4
          };
        });
      }, 100);
      return () => clearInterval(mapTimer);
    }
  }, [showMap]);

  // Calculate dynamic time based on progress (Starts at 30 mins, ends at 0)
  const timeLeft = Math.max(0, Math.round(30 * (1 - progress / 100)));

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(timer);
          return 100;
        }
        // Random incremental progress for realistic feel
        const diff = Math.random() * 1.5;
        return Math.min(oldProgress + diff, 100);
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (progress > 80) setStatus('Professional is nearby!');
    else if (progress > 50) setStatus('Professional is on the way');
    else if (progress > 20) setStatus('Professional assigned & preparing');
  }, [progress]);

  return (
    <div className="confirmation-page">
      <div className="container py-5">
        <motion.div 
          className="confirmation-card text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="success-icon-box mb-4">
            <motion.div 
              className="success-circle"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            >
              <i className="bi bi-check2"></i>
            </motion.div>
          </div>

          <h1 className="fw-bold mb-2">Booking Confirmed!</h1>
          <p className="text-muted mb-5">Your service request #UE-9410 has been accepted.</p>

          <div className="tracking-section mb-5">
            <div className="d-flex justify-content-between mb-3">
              <div className="text-start">
                <span className="d-block small text-muted uppercase fw-bold">Status</span>
                <span className="fw-bold text-primary fs-5">{status}</span>
              </div>
              <div className="text-end">
                <span className="d-block small text-muted uppercase fw-bold">Arrival In</span>
                <span className="fw-bold fs-5">{timeLeft} mins</span>
              </div>
            </div>
            
            <div className="tracking-bar-wrapper">
              <div className="tracking-line-container">
                <motion.div 
                  className="tracking-line-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "linear" }}
                ></motion.div>
                <motion.div 
                  className="tracking-icon-runner"
                  animate={{ left: `${progress}%` }}
                  transition={{ ease: "linear" }}
                >
                  <div className="pulse-effect"></div>
                  <i className="bi bi-bicycle"></i>
                </motion.div>
              </div>
              <div className="d-flex justify-content-between mt-2 px-1">
                <span className="tiny-text">Confirmed</span>
                <span className="tiny-text">On the way</span>
                <span className="tiny-text">Arrived</span>
              </div>
            </div>
          </div>

          <div className="professional-mini-card mb-5 p-3 bg-light rounded-4 d-flex align-items-center">
            <img src="https://thumbs.dreamstime.com/b/ai-brain-409496321.jpg?w=768" alt="Pro" className="prof-avatar" />
            <div className="ms-3 text-start">
              <h6 className="fw-bold mb-0">Rajesh Kumar</h6>
              <p className="small text-muted mb-0">Verified Professional • ⭐ 4.9</p>
            </div>
            <div className="ms-auto">
              <button className="btn-call-pro" onClick={() => setIsCalling(true)}>
                <i className="bi bi-telephone-fill"></i>
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isCalling && (
              <motion.div 
                className="calling-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="calling-content">
                  <div className="calling-avatar-box">
                    <img src="https://thumbs.dreamstime.com/b/ai-brain-409496321.jpg?w=768" alt="Pro" />
                    <div className="calling-pulse"></div>
                  </div>
                  <h3>Rajesh Kumar</h3>
                  <p className="calling-status">Calling...</p>
                  
                  <div className="calling-actions">
                    <button className="btn-end-call" onClick={() => setIsCalling(false)}>
                      <i className="bi bi-telephone-x-fill"></i>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="d-grid gap-3">
            <button className="btn btn-premium py-3 rounded-pill fw-bold" onClick={() => setShowMap(true)}>
              Track on Map
            </button>
            <button className="btn btn-link text-muted text-decoration-none" onClick={() => navigate('/')}>
              Return to Home
            </button>
          </div>
        </motion.div>
      </div>

      {/* Live Map Modal */}
      <AnimatePresence>
        {showMap && (
          <motion.div 
            className="map-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="map-modal"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="map-header">
                <div className="drag-handle"></div>
                <button className="btn-close-map" onClick={() => setShowMap(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
                <h5 className="fw-bold mb-0">Live Tracking</h5>
                <p className="extra-small text-muted mb-0">Pune, Maharashtra</p>
              </div>

              <div className="map-container-sim">
                {/* Simulated Pune Map */}
                <div className="pune-map-bg">
                  <div className="map-label label-hinjewadi">Hinjewadi</div>
                  <div className="map-label label-baner">Baner</div>
                  <div className="map-label label-wakad">Wakad</div>
                  <div className="map-label label-balewadi">Balewadi High St</div>
                  
                  {/* Road Path */}
                  <svg className="map-path-svg" viewBox="0 0 100 100">
                    <motion.path 
                      d="M 20 80 Q 40 70, 50 50 T 80 20" 
                      fill="none" 
                      stroke="rgba(99, 102, 241, 0.2)" 
                      strokeWidth="2"
                      strokeDasharray="4 2"
                    />
                  </svg>

                  {/* Customer Marker (Static) */}
                  <div className="marker marker-customer" style={{ left: '80%', top: '20%' }}>
                    <div className="marker-ping"></div>
                    <i className="bi bi-house-heart-fill"></i>
                    <span className="marker-label">You</span>
                  </div>

                  {/* Professional Marker (Animated) */}
                  <motion.div 
                    className="marker marker-pro"
                    style={{ left: `${markerPos.x}%`, top: `${markerPos.y}%` }}
                  >
                    <div className="marker-pro-card">
                      <img src="https://thumbs.dreamstime.com/b/ai-brain-409496321.jpg?w=768" alt="Pro" />
                      <span>Rajesh</span>
                    </div>
                    <div className="pro-icon-box">
                      <i className="bi bi-bicycle"></i>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="map-footer p-4">
                <div className="d-flex align-items-center gap-3">
                  <div className="status-indicator-live"></div>
                  <div>
                    <h6 className="fw-bold mb-0">On the way to Baner</h6>
                    <p className="extra-small text-muted mb-0">Passing through Wakad Flyover</p>
                  </div>
                  <div className="ms-auto text-end">
                    <h5 className="fw-bold text-primary mb-0">8 mins</h5>
                    <p className="extra-small text-muted mb-0">Remaining</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ConfirmationPage;

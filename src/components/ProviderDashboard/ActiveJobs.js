import React, { useState } from 'react';
import { 
  MapPin, 
  Phone, 
  Play, 
  CheckCircle, 
  Upload, 
  Image as ImageIcon,
  ShieldCheck,
  Navigation,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Swal from 'sweetalert2';

const ActiveJobs = () => {
  const [jobs, setJobs] = useState([
    { 
      id: 201, 
      customer: 'Sonia Gupta', 
      service: 'Sofa Cleaning', 
      address: 'H-24, Sector 62, Noida, UP',
      phone: '+919876543210',
      status: 'PENDING',
      price: 1250,
      beforeImage: null,
      afterImage: null
    }
  ]);

  const handleNavigate = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  const handleCall = (phoneNumber) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');

  const handleStartClick = (jobId) => {
    setSelectedJobId(jobId);
    setShowOtpModal(true);
    setOtp('');
    setOtpError('');
  };

  const handleVerifyOtp = () => {
    if (otp === '1234') { // Simulated OTP
      setJobs(prev => prev.map(j => 
        j.id === selectedJobId ? { ...j, status: 'IN_PROGRESS' } : j
      ));
      setShowOtpModal(false);
      Swal.fire({
        title: 'Job Started!',
        text: 'You can now begin the service.',
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
    } else {
      setOtpError('Invalid OTP. Please try again (Hint: 1234)');
    }
  };

  const handleImageUpload = (jobId, type, e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setJobs(prev => prev.map(j => 
        j.id === jobId ? { ...j, [type]: imageUrl } : j
      ));
      Swal.fire({
        title: 'Uploaded!',
        text: `${type === 'beforeImage' ? 'Before' : 'After'} image uploaded successfully!`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });
    }
  };

  const handleCompleteJob = (jobId) => {
    setJobs(prev => prev.map(j => 
      j.id === jobId ? { ...j, status: 'COMPLETED' } : j
    ));
    Swal.fire({
      title: 'Job Completed!',
      text: "Job Completed! Earnings added to your wallet.",
      icon: 'success'
    });
  };

  return (
    <div className="active-jobs">
      <h4 className="fw-bold mb-4">My Active Jobs</h4>

      <div className="row g-4">
        {jobs.map((job) => (
          <div key={job.id} className="col-12">
            <motion.div 
              className="active-job-card shadow-sm border-0 p-4 rounded-4"
              layout
            >
              <div className="row">
                <div className="col-lg-6">
                  <div className="d-flex justify-content-between align-items-start mb-4">
                    <div className="d-flex gap-3 align-items-center">
                      <div className="customer-avatar bg-primary text-white">
                        {job.customer[0]}
                      </div>
                      <div>
                        <h5 className="fw-bold mb-0">{job.customer}</h5>
                        <p className="text-muted small mb-0">{job.service}</p>
                      </div>
                    </div>
                    <span className={`status-pill ${job.status.toLowerCase()}`}>
                      {job.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="job-info-row mb-3">
                    <MapPin size={18} className="text-primary me-2" />
                    <span className="small">{job.address}</span>
                  </div>

                  <div className="action-buttons-row d-flex gap-2 mb-4">
                    <button 
                      className="btn btn-outline-primary btn-sm flex-grow-1"
                      onClick={() => handleNavigate(job.address)}
                    >
                      <Navigation size={14} className="me-2" /> Navigate
                    </button>
                    <button 
                      className="btn btn-outline-success btn-sm flex-grow-1"
                      onClick={() => handleCall(job.phone)}
                    >
                      <Phone size={14} className="me-2" /> Call Customer
                    </button>
                  </div>
                </div>

                <div className="col-lg-6 border-start ps-lg-4">
                  <div className="upload-sections mb-4">
                    <div className="row g-3">
                      <div className="col-6">
                        <p className="extra-small fw-bold text-uppercase text-muted mb-2">Before Service</p>
                        <div className={`upload-box ${job.beforeImage ? 'has-image' : ''}`}>
                          {job.beforeImage ? (
                            <img src={job.beforeImage} alt="Before" className="img-fluid rounded" />
                          ) : (
                            <label className="upload-label">
                              <Upload size={20} className="mb-1" />
                              <span>Upload</span>
                              <input 
                                type="file" 
                                className="d-none" 
                                onChange={(e) => handleImageUpload(job.id, 'beforeImage', e)}
                                disabled={job.status !== 'PENDING'}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                      <div className="col-6">
                        <p className="extra-small fw-bold text-uppercase text-muted mb-2">After Service</p>
                        <div className={`upload-box ${job.afterImage ? 'has-image' : ''}`}>
                          {job.afterImage ? (
                            <img src={job.afterImage} alt="After" className="img-fluid rounded" />
                          ) : (
                            <label className={`upload-label ${job.status !== 'IN_PROGRESS' ? 'disabled' : ''}`}>
                              <Upload size={20} className="mb-1" />
                              <span>Upload</span>
                              <input 
                                type="file" 
                                className="d-none" 
                                onChange={(e) => handleImageUpload(job.id, 'afterImage', e)}
                                disabled={job.status !== 'IN_PROGRESS'}
                              />
                            </label>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="execution-actions">
                    {job.status === 'PENDING' && (
                      <button 
                        className="btn btn-primary w-100 py-3 rounded-pill fw-bold"
                        onClick={() => handleStartClick(job.id)}
                      >
                        <Play size={18} className="me-2" /> Start Job (Enter OTP)
                      </button>
                    )}
                    {job.status === 'IN_PROGRESS' && (
                      <button 
                        className="btn btn-success w-100 py-3 rounded-pill fw-bold"
                        onClick={() => handleCompleteJob(job.id)}
                      >
                        <CheckCircle size={18} className="me-2" /> Complete Job
                      </button>
                    )}
                    {job.status === 'COMPLETED' && (
                      <div className="alert alert-success d-flex align-items-center rounded-pill">
                        <Check size={20} className="me-2" /> Job Completed Successfully!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        ))}

        {jobs.length === 0 && (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No active jobs</h5>
            <p>Accept jobs from the 'Job Requests' tab to get started.</p>
          </div>
        )}
      </div>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtpModal && (
          <div className="modal-backdrop-custom">
            <motion.div 
              className="modal-content-custom shadow-lg"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
            >
              <div className="p-4 text-center">
                <div className="otp-icon bg-primary-soft text-primary mb-4 mx-auto">
                  <ShieldCheck size={48} />
                </div>
                <h4 className="fw-bold mb-2">Verify Service OTP</h4>
                <p className="text-muted small mb-4">Ask customer for the 4-digit verification code to start the service.</p>
                
                <input 
                  type="text" 
                  className={`form-control form-control-lg text-center fw-bold fs-2 mb-2 ${otpError ? 'is-invalid' : ''}`}
                  placeholder="0 0 0 0"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  style={{ letterSpacing: '10px' }}
                />
                {otpError && <p className="text-danger small mb-4">{otpError}</p>}
                {!otpError && <p className="extra-small text-muted mb-4">Hint: Use 1234 for demo</p>}

                <div className="d-flex gap-3">
                  <button className="btn btn-light flex-grow-1" onClick={() => setShowOtpModal(false)}>Cancel</button>
                  <button className="btn btn-primary flex-grow-1" onClick={handleVerifyOtp}>Verify & Start</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ActiveJobs;
